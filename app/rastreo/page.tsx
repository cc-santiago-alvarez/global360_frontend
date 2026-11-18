import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { GoldText, SectionHeading } from "@/components/SectionHeading";
import { TrackingForm } from "@/components/tracking/TrackingForm";
import { TrackingResult } from "@/components/tracking/TrackingResult";
import { TrackingSkeleton } from "@/components/tracking/TrackingSkeleton";
import { TrackingSteps } from "@/components/tracking/TrackingSteps";
import { FloatingWhatsApp } from "@/components/WhatsAppLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Rastrear envío | ${site.name}`,
  description:
    "Consulta con tu número de guía en qué etapa va tu envío: desde la recepción en bodega de origen, la exportación y el tránsito internacional hasta la aduana y la entrega.",
  alternates: { canonical: "/rastreo" },
};

type SearchParams = PageProps<"/rastreo">["searchParams"];

// Todo lo que está fuera de <Suspense> sale en el HTML estático; solo el resultado depende de ?guia=.
export default function RastreoPage({ searchParams }: PageProps<"/rastreo">) {
  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="rastreo-titulo" className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-16 sm:pb-20">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgb(42_74_125/0.55),transparent)]"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-2xl animate-fade-up px-4 text-center sm:px-6">
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-gold-300 uppercase">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              Rastreo de envíos
            </p>
            <h1
              id="rastreo-titulo"
              className="mt-5 font-display text-4xl leading-tight font-medium text-white sm:text-5xl lg:text-6xl"
            >
              Rastrea tu <span className="font-bold text-gold-gradient">envío</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              Escribe tu número de guía y mira en qué etapa va tu paquete.
            </p>
            <TrackingForm scroll={false} className="mx-auto mt-10 max-w-lg text-left" />
          </div>
        </section>

        <section aria-label="Resultado del rastreo" className="bg-ivory py-16 sm:py-24">
          <div aria-live="polite" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<TrackingSkeleton />}>
              <TrackingLookup searchParams={searchParams} />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

async function TrackingLookup({ searchParams }: { searchParams: SearchParams }) {
  const { guia } = await searchParams;
  const value = (Array.isArray(guia) ? guia[0] : guia)?.trim() ?? "";

  if (!value) return <TrackingPreview />;

  // La key crea un límite nuevo en cada búsqueda: se ve el marcador de carga y la animación arranca de cero.
  return (
    <Suspense key={value} fallback={<TrackingSkeleton />}>
      <TrackingResult guia={value} />
    </Suspense>
  );
}

function TrackingPreview() {
  return (
    <>
      <SectionHeading
        eyebrow="Cómo funciona"
        title={
          <>
            Así verás el avance de tu <GoldText tone="light">envío</GoldText>
          </>
        }
      />
      <div className="mt-14 rounded-3xl border border-navy-900/5 bg-white p-6 shadow-sm shadow-navy-900/5 sm:p-10">
        <TrackingSteps current={-1} />
      </div>
    </>
  );
}
