import "server-only";

import { cacheLife } from "next/cache";
import { normalizeText, stepIndexFor } from "@/lib/tracking-steps";

// La "base de datos" es una hoja de Google Sheets con las columnas "Tracking Number", "Status" y "Descripción".
// Se lee como CSV desde el servidor; la hoja debe estar compartida como "cualquiera con el enlace puede ver".

export type ShipmentLookup =
  | { status: "invalid" }
  | { status: "not-found"; guia: string }
  | { status: "found"; guia: string; estado: string; descripcion: string; stepIndex: number };

type Shipment = { estado: string; descripcion: string };

// Nombres aceptados para cada columna, ya normalizados (minúsculas, sin tildes). El orden de las columnas da igual.
const COLUMN_NAMES = {
  guia: ["tracking number", "tracking", "numero de guia", "guia"],
  estado: ["status", "estado"],
  descripcion: ["descripcion", "description", "nota", "notas", "observaciones"],
};

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

  const estado = table[guia].estado.trim();
  const descripcion = table[guia].descripcion.trim();
  return { status: "found", guia, estado, descripcion, stepIndex: stepIndexFor(estado) };
}

/**
 * Errores de la hoja de rastreo. Se registran aquí mismo porque en producción Next.js oculta el mensaje
 * de los errores que salen de una función "use cache" (en el log solo quedaría un "digest").
 * Se lanzan en vez de devolverse para que un fallo temporal no quede guardado en el cache.
 */
function fail(message: string, cause?: unknown): never {
  console.error(`[rastreo] ${message}`, cause ?? "");
  throw new Error(message, { cause });
}

/** URL de exportación CSV. TRACKING_SHEET_ID acepta el ID de la hoja o la URL completa copiada del navegador. */
function sheetCsvUrl() {
  const raw = process.env.TRACKING_SHEET_ID?.trim().replace(/^["']|["']$/g, "");
  if (!raw) return null;

  const id = raw.match(/\/spreadsheets\/d\/([\w-]+)/)?.[1] ?? raw;
  const gid = process.env.TRACKING_SHEET_GID?.trim() || raw.match(/[#&?]gid=(\d+)/)?.[1] || "0";
  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(id)}/export?format=csv&gid=${encodeURIComponent(gid)}`;
}

/** Tabla { guía: { estado, descripción } } leída de la hoja. Se cachea y se vuelve a leer como máximo cada minuto. */
async function getTrackingTable(): Promise<Record<string, Shipment>> {
  "use cache";
  cacheLife("minutes");

  const url = sheetCsvUrl();
  if (!url) fail("Falta la variable de entorno TRACKING_SHEET_ID (configúrala en Vercel y vuelve a desplegar).");

  let response: Response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  } catch (error) {
    fail(`No se pudo conectar con Google Sheets (${url}).`, error);
  }
  if (!response.ok) fail(`Google Sheets respondió ${response.status} al leer ${url}.`);

  // Si la hoja deja de ser pública, Google responde con su página de inicio de sesión en vez de un CSV.
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/csv")) {
    fail(`La hoja no devolvió un CSV (content-type: ${contentType}). Revisa que esté compartida como "cualquiera con el enlace".`);
  }

  const [header = [], ...rows] = parseCsv(await response.text());
  const columns = header.map(normalizeText);
  const columnOf = (names: string[]) => columns.findIndex((column) => names.includes(column));
  const guiaColumn = columnOf(COLUMN_NAMES.guia);
  const estadoColumn = columnOf(COLUMN_NAMES.estado);
  const descripcionColumn = columnOf(COLUMN_NAMES.descripcion); // opcional
  if (guiaColumn === -1 || estadoColumn === -1) {
    fail(
      `La hoja debe tener las columnas "Tracking Number" y "Status" en la primera fila (encontradas: ${header.join(", ")}).`,
    );
  }

  const table: Record<string, Shipment> = {};
  for (const row of rows) {
    // Las filas sin número de guía (por ejemplo, filas de referencia) se ignoran.
    const guia = normalizeGuia(row[guiaColumn] ?? "");
    // Si una guía aparece repetida, gana la fila de más abajo (la más reciente).
    if (guia) {
      table[guia] = {
        estado: row[estadoColumn] ?? "",
        descripcion: descripcionColumn === -1 ? "" : (row[descripcionColumn] ?? ""),
      };
    }
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
