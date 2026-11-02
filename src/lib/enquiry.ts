import { brand } from "@/config/site";
import { budgetBasisOptions, budgetRanges, holidayTypes, OTHER_DESTINATION } from "@/content/enquiry-options";
import { destinations, getDestination } from "@/content/destinations";

/**
 * Enquiry form types, sanitising, validation and message formatting.
 * Nothing here stores or logs personal information — enquiries are only
 * turned into a message the customer sends themselves.
 */

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/** Trim, strip control characters (keeping line breaks) and cap length. */
export function sanitise(value: unknown, maxLength = 200): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, maxLength);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidPhone(value: string): boolean {
  const digits = value.replace(/[\s()+-]/g, "");
  return /^\d{9,15}$/.test(digits);
}

function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

/* ---------------------------------------------------------------- Holiday */

export type HolidayEnquiry = {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  otherDestination: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  adults: string;
  children: string;
  budget: string;
  budgetBasis: string;
  holidayType: string;
  requirements: string;
};

export const emptyHolidayEnquiry: HolidayEnquiry = {
  fullName: "",
  phone: "",
  email: "",
  destination: "",
  otherDestination: "",
  departureDate: "",
  returnDate: "",
  duration: "",
  adults: "1",
  children: "0",
  budget: "",
  budgetBasis: budgetBasisOptions[0],
  holidayType: "",
  requirements: "",
};

export function sanitiseHolidayEnquiry(raw: HolidayEnquiry): HolidayEnquiry {
  return {
    fullName: sanitise(raw.fullName, 80),
    phone: sanitise(raw.phone, 25),
    email: sanitise(raw.email, 120),
    destination: sanitise(raw.destination, 60),
    otherDestination: sanitise(raw.otherDestination, 80),
    departureDate: sanitise(raw.departureDate, 10),
    returnDate: sanitise(raw.returnDate, 10),
    duration: sanitise(raw.duration, 60),
    adults: sanitise(raw.adults, 3),
    children: sanitise(raw.children, 3),
    budget: sanitise(raw.budget, 60),
    budgetBasis: sanitise(raw.budgetBasis, 40),
    holidayType: sanitise(raw.holidayType, 60),
    requirements: sanitise(raw.requirements, 1000),
  };
}

export function validateHolidayEnquiry(data: HolidayEnquiry): FieldErrors<HolidayEnquiry> {
  const errors: FieldErrors<HolidayEnquiry> = {};
  const validDestinations = new Set([...destinations.map((d) => d.slug), OTHER_DESTINATION]);

  if (data.fullName.length < 2) errors.fullName = "Please enter your full name.";
  if (!isValidPhone(data.phone)) errors.phone = "Please enter a valid contact number, including the area or country code.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";

  if (!validDestinations.has(data.destination)) {
    errors.destination = "Please choose a destination.";
  } else if (data.destination === OTHER_DESTINATION && data.otherDestination.length < 2) {
    errors.otherDestination = "Please tell us where you'd like to go.";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.departureDate)) {
    errors.departureDate = "Please choose your preferred travel date.";
  } else if (data.departureDate < todayIso()) {
    errors.departureDate = "Your travel date can't be in the past.";
  }

  if (data.returnDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.returnDate)) {
      errors.returnDate = "Please choose a valid return date.";
    } else if (data.departureDate && data.returnDate < data.departureDate) {
      errors.returnDate = "Your return date must be after your travel date.";
    }
  } else if (!data.duration) {
    errors.returnDate = "Please add a return date or an approximate duration.";
  }

  const adults = Number(data.adults);
  if (!Number.isInteger(adults) || adults < 1 || adults > 99) errors.adults = "Please enter at least 1 adult.";
  const children = Number(data.children || "0");
  if (!Number.isInteger(children) || children < 0 || children > 99) errors.children = "Please enter 0 or more children.";

  if (!(budgetRanges as readonly string[]).includes(data.budget)) errors.budget = "Please choose an approximate budget.";
  if (!(holidayTypes as readonly string[]).includes(data.holidayType)) errors.holidayType = "Please choose a holiday type.";

  return errors;
}

function destinationName(data: HolidayEnquiry): string {
  if (data.destination === OTHER_DESTINATION) return data.otherDestination;
  return getDestination(data.destination)?.name ?? data.destination;
}

export function holidayEnquirySubject(data: HolidayEnquiry): string {
  return `Individual holiday enquiry — ${destinationName(data)}`;
}

export function holidayEnquiryMessage(data: HolidayEnquiry): string {
  const children = Number(data.children || "0");
  const lines = [
    `Hello ${brand.name}. I would like to enquire about an individual holiday. Please provide more information.`,
    "",
    `Name: ${data.fullName}`,
    `Contact number: ${data.phone}`,
    `Email: ${data.email}`,
    "",
    `Destination: ${destinationName(data)}`,
    `Preferred travel date: ${formatDate(data.departureDate)}`,
  ];
  if (data.returnDate) lines.push(`Return date: ${formatDate(data.returnDate)}`);
  if (data.duration) lines.push(`Approximate duration: ${data.duration}`);
  lines.push(
    `Travellers: ${data.adults} adult${data.adults === "1" ? "" : "s"}${children > 0 ? `, ${children} child${children === 1 ? "" : "ren"}` : ""}`,
    `Approximate budget: ${data.budget}${data.budget === budgetRanges[budgetRanges.length - 1] ? "" : ` (${data.budgetBasis.toLowerCase()})`}`,
    `Holiday type: ${data.holidayType}`,
  );
  if (data.requirements) lines.push("", `Additional requirements: ${data.requirements}`);
  return lines.join("\n");
}

/* ---------------------------------------------------------------- General */

export type GeneralEnquiry = {
  name: string;
  topic: string;
  message: string;
};

export const emptyGeneralEnquiry: GeneralEnquiry = { name: "", topic: "", message: "" };

export function sanitiseGeneralEnquiry(raw: GeneralEnquiry): GeneralEnquiry {
  return {
    name: sanitise(raw.name, 80),
    topic: sanitise(raw.topic, 80),
    message: sanitise(raw.message, 1000),
  };
}

export function validateGeneralEnquiry(data: GeneralEnquiry, topics: readonly string[]): FieldErrors<GeneralEnquiry> {
  const errors: FieldErrors<GeneralEnquiry> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!topics.includes(data.topic)) errors.topic = "Please choose what your enquiry is about.";
  if (data.message.length < 5) errors.message = "Please write a short message.";
  return errors;
}

export function generalEnquiryMessage(data: GeneralEnquiry): string {
  return [`Hello ${brand.name}. My name is ${data.name}.`, `I'm enquiring about: ${data.topic}.`, "", data.message].join("\n");
}

export function generalEnquirySubject(data: GeneralEnquiry): string {
  return `Enquiry: ${data.topic}`;
}
