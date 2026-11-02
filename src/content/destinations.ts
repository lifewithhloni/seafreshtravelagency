/**
 * Destination content — the single source of truth for every destination card,
 * detail page, form dropdown and sitemap entry.
 *
 * To add a destination: copy an entry, give it a unique `slug`, and (optionally)
 * place a photo at the `image.src` path. If the photo file is missing, a branded
 * placeholder is shown automatically.
 *
 * Photos: landscape, at least 1600px wide, JPG or WebP. Only use photographs
 * SeaFresh owns or is licensed to use.
 */

export type DestinationRegion = "south-africa" | "southern-africa";

/**
 * Availability status. These are honest labels: a destination is only
 * "available" once SeaFresh has a confirmed trip or package for it.
 */
export type DestinationStatus = "planned" | "spotlight" | "available";

/** Visual theme for the placeholder shown until a photo is supplied. */
export type PlaceholderMotif = "dunes" | "falls" | "sea" | "mountains" | "lake" | "resort";

export type Destination = {
  slug: string;
  name: string;
  /** Country or region line shown under the name. */
  location: string;
  region: DestinationRegion;
  category: string;
  status: DestinationStatus;
  /** One or two sentences for cards. */
  summary: string;
  /** Longer introduction paragraphs for the detail page. */
  description: string[];
  /** General things the destination is known for — not SeaFresh itinerary items. */
  knownFor: string[];
  /** Optional note shown on the detail page (e.g. details still to be confirmed). */
  note?: string;
  image: { src: string; alt: string };
  motif: PlaceholderMotif;
};

export const regionLabels: Record<DestinationRegion, string> = {
  "south-africa": "South Africa",
  "southern-africa": "Southern Africa",
};

export const statusLabels: Record<DestinationStatus, string> = {
  planned: "Planned destination",
  spotlight: "Destination spotlight",
  available: "Trips available",
};

export const destinations: Destination[] = [
  {
    slug: "sun-city",
    name: "Sun City",
    location: "North West, South Africa",
    region: "south-africa",
    category: "Resort & leisure",
    status: "planned",
    summary:
      "A well-known resort destination beside the Pilanesberg, mixing entertainment, water fun and bushveld scenery.",
    description: [
      "Sun City is a resort and entertainment destination in South Africa's North West province, set beside the Pilanesberg National Park.",
      "It's a popular choice for weekends away and celebrations, with leisure facilities, pools and nearby wildlife experiences all in one area.",
    ],
    knownFor: [
      "Resort leisure and entertainment",
      "Water-based fun and pools",
      "Nearby Pilanesberg National Park",
      "Golf and relaxation",
    ],
    image: { src: "/images/destinations/sun-city.jpg", alt: "Sun City resort, North West, South Africa" },
    motif: "resort",
  },
  {
    slug: "mpumalanga",
    name: "Mpumalanga",
    location: "Mpumalanga, South Africa",
    region: "south-africa",
    category: "Scenic & nature",
    status: "planned",
    summary:
      "Dramatic canyons, waterfalls and viewpoints along the Panorama Route, and a gateway to the Lowveld.",
    description: [
      "Mpumalanga, in South Africa's north-east, is known for some of the country's most striking landscapes.",
      "The Panorama Route links viewpoints and natural landmarks such as the Blyde River Canyon, while the province is also a gateway to the Lowveld and its wildlife areas.",
    ],
    knownFor: [
      "The Panorama Route",
      "Blyde River Canyon",
      "Waterfalls and mountain viewpoints",
      "Access to Lowveld wildlife areas",
    ],
    image: { src: "/images/destinations/mpumalanga.jpg", alt: "Mountain and canyon scenery in Mpumalanga" },
    motif: "mountains",
  },
  {
    slug: "hartbeespoort",
    name: "Hartbeespoort",
    location: "North West, South Africa",
    region: "south-africa",
    category: "Getaway & lakeside",
    status: "planned",
    summary:
      "A relaxed lakeside getaway at the foot of the Magaliesberg, within easy reach of Gauteng.",
    description: [
      "Hartbeespoort is a town built around the Hartbeespoort Dam, at the foot of the Magaliesberg mountains.",
      "Its closeness to Johannesburg and Pretoria makes it a popular choice for short breaks, day trips and relaxed weekends away.",
    ],
    knownFor: [
      "Hartbeespoort Dam",
      "Magaliesberg mountain views",
      "Markets, cafés and weekend outings",
      "Short getaways from Gauteng",
    ],
    image: { src: "/images/destinations/hartbeespoort.jpg", alt: "Hartbeespoort Dam and the Magaliesberg mountains" },
    motif: "lake",
  },
  {
    slug: "namib-desert",
    name: "Namib Desert",
    location: "Namibia",
    region: "southern-africa",
    category: "Desert & adventure",
    status: "planned",
    summary:
      "Towering red dunes and vast open landscapes in one of the oldest deserts in the world.",
    description: [
      "The Namib Desert stretches along Namibia's Atlantic coast and is often described as one of the oldest deserts on Earth.",
      "Its tall red dunes, open plains and clear night skies make it a memorable destination for travellers looking for something completely different.",
    ],
    knownFor: [
      "Tall red sand dunes",
      "The Sossusvlei area",
      "Wide open desert landscapes",
      "Clear night skies",
    ],
    image: { src: "/images/destinations/namib-desert.jpg", alt: "Red sand dunes in the Namib Desert, Namibia" },
    motif: "dunes",
  },
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    location: "Zambia / Zimbabwe",
    region: "southern-africa",
    category: "Natural wonder",
    status: "planned",
    summary:
      "The famous falls on the Zambezi River, known locally as Mosi-oa-Tunya — “the smoke that thunders”.",
    description: [
      "Victoria Falls lies on the Zambezi River, on the border between Zambia and Zimbabwe.",
      "Known locally as Mosi-oa-Tunya, it is one of the most recognised natural landmarks in Africa, famous for its spray, sound and scale.",
    ],
    knownFor: [
      "The Zambezi River",
      "Views of the falls and rising spray",
      "A UNESCO World Heritage Site",
      "River and adventure activities in the area",
    ],
    note: "Whether SeaFresh travel to Victoria Falls will be on the Zambian or Zimbabwean side is still to be confirmed.",
    image: { src: "/images/destinations/victoria-falls.jpg", alt: "Victoria Falls on the Zambezi River" },
    motif: "falls",
  },
  {
    slug: "xai-xai-beach",
    name: "Xai-Xai Beach",
    location: "Gaza Province, Mozambique",
    region: "southern-africa",
    category: "Beach & coast",
    status: "planned",
    summary:
      "Warm Indian Ocean water, long sandy beaches and a relaxed coastal pace in southern Mozambique.",
    description: [
      "Xai-Xai is a coastal area in Mozambique's Gaza Province, on the warm Indian Ocean.",
      "Its beaches, rock pools and reef-lined shoreline make it a popular choice for travellers looking for sun, sea and a slower pace.",
    ],
    knownFor: [
      "Indian Ocean beaches",
      "Rock pools and reefs",
      "Warm-water swimming",
      "A relaxed coastal atmosphere",
    ],
    image: { src: "/images/destinations/xai-xai-beach.jpg", alt: "Beach and ocean at Xai-Xai, Mozambique" },
    motif: "sea",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationsByRegion(region: DestinationRegion): Destination[] {
  return destinations.filter((d) => d.region === region);
}
