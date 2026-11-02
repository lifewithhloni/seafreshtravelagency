import Link from "next/link";
import type { ReactNode } from "react";
import { EnquiryButtons } from "@/components/EnquiryButtons";
import { ArrowRightIcon, CalendarIcon, ChevronDownIcon, ClockIcon, CompassIcon, MapPinIcon } from "@/components/icons";
import { ScenicImage } from "@/components/ScenicImage";
import { Badge, ButtonLink, Container, Eyebrow } from "@/components/ui";
import { type Destination, statusLabels } from "@/content/destinations";
import type { Faq } from "@/content/faqs";
import { tripsEmptyState } from "@/content/home";
import type { GroupTrip } from "@/content/trips";

/* ------------------------------------------------------------ Page hero */

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  image,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children?: ReactNode;
  image?: { src: string; alt: string; motif: Destination["motif"] };
}) {
  return (
    <section className="relative overflow-hidden bg-coastal">
      <Container className={`grid items-center gap-10 py-14 sm:py-20 ${image ? "lg:grid-cols-[1.1fr_1fr]" : ""}`}>
        <div className="max-w-2xl animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          <div className="mt-5 text-lg text-ink-soft sm:text-xl">{intro}</div>
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(16,59,80,0.45)]">
            <ScenicImage src={image.src} alt={image.alt} motif={image.motif} priority sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        )}
      </Container>
      <WaveDivider className="text-white" />
    </section>
  );
}

export function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" className={`block h-8 w-full sm:h-12 ${className}`}>
      <path fill="currentColor" d="M0 34c160-24 320-34 480-22s320 40 480 34 320-30 480-26v40H0Z" />
    </svg>
  );
}

/* ------------------------------------------------------------ Destination card */

export function DestinationCard({ destination, headingLevel = "h3" }: { destination: Destination; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ocean/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(16,59,80,0.55)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ScenicImage
          src={destination.image.src}
          alt={destination.image.alt}
          motif={destination.motif}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4">
          <Badge tone="glass">{statusLabels[destination.status]}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-teal-strong">
          <MapPinIcon /> {destination.location}
        </p>
        <Heading className="mt-2 text-2xl">
          <Link href={`/destinations/${destination.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {destination.name}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-[0.97rem] text-ink-soft">{destination.summary}</p>
        <div className="mt-5 flex items-center justify-between border-t border-ocean/10 pt-4 text-sm">
          <span className="text-ink-soft">{destination.category}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-ocean transition group-hover:gap-2">
            Explore <ArrowRightIcon />
          </span>
        </div>
      </div>
    </article>
  );
}

export function DestinationGrid({ items }: { items: Destination[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d) => (
        <DestinationCard key={d.slug} destination={d} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ Trips */

export function formatTripDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export function TripCard({ trip }: { trip: GroupTrip }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ocean/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(16,59,80,0.55)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <ScenicImage src={trip.image.src} alt={trip.image.alt} motif="sea" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        {trip.category && (
          <div className="absolute left-4 top-4">
            <Badge tone="glass">{trip.category}</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-teal-strong">
          <MapPinIcon /> {trip.destination}, {trip.country}
        </p>
        <h3 className="mt-2 text-2xl">
          <Link href={`/group-trips/${trip.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {trip.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.97rem] text-ink-soft">{trip.summary}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-ocean/10 pt-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarIcon className="text-teal-strong" />
            <dt className="sr-only">Departs</dt>
            <dd>{formatTripDate(trip.departureDate)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="text-teal-strong" />
            <dt className="sr-only">Duration</dt>
            <dd>{trip.duration}</dd>
          </div>
          <div className="col-span-2 font-semibold text-ocean">
            <dt className="sr-only">Price</dt>
            <dd>{trip.pricePerPerson}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export function TripsSection({ trips }: { trips: GroupTrip[] }) {
  if (trips.length === 0) return <TripsEmptyState />;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {trips.map((t) => (
        <TripCard key={t.slug} trip={t} />
      ))}
    </div>
  );
}

export function TripsEmptyState() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-sand px-6 py-12 sm:px-12 sm:py-14">
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -right-10 -top-10 h-56 w-56 text-sand-deep">
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="relative max-w-2xl">
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl text-teal-strong">
          <CompassIcon />
        </span>
        <h3 className="text-2xl sm:text-3xl">Upcoming group trips are on the way</h3>
        <p className="mt-3 text-lg text-ink-soft">{tripsEmptyState}</p>
        <EnquiryButtons topic="upcoming group trips" className="mt-7" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ FAQs */

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-ocean/10 rounded-3xl bg-white ring-1 ring-ocean/10">
      {items.map((faq) => (
        <details key={faq.question} className="group px-6 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-semibold text-ocean [&::-webkit-details-marker]:hidden">
            <span className="text-[1.05rem]">{faq.question}</span>
            <ChevronDownIcon className="shrink-0 text-xl text-teal-strong transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <p className="pb-6 pr-8 text-ink-soft">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------ CTA band */

export function CtaBand({
  heading,
  body,
  primary,
  secondary,
}: {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ocean px-6 py-16 text-center sm:px-16 sm:py-20">
          <svg aria-hidden="true" viewBox="0 0 1200 300" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/2 w-full">
            <path d="M0 180c200-60 400-60 600 0s400 60 600 0v120H0Z" fill="#4ab7b0" opacity="0.18" />
            <path d="M0 230c200-40 400-40 600 0s400 40 600 0v70H0Z" fill="#4ab7b0" opacity="0.25" />
          </svg>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl !text-white sm:text-5xl">{heading}</h2>
            <p className="mt-4 text-lg text-white/80">{body}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={primary.href} variant="primary">
                {primary.label} <ArrowRightIcon />
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} variant="outline-light">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
