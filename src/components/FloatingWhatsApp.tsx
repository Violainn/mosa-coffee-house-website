import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={site.links.whatsapp("Halo Mosa Coffee House, saya ingin bertanya.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Mosa Coffee House via WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full border-2 border-espresso bg-rust py-3 pl-3.5 pr-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-cream shadow-retro-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-retro sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
