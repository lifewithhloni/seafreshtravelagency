import { brand } from "@/config/site";

/** Homepage copy. Images follow the same "drop a file in, placeholder until then" rule as destinations. */

export const hero = {
  eyebrow: "South Africa & beyond",
  headline: brand.tagline,
  body: "From exciting group adventures to personalised holiday experiences, explore destinations across South Africa and beyond with SeaFresh Travel Agency.",
  primaryCta: { label: "Explore Group Trips", href: "/group-trips" },
  secondaryCta: { label: "Plan an Individual Holiday", href: "/individual-holidays" },
  image: { src: "/images/hero/home-hero.jpg", alt: "A scenic Southern African travel destination" },
};

export const experiences = [
  {
    title: "Group Trips",
    body: "Travel with others on organised trips with shared dates, arrangements and plenty of good company along the way.",
    href: "/group-trips",
    cta: "Explore group trips",
    image: { src: "/images/group-trips/group-travel.jpg", alt: "A group of friends jumping together on a beach at sunset" },
    motif: "sea" as const,
  },
  {
    title: "Individual Holidays",
    body: "Tell us where, when and how you'd like to travel, and we'll help you plan a holiday around your preferences.",
    href: "/individual-holidays",
    cta: "Plan your holiday",
    image: { src: "/images/individual-holidays/individual-holiday.jpg", alt: "A traveller in a sun hat paddling in the sea at sunset" },
    motif: "dunes" as const,
  },
];

/** Honest, intention-based statements — no unconfirmed claims. */
export const whySeaFresh = [
  {
    title: "Two ways to travel",
    body: "Join an organised group trip or ask us to help with a holiday planned around you.",
  },
  {
    title: "Clear, simple enquiries",
    body: "Send your questions straight to us on WhatsApp or by email, without lengthy forms or accounts.",
  },
  {
    title: "Close to home and beyond",
    body: "Discover favourites in South Africa alongside unforgettable places across Southern Africa.",
  },
  {
    title: "Details before you commit",
    body: "We talk you through the arrangements so you understand your trip before confirming a booking.",
  },
];

export const howItWorks = [
  { title: "Discover a destination", body: "Browse our destinations and find somewhere that excites you." },
  { title: "Choose how to travel", body: "Pick a group trip or ask about an individual holiday." },
  { title: "Send an enquiry", body: "Reach us on WhatsApp or email with your questions and preferences." },
  { title: "Review the arrangements", body: "We share the available travel arrangements for you to consider." },
  { title: "Confirm your booking", body: "Once the details are agreed, your booking can be confirmed." },
];

export const finalCta = {
  heading: "Where will your next journey take you?",
  body: brand.supportingMessage,
  primary: { label: "Plan an Individual Holiday", href: "/individual-holidays" },
  secondary: { label: "Contact Us", href: "/contact" },
  image: { src: "/images/destinations/another-destination.jpg", alt: "Friends jumping off a catamaran into turquoise sea" },
};

export const tripsEmptyState =
  "New travel experiences are being planned. Get in touch with us to express your interest in an upcoming group trip.";
