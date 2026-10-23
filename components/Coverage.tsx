import { Globe, PlaneLanding, PlaneTakeoff, TreePalm, type LucideIcon } from "lucide-react";
import {
  AR,
  BR,
  CA,
  CL,
  CN,
  CO,
  CR,
  DO,
  EC,
  ES,
  FR,
  GT,
  HN,
  IT,
  MX,
  PA,
  PE,
  PR,
  PY,
  SV,
  TR,
  US,
  UY,
  VE,
} from "country-flag-icons/react/3x2";
import { GoldText, SectionHeading } from "@/components/SectionHeading";
import { RouteLines } from "@/components/RouteLines";
import { exportCountries, importCountries, type Country } from "@/lib/content";

const flags: Record<string, typeof CO> = {
  AR, BR, CA, CL, CN, CO, CR, DO, EC, ES, FR, GT, HN, IT, MX, PA, PE, PR, PY, SV, TR, US, UY, VE,
};

export function Coverage() {
  return (
    <section
      id="cobertura"
      aria-labelledby="cobertura-titulo"
      className="relative isolate overflow-hidden bg-navy-950 py-24 sm:py-32"
    >
      {/* La máscara deja libre la zona del título para que las rutas no crucen el texto. */}
      <RouteLines className="absolute inset-0 -z-10 size-full opacity-60 [mask-image:radial-gradient(ellipse_42%_24%_at_50%_16%,transparent_65%,black_100%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="cobertura-titulo"
          tone="dark"
          eyebrow="Cobertura"
          title={
            <>
              Países de <GoldText>exportación e importación</GoldText>
            </>
          }
          subtitle="Export & import countries"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-5">
          <CountryPanel
            className="lg:col-span-2"
            icon={PlaneTakeoff}
            title="Países de exportación"
            titleEn="Export countries"
            countries={exportCountries}
            columns="grid-cols-2"
          />
          <CountryPanel
            className="lg:col-span-3"
            icon={PlaneLanding}
            title="Países de importación"
            titleEn="Import countries"
            countries={importCountries}
            columns="grid-cols-2 sm:grid-cols-3"
          />
        </div>

        <div
          role="note"
          className="reveal mt-6 flex flex-col gap-4 rounded-2xl border border-gold-500/30 bg-navy-900/80 p-6 backdrop-blur-sm sm:flex-row sm:items-center"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full ring-1 ring-gold-500/60">
            <Globe className="size-6 text-gold-300" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div className="text-sm leading-relaxed">
            <p className="text-white">
              <strong className="font-display tracking-wide text-gold-300 uppercase">Nota:</strong> podemos
              exportar e importar entre los países mencionados y enviamos a todos los países del continente
              americano.
            </p>
            <p lang="en" className="mt-1 text-white/60 italic">
              We can export and import between the listed countries and ship to all countries in the Americas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type CountryPanelProps = {
  className?: string;
  icon: LucideIcon;
  title: string;
  titleEn: string;
  countries: Country[];
  columns: string;
};

function CountryPanel({ className = "", icon: Icon, title, titleEn, countries, columns }: CountryPanelProps) {
  return (
    <article
      className={`reveal rounded-3xl border border-white/10 bg-navy-900/80 p-6 backdrop-blur-sm sm:p-8 ${className}`}
    >
      <header className="flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-950">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase">{title}</h3>
          <p lang="en" className="text-xs tracking-wider text-white/60 uppercase">
            {titleEn}
          </p>
        </div>
      </header>

      <ul className={`mt-6 grid gap-x-4 gap-y-3 ${columns}`}>
        {countries.map(({ name, code }) => {
          const Flag = code ? flags[code] : null;
          return (
            <li key={name} className="flex items-center gap-3 text-sm text-white/85">
              {Flag ? (
                <Flag className="h-4 w-6 shrink-0 rounded-[3px] ring-1 ring-white/20" aria-hidden="true" />
              ) : (
                <span className="grid h-4 w-6 shrink-0 place-items-center rounded-[3px] bg-gold-500/20 ring-1 ring-gold-500/40">
                  <TreePalm className="size-3 text-gold-300" aria-hidden="true" />
                </span>
              )}
              {name}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
