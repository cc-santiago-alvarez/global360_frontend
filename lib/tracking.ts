import "server-only";

import { cacheLife } from "next/cache";
import { normalizeText, stepIndexFor } from "@/lib/tracking-steps";

// La "base de datos" es una hoja de Google Sheets con las columnas "Guia" y "Estado".
// Se lee como CSV desde el servidor; la hoja debe estar compartida como "cualquiera con el enlace puede ver".

export type ShipmentLookup =
  | { status: "invalid" }
  | { status: "not-found"; guia: string }
  | { status: "found"; guia: string; estado: string; stepIndex: number };

const GUIA_PATTERN = /^[A-Z0-9-]{1,30}$/;

/** Quita espacios y pasa a mayúsculas. Devuelve null si no parece un número de guía. */
export function normalizeGuia(value: string) {
  const guia = value.replace(/\s+/g, "").toUpperCase();
  return GUIA_PATTERN.test(guia) ? guia : null;
}

export async function findShipment(rawGuia: string): Promise<ShipmentLookup> {
  const guia = normalizeGuia(rawGuia);
  if (!guia) return { status: "invalid" };

  const table = await getTrackingTable();
  if (!Object.hasOwn(table, guia)) return { status: "not-found", guia };

  const estado = table[guia].trim();
  return { status: "found", guia, estado, stepIndex: stepIndexFor(estado) };
}

/** Tabla { guía: estado } leída de la hoja. Se cachea y se vuelve a leer como máximo cada minuto. */
async function getTrackingTable(): Promise<Record<string, string>> {
  "use cache";
  cacheLife("minutes");

  const sheetId = process.env.TRACKING_SHEET_ID;
  if (!sheetId) throw new Error("Falta la variable de entorno TRACKING_SHEET_ID.");
  const gid = process.env.TRACKING_SHEET_GID || "0";

  // Los errores se lanzan (no se devuelven) para que un fallo temporal no quede guardado en el cache.
  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/export?format=csv&gid=${encodeURIComponent(gid)}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Google Sheets respondió ${response.status} al leer la hoja de rastreo.`);

  // Si la hoja deja de ser pública, Google responde con su página de inicio de sesión en vez de un CSV.
  if (!response.headers.get("content-type")?.includes("text/csv")) {
    throw new Error("La hoja de rastreo no devolvió un CSV. Revisa que esté compartida como 'cualquiera con el enlace'.");
  }

  const [header = [], ...rows] = parseCsv(await response.text());
  const columns = header.map(normalizeText);
  const guiaColumn = columns.indexOf("guia");
  const estadoColumn = columns.indexOf("estado");
  if (guiaColumn === -1 || estadoColumn === -1) {
    throw new Error('La hoja de rastreo debe tener las columnas "Guia" y "Estado" en la primera fila.');
  }

  const table: Record<string, string> = {};
  for (const row of rows) {
    const guia = normalizeGuia(row[guiaColumn] ?? "");
    // Si una guía aparece repetida, gana la fila de más abajo (la más reciente).
    if (guia) table[guia] = row[estadoColumn] ?? "";
  }
  return table;
}

/** Parser CSV mínimo (RFC 4180): comas, saltos de línea y campos entre comillas con "" escapadas. */
function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (quoted) {
      if (char !== '"') field += char;
      else if (text[i + 1] === '"') {
        field += '"';
        i++;
      } else quoted = false;
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
