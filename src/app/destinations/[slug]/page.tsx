import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryButtons } from "@/components/EnquiryButtons";
import { ArrowRightIcon, CheckIcon, MapPinIcon } from "@/components/icons";
import { ScenicImage } from "@/components/ScenicImage";
import { DestinationCard, TripCard } from "@/components/sections";
import { Badge, ButtonLink, Container } from "@/components/ui";
import { destinations, getDestination, regionLabels, statusLabels } from "@/content/destinations";
import { getPublishedTrips } from "@/content/trips";

export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: `${d.name}, ${d.location}`,
    description: d.summary,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { title: `${d.name} | SeaFresh Travel Agency`, description: d.summary },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const trips = getPublishedTrips().filter((t) => t.destinationSlug === d.slug);
  const others = destinations.filter((o) => o.slug !== d.slug && o.region === d.region).slice(0, 3);

  return (
    <article>
      <section className="relative isolate flex min-h-[28rem] items-end overflow-hidden bg-ocean text-white sm:min-h-[36rem]">
        <ScenicImage src={d.image.src} alt={d.image.alt} motif={d.motif} priority className="-z-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/95 via-ocean/45 to-transparent" />
        <Container className="pb-12 pt-32 animate-rise">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80">
            <Link href="/destinations" className="hover:text-white">
              Destinations
            </Link>{" "}
            / {regionLabels[d.region]}
          </nav>
          <div className="flex flex-wrap gap-2">
            <Badge tone="glass">{statusLabels[d.status]}</Badge>
            <Badge tone="glass">{d.category}</Badge>
          </div>
          <h1 className="mt-4 text-5xl !text-white sm:text-7xl">{d.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-lg text-white/85">
            <MapPinIcon /> {d.location}
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.6fr_1fr] lg:py-20">
        <div>
          <h2 className="text-3xl sm:text-4xl">About {d.name}</h2>
          <div className="mt-5 space-y-4 text-lg text-ink-soft">
            {d.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h2 className="mt-12 text-2xl sm:text-3xl">Known for</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {d.knownFor.map((k) => (
              <li key={k} className="flex gap-3 rounded-2xl bg-coastal p-4">
                <CheckIcon className="mt-1 shrink-0 text-teal-strong" />
                {k}
              </li>
            ))}
          </ul>

          {d.note && <p className="mt-8 rounded-2xl border border-sand-deep bg-sand p-5 text-[0.95rem]">{d.note}</p>}

          <h2 className="mt-12 text-2xl sm:text-3xl">Group trips to {d.name}</h2>
          {trips.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {trips.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-ink-soft">
              There are no confirmed group trips to {d.name} yet. Get in touch to let us know you’re interested, or ask about an individual
              holiday.
            </p>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-ocean p-7 text-white">
            <h2 className="text-2xl !text-white">Interested in {d.name}?</h2>
            <p className="mt-3 text-white/80">Send us a message and we’ll share the travel options we can help with.</p>
            <EnquiryButtons topic={d.name} tone="dark" className="mt-6 [&>*]:w-full" />
            <div className="mt-6 border-t border-white/15 pt-6">
              <ButtonLink href={`/individual-holidays?destination=${d.slug}#enquiry`} variant="light" className="w-full">
                Plan an individual holiday <ArrowRightIcon />
              </ButtonLink>
            </div>
          </div>
        </aside>
      </Container>

      {others.length > 0 && (
        <section className="bg-coastal py-16 sm:py-20">
          <Container>
            <h2 className="text-3xl sm:text-4xl">More in {regionLabels[d.region]}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <DestinationCard key={o.slug} destination={o} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
