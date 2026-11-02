/**
 * Central brand, contact and social configuration.
 *
 * Everything marked "provisional" is a proposal awaiting SeaFresh approval —
 * change it here and it updates across the whole website.
 */

export const brand = {
  name: "SeaFresh Travel Agency",
  shortName: "SeaFresh",
  /** Provisional tagline. */
  tagline: "Find Your Way. Share the Journey.",
  /** Provisional supporting message. */
  supportingMessage: "Discover destinations. Experience more. Create memories.",
  description:
    "SeaFresh Travel Agency offers organised group trips and personalised holiday enquiries for destinations across South Africa and the wider Southern African region.",
  /** Short footer introduction. */
  intro:
    "SeaFresh Travel Agency is building a travel offering for people who want to discover destinations, enjoy time away and create memorable travel experiences.",
} as const;

/**
 * Official logo integration point.
 *
 * The supplied file (logo/Seafresh Travel Logo Version Sheet (1).png) has been
 * copied unchanged to public/images/brand/seafresh-logo.png. It has a solid
 * light background, so it is only used on light surfaces.
 *
 * `approved: true` shows the official logo in the header, mobile menu and
 * footer. Set it to false to fall back to the text wordmark.
 */
export const logo = {
  approved: true,
  src: "/images/brand/seafresh-logo.png",
  width: 629,
  height: 305,
  alt: "SeaFresh Travel logo",
  /**
   * Optional version for dark backgrounds (e.g. a transparent or white-text
   * export). Leave null to show the logo on a light panel in dark areas.
   */
  darkBackgroundSrc: null as string | null,
} as const;

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

/** WhatsApp numbers must be international format, digits only (e.g. 27XXXXXXXXX). */
function parseWhatsAppNumber(raw: string): string | null {
  const digits = raw.replace(/[\s+()-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  return digits;
}

function parseEmail(raw: string): string | null {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : null;
}

/**
 * Contact channels. Values come from environment variables (see .env.example).
 * When a value is missing or invalid, the related buttons are hidden and the
 * site explains that the channel is still being set up.
 */
export const contact = {
  whatsappNumber: parseWhatsAppNumber(clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)),
  email: parseEmail(clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL)),
} as const;

export const siteUrl = clean(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000";

export type SocialLink = {
  label: string;
  /** Leave empty until the official account exists. Empty links are not shown. */
  href: string;
};

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "" },
  { label: "Instagram", href: "" },
  { label: "TikTok", href: "" },
];

/** Developer credit — subject to SeaFresh approval. Set `show` to false to remove. */
export const credit = {
  show: true,
  label: "Website by LM Media Solutions",
  href: "",
} as const;
