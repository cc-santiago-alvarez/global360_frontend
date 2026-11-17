import Form from "next/form";
import { ArrowRight, PackageSearch } from "lucide-react";

type TrackingFormProps = {
  label?: string;
  id?: string;
  /** En /rastreo se pasa false para que la página no salte arriba al consultar otra guía. */
  scroll?: boolean;
  className?: string;
};

/**
 * Formulario GET hacia /rastreo?guia=…: navega en el cliente con next/form
 * y sigue funcionando como formulario normal si el JavaScript no ha cargado.
 */
export function TrackingForm({
  label = "Número de guía",
  id = "guia",
  scroll = true,
  className = "",
}: TrackingFormProps) {
  return (
    <Form action="/rastreo" scroll={scroll} className={className}>
      <label htmlFor={id} className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
        {label}
      </label>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-5 backdrop-blur-sm transition focus-within:border-gold-400 focus-within:ring-2 focus-within:ring-gold-400/30">
        <PackageSearch className="size-5 shrink-0 text-gold-300" strokeWidth={1.5} aria-hidden="true" />
        <input
          id={id}
          name="guia"
          type="text"
          required
          maxLength={30}
          pattern="[A-Za-z0-9\- ]+"
          title="Usa solo letras, números o guiones."
          placeholder="Ej. 86754"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          enterKeyHint="search"
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
        >
          Rastrear
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>
    </Form>
  );
}
