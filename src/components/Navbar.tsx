import { useEffect, useState } from "react";
import { Clock, MapPin, Menu as MenuIcon, Phone, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/utils/cn";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { OpenStatusPill } from "./ui/OpenStatusPill";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("beranda");

  // Bayangan navbar saat halaman di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tandai tautan navigasi sesuai section yang sedang terlihat
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Kunci scroll body & tutup dengan Escape saat menu mobile terbuka
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      {/* Pita informasi atas (desktop) */}
      <div className="hidden bg-espresso text-cream/85 md:block">
        <div className="container-x flex h-9 items-center justify-between text-[0.72rem] tracking-wide">
          <p className="inline-flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-sand" aria-hidden />
            {site.hours.label}
          </p>
          <p className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-sand" aria-hidden />
            {site.address.street}, {site.address.district}, Bandung
          </p>
          <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2 transition-colors hover:text-cream">
            <Phone className="h-3.5 w-3.5 text-sand" aria-hidden />
            {site.phone.display}
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b border-espresso/15 bg-cream/92 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_6px_24px_-12px_rgba(61,35,20,0.35)]",
        )}
      >
        {/* Garis ganda tipis khas cetakan lama */}
        <div aria-hidden className="h-[3px] border-b border-espresso/20 bg-rust/90" />

        <nav className="container-x flex h-16 items-center justify-between md:h-[4.5rem]" aria-label="Navigasi utama">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex" role="list">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-block px-3.5 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.2em] transition-colors",
                      isActive ? "text-rust" : "text-espresso/80 hover:text-espresso",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left bg-rust transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Button href="#reservasi" size="sm">
              Reservasi
            </Button>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-sm border-2 border-espresso text-espresso transition-colors hover:bg-espresso hover:text-cream md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </nav>

        {/* Panel menu mobile */}
        <div
          id="mobile-menu"
          className={cn(
            "grid overflow-hidden border-t border-espresso/15 bg-cream transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0 max-h-[calc(100dvh-4.25rem)] overflow-y-auto">
            <ul className="container-x flex flex-col py-3" role="list">
              {navLinks.map((link, i) => (
                <li key={link.id} className={cn(i !== 0 && "border-t border-dashed border-espresso/20")}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className={cn(
                      "flex items-center justify-between py-3.5 font-display text-2xl transition-colors",
                      active === link.id ? "text-rust" : "text-espresso",
                    )}
                  >
                    {link.label}
                    <span className="font-body text-[0.65rem] tracking-[0.3em] text-espresso/40">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="container-x flex flex-col gap-4 border-t border-espresso/15 bg-parchment py-5">
              <OpenStatusPill tone="dark" showTime={false} />
              <div className="flex flex-wrap gap-3">
                <Button href="#reservasi" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  Reservasi Meja
                </Button>
                <Button href={`tel:${site.phone.tel}`} variant="outline" tabIndex={open ? 0 : -1}>
                  <Phone className="h-4 w-4" aria-hidden />
                  {site.phone.display}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
