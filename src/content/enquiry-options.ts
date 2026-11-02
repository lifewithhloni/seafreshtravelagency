/**
 * Options shown in the individual holiday enquiry form.
 * Budget ranges are only a guide for the customer — they are not SeaFresh prices.
 */

export const holidayTypes = [
  "Beach & coastal",
  "Nature & scenery",
  "Wildlife & safari",
  "Adventure & activities",
  "Resort & relaxation",
  "Weekend getaway",
  "Family holiday",
  "Romantic getaway",
  "Celebration or special occasion",
  "Not sure yet",
] as const;

export const budgetRanges = [
  "Under R5 000",
  "R5 000 – R10 000",
  "R10 000 – R20 000",
  "R20 000 – R40 000",
  "Over R40 000",
  "I'd like to discuss",
] as const;

export const budgetBasisOptions = ["Per person", "For the whole group"] as const;

/** Value used in the destination dropdown when the customer has another place in mind. */
export const OTHER_DESTINATION = "other";
