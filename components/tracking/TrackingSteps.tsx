import { Check } from "lucide-react";
import { trackingSteps } from "@/lib/tracking-steps";

type StepState = "done" | "current" | "pending";

// Ritmo de la animación: cada paso aparece STEP_DELAY ms después del anterior.
const STEP_DELAY = 350;

const circleStyles: Record<StepState, string> = {
  done: "bg-gold-500 text-navy-950 shadow-md shadow-gold-500/30",
  current: "bg-navy-900 text-gold-300 ring-4 ring-gold-400/30",
  pending: "border border-navy-900/10 bg-white text-slate-400",
};

const statusText: Record<StepState, string> = {
  done: "completado",
  current: "en curso",
  pending: "pendiente",
};

/**
 * Línea de avance del envío: vertical en móvil y horizontal desde md.
 * `current` es el índice del paso actual; con -1 se muestra como vista previa, sin pasos activos.
 */
export function TrackingSteps({ current }: { current: number }) {
  return (
    <ol aria-label="Avance del envío" className="grid md:grid-cols-5">
      {trackingSteps.map(({ key, label, description, icon: Icon }, index) => {
        const state: StepState =
          current < 0 || index > current ? "pending" : index < current ? "done" : "current";
        const isLast = index === trackingSteps.length - 1;
        const delay = index * STEP_DELAY;

        return (
          <li
            key={key}
            aria-current={state === "current" ? "step" : undefined}
            className="relative flex gap-5 pb-10 last:pb-0 md:flex-col md:items-center md:gap-0 md:pb-0 md:text-center"
          >
            {/* Tramo hacia el siguiente paso: va del centro de este círculo al del siguiente. */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute top-12 bottom-0 left-6 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-navy-900/10 md:top-6 md:bottom-auto md:left-1/2 md:h-0.5 md:w-full md:translate-x-0 md:-translate-y-1/2"
              >
                {index < current && (
                  <span
                    className="absolute inset-0 origin-top animate-fill-y bg-gold-500 md:origin-left md:animate-fill-x"
                    style={{ animationDelay: `${delay + 150}ms` }}
                  />
                )}
              </span>
            )}

            <span
              className={`relative z-10 grid size-12 shrink-0 animate-step-in place-items-center rounded-full ${circleStyles[state]}`}
              style={{ animationDelay: `${delay}ms` }}
            >
              {state === "current" && (
                <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-gold-400/40" />
              )}
              {state === "done" ? (
                <Check className="relative size-5" strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <Icon className="relative size-5" strokeWidth={1.75} aria-hidden="true" />
              )}
            </span>

            <div className="animate-fade-up pt-2.5 md:mt-4 md:px-2 md:pt-0" style={{ animationDelay: `${delay}ms` }}>
              <p
                className={`font-display text-sm font-semibold tracking-wide uppercase ${state === "pending" && current >= 0 ? "text-slate-400" : "text-navy-900"}`}
              >
                {label}
                {current >= 0 && <span className="sr-only"> ({statusText[state]})</span>}
              </p>
              <p
                className={`mt-1.5 text-sm leading-relaxed ${state === "current" ? "text-slate-700" : state === "pending" && current >= 0 ? "text-slate-400" : "text-slate-500"}`}
              >
                {description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
