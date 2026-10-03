import { useDeferredValue, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Flame, Plus, Search, Snowflake, X } from "lucide-react";
import foodImg from "@/assets/images/food.jpg";
import {
  formatPrice,
  groupItems,
  hasTemperature,
  menuCategories,
  totalMenuItems,
  type MenuCategory,
  type MenuItem,
} from "@/data/menu";
import { cn } from "@/utils/cn";
import { SectionHeading } from "./ui/SectionHeading";
import { Frame } from "./ui/Frame";
import { Button } from "./ui/Button";
import { StampBadge } from "./ui/StampBadge";

/* ------------------------------------------------------------------ */
/*  Util                                                               */
/* ------------------------------------------------------------------ */

function matches(item: MenuItem, q: string): boolean {
  const haystack = [item.name, item.note, item.group, ...(item.options?.map((o) => o.name) ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

const countItems = (items: MenuItem[]) => items.reduce((n, i) => n + (i.options ? i.options.length : 1), 0);

/* ------------------------------------------------------------------ */
/*  Sub-komponen                                                       */
/* ------------------------------------------------------------------ */

const priceCell = "w-[4.9rem] shrink-0 text-right font-body text-[0.85rem] font-semibold tabular-nums text-espresso sm:w-[5.5rem] sm:text-sm";

function Dash() {
  return (
    <span className="text-espresso/25" aria-label="tidak tersedia">
      —
    </span>
  );
}

function PriceCells({ hot, cold, price, temps }: { hot?: number; cold?: number; price?: number; temps: boolean }) {
  if (!temps) {
    return <span className={cn(priceCell, "w-auto sm:w-auto")}>{price !== undefined ? formatPrice(price) : <Dash />}</span>;
  }
  return (
    <span className="flex shrink-0 items-baseline">
      <span className={priceCell}>{hot !== undefined ? formatPrice(hot) : <Dash />}</span>
      <span className={priceCell}>{cold !== undefined ? formatPrice(cold) : <Dash />}</span>
    </span>
  );
}

function SpicyTag() {
  return (
    <span className="ml-2 inline-flex translate-y-[-1px] items-center gap-0.5 rounded-full border border-rust/60 bg-rust/10 px-1.5 py-px align-middle text-[0.58rem] font-bold uppercase tracking-[0.15em] text-rust">
      <Flame className="h-2.5 w-2.5" aria-hidden />
      Spicy
    </span>
  );
}

function ColumnHeader() {
  return (
    <div className="flex items-center justify-end border-b border-espresso/25 pb-2 pt-6 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-mocha/75">
      <span className="mr-auto">Menu</span>
      <span className="inline-flex w-[4.9rem] items-center justify-end gap-1 sm:w-[5.5rem]">
        <Flame className="h-3 w-3 text-rust" aria-hidden /> Hot
      </span>
      <span className="inline-flex w-[4.9rem] items-center justify-end gap-1 sm:w-[5.5rem]">
        <Snowflake className="h-3 w-3 text-sage" aria-hidden /> Cold
      </span>
    </div>
  );
}

function ItemRow({ item, temps }: { item: MenuItem; temps: boolean }) {
  return (
    <li className="border-b border-dashed border-espresso/15 py-2.5">
      <div className="flex items-baseline">
        <div className="min-w-0">
          <span className="font-accent text-[1.02rem] leading-snug text-espresso">{item.name}</span>
          {item.spicy && <SpicyTag />}
        </div>
        {!item.options && (
          <>
            <span aria-hidden className="leader" />
            <PriceCells hot={item.hot} cold={item.cold} price={item.price} temps={temps} />
          </>
        )}
      </div>
      {item.note && <p className="mt-0.5 font-accent text-[0.82rem] italic leading-snug text-mocha/75">{item.note}</p>}
      {item.options && (
        <ul className="ml-1.5 mt-2 space-y-1.5 border-l border-dashed border-espresso/30 pl-4" role="list">
          {item.options.map((o) => (
            <li key={o.name} className="flex items-baseline">
              <span className="min-w-0 font-accent text-[0.95rem] text-mocha">{o.name}</span>
              <span aria-hidden className="leader" />
              <PriceCells cold={temps ? o.price : undefined} price={o.price} temps={temps} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function ItemList({ items, temps, twoColumns }: { items: MenuItem[]; temps: boolean; twoColumns: boolean }) {
  return (
    <>
      {groupItems(items).map(({ group, items: groupedItems }) => (
        <div key={group ?? "__default"}>
          {group && (
            <h4 className="mb-1 mt-7 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-rust">
              <span aria-hidden className="h-px w-5 bg-rust/60" />
              {group}
            </h4>
          )}
          <ul className={cn(twoColumns && "md:grid md:grid-cols-2 md:gap-x-10")} role="list">
            {groupedItems.map((item) => (
              <ItemRow key={item.name} item={item} temps={temps} />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

function AdditionalBox({ additional }: { additional: NonNullable<MenuCategory["additional"]> }) {
  return (
    <div className="mt-10 border border-dashed border-espresso/50 bg-cream/70 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-espresso bg-cream text-espresso">
          <Plus className="h-3.5 w-3.5" aria-hidden />
        </span>
        <h4 className="font-display text-lg font-semibold text-espresso">{additional.title}</h4>
        <span className="font-accent text-sm italic text-mocha/75">— {additional.description}</span>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2.5" role="list">
        {additional.items.map((a) => (
          <li key={a.name} className="inline-flex items-baseline gap-2 rounded-full border border-espresso/40 bg-cream px-3.5 py-1.5 text-sm">
            <span className="font-accent text-espresso">{a.name}</span>
            <span className="font-semibold tabular-nums text-rust">+{formatPrice(a.price)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section utama                                                      */
/* ------------------------------------------------------------------ */

export default function MenuSection() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalized = deferredQuery.trim().toLowerCase();
  const isSearching = normalized.length > 0;

  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const active = menuCategories.find((c) => c.id === activeId) ?? menuCategories[0];
  const activeTemps = hasTemperature(active.items);

  const results = useMemo(() => {
    if (!isSearching) return [];
    return menuCategories
      .map((category) => ({ category, items: category.items.filter((i) => matches(i, normalized)) }))
      .filter((r) => r.items.length > 0);
  }, [normalized, isSearching]);
  const resultCount = results.reduce((n, r) => n + countItems(r.items), 0);

  const scrollTabIntoView = (index: number) => {
    const bar = tabListRef.current;
    const tab = tabRefs.current[index];
    if (!bar || !tab) return;
    const left = tab.offsetLeft - (bar.clientWidth - tab.clientWidth) / 2;
    bar.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  };

  const scrollPanelToTop = () => {
    requestAnimationFrame(() => {
      const panel = panelRef.current;
      const bar = tabBarRef.current;
      if (!panel || !bar) return;
      const offset = bar.getBoundingClientRect().bottom + 12;
      const top = panel.getBoundingClientRect().top;
      if (top < offset - 12) {
        window.scrollTo({ top: window.scrollY + top - offset, behavior: "smooth" });
      }
    });
  };

  const selectCategory = (index: number) => {
    setActiveId(menuCategories[index].id);
    setQuery("");
    scrollTabIntoView(index);
    scrollPanelToTop();
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const n = menuCategories.length;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % n;
    else if (e.key === "ArrowLeft") next = (index - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    selectCategory(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="menu" className="relative bg-parchment py-20 md:py-28" aria-labelledby="menu-title">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-x relative">
        <SectionHeading
          id="menu-title"
          eyebrow="Menu Kami"
          title={
            <>
              Dari Cangkir <em className="font-normal italic text-rust">hingga</em> Piring
            </>
          }
          description="Kopi racikan barista, minuman segar, sarapan sepanjang hari, hidangan utama, hingga dessert. Pilih kategori atau cari langsung menu favoritmu."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Kolom kiri: foto, legenda, statistik ---------- */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="relative">
                <Frame>
                  <img
                    src={foodImg}
                    alt="Pisang goreng, nasi goreng, dan es kopi susu di meja kayu Mosa Coffee House"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover sepia-[0.12] lg:aspect-square"
                  />
                </Frame>
                <StampBadge
                  className="absolute -right-4 -top-5 h-24 w-24 text-rust sm:h-28 sm:w-28"
                  text="MENU MOSA • KOPI & MAKANAN • SETIAP HARI • "
                />
              </div>

              <dl className="grid grid-cols-3 divide-x divide-espresso/20 border-y border-espresso/25 py-4 text-center">
                <div>
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-mocha/70">Kategori</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-espresso">{menuCategories.length}</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-mocha/70">Pilihan</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-espresso">{totalMenuItems}+</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-mocha/70">Buka</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-espresso">08.00</dd>
                </div>
              </dl>

              <ul className="space-y-2.5 text-sm text-mocha" role="list" aria-label="Keterangan menu">
                <li className="flex items-center gap-3">
                  <Flame className="h-4 w-4 shrink-0 text-rust" aria-hidden />
                  <span>
                    <strong className="font-semibold text-espresso">Hot</strong> — disajikan panas
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Snowflake className="h-4 w-4 shrink-0 text-sage" aria-hidden />
                  <span>
                    <strong className="font-semibold text-espresso">Cold</strong> — disajikan dingin
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-rust/60 bg-rust/10 px-1.5 py-px text-[0.58rem] font-bold uppercase tracking-[0.15em] text-rust">
                    <Flame className="h-2.5 w-2.5" aria-hidden />
                    Spicy
                  </span>
                  <span>menu pedas</span>
                </li>
              </ul>
              <p className="font-accent text-xs italic text-mocha/70">
                Harga dalam Rupiah dan dapat berubah sewaktu-waktu. Menerima kartu debit, kartu kredit, dan pembayaran seluler (NFC).
              </p>

              <div className="hidden lg:block">
                <Button href="#reservasi" variant="espresso" size="sm">
                  Reservasi Meja
                </Button>
              </div>
            </div>
          </aside>

          {/* ---------- Kolom kanan: pencarian, tab, daftar ---------- */}
          <div className="lg:col-span-8">
            {/* Pencarian */}
            <div className="relative">
              <label htmlFor="menu-search" className="sr-only">
                Cari menu
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mocha/60" aria-hidden />
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari menu… (mis. latte, nasi goreng, tiramisu)"
                autoComplete="off"
                className="input-retro bg-cream/80 py-3 pl-11 pr-11 text-[0.95rem]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-sm text-mocha/70 transition-colors hover:bg-espresso/10 hover:text-espresso"
                  aria-label="Hapus pencarian"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>

            {/* Tab kategori (sticky) */}
            <div
              ref={tabBarRef}
              className="sticky top-[68px] z-20 -mx-5 mt-5 border-y border-espresso/20 bg-parchment/95 backdrop-blur-md sm:-mx-8 md:top-[76px] lg:mx-0"
            >
              <div
                ref={tabListRef}
                role="tablist"
                aria-label="Kategori menu"
                className="no-scrollbar relative flex snap-x gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-0"
              >
                {menuCategories.map((c, i) => {
                  const selected = !isSearching && c.id === activeId;
                  return (
                    <button
                      key={c.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`tab-${c.id}`}
                      aria-selected={selected}
                      aria-controls="menu-panel"
                      tabIndex={selected || (isSearching && i === 0) ? 0 : -1}
                      onClick={() => selectCategory(i)}
                      onKeyDown={(e) => onTabKeyDown(e, i)}
                      className={cn(
                        "shrink-0 snap-start whitespace-nowrap rounded-sm border-2 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-200",
                        selected
                          ? "border-espresso bg-espresso text-cream shadow-[3px_3px_0_0_var(--color-rust)]"
                          : "border-espresso/30 bg-cream/70 text-espresso/80 hover:border-espresso hover:text-espresso",
                      )}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Panel */}
            <div ref={panelRef} id="menu-panel" role="tabpanel" aria-labelledby={isSearching ? undefined : `tab-${active.id}`} aria-label={isSearching ? "Hasil pencarian menu" : undefined} className="pt-8">
              {isSearching ? (
                <div key="search" className="animate-fade-up">
                  <header className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-espresso pb-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-espresso sm:text-3xl">Hasil Pencarian</h3>
                      <p className="mt-1 font-accent italic text-mocha/80">
                        untuk “{deferredQuery.trim()}”
                      </p>
                    </div>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-mocha/70" aria-live="polite">
                      {resultCount} item ditemukan
                    </span>
                  </header>

                  {results.length === 0 ? (
                    <div className="mt-10 border border-dashed border-espresso/40 bg-cream/60 p-8 text-center">
                      <p className="font-display text-xl text-espresso">Belum ketemu, nih.</p>
                      <p className="mt-2 text-sm text-mocha/80">Coba kata kunci lain, misalnya “kopi susu”, “sandwich”, atau “matcha”.</p>
                      <Button variant="outline" size="sm" className="mt-5" onClick={() => setQuery("")}>
                        Lihat semua menu
                      </Button>
                    </div>
                  ) : (
                    results.map(({ category, items }) => {
                      const temps = hasTemperature(category.items);
                      return (
                        <div key={category.id} className="mt-8">
                          <div className="flex items-baseline justify-between gap-3">
                            <h4 className="font-display text-xl font-semibold text-espresso">{category.label}</h4>
                            <button
                              type="button"
                              onClick={() => selectCategory(menuCategories.indexOf(category))}
                              className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-rust underline-offset-4 hover:underline"
                            >
                              Buka kategori
                            </button>
                          </div>
                          {temps && <ColumnHeader />}
                          <ul role="list">
                            {items.map((item) => (
                              <ItemRow key={item.name} item={item} temps={temps} />
                            ))}
                          </ul>
                        </div>
                      );
                    })
                  )}
                </div>
              ) : (
                <div key={active.id} className="animate-fade-up">
                  <header className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-espresso pb-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-espresso sm:text-3xl">{active.label}</h3>
                      <p className="mt-1 max-w-xl font-accent italic text-mocha/80">{active.tagline}</p>
                    </div>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-mocha/70">
                      {countItems(active.items)} pilihan
                    </span>
                  </header>

                  {activeTemps && <ColumnHeader />}
                  <ItemList items={active.items} temps={activeTemps} twoColumns={!activeTemps} />

                  {active.additional && <AdditionalBox additional={active.additional} />}
                </div>
              )}

              <div className="mt-10 flex flex-col items-start gap-4 border-t border-espresso/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-accent text-sm italic text-mocha/80">Ada pertanyaan soal menu atau ingin memesan untuk rombongan?</p>
                <div className="flex flex-wrap gap-3">
                  <Button href="#reservasi" size="sm">
                    Reservasi Meja
                  </Button>
                  <Button href="https://wa.me/628122041927" target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
                    Tanya via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
