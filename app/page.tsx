import { Categories } from "@/components/Categories";
import { Coverage } from "@/components/Coverage";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InternationalLogistics } from "@/components/InternationalLogistics";
import { LogisticsSolutions } from "@/components/LogisticsSolutions";
import { Services } from "@/components/Services";
import { FloatingWhatsApp } from "@/components/WhatsAppLink";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <LogisticsSolutions />
        <InternationalLogistics />
        <Coverage />
        <Categories />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
