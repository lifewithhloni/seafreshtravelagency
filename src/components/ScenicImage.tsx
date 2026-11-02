import Image from "next/image";
import type { PlaceholderMotif } from "@/content/destinations";
import { existingImage } from "@/lib/images";

type Props = {
  src: string | null | undefined;
  alt: string;
  motif?: PlaceholderMotif;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fills its (relatively positioned) parent with a photo, or with a branded
 * illustrated placeholder when the photo file hasn't been added yet.
 * The parent sets the aspect ratio, so swapping in a photo never shifts layout.
 */
export function ScenicImage({ src, alt, motif = "sea", sizes = "100vw", priority = false, className = "" }: Props) {
  const resolved = existingImage(src);
  if (resolved) {
    return <Image src={resolved} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />;
  }
  return <ScenicPlaceholder motif={motif} label={alt} className={className} />;
}

const palettes: Record<PlaceholderMotif, { sky: [string, string]; sun: string; layers: string[] }> = {
  dunes: { sky: ["#f6dcc0", "#f2e8d6"], sun: "#f7c77e", layers: ["#e2a77a", "#c97a52", "#a85a3d"] },
  falls: { sky: ["#cfe9ec", "#eaf3f6"], sun: "#ffffff", layers: ["#7fb7b4", "#3f7f80", "#1d4f5c"] },
  sea: { sky: ["#bfe5e3", "#eaf3f6"], sun: "#f7d8a0", layers: ["#7ccac4", "#4ab7b0", "#1f6f7d"] },
  mountains: { sky: ["#d3e8e6", "#f2e8d6"], sun: "#f5d9a6", layers: ["#8bb6a8", "#4f8c7c", "#2b5d55"] },
  lake: { sky: ["#dbeef0", "#f2e8d6"], sun: "#f6d49a", layers: ["#93b8a5", "#5d8f84", "#3a8c99"] },
  resort: { sky: ["#f7dfc4", "#eaf3f6"], sun: "#f4b860", layers: ["#c9b98f", "#8f9a6a", "#56704d"] },
};

const shapes: Record<PlaceholderMotif, string[]> = {
  dunes: [
    "M0 190 C70 150 120 140 190 175 S320 150 400 165 V300 H0Z",
    "M0 230 C90 175 150 190 230 215 S350 200 400 205 V300 H0Z",
    "M0 265 C80 240 170 235 250 255 S360 250 400 245 V300 H0Z",
  ],
  falls: [
    "M0 150 L90 130 L150 150 L250 128 L330 145 L400 135 V300 H0Z",
    "M0 175 H400 V300 H0Z",
    "M0 240 C80 230 160 250 240 238 S350 232 400 240 V300 H0Z",
  ],
  sea: [
    "M0 185 H400 V300 H0Z",
    "M0 215 C60 205 110 225 170 215 S290 205 400 218 V300 H0Z",
    "M0 255 C70 245 140 262 220 252 S340 245 400 255 V300 H0Z",
  ],
  mountains: [
    "M0 180 L70 115 L130 160 L210 90 L290 165 L350 125 L400 150 V300 H0Z",
    "M0 215 L80 160 L160 205 L250 150 L330 200 L400 175 V300 H0Z",
    "M0 255 C90 235 180 250 260 238 S360 240 400 245 V300 H0Z",
  ],
  lake: [
    "M0 170 C60 130 120 125 180 150 S300 120 400 150 V300 H0Z",
    "M0 200 H400 V300 H0Z",
    "M0 250 C90 244 170 256 250 248 S350 246 400 250 V300 H0Z",
  ],
  resort: [
    "M0 190 C80 160 140 168 200 182 S330 160 400 178 V300 H0Z",
    "M0 225 C70 205 150 215 220 222 S340 210 400 220 V300 H0Z",
    "M0 260 C90 248 180 262 260 254 S360 252 400 258 V300 H0Z",
  ],
};

export function ScenicPlaceholder({ motif, label, className = "" }: { motif: PlaceholderMotif; label: string; className?: string }) {
  const p = palettes[motif];
  const id = `sky-${motif}-${label.replace(/[^a-z0-9]/gi, "").slice(0, 24)}`;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${label} (photo coming soon)`}
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sky[0]} />
          <stop offset="1" stopColor={p.sky[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />
      <circle cx={motif === "falls" ? 300 : 290} cy="95" r="34" fill={p.sun} opacity="0.85" />
      {shapes[motif].map((d, i) => (
        <path key={i} d={d} fill={p.layers[i]} opacity={0.92} />
      ))}
      {motif === "falls" && (
        <g fill="#ffffff" opacity="0.75">
          <rect x="150" y="150" width="7" height="90" rx="3" />
          <rect x="175" y="148" width="10" height="94" rx="4" />
          <rect x="205" y="150" width="6" height="88" rx="3" />
          <rect x="228" y="146" width="9" height="95" rx="4" />
        </g>
      )}
      {(motif === "sea" || motif === "lake") && (
        <g stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.55" fill="none">
          <path d="M40 200 h40 M120 196 h28 M250 202 h46 M330 197 h30" />
        </g>
      )}
    </svg>
  );
}
