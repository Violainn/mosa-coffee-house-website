import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Warna garis bingkai */
  tone?: "espresso" | "cream" | "rust";
  /** Jarak antara bingkai luar & konten */
  inset?: "sm" | "md";
  corners?: boolean;
}

const tones = {
  espresso: { line: "border-espresso/45", corner: "border-espresso" },
  cream: { line: "border-cream/50", corner: "border-cream" },
  rust: { line: "border-rust/60", corner: "border-rust" },
};

/**
 * Bingkai klasik ala foto/menu jadul: garis ganda + ornamen sudut.
 */
export function Frame({ children, className, tone = "espresso", inset = "sm", corners = true, ...rest }: FrameProps) {
  const t = tones[tone];
  return (
    <div className={cn("relative border", t.line, inset === "sm" ? "p-1.5" : "p-3", className)} {...rest}>
      <div className={cn("relative h-full border", t.line)}>{children}</div>
      {corners && (
        <>
          <span aria-hidden className={cn("absolute -left-px -top-px h-3.5 w-3.5 border-l-2 border-t-2", t.corner)} />
          <span aria-hidden className={cn("absolute -right-px -top-px h-3.5 w-3.5 border-r-2 border-t-2", t.corner)} />
          <span aria-hidden className={cn("absolute -bottom-px -left-px h-3.5 w-3.5 border-b-2 border-l-2", t.corner)} />
          <span aria-hidden className={cn("absolute -bottom-px -right-px h-3.5 w-3.5 border-b-2 border-r-2", t.corner)} />
        </>
      )}
    </div>
  );
}
