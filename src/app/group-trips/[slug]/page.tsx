import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { EnquiryButtons } from "@/components/EnquiryButtons";
import { CalendarIcon, CheckIcon, ClockIcon, MapPinIcon, UsersIcon, XIcon } from "@/components/icons";
import { ScenicImage } from "@/components/ScenicImage";
import { formatTripDate } from "@/components/sections";
import { Badge, Container } from "@/components/ui";
import { getPublishedTrips, getTrip } from "@/content/trips";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedTrips().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/group-trips/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  return {
    title: trip.name,
    description: trip.summary,
    alternates: { canonical: `/group-trips/${trip.slug}` },
    openGraph: { title: trip.name, description: trip.summary },
  };
}

export default async function TripPage({ params }: PageProps<"/group-trips/[slug]">) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  const facts = [
    { icon: CalendarIcon, label: "Departs", value: formatTripDate(trip.departureDate) },
    { icon: CalendarIcon, label: "Returns", value: formatTripDate(trip.returnDate) },
    { icon: ClockIcon, label: "Duration", value: trip.duration },
    { icon: MapPinIcon, label: "Departure point", value: trip.departureLocation },
    ...(trip.groupSize ? [{ icon: UsersIcon, label: "Group size", value: trip.groupSize }] : []),
  ];

  return (
    <article>
      <section className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-ocean text-white sm:min-h-[32rem]">
        <ScenicImage src={trip.image.src} alt={trip.image.alt} motif="sea" priority className="-z-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/95 via-ocean/50 to-transparent" />
        <Container className="pb-12 pt-32">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/75">
            <Link href="/group-trips" className="hover:text-white">
              Group Trips
            </Link>{" "}
            / <span aria-current="page">{trip.name}</span>
          </nav>
          {trip.category && <Badge tone="glass">{trip.category}</Badge>}
          <h1 className="mt-4 text-4xl !text-white sm:text-6xl">{trip.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-lg text-white/85">
            <MapPinIcon /> {trip.destination}, {trip.country}
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div className="space-y-12">
          <p className="text-xl text-ink-soft">{trip.summary}</p>

          {trip.activities && trip.activities.length > 0 && (
            <Block title="Activities">
              <ul className="grid gap-3 sm:grid-cols-2">
                {trip.activities.map((a) => (
                  <li key={a} className="flex gap-3">
                    <CheckIcon className="mt-1 shrink-0 text-teal-strong" />
                    {a}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {trip.itinerary && trip.itinerary.length > 0 && (
            <Block title="Itinerary">
              <ol className="space-y-6 border-l-2 border-teal/40 pl-6">
                {trip.itinerary.map((day) => (
                  <li key={day.title} className="relative">
                    <span className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full bg-teal" aria-hidden="true" />
                    <h3 className="text-xl">{day.title}</h3>
                    <p className="mt-1 text-ink-soft">{day.description}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {(trip.accommodation || trip.transport) && (
            <div className="grid gap-6 sm:grid-cols-2">
              {trip.accommodation && (
                <Block title="Accommodation" small>
                  <p className="text-ink-soft">{trip.accommodation}</p>
                </Block>
              )}
              {trip.transport && (
                <Block title="Transport" small>
                  <p className="text-ink-soft">{trip.transport}</p>
                </Block>
              )}
            </div>
          )}

          {!!(trip.included?.length || trip.excluded?.length) && (
            <div className="grid gap-6 sm:grid-cols-2">
              {trip.included && trip.included.length > 0 && (
                <Block title="What’s included" small>
                  <ul className="space-y-2">
                    {trip.included.map((i) => (
                      <li key={i} className="flex gap-3">
                        <CheckIcon className="mt-1 shrink-0 text-teal-strong" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}
              {trip.excluded && trip.excluded.length > 0 && (
                <Block title="What’s not included" small>
                  <ul className="space-y-2">
                    {trip.excluded.map((i) => (
                      <li key={i} className="flex gap-3">
                        <XIcon className="mt-1 shrink-0 text-ink-soft" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}
            </div>
          )}

          {trip.paymentArrangements && (
            <Block title="Payment arrangements">
              <p className="text-ink-soft">{trip.paymentArrangements}</p>
            </Block>
          )}
          {trip.bookingConditions && (
            <Block title="Booking conditions">
              <p className="text-ink-soft">{trip.bookingConditions}</p>
            </Block>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-coastal p-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-strong">Price per person</p>
            <p className="mt-1 font-display text-3xl text-ocean">{trip.pricePerPerson}</p>
            <dl className="mt-6 space-y-3 border-t border-ocean/10 pt-6">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <f.icon className="mt-1 shrink-0 text-teal-strong" />
                  <div>
                    <dt className="text-sm text-ink-soft">{f.label}</dt>
                    <dd className="font-semibold text-ocean">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <EnquiryButtons topic={`the ${trip.name} group trip (${formatTripDate(trip.departureDate)})`} className="mt-7 [&>*]:w-full" />
          </div>
        </aside>
      </Container>
    </article>
  );
}

function Block({ title, children, small = false }: { title: string; children: ReactNode; small?: boolean }) {
  return (
    <section>
      <h2 className={small ? "mb-3 text-2xl" : "mb-5 text-3xl"}>{title}</h2>
      {children}
    </section>
  );
}
