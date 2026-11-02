import type { Metadata } from "next";
import { CtaBand, DestinationGrid, PageHero } from "@/components/sections";
import { Container, SectionHeading } from "@/components/ui";
import { getDestinationsByRegion, regionLabels } from "@/content/destinations";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore Sun City, Mpumalanga, Hartbeespoort, the Namib Desert, Victoria Falls and Xai-Xai Beach — destinations SeaFresh Travel Agency is planning travel around.",
  alternates: { canonical: "/destinations" },
};

const sections = [
  {
    region: "south-africa" as const,
    intro: "Easy-to-reach favourites for weekends away, scenic road trips and time to unwind.",
  },
  {
    region: "southern-africa" as const,
    intro: "Desert, waterfall and coastline experiences across the wider Southern African region.",
  },
];

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destination discovery"
        title="Destinations"
        intro="These are the places SeaFresh is planning travel around. Explore each destination, then get in touch to ask about group trips or an individual holiday there."
      />

      {sections.map((s, i) => (
        <section key={s.region} className={`py-16 sm:py-20 ${i % 2 === 1 ? "bg-coastal" : ""}`}>
          <Container>
            <SectionHeading eyebrow={`${String(i + 1).padStart(2, "0")} — Region`} title={regionLabels[s.region]} intro={s.intro} />
            <div className="mt-10">
              <DestinationGrid items={getDestinationsByRegion(s.region)} />
            </div>
          </Container>
        </section>
      ))}

      <CtaBand
        heading="Have another destination in mind?"
        body="Tell us where you'd like to go and we'll let you know how we can help."
        primary={{ label: "Plan an Individual Holiday", href: "/individual-holidays" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
