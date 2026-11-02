import type { Metadata } from "next";
import { CtaBand, FaqList, PageHero } from "@/components/sections";
import { Container } from "@/components/ui";
import { type FaqTopic, faqs, faqTopicLabels } from "@/content/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about SeaFresh Travel Agency group trips, individual holiday enquiries, quotations and travel preparation.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  const topics = (Object.keys(faqTopicLabels) as FaqTopic[]).filter((t) => faqs.some((f) => f.topic === t));

  return (
    <>
      <PageHero
        eyebrow="Help & information"
        title="Frequently asked questions"
        intro="Find answers to common questions about travelling with SeaFresh. Can’t find what you need? Get in touch and we’ll help."
      />

      <section className="py-16 sm:py-20">
        <Container className="max-w-4xl space-y-14">
          {topics.map((topic) => (
            <div key={topic}>
              <h2 className="mb-6 text-2xl sm:text-3xl">{faqTopicLabels[topic]}</h2>
              <FaqList items={faqs.filter((f) => f.topic === topic)} />
            </div>
          ))}
        </Container>
      </section>

      <CtaBand
        heading="Still have a question?"
        body="Send us a message on WhatsApp or by email and we'll get back to you."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
