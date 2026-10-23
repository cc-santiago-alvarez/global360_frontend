import type { ReactNode } from "react";
import { Clock, Plane, Warehouse, type LucideIcon } from "lucide-react";
import { GoldText, SectionHeading } from "@/components/SectionHeading";
import { ratesNote, shipping, warehousing, warehousingNote, type Feature } from "@/lib/content";

export function InternationalLogistics() {
  return (
    <section aria-labelledby="logistica-internacional-titulo" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="logistica-internacional-titulo"
          eyebrow="Casillero y envíos"
          title={
            <>
              Logística <GoldText tone="light">Internacional</GoldText>
            </>
          }
          subtitle="International Logistics"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Panel
            number={1}
            icon={Warehouse}
            title="Casillero Internacional & Consolidación"
            titleEn="International warehousing & consolidation"
            items={warehousing}
            footer={
              <Note icon={warehousingNote.icon} title={warehousingNote.title}>
                <p>{warehousingNote.description}</p>
                <p lang="en" className="mt-1 text-slate-500 italic">
                  {warehousingNote.descriptionEn}
                </p>
              </Note>
            }
          />
          <Panel
            number={2}
            icon={Plane}
            title="Envíos Internacionales"
            titleEn="International shipping"
            items={shipping}
            footer={
              <Note icon={Clock} title="Tiempos y tarifas">
                <p>{ratesNote.description}</p>
                <p lang="en" className="mt-1 text-slate-500 italic">
                  {ratesNote.descriptionEn}
                </p>
              </Note>
            }
          />
        </div>
      </div>
    </section>
  );
}

type PanelProps = {
  number: number;
  icon: LucideIcon;
  title: string;
  titleEn: string;
  items: Feature[];
  footer: ReactNode;
};

function Panel({ number, icon: Icon, title, titleEn, items, footer }: PanelProps) {
  return (
    <article className="reveal flex flex-col overflow-hidden rounded-3xl border border-navy-900/10 bg-white shadow-sm shadow-navy-900/5">
      <header className="flex items-center gap-4 bg-navy-900 px-6 py-5 sm:px-8">
        <span className="grid size-14 shrink-0 place-items-center rounded-full ring-1 ring-gold-500/70">
          <Icon className="size-7 text-gold-300" strokeWidth={1.4} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-lg leading-tight font-bold text-white uppercase sm:text-xl">
            <span className="text-gold-300">{number}.</span> {title}
          </h3>
          <p lang="en" className="mt-1 text-xs tracking-wider text-white/60 uppercase">
            {titleEn}
          </p>
        </div>
      </header>

      <ul className="flex-1 divide-y divide-navy-900/5 px-6 sm:px-8">
        {items.map(({ icon: ItemIcon, title: itemTitle, titleEn: itemTitleEn, description, descriptionEn }) => (
          <li key={itemTitle} className="flex gap-5 py-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-300">
              <ItemIcon className="size-6" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h4 className="font-display text-base font-bold tracking-wide text-navy-900 uppercase">
                {itemTitle}{" "}
                <span lang="en" className="ml-1 text-xs font-medium tracking-wider text-gold-700">
                  {itemTitleEn}
                </span>
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{description}</p>
              {descriptionEn && (
                <p lang="en" className="mt-1 text-xs leading-relaxed text-slate-500 italic">
                  {descriptionEn}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="px-6 pb-6 sm:px-8 sm:pb-8">{footer}</div>
    </article>
  );
}

function Note({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-gold-500/30 bg-ivory p-5">
      <Icon className="mt-0.5 size-6 shrink-0 text-gold-700" strokeWidth={1.5} aria-hidden="true" />
      <div className="text-sm leading-relaxed text-slate-700">
        <p className="font-display font-bold tracking-wide text-navy-900 uppercase">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
