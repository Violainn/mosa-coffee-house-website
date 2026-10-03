import { useId } from "react";
import { cn } from "@/utils/cn";

interface StampBadgeProps {
  text?: string;
  className?: string;
  /** Ikon/isi di tengah lingkaran */
  center?: React.ReactNode;
}

/**
 * Badge bundar bergaya stempel retro dengan teks melingkar yang berputar pelan.
 */
export function StampBadge({
  text = "MOSA COFFEE HOUSE • ARCAMANIK BANDUNG • SEDUH KETENANGAN • ",
  className,
  center,
}: StampBadgeProps) {
  const id = useId();
  const pathId = `stamp-path-${id}`;

  return (
    <div className={cn("relative aspect-square", className)} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow" fill="none">
        <defs>
          <path id={pathId} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="100" cy="100" r="52" stroke="currentColor" strokeWidth="1.5" />
        <text
          fill="currentColor"
          fontSize="14.5"
          fontWeight="700"
          letterSpacing="3.2"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        {center ?? <CupIcon className="h-[26%] w-[26%]" />}
      </div>
    </div>
  );
}

export function CupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 18h26v10a10 10 0 0 1-10 10h-6A10 10 0 0 1 8 28V18Z" />
      <path d="M34 21h3a5 5 0 0 1 0 10h-3" />
      <path d="M6 42h32" />
      <path d="M16 12c0-2 2-2.5 2-4.5S16 5 16 3" />
      <path d="M22 12c0-2 2-2.5 2-4.5S22 5 22 3" />
      <path d="M28 12c0-2 2-2.5 2-4.5S28 5 28 3" />
    </svg>
  );
}
