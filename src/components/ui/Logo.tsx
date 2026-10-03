import { cn } from "@/utils/cn";
import { CupIcon } from "./StampBadge";

interface LogoProps {
  tone?: "dark" | "light";
  className?: string;
}

export function Logo({ tone = "dark", className }: LogoProps) {
  const light = tone === "light";
  return (
    <a
      href="#beranda"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Mosa Coffee House — kembali ke beranda"
    >
      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 transition-transform duration-300 group-hover:-rotate-6",
          light
            ? "border-cream bg-espresso text-cream shadow-[2px_2px_0_0_var(--color-rust)]"
            : "border-espresso bg-cream text-espresso shadow-[2px_2px_0_0_var(--color-rust)]",
        )}
      >
        <CupIcon className="h-6 w-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.45rem] font-bold tracking-tight", light ? "text-cream" : "text-espresso")}>
          Mosa
        </span>
        <span className={cn("mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.38em]", light ? "text-sand" : "text-sage")}>
          Coffee House
        </span>
      </span>
    </a>
  );
}
