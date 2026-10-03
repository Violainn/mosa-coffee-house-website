import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { Logo } from "./ui/Logo";
import { Ornament } from "./ui/SectionHeading";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.42-2.46V9.66a5.72 5.72 0 0 0-.82-.06A5.72 5.72 0 0 0 4.14 15.3 5.72 5.72 0 0 0 9.86 21a5.72 5.72 0 0 0 5.72-5.7V9.01a7.35 7.35 0 0 0 4.28 1.37V7.29a4.3 4.3 0 0 1-3.26-1.47Z" />
    </svg>
  );
}

const socialIcons = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  whatsapp: MessageCircle,
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-espresso text-cream/80">
      <div aria-hidden className="h-[3px] bg-rust" />

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-5">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm font-accent text-[0.98rem] leading-relaxed text-cream/75">
            {site.tagline}. Kedai kopi hangat bergaya vintage di Arcamanik, Bandung — untuk bersantai, berkumpul, dan bekerja.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" role="list" aria-label="Fasilitas">
            {site.facilities.map((f) => (
              <li key={f} className="rounded-full border border-cream/25 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cream/70">
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigasi */}
        <nav className="lg:col-span-2" aria-label="Navigasi footer">
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-sand">Navigasi</h3>
          <ul className="mt-5 space-y-3" role="list">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="font-accent text-[0.98rem] text-cream/80 transition-colors hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontak */}
        <div className="lg:col-span-3">
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-sand">Kunjungi Kami</h3>
          <ul className="mt-5 space-y-4 text-[0.95rem]" role="list">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
              <address className="font-accent not-italic leading-relaxed text-cream/80">
                {site.address.street}, {site.address.district}, {site.address.city}
              </address>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
              <span className="font-accent text-cream/80">{site.hours.label}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
              <a href={`tel:${site.phone.tel}`} className="font-accent text-cream/80 transition-colors hover:text-cream">
                {site.phone.display}
              </a>
            </li>
          </ul>
        </div>

        {/* Sosial */}
        <div className="lg:col-span-2">
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-sand">Ikuti Kami</h3>
          <ul className="mt-5 flex flex-wrap gap-2.5" role="list">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.id];
              const external = s.href.startsWith("http");
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="grid h-11 w-11 place-items-center rounded-full border border-cream/40 text-cream/85 transition-all hover:-translate-y-0.5 hover:border-cream hover:bg-cream hover:text-espresso"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 font-accent text-xs italic text-cream/55">Bagikan momen ngopimu dengan tagar #MosaCoffeeHouse</p>
        </div>
      </div>

      <div className="container-x">
        <Ornament className="mx-auto text-cream/40" />
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-3 py-7 text-center text-xs text-cream/60 sm:flex-row sm:text-left">
        <p>
          © {year} {site.name}. Hak cipta dilindungi.
        </p>
        <p className="font-accent italic">Dibuat dengan ♥ dan secangkir kopi di Bandung.</p>
      </div>
    </footer>
  );
}
