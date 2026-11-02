/**
 * Organised group trips.
 *
 * IMPORTANT: Only add trips that SeaFresh has confirmed. While this list is
 * empty, the website shows a friendly "trips are being planned" message.
 *
 * To publish a trip, add an object to `groupTrips` using the template at the
 * bottom of this file, set `published: true`, and (optionally) add a photo at
 * public/images/group-trips/<slug>.jpg. The trip then appears on the homepage,
 * the Group Trips page, its own detail page and the sitemap.
 */

export type TripItineraryDay = { title: string; description: string };

export type GroupTrip = {
  slug: string;
  published: boolean;
  name: string;
  /** Optional link to an entry in destinations.ts. */
  destinationSlug?: string;
  destination: string;
  country: string;
  category?: string;
  image: { src: string; alt: string };
  summary: string;
  /** ISO dates, e.g. "2027-03-14". */
  departureDate: string;
  returnDate: string;
  /** Human-readable, e.g. "4 days / 3 nights". */
  duration: string;
  departureLocation: string;
  /** Display text so currency and conditions can be written exactly, e.g. "R4 500 per person sharing". */
  pricePerPerson: string;
  groupSize?: string;
  accommodation?: string;
  transport?: string;
  activities?: string[];
  itinerary?: TripItineraryDay[];
  included?: string[];
  excluded?: string[];
  paymentArrangements?: string;
  bookingConditions?: string;
};

export const groupTrips: GroupTrip[] = [];

export function getPublishedTrips(): GroupTrip[] {
  return groupTrips
    .filter((t) => t.published)
    .sort((a, b) => a.departureDate.localeCompare(b.departureDate));
}

export function getTrip(slug: string): GroupTrip | undefined {
  return getPublishedTrips().find((t) => t.slug === slug);
}

/*
TEMPLATE — copy into the groupTrips array above and replace every value with
confirmed details. Remove optional fields you don't need.

{
  slug: "example-trip-slug",
  published: true,
  name: "Trip name",
  destinationSlug: "sun-city",
  destination: "Sun City",
  country: "South Africa",
  category: "Weekend getaway",
  image: { src: "/images/group-trips/example-trip-slug.jpg", alt: "Describe the photo" },
  summary: "One or two sentences about the trip.",
  departureDate: "YYYY-MM-DD",
  returnDate: "YYYY-MM-DD",
  duration: "3 days / 2 nights",
  departureLocation: "Departure point",
  pricePerPerson: "Confirmed price per person",
  groupSize: "Up to N travellers",
  accommodation: "Accommodation details",
  transport: "Transport details",
  activities: ["Activity"],
  itinerary: [{ title: "Day 1", description: "What happens" }],
  included: ["Included item"],
  excluded: ["Excluded item"],
  paymentArrangements: "Deposit and payment schedule",
  bookingConditions: "Cancellation and booking conditions",
},
*/
