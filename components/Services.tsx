import { GoldText, SectionHeading } from "@/components/SectionHeading";
import { services, type Service } from "@/lib/content";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="servicios-titulo"
          eyebrow="Nuestros servicios"
          title={
            <>
              Soluciones Integrales de <GoldText tone="light">Comercio Internacional</GoldText>
            </>
          }
          subtitle="Integrated Global Trade Solutions"
        />

        {/* flex-wrap para que la última fila (3 de 11) quede centrada como en la infografía */}
        <ul className="mt-16 flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <li key={service.title} className="reveal w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
              <ServiceCard {...service} number={index + 1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, description, descriptionEn, number }: Service & { number: number }) {
  return (
    <article className="group flex h-full flex-col items-center rounded-2xl border border-navy-900/5 bg-white px-6 pt-9 pb-7 text-center shadow-sm shadow-navy-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
      <div className="relative">
        <div className="grid size-24 place-items-center rounded-full bg-navy-900 ring-1 ring-gold-500/60 ring-offset-4 ring-offset-white transition duration-300 group-hover:ring-2 group-hover:ring-gold-400">
          <Icon className="size-10 text-gold-400" strokeWidth={1.4} aria-hidden="true" />
        </div>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-2.5 py-0.5 font-display text-xs font-bold text-navy-900 ring-4 ring-white">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-9 font-display text-lg leading-snug font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      <span className="my-4 h-px w-10 bg-gold-500/70" aria-hidden="true" />
      <p lang="en" className="mt-auto text-xs leading-relaxed text-slate-500 italic">
        {descriptionEn}
      </p>
    </article>
  );
}
