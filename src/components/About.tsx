import { Armchair, Laptop, Users } from "lucide-react";
import latteImg from "@/assets/images/about-latte.jpg";
import outdoorImg from "@/assets/images/outdoor.jpg";
import { site } from "@/data/site";
import { Button } from "./ui/Button";
import { Frame } from "./ui/Frame";
import { SectionHeading } from "./ui/SectionHeading";
import { StampBadge } from "./ui/StampBadge";

const pillars = [
  {
    icon: Armchair,
    title: "Bersantai",
    text: "Sudut-sudut hangat dengan cahaya alami untuk menikmati waktu bersama secangkir kopi.",
  },
  {
    icon: Users,
    title: "Berkumpul",
    text: "Meja yang lega dan area outdoor untuk ngobrol panjang bersama teman dan keluarga.",
  },
  {
    icon: Laptop,
    title: "Bekerja (WFC)",
    text: "Suasana tenang yang mendukung fokus — cocok untuk work from cafe seharian.",
  },
];

export default function About() {
  return (
    <section id="tentang" className="relative overflow-hidden bg-cream py-20 md:py-28" aria-labelledby="about-title">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Kolase foto */}
        <div className="relative mx-auto w-full max-w-lg pb-14 pr-6 lg:mx-0 lg:max-w-none">
          <Frame className="w-[82%] bg-cream">
            <img
              src={latteImg}
              alt="Latte art di meja kayu bersebelahan dengan laptop — suasana WFC di Mosa Coffee House"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover sepia-[0.1]"
            />
          </Frame>
          <Frame className="absolute bottom-0 right-0 w-[56%] bg-cream shadow-retro">
            <img
              src={outdoorImg}
              alt="Area outdoor Mosa Coffee House dengan tanaman dan lampu hangat"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover sepia-[0.1]"
            />
          </Frame>
          <StampBadge className="absolute -top-6 right-2 h-28 w-28 text-rust sm:h-32 sm:w-32" />

          {/* Label ala catatan kaki foto lama */}
          <p className="absolute bottom-3 left-0 hidden font-accent text-xs italic text-mocha/70 sm:block">
            Jl. Golf Barat Raya No.51 B, Arcamanik
          </p>
        </div>

        {/* Teks */}
        <div>
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="Tentang Kami"
            title={
              <>
                Rumah Kopi yang Terasa <em className="font-normal italic text-rust">Seperti Rumah</em>
              </>
            }
          />

          <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-mocha/90">
            <p>
              <strong className="font-semibold text-espresso">{site.name}</strong> adalah tempat yang nyaman untuk bersantai,
              berkumpul dengan teman, atau fokus bekerja. Berlokasi di {site.address.street}, {site.address.district}, Bandung —
              kami menyambut siapa saja yang mencari jeda hangat di tengah hari yang sibuk.
            </p>
            <p>
              Dengan nuansa hangat bergaya vintage, area outdoor yang teduh, akses ramah kursi roda, dan suasana ramah anak, Mosa
              dirancang agar setiap orang bisa menemukan sudut favoritnya — setiap hari, mulai pukul 08.00 WIB.
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3" role="list">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="border-t-2 border-espresso pt-4">
                <Icon className="h-5 w-5 text-rust" aria-hidden />
                <h3 className="mt-2 font-display text-lg font-semibold text-espresso">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mocha/80">{text}</p>
              </li>
            ))}
          </ul>

          <blockquote className="mt-8 border-l-2 border-rust pl-5 font-accent text-lg italic leading-relaxed text-espresso/85">
            “Secangkir kopi, sepotong waktu untuk diri sendiri — atau untuk orang-orang tersayang.”
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#reservasi">Reservasi Meja</Button>
            <Button href="#kontak" variant="outline">
              Lihat Lokasi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
