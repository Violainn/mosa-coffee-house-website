import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "rust" | "espresso" | "outline" | "outline-light" | "cream";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm border-2 font-body font-semibold uppercase tracking-[0.18em] transition-all duration-200 select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  rust: "border-espresso bg-rust text-cream shadow-retro-sm hover:-translate-y-0.5 hover:shadow-retro active:translate-y-0 active:shadow-none",
  espresso:
    "border-espresso bg-espresso text-cream shadow-[3px_3px_0_0_var(--color-rust)] hover:-translate-y-0.5 hover:shadow-retro-rust active:translate-y-0 active:shadow-none",
  outline: "border-espresso bg-transparent text-espresso hover:bg-espresso hover:text-cream",
  "outline-light": "border-cream/80 bg-transparent text-cream hover:bg-cream hover:text-espresso",
  cream:
    "border-cream bg-cream text-espresso shadow-[3px_3px_0_0_var(--color-rust)] hover:-translate-y-0.5 hover:shadow-retro-rust active:translate-y-0 active:shadow-none",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.7rem]",
  md: "px-6 py-3 text-[0.78rem]",
  lg: "px-8 py-3.5 text-[0.82rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export type ButtonProps = AnchorProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "rust", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, type, ...rest } = props;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
