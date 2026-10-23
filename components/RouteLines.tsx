// Decoración: rutas doradas desde Colombia hacia los mercados, sobre una retícula de puntos.
const origin = { x: 345, y: 355 };
const destinations = [
  { x: 945, y: 215 }, // China
  { x: 250, y: 205 }, // Estados Unidos
  { x: 575, y: 190 }, // España / Europa
  { x: 655, y: 210 }, // Turquía
  { x: 430, y: 430 }, // Brasil
  { x: 375, y: 520 }, // Argentina
  { x: 230, y: 275 }, // México
];

export function RouteLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="route-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="#c9a45c" />
        </pattern>
        <radialGradient id="route-fade">
          <stop offset="0.2" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="route-mask">
          <rect width="1200" height="600" fill="url(#route-fade)" />
        </mask>
      </defs>

      <rect width="1200" height="600" fill="url(#route-dots)" mask="url(#route-mask)" opacity="0.35" />

      <g fill="none" stroke="#c9a45c" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.55">
        {destinations.map(({ x, y }) => {
          const cx = (origin.x + x) / 2;
          const cy = Math.min(origin.y, y) - Math.abs(x - origin.x) * 0.25 - 40;
          return <path key={`${x}-${y}`} d={`M${origin.x} ${origin.y} Q${cx} ${cy} ${x} ${y}`} />;
        })}
      </g>

      <g fill="#e8cb8e">
        {destinations.map(({ x, y }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
        ))}
        <circle cx={origin.x} cy={origin.y} r="7" />
        <circle cx={origin.x} cy={origin.y} r="14" fill="none" stroke="#e8cb8e" strokeOpacity="0.5" />
      </g>
    </svg>
  );
}
