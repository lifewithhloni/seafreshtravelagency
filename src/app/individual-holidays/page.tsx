import type { Metadata } from "next";
import { Suspense } from "react";
import { HolidayEnquiryForm } from "@/components/forms/HolidayEnquiryForm";
import { CheckIcon } from "@/components/icons";
import { FaqList, PageHero } from "@/components/sections";
import { Container } from "@/components/ui";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Individual Holidays",
  description:
    "Plan a holiday around your own preferences. Tell SeaFresh Travel Agency where and when you'd like to travel and send your enquiry via WhatsApp or email.",
  alternates: { canonical: "/individual-holidays" },
};

const steps = [
  "Tell us your destination, dates, travellers and budget.",
  "Send your enquiry to us through WhatsApp or email.",
  "We get back to you to talk through the available options.",
  "Confirm your booking once you’re happy with the details.",
];

export default function IndividualHolidaysPage() {
  const relatedFaqs = faqs.filter((f) => ["individual", "travel"].includes(f.topic) || f.question.startsWith("How do I receive"));

  return (
    <>
      <PageHero
        eyebrow="Personalised holiday enquiries"
        title="Individual Holidays"
        intro="Travelling solo, as a couple, with family or with friends? Share your preferences and we’ll help you explore holiday options that suit you."
        image={{ src: "/images/individual-holidays/individual-holidays-hero.jpg", alt: "A relaxed individual holiday", motif: "dunes" }}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl sm:text-4xl">How it works</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coastal font-display text-lg text-teal-strong">
                    {i + 1}
                  </span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-2xl bg-sand p-5 text-[0.95rem]">
              <p className="flex gap-3">
                <CheckIcon className="mt-1 shrink-0 text-teal-strong" />
                <span>
                  The arrangements available — such as accommodation, transport or activities — depend on your trip. We’ll confirm exactly what’s
                  included when we respond to your enquiry.
                </span>
              </p>
            </div>
          </div>

          <div id="enquiry" className="scroll-mt-28 rounded-[2rem] bg-white p-6 ring-1 ring-ocean/10 sm:p-10">
            <h2 className="text-3xl">Holiday enquiry</h2>
            <p className="mb-8 mt-2 text-ink-soft">Fields marked * are required.</p>
            <Suspense fallback={<p className="text-ink-soft">Loading the enquiry form…</p>}>
              <HolidayEnquiryForm />
            </Suspense>
          </div>
        </Container>
      </section>

      <section className="bg-coastal py-16 sm:py-20">
        <Container className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl">Questions about individual holidays</h2>
          <div className="mt-8">
            <FaqList items={relatedFaqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
