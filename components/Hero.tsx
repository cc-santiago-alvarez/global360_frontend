import Image from "next/image";
import { Factory, Ship, Truck } from "lucide-react";
import { WhatsAppLink } from "@/components/WhatsAppLink";

const highlights = [
  { icon: Factory, label: "Compra y producción en China" },
  { icon: Ship, label: "Envíos aéreos y marítimos" },
  { icon: Truck, label: "Entrega puerta a puerta" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy-950">
      <Image
        src="/images/hero.jpg"
        alt="Buque portacontenedores navegando al atardecer"
        fill
        preload
        sizes="100vw"
        quality={80}
        className="-z-20 object-cover object-[70%_70%]"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950 via-navy-950/80 to-navy-950/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-navy-950/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-navy-950 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-up">
          <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase sm:tracking-[0.3em]">
            <span className="h-px w-10 bg-current" aria-hidden="true" />
            Soluciones logísticas globales
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.05] font-medium text-white sm:text-6xl lg:text-7xl">
            Conectamos tu negocio con <span className="block font-bold text-gold-gradient">el mundo</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Facilitamos el comercio internacional con soluciones integrales, seguras y eficientes, desde
            Colombia hacia el mundo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <WhatsAppLink />
            <a
              href="#servicios"
              className="text-sm font-semibold text-white/80 underline decoration-gold-400/60 underline-offset-8 transition hover:text-white hover:decoration-gold-300"
            >
              Ver servicios
            </a>
          </div>

          <ul className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-white/80">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-300">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
