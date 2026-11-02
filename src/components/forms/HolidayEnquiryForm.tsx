"use client";

import { useSearchParams } from "next/navigation";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { describedBy, Field, inputClass, useHydrated } from "@/components/forms/fields";
import { EnquiryHandoff } from "@/components/forms/EnquiryHandoff";
import { ArrowRightIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { destinations, regionLabels } from "@/content/destinations";
import { budgetBasisOptions, budgetRanges, holidayTypes, OTHER_DESTINATION } from "@/content/enquiry-options";
import {
  emptyHolidayEnquiry,
  type FieldErrors,
  type HolidayEnquiry,
  holidayEnquiryMessage,
  holidayEnquirySubject,
  sanitiseHolidayEnquiry,
  validateHolidayEnquiry,
} from "@/lib/enquiry";

const FIELD_ORDER: (keyof HolidayEnquiry)[] = [
  "fullName",
  "phone",
  "email",
  "destination",
  "otherDestination",
  "departureDate",
  "returnDate",
  "adults",
  "children",
  "budget",
  "holidayType",
];

export function HolidayEnquiryForm() {
  const params = useSearchParams();
  const preselected = params.get("destination");
  const initialDestination = destinations.some((d) => d.slug === preselected) ? (preselected as string) : "";

  const [values, setValues] = useState<HolidayEnquiry>({ ...emptyHolidayEnquiry, destination: initialDestination });
  const [errors, setErrors] = useState<FieldErrors<HolidayEnquiry>>({});
  const [ready, setReady] = useState<HolidayEnquiry | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const hydrated = useHydrated();

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof HolidayEnquiry;
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const clean = sanitiseHolidayEnquiry(values);
    const found = validateHolidayEnquiry(clean);
    setErrors(found);
    const first = FIELD_ORDER.find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setReady(clean);
  }

  if (ready) {
    return <EnquiryHandoff subject={holidayEnquirySubject(ready)} message={holidayEnquiryMessage(ready)} onEdit={() => setReady(null)} />;
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const today = new Date().toISOString().slice(0, 10);
  const a = (id: keyof HolidayEnquiry, hint?: string) => describedBy(id, errors[id], hint);

  return (
    <form ref={formRef} method="post" onSubmit={submit} noValidate className="space-y-10">
      {errorCount > 0 && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
          Please check the {errorCount === 1 ? "highlighted field" : `${errorCount} highlighted fields`} below.
        </div>
      )}

      <fieldset className="space-y-5">
        <legend className="mb-4 font-display text-2xl text-ocean">Your details</legend>
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <input id="fullName" name="fullName" autoComplete="name" value={values.fullName} onChange={update} className={inputClass} {...a("fullName")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="phone" label="WhatsApp / contact number" required error={errors.phone} hint="Include your area or country code.">
            <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={update} className={inputClass} {...a("phone", "hint")} />
          </Field>
          <Field id="email" label="Email address" required error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} className={inputClass} {...a("email")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-4 font-display text-2xl text-ocean">Your trip</legend>
        <Field id="destination" label="Destination" required error={errors.destination}>
          <select id="destination" name="destination" value={values.destination} onChange={update} className={inputClass} {...a("destination")}>
            <option value="">Choose a destination</option>
            {(["south-africa", "southern-africa"] as const).map((region) => (
              <optgroup key={region} label={regionLabels[region]}>
                {destinations
                  .filter((d) => d.region === region)
                  .map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
              </optgroup>
            ))}
            <option value={OTHER_DESTINATION}>Somewhere else</option>
          </select>
        </Field>
        {values.destination === OTHER_DESTINATION && (
          <Field id="otherDestination" label="Where would you like to go?" required error={errors.otherDestination}>
            <input id="otherDestination" name="otherDestination" value={values.otherDestination} onChange={update} className={inputClass} {...a("otherDestination")} />
          </Field>
        )}
        <div className="grid gap-5 sm:grid-cols-3">
          <Field id="departureDate" label="Preferred travel date" required error={errors.departureDate}>
            <input id="departureDate" name="departureDate" type="date" min={today} value={values.departureDate} onChange={update} className={inputClass} {...a("departureDate")} />
          </Field>
          <Field id="returnDate" label="Return date" required error={errors.returnDate} hint="Or add a duration instead.">
            <input
              id="returnDate"
              name="returnDate"
              type="date"
              min={values.departureDate || today}
              value={values.returnDate}
              onChange={update}
              className={inputClass}
              {...a("returnDate", "hint")}
            />
          </Field>
          <Field id="duration" label="Approximate duration" error={errors.duration}>
            <input
              id="duration"
              name="duration"
              placeholder="e.g. 5 nights"
              value={values.duration}
              onChange={(e) => {
                update(e);
                if (e.target.value && errors.returnDate) setErrors((err) => ({ ...err, returnDate: undefined }));
              }}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="adults" label="Number of adults" required error={errors.adults}>
            <input id="adults" name="adults" type="number" min={1} max={99} inputMode="numeric" value={values.adults} onChange={update} className={inputClass} {...a("adults")} />
          </Field>
          <Field id="children" label="Number of children" required error={errors.children}>
            <input id="children" name="children" type="number" min={0} max={99} inputMode="numeric" value={values.children} onChange={update} className={inputClass} {...a("children")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-4 font-display text-2xl text-ocean">Your preferences</legend>
        <div className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
          <Field id="budget" label="Approximate budget" required error={errors.budget}>
            <select id="budget" name="budget" value={values.budget} onChange={update} className={inputClass} {...a("budget")}>
              <option value="">Choose a range</option>
              {budgetRanges.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
          <Field id="budgetBasis" label="Budget is" required>
            <select id="budgetBasis" name="budgetBasis" value={values.budgetBasis} onChange={update} className={inputClass}>
              {budgetBasisOptions.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field id="holidayType" label="Type of holiday" required error={errors.holidayType}>
          <select id="holidayType" name="holidayType" value={values.holidayType} onChange={update} className={inputClass} {...a("holidayType")}>
            <option value="">Choose a holiday type</option>
            {holidayTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field id="requirements" label="Additional requirements" hint="Accommodation preferences, accessibility needs, special occasions — anything that helps.">
          <textarea
            id="requirements"
            name="requirements"
            rows={5}
            maxLength={1000}
            value={values.requirements}
            onChange={update}
            className={inputClass}
            {...a("requirements", "hint")}
          />
        </Field>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-ocean/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-ink-soft">
          Your details aren’t stored on this website. On the next step you can send your enquiry to us through WhatsApp or email.
        </p>
        <button type="submit" disabled={!hydrated} className={buttonClass("secondary", "shrink-0")}>
          Prepare my enquiry <ArrowRightIcon />
        </button>
      </div>
    </form>
  );
}
