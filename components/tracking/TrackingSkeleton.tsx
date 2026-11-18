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
      <div className="mt-8 h-24 rounded-2xl bg-navy-900/5" />
      <div className="mt-10 grid gap-6 lg:grid-cols-9">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} className="flex items-center gap-4 lg:flex-col lg:gap-3">
            <div className="size-11 shrink-0 rounded-full bg-navy-900/10" />
            <div className="h-3 w-24 rounded-full bg-navy-900/10 lg:w-14" />
          </div>
        ))}
      </div>
    </div>
  );
}
