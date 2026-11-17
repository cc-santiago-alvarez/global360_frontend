import { MapPin, Package, ShieldCheck, Ship, Warehouse, type LucideIcon } from "lucide-react";

export type TrackingStep = {
  /** Estado tal como se escribe en la hoja, normalizado (minúsculas, sin tildes ni espacios extra). */
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

// Etapas del envío en orden. Para agregar o renombrar un estado, cambia también la columna "Estado" de la hoja.
export const trackingSteps: readonly TrackingStep[] = [
  {
    key: "saliendo",
    label: "Saliendo",
    description: "Tu paquete salió de nuestra bodega de origen.",
    icon: Package,
  },
  {
    key: "embarque",
    label: "Embarque",
    description: "Tu paquete fue embarcado y va en camino.",
    icon: Ship,
  },
  {
    key: "llegada",
    label: "Llegada",
    description: "Tu paquete llegó al país de destino.",
    icon: MapPin,
  },
  {
    key: "aduana",
    label: "Aduana",
    description: "Tu paquete está en proceso de nacionalización.",
    icon: ShieldCheck,
  },
  {
    key: "en bodega destino",
    label: "En bodega destino",
    description: "Tu paquete está en nuestra bodega de destino, listo para entrega.",
    icon: Warehouse,
  },
];

/** Minúsculas, sin tildes y con los espacios colapsados: "  En Bodega  Destino " → "en bodega destino". */
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
