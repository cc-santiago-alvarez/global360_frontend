import { useId } from "react";

type LogoMarkProps = {
  className?: string;
  /** Color del contorno que separa letras y órbita del globo; debe coincidir con el fondo. */
  knockout?: string;
};

// Emblema SEG: globo con meridianos, órbita inclinada y punto. Redibujo vectorial del logo original.
export function LogoMark({ className, knockout = "#0b1b33" }: LogoMarkProps) {
  const gradientId = useId();
  const gold = `url(#${gradientId})`;
  const orbitFront = "M2 68 A62 15 0 0 0 126 68 A62 15 0 0 0 117.7 60.5";

  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3dca6" />
          <stop offset="0.5" stopColor="#d6b371" />
          <stop offset="1" stopColor="#a8792f" />
        </linearGradient>
      </defs>

      <g fill="none" stroke={gold} strokeLinecap="round">
        <circle cx="64" cy="64" r="40" strokeWidth="4.5" />
        <ellipse cx="64" cy="64" rx="19" ry="40" strokeWidth="2.5" />
        <path d="M64 24v80M29.4 44h69.2M29.4 84h69.2" strokeWidth="2.5" />
      </g>

      <text
        x="64"
        y="76.5"
        textAnchor="middle"
        textLength="80"
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, Arial, sans-serif" }}
        fontWeight="800"
        fontSize="35"
        fill={gold}
        stroke={knockout}
        strokeWidth="5"
        paintOrder="stroke"
      >
        SEG
      </text>

      <g transform="rotate(-20 64 68)" fill="none" strokeLinecap="round">
        <path d={orbitFront} stroke={knockout} strokeWidth="8" />
        <path d={orbitFront} stroke={gold} strokeWidth="3.5" />
        <circle cx="117.7" cy="60.5" r="4.5" fill={gold} />
      </g>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
  knockout?: string;
};

export function Logo({ className = "", size = "md", knockout }: LogoProps) {
  const large = size === "lg";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark knockout={knockout} className={large ? "size-16" : "size-12"} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display tracking-tight text-gold-gradient ${large ? "text-2xl" : "text-xl"}`}
        >
          <span className="font-extrabold">SE</span>
          <span className="font-semibold">Global 360</span>
        </span>
        <span
          className={`mt-1 flex items-center gap-1.5 text-white/70 ${large ? "text-xs" : "text-[0.625rem]"}`}
        >
          <span className="h-px w-3 bg-gold-500/70" aria-hidden="true" />
          Tu empresa, sin fronteras.
          <span className="h-px w-3 bg-gold-500/70" aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}
