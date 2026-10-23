import { ArrowRight } from "lucide-react";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons/Brand";

type WhatsAppLinkProps = {
  variant?: "outline" | "solid";
  label?: string;
  message?: string;
  className?: string;
};

const variants = {
  outline:
    "border border-gold-400/80 bg-navy-950/40 text-white backdrop-blur-sm hover:border-gold-300 hover:bg-gold-500/15",
  solid:
    "bg-whatsapp text-navy-950 shadow-lg shadow-whatsapp/25 hover:bg-[#3ee07b] hover:shadow-whatsapp/40",
};

export function WhatsAppLink({
  variant = "outline",
  label = "Contáctanos por WhatsApp",
  message,
  className = "",
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 ${variants[variant]} ${className}`}
    >
      <span
        className={`grid size-8 place-items-center rounded-full ${variant === "outline" ? "bg-whatsapp text-white" : "bg-white/90 text-whatsapp-dark"}`}
      >
        <WhatsAppIcon className="size-4.5" />
      </span>
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      <span className="sr-only">(abre WhatsApp en una nueva pestaña)</span>
    </a>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-xl shadow-navy-950/30 transition hover:scale-105 hover:bg-whatsapp-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
