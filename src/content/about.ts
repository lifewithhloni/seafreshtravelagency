/**
 * About Us content.
 *
 * Mission and vision are DRAFTS for SeaFresh to approve or rewrite.
 * Optional sections stay hidden while their value is null — fill them in only
 * with confirmed information.
 */

export const about = {
  profile:
    "SeaFresh Travel Agency is building a travel offering for people who want to discover destinations, enjoy time away and create memorable travel experiences.",
  models: [
    {
      title: "Organised group trips",
      body: "Trips with shared dates and arrangements, designed for people who enjoy travelling with others and want the details organised for them.",
    },
    {
      title: "Individual holiday bookings",
      body: "Holiday enquiries built around your own destination, dates, budget and travel style — for solo travellers, couples, families and friends.",
    },
  ],
  /** Draft — awaiting approval. */
  mission:
    "To make travel easy to explore and enjoyable to plan, helping people discover new places and share meaningful journeys.",
  /** Draft — awaiting approval. */
  vision:
    "To become a trusted travel brand for people exploring South Africa and the wider Southern African region.",
  draftNotice: true,

  // Optional — leave null until confirmed by SeaFresh.
  founderStory: null as string | null,
  foundedYear: null as string | null,
  team: [] as { name: string; role: string }[],
  accreditations: [] as string[],
};
