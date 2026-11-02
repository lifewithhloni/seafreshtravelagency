import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { brand, logo } from "@/config/site";

type Props = {
  /** Background the logo sits on. */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const heights = { sm: 40, md: 60, lg: 80 } as const;

/**
 * The one place the SeaFresh logo is rendered (header, mobile menu, footer).
 * Shows the official logo once `logo.approved` is true in src/config/site.ts,
 * otherwise a typographic wordmark.
 */
export function SeaFreshLogo({ tone = "light", size = "md", className = "" }: Props) {
  const height = heights[size];

  let content: ReactNode;
  if (logo.approved) {
    const darkSrc = tone === "dark" ? logo.darkBackgroundSrc : null;
    const src = darkSrc ?? logo.src;
    const width = Math.round((logo.width / logo.height) * height);
    const img = (
      <Image src={src} alt={logo.alt} width={width} height={height} priority={tone === "light"} className="h-auto max-w-full" style={{ height, width: "auto" }} />
    );
    // The supplied logo has a solid light background, so on dark surfaces it sits on a light panel.
    content = tone === "dark" && !darkSrc ? <span className="inline-block rounded-xl bg-white px-3 py-2">{img}</span> : img;
  } else {
    const main = tone === "dark" ? "text-white" : "text-ocean";
    const sub = tone === "dark" ? "text-teal" : "text-teal-strong";
    const scale = { sm: "text-[1.45rem]", md: "text-[1.7rem]", lg: "text-[2.3rem]" }[size];
    content = (
      <span className="flex flex-col leading-none">
        <span className={`font-display font-semibold tracking-tight ${scale} ${main}`}>
          Sea<span className="italic font-medium">Fresh</span>
        </span>
        <span className={`mt-1 text-[0.62rem] font-bold uppercase tracking-[0.32em] ${sub}`}>Travel Agency</span>
      </span>
    );
  }

  return (
    <Link href="/" aria-label={`${brand.name} — home`} className={`inline-flex items-center ${className}`}>
      {content}
    </Link>
  );
}
