import Link from "next/link";
import { ChatIcon, MailIcon } from "@/components/icons";
import { SeaFreshLogo } from "@/components/SeaFreshLogo";
import { Container } from "@/components/ui";
import { brand, contact, credit, socialLinks } from "@/config/site";
import { destinations } from "@/content/destinations";
import { mainNav } from "@/content/navigation";
import { enquiryLinks } from "@/lib/contact";

export function SiteFooter() {
  const links = enquiryLinks();
  const socials = socialLinks.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ocean-deep text-white/75">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <SeaFreshLogo tone="dark" size="lg" />
          <p className="mt-5 text-[0.95rem]">{brand.intro}</p>
          <p className="mt-4 font-display text-lg italic text-teal">{brand.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] !text-white">Explore</h2>
          <ul className="space-y-2.5 text-[0.95rem]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] !text-white">Destinations</h2>
          <ul className="space-y-2.5 text-[0.95rem]">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/destinations/${d.slug}`} className="hover:text-white">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] !text-white">Get in touch</h2>
          <ul className="space-y-3 text-[0.95rem]">
            <li>
              {links.whatsapp ? (
                <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <ChatIcon className="text-teal" /> WhatsApp
                </a>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <ChatIcon className="text-teal" /> WhatsApp — coming soon
                </span>
              )}
            </li>
            <li>
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all hover:text-white">
                  <MailIcon className="shrink-0 text-teal" /> {contact.email}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <MailIcon className="text-teal" /> Email — coming soon
                </span>
              )}
            </li>
          </ul>
          <div className="mt-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white">Follow us</p>
            {socials.length > 0 ? (
              <ul className="flex flex-wrap gap-3 text-[0.95rem]">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[0.95rem]">Social media channels coming soon.</p>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name}. All rights reserved.
          </p>
          {credit.show &&
            (credit.href ? (
              <a href={credit.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {credit.label}
              </a>
            ) : (
              <p>{credit.label}</p>
            ))}
        </Container>
      </div>
    </footer>
  );
}
