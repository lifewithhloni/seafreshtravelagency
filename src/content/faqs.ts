/**
 * Frequently asked questions. Answers marked "policy pending" use neutral
 * wording until SeaFresh supplies its official policy — replace them then.
 */

export type FaqTopic = "general" | "group" | "individual" | "payments" | "travel";

export type Faq = { question: string; answer: string; topic: FaqTopic };

export const faqTopicLabels: Record<FaqTopic, string> = {
  general: "Getting started",
  group: "Group trips",
  individual: "Individual holidays",
  payments: "Payments & cancellations",
  travel: "Travel preparation",
};

const SPECIFIC_ARRANGEMENTS =
  "Please contact SeaFresh Travel Agency for the specific arrangements applicable to your selected trip.";

export const faqs: Faq[] = [
  {
    topic: "group",
    question: "How do group trips work?",
    answer:
      "SeaFresh organises trips where travellers share the same destination, dates and arrangements. When a group trip is confirmed, it is published on our Group Trips page with its dates, inclusions and price. You can then enquire to reserve a place or ask questions before you commit.",
  },
  {
    topic: "individual",
    question: "How do I enquire about an individual holiday?",
    answer:
      "Complete the enquiry form on our Individual Holidays page with your preferred destination, dates, number of travellers, budget and any special requirements. The form prepares a message you can send to us through WhatsApp or email.",
  },
  {
    topic: "general",
    question: "How do I receive a quotation?",
    answer:
      "Send us an enquiry with as much detail as you can. Once we understand what you're looking for, we'll get back to you with the available options and pricing for your trip.",
  },
  {
    topic: "general",
    question: "What happens after submitting an enquiry?",
    answer:
      "Your enquiry is sent to SeaFresh through WhatsApp or your email application — nothing is sent until you press send there. Once we receive it, we'll respond to discuss your options, answer questions and explain the next steps.",
  },
  {
    topic: "group",
    question: "What is included in a travel package?",
    answer: `Inclusions differ from trip to trip, and each published group trip lists what is and isn't included. ${SPECIFIC_ARRANGEMENTS}`,
  },
  {
    topic: "payments",
    question: "How do payments work?",
    answer: SPECIFIC_ARRANGEMENTS,
  },
  {
    topic: "payments",
    question: "What are the cancellation arrangements?",
    answer: SPECIFIC_ARRANGEMENTS,
  },
  {
    topic: "travel",
    question: "Can I travel with children?",
    answer:
      "You're welcome to include children in an individual holiday enquiry — just tell us how many are travelling. Whether children can join a specific group trip depends on that trip's arrangements, so please ask us when you enquire.",
  },
  {
    topic: "travel",
    question: "What travel documents might I need?",
    answer:
      "This depends on your destination and nationality. Travel outside South Africa — for example to Namibia, Zambia, Zimbabwe or Mozambique — generally requires a valid passport, and some travellers may need a visa. Travelling with children may require additional documents. Always confirm current requirements with the relevant official authorities before you travel.",
  },
  {
    topic: "general",
    question: "How do I contact SeaFresh?",
    answer:
      "You can reach us through WhatsApp or email. Visit our Contact Us page for the quickest way to get in touch.",
  },
];
