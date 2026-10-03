import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}

/** Ornamen pembatas klasik: garis — wajik — garis */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 14" className={cn("h-3.5 w-32", className)} fill="none" aria-hidden="true">
      <path d="M0 7h52M88 7h52" stroke="currentColor" strokeWidth="1" />
      <path d="M70 1l6 6-6 6-6-6z" fill="currentColor" />
      <circle cx="58" cy="7" r="1.5" fill="currentColor" />
      <circle cx="82" cy="7" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SectionHeading({ id, eyebrow, title, description, align = "center", tone = "dark", className }: SectionHeadingProps) {
  const isCenter = align === "center";
  const light = tone === "light";
  return (
    <div className={cn("max-w-3xl", isCenter ? "mx-auto text-center" : "text-left", className)}>
      <p className={cn("eyebrow", !isCenter && "eyebrow-left", light ? "text-sand" : "text-rust")}>{eyebrow}</p>
      <h2
        id={id}
        className={cn(
          "mt-4 font-display text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl",
          light ? "text-cream" : "text-espresso",
        )}
      >
        {title}
      </h2>
      <Ornament className={cn("mt-5", isCenter && "mx-auto", light ? "text-sand/80" : "text-rust")} />
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", light ? "text-cream/75" : "text-mocha/85")}>
          {description}
        </p>
      )}
    </div>
  );
}
