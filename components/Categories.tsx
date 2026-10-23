import { CircleAlert } from "lucide-react";
import { GoldText, SectionHeading } from "@/components/SectionHeading";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { categories } from "@/lib/content";

export function Categories() {
  return (
    <section id="categorias" aria-labelledby="categorias-titulo" className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="categorias-titulo"
          eyebrow="Categorías"
          title={
            <>
              Especializados en productos de <GoldText tone="light">las siguientes categorías</GoldText>
            </>
          }
          subtitle="Product categories we specialize in"
        />

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="reveal flex items-center gap-3 rounded-xl border border-navy-900/5 bg-white px-3 py-3 shadow-sm shadow-navy-900/5 transition hover:border-gold-500/50 sm:px-4"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy-900 text-gold-300 sm:size-10">
                <Icon className="size-4.5 sm:size-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="text-xs leading-snug font-medium text-navy-900 sm:text-sm">{label}</span>
            </li>
          ))}
        </ul>

        <div
          role="note"
          className="reveal mt-10 flex flex-col gap-5 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center"
        >
          <CircleAlert className="size-10 shrink-0 text-gold-700" strokeWidth={1.5} aria-hidden="true" />
          <p className="text-sm leading-relaxed text-slate-700">
            <strong className="font-display tracking-wide text-navy-900 uppercase">
              Los productos que no se exportan dependen del país de origen y del país destino.
            </strong>{" "}
            Para mayor información realiza tu consulta.
          </p>
          <WhatsAppLink
            variant="solid"
            label="Consultar mi producto"
            message="Hola SEGlobal 360, quiero consultar si es posible importar/exportar este producto: "
            className="shrink-0 lg:ml-auto"
          />
        </div>
      </div>
    </section>
  );
}
