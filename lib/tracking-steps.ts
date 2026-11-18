import {
  FileText,
  Landmark,
  PackageCheck,
  PackageOpen,
  PlaneLanding,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type TrackingStep = {
  /** Estado tal como se escribe en la columna "Status" de la hoja, normalizado (minúsculas, sin tildes ni espacios extra). */
  key: string;
  label: string;
  icon: LucideIcon;
};

const step = (label: string, icon: LucideIcon): TrackingStep => ({ key: normalizeText(label), label, icon });

// Etapas del envío en orden. Si se agrega o renombra un estado en la hoja, hay que cambiarlo también aquí.
export const trackingSteps: readonly TrackingStep[] = [
  step("Recibido en bodega de origen", Warehouse),
  step("En alistamiento", PackageOpen),
  step("Proceso de exportación", FileText),
  step("En tránsito internacional", Ship),
  step("Arribado al país de destino", PlaneLanding),
  step("En gestión aduanera", Landmark),
  step("Liberado por aduanas", ShieldCheck),
  step("Listo para entrega", Truck),
  step("Entregado", PackageCheck),
];

/** Minúsculas, sin tildes y con los espacios colapsados: "  En Gestión  Aduanera " → "en gestion aduanera". */
export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Índice del paso que corresponde al estado de la hoja, o -1 si no se reconoce. */
export function stepIndexFor(estado: string) {
  const key = normalizeText(estado);
  return trackingSteps.findIndex((step) => step.key === key);
}
