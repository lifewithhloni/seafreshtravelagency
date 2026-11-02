import { ChatIcon, MailIcon } from "@/components/icons";
import { ButtonAnchor, ButtonLink, type ButtonVariant } from "@/components/ui";
import { enquiryLinks, hasAnyContactChannel } from "@/lib/contact";

type Props = {
  /** What the customer is asking about, e.g. "the Namib Desert". */
  topic?: string;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * WhatsApp + email enquiry buttons with a prefilled message.
 * Buttons only appear for channels configured in the environment; if neither
 * is configured, visitors are pointed to the Contact page instead.
 */
export function EnquiryButtons({ topic, tone = "light", className = "" }: Props) {
  const links = enquiryLinks(topic);
  const primary: ButtonVariant = "primary";
  const secondary: ButtonVariant = tone === "dark" ? "outline-light" : "ghost";

  if (!hasAnyContactChannel) {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        <ButtonLink href="/contact" variant={primary}>
          How to contact us
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {links.whatsapp && (
        <ButtonAnchor href={links.whatsapp} target="_blank" rel="noopener noreferrer" variant={primary}>
          <ChatIcon className="text-lg" /> Enquire on WhatsApp
        </ButtonAnchor>
      )}
      {links.email && (
        <ButtonAnchor href={links.email} variant={links.whatsapp ? secondary : primary}>
          <MailIcon className="text-lg" /> Enquire by email
        </ButtonAnchor>
      )}
    </div>
  );
}
