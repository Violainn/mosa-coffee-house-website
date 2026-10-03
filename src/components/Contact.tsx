import { Clock, CreditCard, MapPin, MessageCircle, Navigation, Nfc, Phone, Smartphone, Wallet } from "lucide-react";
import { site } from "@/data/site";
import { useOpenStatus } from "@/hooks/useOpenStatus";
import { cn } from "@/utils/cn";
import { Button } from "./ui/Button";
import { Frame } from "./ui/Frame";
import { SectionHeading } from "./ui/SectionHeading";

const paymentMethods = [
  { icon: CreditCard, label: "Kartu Debit" },
  { icon: Wallet, label: "Kartu Kredit" },
  { icon: Nfc, label: "Pembayaran Seluler (NFC)" },
];

function InfoCard({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("border border-espresso/40 bg-cream p-1.5", className)}>
      <div className="flex h-full gap-4 border border-espresso/25 p-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-espresso bg-sage/15 text-espresso">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[0.66rem] font-semibold uppercase tracking-[0.25em] text-rust">{title}</h3>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </article>
  );
}

export default function Contact() {
  const { isOpen } = useOpenStatus();

  return (
    <section id="kontak" className="relative bg-parchment pb-20 pt-24 md:pb-28 md:pt-32" aria-labelledby="contact-title">
      <div aria-hidden className="scallop-bottom absolute inset-x-0 top-0" />
      <div aria-hidden className="bg-stripes pointer-events-none absolute inset-0 opacity-70" />

      <div className="container-x relative">
        <SectionHeading
          id="contact-title"
          eyebrow="Kontak & Lokasi"
          title={
            <>
              Mampir ke <em className="font-normal italic text-rust">Mosa</em>
            </>
          }
          description="Kami berada di kawasan Golf Barat, Arcamanik — mudah dijangkau, dengan parkir gratis yang luas dan tersedia juga di jalan."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Info */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            <InfoCard icon={MapPin} title="Alamat">
              <address className="font-accent not-italic leading-relaxed text-espresso">
                {site.address.street}
                <br />
                {site.address.district}
                <br />
                {site.address.city}
              </address>
              <a
                href={site.links.mapsDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-rust underline-offset-4 hover:underline"
              >
                <Navigation className="h-3.5 w-3.5" aria-hidden />
                Petunjuk Arah
              </a>
            </InfoCard>

            <InfoCard icon={Clock} title="Jam Operasional">
              <p className="font-accent leading-relaxed text-espresso">
                Buka <strong className="font-semibold">setiap hari</strong>
                <br />
                mulai pukul <strong className="font-semibold">08.00 WIB</strong>
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold">
                <span aria-hidden className={cn("h-2 w-2 rounded-full", isOpen ? "bg-sage animate-pulse-dot text-sage" : "bg-rust")} />
                {isOpen ? "Buka sekarang" : "Sedang tutup · buka pukul 08.00 WIB"}
              </p>
            </InfoCard>

            <InfoCard icon={Phone} title="Telepon / WhatsApp">
              <a href={`tel:${site.phone.tel}`} className="font-display text-2xl font-semibold text-espresso underline-offset-4 hover:underline">
                {site.phone.display}
              </a>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button href={site.links.whatsapp("Halo Mosa Coffee House, saya ingin bertanya.")} target="_blank" rel="noopener noreferrer" size="sm">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                  WhatsApp
                </Button>
                <Button href={`tel:${site.phone.tel}`} variant="outline" size="sm">
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                  Telepon
                </Button>
              </div>
            </InfoCard>

            <InfoCard icon={Smartphone} title="Metode Pembayaran">
              <ul className="flex flex-wrap gap-2" role="list">
                {paymentMethods.map(({ icon: Icon, label }) => (
                  <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-espresso/40 bg-cream px-3 py-1 text-xs font-medium text-espresso">
                    <Icon className="h-3.5 w-3.5 text-sage" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-accent text-xs italic text-mocha/70">Transaksi cepat & praktis langsung di kasir.</p>
            </InfoCard>
          </div>

          {/* Peta */}
          <div className="lg:col-span-3">
            <Frame className="h-full bg-cream" inset="md">
              <div className="relative h-full min-h-[22rem] sm:min-h-[26rem] lg:min-h-[30rem]">
                <iframe
                  title="Lokasi Mosa Coffee House di Google Maps"
                  src={site.links.mapsEmbed}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.25] sepia-[0.25] contrast-[0.95]"
                />
                <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-center sm:justify-start">
                  <p className="pointer-events-auto inline-flex items-center gap-2 border border-espresso/40 bg-cream/95 px-3.5 py-2 text-xs font-medium text-espresso shadow-retro-sm">
                    <MapPin className="h-3.5 w-3.5 text-rust" aria-hidden />
                    {site.address.street}, Arcamanik, Bandung
                  </p>
                </div>
              </div>
            </Frame>
          </div>
        </div>
      </div>
    </section>
  );
}
