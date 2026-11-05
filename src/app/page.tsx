import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CompassIcon, ShieldIcon, SunIcon, UsersIcon } from "@/components/icons";
import { ScenicImage } from "@/components/ScenicImage";
import { CtaBand, DestinationGrid, TripsSection, WaveDivider } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { destinations, getDestination } from "@/content/destinations";
import { experiences, finalCta, hero, howItWorks, whySeaFresh } from "@/content/home";
import { getPublishedTrips } from "@/content/trips";
import { existingImage } from "@/lib/images";

const whyIcons = [UsersIcon, CompassIcon, SunIcon, ShieldIcon];
const postcardSlugs = ["namib-desert", "victoria-falls", "xai-xai-beach"];

export default function HomePage() {
  const heroPhoto = existingImage(hero.image.src);
  const trips = getPublishedTrips().slice(0, 3);
  const postcards = postcardSlugs.map((s) => getDestination(s)).filter((d) => d !== undefined);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ocean text-white">
        {heroPhoto ? (
          <>
            <Image src={heroPhoto} alt={hero.image.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ocean-deep/90 via-ocean/70 to-ocean/20" />
          </>
        ) : (
          <HeroArt />
        )}
        <Container className="grid min-h-[min(88vh,52rem)] items-center gap-12 py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28">
          <div className="max-w-2xl animate-rise">
            <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            <h1 className="text-5xl !text-white sm:text-6xl lg:text-7xl">{hero.headline}</h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">{hero.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={hero.primaryCta.href} variant="primary">
                {hero.primaryCta.label} <ArrowRightIcon />
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="outline-light">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          {!heroPhoto && (
            <div className="relative mx-auto hidden h-[35rem] w-full max-w-[32rem] lg:block" aria-hidden="true">
              {postcards.map((d, i) => (
                <div
                  key={d.slug}
                  className={`absolute w-64 rounded-2xl bg-white p-2.5 pb-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] animate-rise ${
                    ["left-0 top-0 -rotate-6", "right-0 top-24 rotate-3", "bottom-0 left-0 -rotate-2"][i]
                  }`}
                  style={{ animationDelay: `${150 + i * 120}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <ScenicImage src={d.image.src} alt={d.image.alt} motif={d.motif} sizes="256px" />
                  </div>
                  <p className="mt-3 px-1 font-display text-lg text-ocean">{d.name}</p>
                  <p className="px-1 text-xs font-semibold uppercase tracking-wider text-teal-strong">{d.location}</p>
                </div>
              ))}
            </div>
          )}
        </Container>
        <WaveDivider className="text-white" />
      </section>

      {/* Choose your travel experience */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Two ways to travel"
            title="Choose your travel experience"
            intro="Whether you'd like to join others on an organised trip or plan something around your own preferences, we're here to help."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {experiences.map((exp) => (
              <Link
                key={exp.href}
                href={exp.href}
                className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] p-8 text-white sm:p-10"
              >
                <ScenicImage
                  src={exp.image.src}
                  alt={exp.image.alt}
                  motif={exp.motif}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-20 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-deep/95 via-ocean/55 to-transparent" />
                <h3 className="text-3xl !text-white sm:text-4xl">{exp.title}</h3>
                <p className="mt-3 max-w-md text-white/85">{exp.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-teal transition-all group-hover:gap-3">
                  {exp.cta} <ArrowRightIcon />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="bg-coastal py-16 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Explore destinations"
              title="Places we’re excited to share"
              intro="From South African favourites to remarkable spots across the region — these are the destinations SeaFresh is planning travel around."
            />
            <ButtonLink href="/destinations" variant="ghost" className="shrink-0 bg-white">
              All destinations <ArrowRightIcon />
            </ButtonLink>
          </div>
          <div className="mt-12">
            <DestinationGrid items={destinations} />
          </div>
        </Container>
      </section>

      {/* Why SeaFresh */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why explore with SeaFresh"
            title="Travel planning that keeps things simple"
            intro="We want travelling with us to feel welcoming and easy to understand, from your first question to your trip."
          />
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {whySeaFresh.map((item, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <li key={item.title}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-coastal text-2xl text-teal-strong">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-xl">{item.title}</h3>
                  <p className="mt-2 text-ink-soft">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-ocean py-16 text-white sm:py-24">
        <Container>
          <SectionHeading tone="dark" eyebrow="How it works" title="From first idea to confirmed booking" align="center" />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {howItWorks.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="font-display text-5xl italic text-teal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl !text-white">{step.title}</h3>
                <p className="mt-2 text-white/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Upcoming travel opportunities */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Upcoming travel opportunities" title="Group trips" />
            {trips.length > 0 && (
              <ButtonLink href="/group-trips" variant="ghost" className="shrink-0">
                View all group trips <ArrowRightIcon />
              </ButtonLink>
            )}
          </div>
          <div className="mt-10">
            <TripsSection trips={trips} />
          </div>
        </Container>
      </section>

      <CtaBand heading={finalCta.heading} body={finalCta.body} primary={finalCta.primary} secondary={finalCta.secondary} image={finalCta.image} />
    </>
  );
}

/** Illustrated hero background used until an official hero photo is supplied. */
function HeroArt() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,#1d5f74_0%,#103b50_45%,#0a2a3a_100%)]" />
      <div className="absolute right-[12%] top-[14%] h-56 w-56 rounded-full bg-[#f2c58a]/25 blur-3xl" />
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[45%] w-full">
        <path d="M0 220c180-60 360-70 540-30s360 70 540 40 270-60 360-50v220H0Z" fill="#4ab7b0" opacity="0.12" />
        <path d="M0 280c200-50 380-40 560 0s380 50 560 20 240-40 320-30v130H0Z" fill="#4ab7b0" opacity="0.18" />
        <path d="M0 330c220-30 420-20 620 5s400 25 580 5 180-20 240-15v75H0Z" fill="#4ab7b0" opacity="0.25" />
      </svg>
    </div>
  );
}
