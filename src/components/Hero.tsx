import { Accessibility, Baby, CalendarCheck, Car, Laptop, TreePine, ChevronDown } from "lucide-react";
import heroImg from "@/assets/images/hero.jpg";
import { site } from "@/data/site";
import { Button } from "./ui/Button";
import { OpenStatusPill } from "./ui/OpenStatusPill";
import { StampBadge } from "./ui/StampBadge";

const quickFacilities = [
  { icon: Laptop, label: "WFC Friendly" },
  { icon: TreePine, label: "Area Outdoor" },
  { icon: Accessibility, label: "Ramah Kursi Roda" },
  { icon: Car, label: "Parkir Gratis" },
  { icon: Baby, label: "Ramah Anak" },
  { icon: CalendarCheck, label: "Menerima Reservasi" },
];

export default function Hero() {
  return (
    <section id="beranda" className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-espresso md:min-h-[calc(100svh-4.5rem)]" aria-labelledby="hero-title">
      {/* Latar: foto suasana kafe */}
      <img
        src={heroImg}
        alt=""
        aria-hidden
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-espresso/95 via-espresso/75 to-espresso/25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-espresso/40" />

      {/* Bingkai tipis di dalam hero (kesan poster lama) */}
      <div aria-hidden className="pointer-events-none absolute inset-4 border border-cream/15 sm:inset-6" />

      <div className="container-x relative w-full py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl animate-fade-up">
          <OpenStatusPill />

          <p className="eyebrow eyebrow-left mt-7 text-sand">Kedai Kopi · Arcamanik, Bandung</p>

          <h1 id="hero-title" className="mt-4 font-display text-[2.6rem] font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            Seduh <em className="font-normal italic text-sand">Ketenangan</em>
            <br className="hidden sm:block" /> di Setiap Cangkir
          </h1>

          <p className="mt-6 max-w-xl font-accent text-base leading-relaxed text-cream/85 sm:text-lg">
            {site.description} Buka setiap hari mulai pukul 08.00 WIB — mampir dan temukan sudut favoritmu.
          </p>

          <div className="mt-9 flex flex-wrap gap-3.5">
            <Button href="#menu" size="lg">
              Lihat Menu
            </Button>
            <Button href="#reservasi" variant="outline-light" size="lg">
              Reservasi Meja
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3" aria-label="Fasilitas utama">
            {quickFacilities.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream/80">
                <Icon className="h-4 w-4 text-sand" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Stempel berputar (desktop) */}
      <StampBadge className="absolute bottom-24 right-10 hidden h-40 w-40 text-sand lg:block xl:right-16 xl:h-44 xl:w-44" />

      {/* Petunjuk scroll */}
      <a
        href="#keunggulan"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.35em] text-cream/60 transition-colors hover:text-cream md:flex"
        aria-label="Gulir ke bawah"
      >
        Gulir
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
      </a>

      {/* Tepi bergerigi ala perangko menuju section berikutnya */}
      <div aria-hidden className="scallop-top absolute inset-x-0 bottom-0" />
    </section>
  );
}
