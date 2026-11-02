import type { Metadata } from "next";
import { EnquiryButtons } from "@/components/EnquiryButtons";
import { CheckIcon } from "@/components/icons";
import { CtaBand, FaqList, PageHero, TripsSection } from "@/components/sections";
import { Container, SectionHeading } from "@/components/ui";
import { faqs } from "@/content/faqs";
import { getPublishedTrips } from "@/content/trips";

export const metadata: Metadata = {
  title: "Group Trips",
  description:
    "Organised group trips with SeaFresh Travel Agency. See upcoming travel opportunities or register your interest in a future group trip.",
  alternates: { canonical: "/group-trips" },
};

const groupFeatures = [
  "Shared dates and arrangements, published in full before you book",
  "A clear list of what is and isn’t included for each trip",
  "Travel alongside others who are just as excited to explore",
  "Ask questions on WhatsApp or by email before you commit",
];

export default function GroupTripsPage() {
  const trips = getPublishedTrips();
  const groupFaqs = faqs.filter((f) => f.topic === "group" || f.topic === "payments");

  return (
    <>
      <PageHero
        eyebrow="Organised group travel"
        title="Group Trips"
        intro="Explore new places in good company. SeaFresh group trips bring travellers together around shared destinations, dates and arrangements."
        image={{ src: "/images/group-trips/group-trips-hero.jpg", alt: "Travellers enjoying a group trip", motif: "sea" }}
      >
        <EnquiryButtons topic="upcoming group trips" />
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Upcoming trips"
            title={trips.length > 0 ? "Upcoming group trips" : "Our next trips are being planned"}
            intro={trips.length > 0 ? "Choose a trip to see its dates, inclusions and how to book." : undefined}
          />
          <div className="mt-10">
            <TripsSection trips={trips} />
          </div>
        </Container>
      </section>

      <section className="bg-coastal py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="How group trips work"
            title="Travel together, with the details organised"
            intro="When a group trip is confirmed, we publish its destination, dates, price and inclusions here. You can enquire to reserve a place or ask anything you'd like to know first."
          />
          <ul className="space-y-4 self-center">
            {groupFeatures.map((f) => (
              <li key={f} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-ocean/10">
                <CheckIcon className="mt-0.5 shrink-0 text-xl text-teal-strong" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Questions" title="Group trip FAQs" />
          <div className="mt-8">
            <FaqList items={groupFaqs} />
          </div>
        </Container>
      </section>

      <CtaBand
        heading="Want to hear about the next group trip?"
        body="Let us know which destinations interest you, and we'll be in touch when new trips are announced."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Explore destinations", href: "/destinations" }}
      />
    </>
  );
}
