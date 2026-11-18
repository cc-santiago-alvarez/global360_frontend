import { Check } from "lucide-react";
import { trackingSteps } from "@/lib/tracking-steps";

type StepState = "done" | "current" | "pending";

// Ritmo de la animación: cada paso aparece STEP_DELAY ms después del anterior (9 pasos ≈ 2 s).
const STEP_DELAY = 200;

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
 * Línea de avance del envío: vertical en pantallas pequeñas y horizontal desde lg (9 columnas).
 * `current` es el índice del paso actual; con -1 se muestra como vista previa, sin pasos activos.
 * Si el paso actual es el último ("Entregado"), todos se muestran completados.
 */
export function TrackingSteps({ current }: { current: number }) {
  const lastIndex = trackingSteps.length - 1;
  const preview = current < 0;

  const stateOf = (index: number): StepState => {
    if (preview || index > current) return "pending";
    if (index < current || current === lastIndex) return "done";
    return "current";
  };

  return (
    <ol aria-label="Avance del envío" className="grid lg:grid-cols-9">
      {trackingSteps.map(({ key, label, icon: Icon }, index) => {
        const state = stateOf(index);
        const delay = index * STEP_DELAY;

        return (
          <li
            key={key}
            aria-current={index === current ? "step" : undefined}
            className="relative flex items-center gap-4 pb-6 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center"
          >
            {/* Tramo hacia el siguiente paso: va del centro de este círculo al del siguiente. */}
            {index < lastIndex && (
              <span
                aria-hidden="true"
                className="absolute top-11 bottom-0 left-5.5 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-navy-900/10 lg:top-5.5 lg:bottom-auto lg:left-1/2 lg:h-0.5 lg:w-full lg:translate-x-0 lg:-translate-y-1/2"
              >
                {index < current && (
                  <span
                    className="absolute inset-0 origin-top animate-fill-y bg-gold-500 lg:origin-left lg:animate-fill-x"
                    style={{ animationDelay: `${delay + 100}ms` }}
                  />
                )}
              </span>
            )}

            <span
              className={`relative z-10 grid size-11 shrink-0 animate-step-in place-items-center rounded-full ${circleStyles[state]}`}
              style={{ animationDelay: `${delay}ms` }}
            >
              {state === "current" && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full bg-gold-400/40 motion-reduce:hidden"
                />
              )}
              {state === "done" ? (
                <Check className="relative size-5" strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <Icon className="relative size-5" strokeWidth={1.75} aria-hidden="true" />
              )}
            </span>

            <p
              className={`animate-fade-up text-sm leading-snug lg:mt-3 lg:px-1 lg:text-xs ${state === "current" ? "font-semibold text-navy-900" : state === "pending" && !preview ? "text-slate-400" : "font-medium text-slate-700"}`}
              style={{ animationDelay: `${delay}ms` }}
            >
              {label}
              {!preview && <span className="sr-only"> ({statusText[state]})</span>}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
