import type { Metadata } from "next";
import { CompassIcon, UsersIcon } from "@/components/icons";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, Eyebrow } from "@/components/ui";
import { brand } from "@/config/site";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description: about.profile,
  alternates: { canonical: "/about" },
};

const modelIcons = [UsersIcon, CompassIcon];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={`About ${brand.shortName}`} title="About SeaFresh Travel Agency" intro={about.profile} />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">Two ways to travel with us</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {about.models.map((m, i) => {
              const Icon = modelIcons[i % modelIcons.length];
              return (
                <div key={m.title} className="rounded-3xl bg-coastal p-8 sm:p-10">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl text-teal-strong">
                    <Icon />
                  </span>
                  <h3 className="mt-5 text-2xl">{m.title}</h3>
                  <p className="mt-3 text-ink-soft">{m.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Our mission</Eyebrow>
            <p className="font-display text-2xl leading-snug text-ocean sm:text-3xl">{about.mission}</p>
          </div>
          <div>
            <Eyebrow>Our vision</Eyebrow>
            <p className="font-display text-2xl leading-snug text-ocean sm:text-3xl">{about.vision}</p>
          </div>
        </Container>
      </section>

      {(about.founderStory || about.foundedYear || about.team.length > 0 || about.accreditations.length > 0) && (
        <section className="py-16 sm:py-20">
          <Container className="max-w-3xl space-y-10">
            {(about.founderStory || about.foundedYear) && (
              <div>
                <h2 className="text-3xl">Our story</h2>
                {about.foundedYear && <p className="mt-2 font-semibold text-teal-strong">Established {about.foundedYear}</p>}
                {about.founderStory && <p className="mt-4 text-lg text-ink-soft">{about.founderStory}</p>}
              </div>
            )}
            {about.team.length > 0 && (
              <div>
                <h2 className="text-3xl">Our team</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {about.team.map((p) => (
                    <li key={p.name} className="rounded-2xl bg-coastal p-5">
                      <p className="font-semibold text-ocean">{p.name}</p>
                      <p className="text-sm text-ink-soft">{p.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {about.accreditations.length > 0 && (
              <div>
                <h2 className="text-3xl">Accreditations</h2>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-ink-soft">
                  {about.accreditations.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </section>
      )}

      <CtaBand
        heading={brand.tagline}
        body={brand.supportingMessage}
        primary={{ label: "Explore destinations", href: "/destinations" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
        image={{ src: "/images/brand/journey-banner.jpg", alt: "Friends leaping off a sailing catamaran into the sea" }}
      />
    </>
  );
}
