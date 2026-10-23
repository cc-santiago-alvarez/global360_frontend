import { WhatsAppLink } from "@/components/WhatsAppLink";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="relative isolate overflow-hidden bg-navy-900 py-24 text-center sm:py-32"
    >
      <svg
        className="absolute inset-0 -z-10 size-full"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="cta-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#c9a45c" stopOpacity="0" />
            <stop offset="0.5" stopColor="#e8cb8e" stopOpacity="0.9" />
            <stop offset="1" stopColor="#c9a45c" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-50 330 C 150 160, 260 70, 330 -20" fill="none" stroke="url(#cta-gold)" strokeWidth="2" />
        <path d="M1250 120 C 1050 300, 960 420, 900 540" fill="none" stroke="url(#cta-gold)" strokeWidth="2" />
        <path d="M1250 220 C 1080 360, 1010 450, 980 540" fill="none" stroke="url(#cta-gold)" strokeWidth="1" />
      </svg>
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_50%_100%,rgb(42_74_125/0.55),transparent)]"
        aria-hidden="true"
      />

      <div className="reveal mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase">Hablemos de tu proyecto</p>
        <h2
          id="contacto-titulo"
          className="mt-5 font-display text-4xl leading-tight font-medium text-white sm:text-5xl lg:text-6xl"
        >
          Tu carga, <span className="font-bold text-gold-gradient">nuestro compromiso</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75">
          Cuéntanos qué necesitas importar o exportar y te acompañamos en cada paso: compra, producción,
          inspección y envío hasta tu puerta.
        </p>
        <WhatsAppLink variant="solid" className="mt-10" />

        <div className="mt-14 flex flex-col items-center gap-2">
          <span className="h-px w-10 bg-gold-500/70" aria-hidden="true" />
          <p className="font-display text-sm font-semibold tracking-[0.3em] text-gold-300 uppercase">{site.name}</p>
          <p className="text-sm text-white/70">{site.tagline}</p>
        </div>
      </div>
    </section>
  );
}
