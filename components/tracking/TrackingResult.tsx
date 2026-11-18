import type { ReactNode } from "react";
import { CloudOff, Info, PackageSearch, SearchX, type LucideIcon } from "lucide-react";
import { TrackingSteps } from "@/components/tracking/TrackingSteps";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { findShipment, type ShipmentLookup } from "@/lib/tracking";
import { trackingSteps } from "@/lib/tracking-steps";
import { site } from "@/lib/site";

const guiaMessage = (guia: string) => `Hola ${site.name}, quiero información sobre mi guía ${guia}.`;

export async function TrackingResult({ guia }: { guia: string }) {
  let result: ShipmentLookup;
  try {
    result = await findShipment(guia);
  } catch (error) {
    // Los fallos de la hoja ya dejan su motivo en el log desde lib/tracking.ts; esto cubre cualquier otro error.
    console.error("[rastreo] Error al consultar la guía:", error);
    return (
      <Notice icon={CloudOff} title="No pudimos consultar tu envío" message={guiaMessage(guia)}>
        El sistema de rastreo no está disponible en este momento. Intenta de nuevo en unos minutos o escríbenos y
        te contamos cómo va tu paquete.
      </Notice>
    );
  }

  if (result.status === "invalid") {
    return (
      <Notice icon={SearchX} title="Revisa el número de guía">
        El número de guía solo puede tener letras, números y guiones (máximo 30 caracteres).
      </Notice>
    );
  }

  if (result.status === "not-found") {
    return (
      <Notice icon={SearchX} title={`No encontramos la guía ${result.guia}`} message={guiaMessage(result.guia)}>
        Verifica que el número esté bien escrito. Si acabas de hacer tu envío, puede tardar un poco en aparecer.
      </Notice>
    );
  }

  const step = trackingSteps[result.stepIndex];

  // La guía existe pero su estado no es uno de los pasos conocidos (por ejemplo, mal escrito) o está vacío.
  if (!step) {
    return (
      <Notice
        icon={PackageSearch}
        title={`Guía ${result.guia}`}
        message={guiaMessage(result.guia)}
        detail={result.descripcion}
      >
        {result.estado ? (
          <>
            Estado actual: <strong className="font-semibold text-navy-900">{result.estado}</strong>. Escríbenos si
            quieres más detalles sobre tu envío.
          </>
        ) : (
          "Tu guía está registrada. Pronto verás aquí el avance de tu envío."
        )}
      </Notice>
    );
  }

  return (
    <article
      aria-labelledby="resultado-guia"
      className="rounded-3xl border border-navy-900/5 bg-white p-6 shadow-sm shadow-navy-900/5 sm:p-10"
    >
      <header className="flex flex-col gap-6 border-b border-navy-900/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-gold-700 uppercase">Guía N.º</p>
          <h2
            id="resultado-guia"
            className="mt-2 font-display text-3xl font-semibold break-all text-navy-900 sm:text-4xl"
          >
            {result.guia}
          </h2>
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">Estado actual</p>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-4 py-1.5 text-sm font-semibold text-gold-700 ring-1 ring-gold-500/30">
            <span className="size-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
            {step.label}
          </p>
        </div>
      </header>

      {result.descripcion && <ShipmentDetail text={result.descripcion} className="mt-8" />}

      <div className="mt-10">
        <TrackingSteps current={result.stepIndex} />
      </div>

      <footer className="mt-10 flex flex-col items-start gap-4 border-t border-navy-900/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">¿Tienes dudas sobre tu envío? Te ayudamos.</p>
        <WhatsAppLink variant="solid" label="Escríbenos por WhatsApp" message={guiaMessage(result.guia)} />
      </footer>
    </article>
  );
}

/** Recuadro con la nota de la columna "Descripción" de la hoja; respeta los saltos de línea. */
function ShipmentDetail({ text, className = "" }: { text: string; className?: string }) {
  return (
    <section
      aria-label="Detalle de tu envío"
      className={`flex gap-4 rounded-2xl border border-gold-500/20 border-l-4 border-l-gold-500 bg-ivory p-5 text-left sm:p-6 ${className}`}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-gold-700" strokeWidth={1.75} aria-hidden="true" />
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-gold-700 uppercase">Detalle de tu envío</p>
        <p className="mt-2 text-base leading-relaxed whitespace-pre-line text-navy-900">{text}</p>
      </div>
    </section>
  );
}

type NoticeProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  /** Mensaje prellenado de WhatsApp; sin él no se muestra el botón. */
  message?: string;
  /** Nota de la hoja para mostrar en el recuadro de detalle. */
  detail?: string;
};

function Notice({ icon: Icon, title, children, message, detail }: NoticeProps) {
  return (
    <article className="mx-auto max-w-2xl animate-fade-up rounded-3xl border border-navy-900/5 bg-white p-8 text-center shadow-sm shadow-navy-900/5 sm:p-12">
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-gold-500/10 text-gold-700 ring-1 ring-gold-500/40">
        <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-display text-2xl font-semibold break-words text-navy-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-600">{children}</p>
      {detail && <ShipmentDetail text={detail} className="mt-8" />}
      {message && <WhatsAppLink variant="solid" label="Escríbenos por WhatsApp" message={message} className="mt-8" />}
    </article>
  );
}
