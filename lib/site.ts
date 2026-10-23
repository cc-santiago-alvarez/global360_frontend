// Datos de contacto y marca. Cambia aquí y se actualiza todo el sitio.
// TODO: reemplazar los marcadores de Instagram y LinkedIn por los perfiles reales antes de publicar.
export const site = {
  name: "SEGlobal 360",
  tagline: "Tu empresa, sin fronteras.",
  claim: "Soluciones logísticas globales",
  description:
    "Compra de productos en China, fabricación, envíos aéreos y marítimos, casillero internacional y asesoría en comercio exterior. Desde Colombia hacia el mundo.",
  url: "https://www.seglobal360.com",

  // Número con indicativo de país, solo dígitos (ej. Colombia: 57 + celular).
  whatsapp: "573005561093",
  whatsappMessage: "Hola SEGlobal 360, quiero información sobre sus servicios.",

  instagram: "https://www.instagram.com/TU_USUARIO",
  linkedin: "https://www.linkedin.com/company/TU_EMPRESA",
} as const;

export function whatsappUrl(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#logistica", label: "Logística" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#contacto", label: "Contacto" },
] as const;
