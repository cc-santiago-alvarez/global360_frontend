import {
  Armchair,
  Boxes,
  Car,
  ChartNoAxesCombined,
  CircuitBoard,
  ClipboardCheck,
  Cog,
  Container,
  CupSoda,
  Cpu,
  Factory,
  Footprints,
  Forklift,
  Frame,
  Handshake,
  HardHat,
  Hotel,
  House,
  Lamp,
  Lightbulb,
  Package,
  Package2,
  PackageCheck,
  PackageOpen,
  PackageSearch,
  Pill,
  Plane,
  Printer,
  Scissors,
  Ship,
  Shirt,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Syringe,
  ToyBrick,
  Truck,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  descriptionEn: string;
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn?: string;
};

export const services: Service[] = [
  {
    icon: ShoppingCart,
    title: "Compra de Productos",
    description: "Compra de productos en China y mercados internacionales.",
    descriptionEn: "Product sourcing in China and international markets.",
  },
  {
    icon: Factory,
    title: "Fabricación / Producción",
    description: "Desarrollo y fabricación con proveedores verificados.",
    descriptionEn: "Manufacturing and production with verified suppliers.",
  },
  {
    icon: Ship,
    title: "Envío Aéreo y Marítimo",
    description: "Transporte internacional aéreo y marítimo.",
    descriptionEn: "International air and sea freight services.",
  },
  {
    icon: ClipboardCheck,
    title: "Inspección de Carga",
    description: "Control de calidad antes del envío.",
    descriptionEn: "Quality inspection before shipment.",
  },
  {
    icon: ShieldCheck,
    title: "Auditoría de Fábrica o Proveedor",
    description: "Verificación de fábricas y proveedores.",
    descriptionEn: "Factory and supplier auditing services.",
  },
  {
    icon: PackageSearch,
    title: "Búsqueda de Producto",
    description: "Localización de productos específicos.",
    descriptionEn: "Product sourcing and supplier matching.",
  },
  {
    icon: Handshake,
    title: "Acompañamiento",
    description: "Asistencia en ferias, reuniones y negociaciones.",
    descriptionEn: "Business assistance during fairs and negotiations.",
  },
  {
    icon: Warehouse,
    title: "Casillero Internacional & DropShipping",
    description: "Recepción, consolidación y despacho internacional.",
    descriptionEn: "International warehousing, consolidation and dropshipping solutions.",
  },
  {
    icon: Lightbulb,
    title: "Desarrollo de Producto",
    description: "Creación y personalización de productos.",
    descriptionEn: "Product development and customization.",
  },
  {
    icon: Wrench,
    title: "Solución de Problemas",
    description: "Gestión de incidencias y resolución comercial.",
    descriptionEn: "Problem solving and business support.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Asesoría Comercial",
    description: "Estrategia de compras y expansión internacional.",
    descriptionEn: "International trade consulting and business strategy.",
  },
];

export const logisticsSolutions: Feature[] = [
  {
    icon: Container,
    title: "Carga Contenedor Cerrado",
    titleEn: "Full container load",
    description: "Transporte seguro de carga en contenedores completos a cualquier destino.",
  },
  {
    icon: Boxes,
    title: "Carga Consolidada",
    titleEn: "Consolidated cargo",
    description: "Consolidamos tu carga con otros envíos para optimizar costos y tiempos.",
  },
  {
    icon: Warehouse,
    title: "Casillero Internacional",
    titleEn: "International warehousing",
    description: "Recepción, almacenamiento, consolidación y reempaque de tu mercancía.",
  },
  {
    icon: Truck,
    title: "Última Milla",
    titleEn: "Last-mile delivery",
    description: "Entrega final puerta a puerta con logística eficiente y confiable.",
  },
];

export const warehousing: Feature[] = [
  {
    icon: PackageCheck,
    title: "Recepción",
    titleEn: "Receiving",
    description: "Recepción de mercancía de sus proveedores en China.",
    descriptionEn: "Receiving goods from your suppliers in China.",
  },
  {
    icon: Warehouse,
    title: "Almacenamiento",
    titleEn: "Storage",
    description: "Almacenamiento seguro en nuestras bodegas con control y monitoreo.",
    descriptionEn: "Secure storage in our warehouses with control and monitoring.",
  },
  {
    icon: Boxes,
    title: "Consolidación",
    titleEn: "Consolidation",
    description: "Consolidamos múltiples pedidos en un solo envío para optimizar costos.",
    descriptionEn: "We consolidate multiple orders into one shipment to optimize costs.",
  },
  {
    icon: PackageOpen,
    title: "Reempaque",
    titleEn: "Repacking",
    description: "Reempaque, etiquetado y preparación de mercancía según sus requerimientos.",
    descriptionEn: "Repacking, labeling and preparation of goods according to your requirements.",
  },
];

export const warehousingNote: Feature = {
  icon: ShieldCheck,
  title: "Seguridad · Eficiencia · Control",
  titleEn: "Security · Efficiency · Control",
  description:
    "Manejamos su mercancía con el máximo cuidado y eficiencia en cada etapa del proceso.",
  descriptionEn: "We handle your goods with the utmost care and efficiency at every stage of the process.",
};

export const shipping: Feature[] = [
  {
    icon: Plane,
    title: "Aéreo",
    titleEn: "Air freight",
    description: "Envíos rápidos y seguros por vía aérea.",
    descriptionEn: "Fast and secure air shipments.",
  },
  {
    icon: Ship,
    title: "Marítimo",
    titleEn: "Sea freight",
    description: "Envíos marítimos FCL y LCL con las mejores tarifas.",
    descriptionEn: "FCL and LCL sea shipping with the best rates.",
  },
  {
    icon: Truck,
    title: "Courier",
    titleEn: "Express courier",
    description: "Envíos puerta a puerta a través de couriers internacionales.",
    descriptionEn: "Door-to-door deliveries via international couriers.",
  },
  {
    icon: Package2,
    title: "Carga Consolidada",
    titleEn: "Consolidated cargo",
    description: "Consolidación de carga para ahorrar en costos de envío.",
    descriptionEn: "Cargo consolidation to save on shipping costs.",
  },
];

export const ratesNote = {
  description:
    "Los tiempos y las tarifas varían cada semana tanto aéreo como marítimo. Para mayor información comunícate directamente con nosotros.",
  descriptionEn:
    "Times and rates change every week for both air and sea freight. For more information, please contact us directly.",
};

// Código ISO 3166-1 alfa-2 para la bandera; null cuando no aplica una sola bandera.
export type Country = { name: string; code: string | null };

export const exportCountries: Country[] = [
  { name: "China", code: "CN" },
  { name: "Estados Unidos", code: "US" },
  { name: "Francia", code: "FR" },
  { name: "España", code: "ES" },
  { name: "Italia", code: "IT" },
  { name: "Turquía", code: "TR" },
  { name: "Brasil", code: "BR" },
  { name: "Colombia", code: "CO" },
];

export const importCountries: Country[] = [
  { name: "Colombia", code: "CO" },
  { name: "México", code: "MX" },
  { name: "Canadá", code: "CA" },
  { name: "Estados Unidos", code: "US" },
  { name: "Islas del Caribe", code: null },
  { name: "República Dominicana", code: "DO" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Guatemala", code: "GT" },
  { name: "El Salvador", code: "SV" },
  { name: "Honduras", code: "HN" },
  { name: "Costa Rica", code: "CR" },
  { name: "Panamá", code: "PA" },
  { name: "Ecuador", code: "EC" },
  { name: "Venezuela", code: "VE" },
  { name: "Perú", code: "PE" },
  { name: "Brasil", code: "BR" },
  { name: "Chile", code: "CL" },
  { name: "Argentina", code: "AR" },
  { name: "Paraguay", code: "PY" },
  { name: "Uruguay", code: "UY" },
];

export const categories: { icon: LucideIcon; label: string }[] = [
  { icon: Shirt, label: "Textil" },
  { icon: Footprints, label: "Accesorios y Zapatos" },
  { icon: Cpu, label: "Tecnología" },
  { icon: Package, label: "Insumos de todas las categorías" },
  { icon: ToyBrick, label: "Juguetería" },
  { icon: HardHat, label: "Construcción" },
  { icon: Sparkles, label: "Belleza" },
  { icon: Stethoscope, label: "Maquinaria médica" },
  { icon: Syringe, label: "Maquinaria de estética" },
  { icon: Factory, label: "Maquinaria industrial" },
  { icon: Forklift, label: "Maquinaria pesada" },
  { icon: Printer, label: "Maquinaria de estampado" },
  { icon: Scissors, label: "Maquinaria textil" },
  { icon: Armchair, label: "Mueblería" },
  { icon: House, label: "Casas prefabricadas" },
  { icon: Lamp, label: "Iluminación" },
  { icon: Frame, label: "Decoraciones" },
  { icon: CupSoda, label: "Desechables" },
  { icon: Pill, label: "Suplementos y vitaminas" },
  { icon: PackageOpen, label: "Empaques de todas las categorías" },
  { icon: Hotel, label: "Hotelería" },
  { icon: CircuitBoard, label: "Repuestos de tecnología" },
  { icon: Car, label: "Repuestos automotriz" },
  { icon: Cog, label: "Repuestos de maquinaria" },
];
