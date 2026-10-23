import { CurrentYear } from "@/components/CurrentYear";
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from "@/components/icons/Brand";
import { Logo } from "@/components/Logo";
import { navLinks, site, whatsappUrl } from "@/lib/site";

const socials = [
  { href: whatsappUrl(), label: "WhatsApp", icon: WhatsAppIcon },
  { href: site.instagram, label: "Instagram", icon: InstagramIcon },
  { href: site.linkedin, label: "LinkedIn", icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-gold-500/20 bg-navy-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <a href="#inicio" aria-label="SEGlobal 360, ir al inicio" className="self-start lg:self-auto">
          <Logo knockout="#061024" />
        </a>

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase transition hover:text-gold-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-3">
          {socials.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-gold-400 hover:text-gold-300"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © <CurrentYear /> {site.name}. Todos los derechos reservados.
          </p>
          <p>{site.claim} · Colombia</p>
        </div>
      </div>
    </footer>
  );
}
