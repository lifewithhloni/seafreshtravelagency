import { brand, contact } from "@/config/site";

/** WhatsApp and email link builders. Safe to use in server and client components. */

export const isWhatsAppConfigured = contact.whatsappNumber !== null;
export const isEmailConfigured = contact.email !== null;
export const hasAnyContactChannel = isWhatsAppConfigured || isEmailConfigured;

export function whatsappUrl(message: string): string | null {
  if (!contact.whatsappNumber) return null;
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject: string, body: string): string | null {
  if (!contact.email) return null;
  // CRLF line breaks are the most widely supported in mailto bodies.
  const normalisedBody = body.replace(/\r?\n/g, "\r\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(normalisedBody)}`;
}

/** Standard short enquiry, e.g. about a destination or trip. */
export function enquiryMessage(topic?: string): string {
  const about = topic ? topic : "travelling with you";
  return `Hello ${brand.name}. I would like to enquire about ${about}. Please provide more information.`;
}

export function enquirySubject(topic?: string): string {
  return topic ? `Enquiry: ${topic}` : `Travel enquiry — ${brand.shortName}`;
}

/** Ready-made WhatsApp + email links for a topic. Either may be null if not configured. */
export function enquiryLinks(topic?: string) {
  const message = enquiryMessage(topic);
  return {
    whatsapp: whatsappUrl(message),
    email: mailtoUrl(enquirySubject(topic), message),
  };
}
