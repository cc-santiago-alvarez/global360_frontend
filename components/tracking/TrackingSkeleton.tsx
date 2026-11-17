/** Marcador de carga con la misma forma que la tarjeta de resultado. */
export function TrackingSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse rounded-3xl border border-navy-900/5 bg-white p-6 shadow-sm shadow-navy-900/5 sm:p-10"
    >
      <span className="sr-only">Consultando el estado de tu envío…</span>
      <div className="flex flex-col gap-6 border-b border-navy-900/10 pb-8 sm:flex-row sm:justify-between">
        <div className="space-y-3">
          <div className="h-3 w-20 rounded-full bg-navy-900/10" />
          <div className="h-9 w-44 rounded-lg bg-navy-900/10" />
        </div>
        <div className="space-y-3">
          <div className="h-3 w-24 rounded-full bg-navy-900/10" />
          <div className="h-8 w-36 rounded-full bg-navy-900/10" />
        </div>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center gap-5 md:flex-col md:gap-4">
            <div className="size-12 shrink-0 rounded-full bg-navy-900/10" />
            <div className="h-3 w-24 rounded-full bg-navy-900/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
