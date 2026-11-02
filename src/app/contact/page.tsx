import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { ChatIcon, MailIcon } from "@/components/icons";
import { PageHero } from "@/components/sections";
import { ButtonAnchor, Container } from "@/components/ui";
import type { ReactNode } from "react";
import { contact, socialLinks } from "@/config/site";
import { enquiryLinks } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact SeaFresh Travel Agency on WhatsApp or by email to ask about group trips, individual holidays and destinations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const links = enquiryLinks();
  const socials = socialLinks.filter((s) => s.href);

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        intro="Questions about a destination, a group trip or a holiday idea? WhatsApp and email are the quickest ways to reach SeaFresh."
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="space-y-5">
            <ChannelCard
              icon={<ChatIcon />}
              title="WhatsApp"
              body="Chat to us directly — a message is filled in for you to edit and send."
              comingSoon={!links.whatsapp}
            >
              {links.whatsapp && (
                <ButtonAnchor href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-5">
                  <ChatIcon className="text-lg" /> Open WhatsApp
                </ButtonAnchor>
              )}
            </ChannelCard>

            <ChannelCard icon={<MailIcon />} title="Email" body="Prefer email? Send us your questions and travel ideas." comingSoon={!contact.email}>
              {links.email && contact.email && (
                <>
                  <p className="mt-3 break-all font-semibold text-ocean">{contact.email}</p>
                  <ButtonAnchor href={links.email} variant="ghost" className="mt-4">
                    <MailIcon className="text-lg" /> Write an email
                  </ButtonAnchor>
                </>
              )}
            </ChannelCard>

            <div className="rounded-3xl bg-sand p-7">
              <h2 className="font-sans text-sm font-bold uppercase tracking-[0.18em] !text-ocean">Social media</h2>
              {socials.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-4">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-ocean underline underline-offset-4">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-ink-soft">Our social media channels are coming soon.</p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 ring-1 ring-ocean/10 sm:p-10">
            <h2 className="text-3xl">Send us a message</h2>
            <p className="mb-8 mt-2 text-ink-soft">
              Fill in the form and we’ll prepare your message for WhatsApp or email. Planning a holiday? Our{" "}
              <Link href="/individual-holidays#enquiry" className="font-semibold text-teal-strong underline underline-offset-4">
                individual holiday form
              </Link>{" "}
              collects everything we need.
            </p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function ChannelCard({
  icon,
  title,
  body,
  comingSoon,
  children,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  comingSoon: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-coastal p-7">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl text-teal-strong">{icon}</span>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <p className="mt-4 text-ink-soft">{body}</p>
      {comingSoon ? <p className="mt-4 font-semibold text-ocean">Contact details coming soon.</p> : children}
    </div>
  );
}
