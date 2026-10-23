import { GoldText, SectionHeading } from "@/components/SectionHeading";
import { logisticsSolutions } from "@/lib/content";

export function LogisticsSolutions() {
  return (
    <section
      id="logistica"
      aria-labelledby="logistica-titulo"
      className="relative isolate overflow-hidden bg-navy-900 py-24 sm:py-32"
    >
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgb(42_74_125/0.55),transparent)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="logistica-titulo"
          tone="dark"
          eyebrow="Soluciones logísticas"
          title={
            <>
              Soluciones <GoldText>Logísticas Globales</GoldText>
            </>
          }
          subtitle="Integrated Global Trade Solutions"
        />

        <div className="relative mt-16">
          <div
            className="absolute top-12 right-[12.5%] left-[12.5%] hidden border-t border-dashed border-gold-500/40 lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {logisticsSolutions.map(({ icon: Icon, title, titleEn, description }) => (
              <li key={title} className="reveal flex flex-col items-center text-center">
                <div className="grid size-24 place-items-center rounded-full bg-navy-800 ring-1 ring-gold-500/60 ring-offset-4 ring-offset-navy-900">
                  <Icon className="size-10 text-gold-300" strokeWidth={1.4} aria-hidden="true" />
                </div>
                <h3 className="mt-7 font-display text-base font-bold tracking-wide text-white uppercase">{title}</h3>
                <p lang="en" className="mt-1 text-xs tracking-wider text-gold-300/80 uppercase">
                  {titleEn}
                </p>
                <p className="mt-3 max-w-64 text-sm leading-relaxed text-white/70">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
