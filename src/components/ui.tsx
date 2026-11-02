import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Shared layout and button primitives. */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export type ButtonVariant = "primary" | "secondary" | "light" | "outline-light" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-teal text-ocean-deep hover:bg-[#5fc6bf] hover:-translate-y-0.5 shadow-[0_8px_24px_-12px_rgba(16,59,80,0.6)]",
  secondary: "bg-ocean text-white hover:bg-ocean-deep hover:-translate-y-0.5",
  light: "bg-white text-ocean hover:bg-coastal hover:-translate-y-0.5",
  "outline-light": "border border-white/60 text-white hover:bg-white/10 hover:border-white",
  ghost: "border border-ocean/20 text-ocean hover:border-ocean hover:bg-coastal",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

/** Plain anchor button for WhatsApp, mailto and other non-route links. */
export function ButtonAnchor({ variant = "primary", className = "", ...props }: ComponentProps<"a"> & { variant?: ButtonVariant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${tone === "dark" ? "text-teal" : "text-teal-strong"}`}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className={`text-3xl sm:text-4xl lg:text-[2.75rem] ${tone === "dark" ? "!text-white" : ""}`}>{title}</h2>
      {intro && <div className={`mt-4 text-lg ${tone === "dark" ? "text-white/80" : "text-ink-soft"}`}>{intro}</div>}
    </div>
  );
}

export function Badge({ children, tone = "sand" }: { children: ReactNode; tone?: "sand" | "glass" | "teal" }) {
  const styles = {
    sand: "bg-sand text-ocean",
    glass: "bg-white/85 text-ocean backdrop-blur",
    teal: "bg-teal/15 text-teal-strong",
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>{children}</span>;
}
