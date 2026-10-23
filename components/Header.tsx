"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { navLinks } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);

  // Resalta en el menú la sección visible.
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Fondo siempre sólido: no depende de JS, así el texto es legible también sobre las secciones claras.
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="SEGlobal 360, ir al inicio" className="shrink-0">
          <Logo knockout="#061024" />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={active === href ? "true" : undefined}
                  className="group relative py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white aria-[current]:text-white"
                >
                  {label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gold-400 transition-transform duration-300 group-hover:scale-x-100 ${active === href ? "scale-x-100" : "scale-x-0"}`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid size-11 place-items-center rounded-full text-white transition hover:bg-white/10 md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-white/10 px-4 pt-2 pb-6 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-white/5 py-4 text-sm font-semibold uppercase tracking-[0.2em] ${active === href ? "text-gold-300" : "text-white/80"}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <WhatsAppLink className="mt-6 w-full justify-center" />
        </nav>
      )}
    </header>
  );
}
