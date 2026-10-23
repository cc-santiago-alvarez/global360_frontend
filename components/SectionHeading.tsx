import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  tone?: "light" | "dark";
  id?: string;
};

export function SectionHeading({ eyebrow, title, subtitle, tone = "light", id }: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <header className="reveal mx-auto max-w-3xl text-center">
      <p
        className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${dark ? "text-gold-300" : "text-gold-700"}`}
      >
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-display text-3xl font-medium leading-tight text-balance sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-navy-900"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          lang="en"
          className={`mt-4 text-sm uppercase tracking-[0.2em] ${dark ? "text-white/60" : "text-slate-500"}`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}

/** Palabra destacada en dorado; en fondos claros usa la variante oscura para mantener contraste. */
export function GoldText({ children, tone = "dark" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span className={`font-bold ${tone === "light" ? "text-gold-gradient-deep" : "text-gold-gradient"}`}>
      {children}
    </span>
  );
}
