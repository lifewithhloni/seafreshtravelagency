"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { describedBy, Field, inputClass, useHydrated } from "@/components/forms/fields";
import { EnquiryHandoff } from "@/components/forms/EnquiryHandoff";
import { ArrowRightIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { destinations } from "@/content/destinations";
import {
  emptyGeneralEnquiry,
  type FieldErrors,
  type GeneralEnquiry,
  generalEnquiryMessage,
  generalEnquirySubject,
  sanitiseGeneralEnquiry,
  validateGeneralEnquiry,
} from "@/lib/enquiry";

const TOPICS = [
  "Upcoming group trips",
  "An individual holiday",
  ...destinations.map((d) => `The ${d.name} destination`),
  "Something else",
] as const;

export function ContactForm() {
  const [values, setValues] = useState<GeneralEnquiry>(emptyGeneralEnquiry);
  const [errors, setErrors] = useState<FieldErrors<GeneralEnquiry>>({});
  const [ready, setReady] = useState<GeneralEnquiry | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const hydrated = useHydrated();

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof GeneralEnquiry;
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const clean = sanitiseGeneralEnquiry(values);
    const found = validateGeneralEnquiry(clean, TOPICS);
    setErrors(found);
    const first = (["name", "topic", "message"] as const).find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setReady(clean);
  }

  if (ready) {
    return <EnquiryHandoff subject={generalEnquirySubject(ready)} message={generalEnquiryMessage(ready)} onEdit={() => setReady(null)} />;
  }

  return (
    <form ref={formRef} method="post" onSubmit={submit} noValidate className="space-y-5">
      <Field id="name" label="Your name" required error={errors.name}>
        <input id="name" name="name" autoComplete="name" value={values.name} onChange={update} className={inputClass} {...describedBy("name", errors.name)} />
      </Field>
      <Field id="topic" label="What is your enquiry about?" required error={errors.topic}>
        <select id="topic" name="topic" value={values.topic} onChange={update} className={inputClass} {...describedBy("topic", errors.topic)}>
          <option value="">Choose a topic</option>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field id="message" label="Message" required error={errors.message}>
        <textarea id="message" name="message" rows={5} maxLength={1000} value={values.message} onChange={update} className={inputClass} {...describedBy("message", errors.message)} />
      </Field>
      <button type="submit" disabled={!hydrated} className={buttonClass("secondary", "w-full sm:w-auto")}>
        Prepare my message <ArrowRightIcon />
      </button>
      <p className="text-sm text-ink-soft">Your details aren’t stored on this website — you’ll send the message yourself through WhatsApp or email.</p>
    </form>
  );
}
