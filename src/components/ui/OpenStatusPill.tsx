import { useOpenStatus } from "@/hooks/useOpenStatus";
import { site } from "@/data/site";
import { cn } from "@/utils/cn";

interface OpenStatusPillProps {
  tone?: "dark" | "light";
  className?: string;
  showTime?: boolean;
}

export function OpenStatusPill({ tone = "light", className, showTime = true }: OpenStatusPillProps) {
  const { isOpen, timeLabel } = useOpenStatus();
  const light = tone === "light";

  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm",
        light ? "border-cream/40 bg-espresso/40 text-cream" : "border-espresso/30 bg-cream text-espresso",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-2.5 w-2.5 shrink-0 rounded-full",
          isOpen ? "bg-sage-light text-sage-light animate-pulse-dot" : "bg-rust text-rust",
        )}
      />
      <span className="truncate">
        {isOpen ? "Buka Sekarang" : "Sedang Tutup"}
        <span className={cn("font-normal", light ? "text-cream/75" : "text-mocha/80")}>
          {" · "}
          {isOpen ? site.hours.short : `Buka setiap hari pukul ${site.hours.opening} WIB`}
          {showTime && <span className="hidden sm:inline">{` · ${timeLabel}`}</span>}
        </span>
      </span>
    </div>
  );
}
