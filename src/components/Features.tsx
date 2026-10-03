import { Accessibility, Coffee, Laptop, TreePine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "@/data/site";
import { SectionHeading } from "./ui/SectionHeading";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Coffee,
    title: "Kopi & Makanan Enak",
    description:
      "Dari espresso based dan manual brew hingga nasi goreng cikur, camilan hangat, dan dessert manis — semua dalam satu tempat.",
  },
  {
    icon: Laptop,
    title: "WFC Friendly",
    description:
      "Suasana tenang dan nyaman untuk bekerja dengan laptop. Cocok untuk work from cafe seharian penuh.",
  },
  {
    icon: Accessibility,
    title: "Fasilitas Aksesibel",
    description:
      "Ramah kursi roda dan ramah anak. Parkir gratis tersedia luas, termasuk parkir di jalan.",
  },
  {
    icon: TreePine,
    title: "Area Outdoor & Reservasi",
    description:
      "Nikmati udara sejuk Bandung di area outdoor kami. Kami juga menerima reservasi untuk momen spesialmu.",
  },
];

export default function Features() {
  return (
    <>
      <section id="keunggulan" className="relative bg-cream py-20 md:py-28" aria-labelledby="features-title">
        <div className="container-x">
          <SectionHeading
            id="features-title"
            eyebrow="Kenapa Mosa?"
            title={
              <>
                Tempat yang Pas untuk <em className="font-normal italic text-rust">Setiap Momen</em>
              </>
            }
            description="Bersantai sendiri, berkumpul bersama teman, atau menuntaskan pekerjaan — Mosa menyiapkan suasana dan fasilitas yang mendukung."
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7" role="list">
            {features.map(({ icon: Icon, title, description }, i) => (
              <li key={title} className="group relative">
                <article className="relative h-full border border-espresso/40 bg-cream p-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-retro">
                  <div className="flex h-full flex-col border border-espresso/30 px-6 pb-7 pt-8">
                    <div className="flex items-start justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-espresso bg-sage/15 text-espresso transition-colors duration-300 group-hover:bg-rust group-hover:text-cream">
                        <Icon className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="font-display text-3xl italic text-espresso/25" aria-hidden>
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold text-espresso">{title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-mocha/85">{description}</p>
                    <span aria-hidden className="mt-6 h-px w-10 bg-rust/70 transition-all duration-300 group-hover:w-full" />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FacilityMarquee />
    </>
  );
}

/** Pita berjalan berisi daftar fasilitas */
function FacilityMarquee() {
  const items = [...site.facilities, "Buka Setiap Hari 08.00 WIB"];
  return (
    <div className="relative overflow-hidden bg-cream py-4" aria-label="Fasilitas Mosa Coffee House">
      <div className="marquee relative -mx-4 -rotate-1 border-y-2 border-espresso bg-rust text-cream shadow-[0_4px_0_0_var(--color-espresso)]">
        <div className="marquee-track py-3">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1} role="list">
              {items.map((item) => (
                <li key={`${copy}-${item}`} className="flex items-center whitespace-nowrap px-6 text-[0.78rem] font-semibold uppercase tracking-[0.28em]">
                  {item}
                  <span aria-hidden className="ml-12 font-display text-base text-cream/80">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
