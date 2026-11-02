"use client";

import { useEffect, useRef, useState } from "react";
import { ChatIcon, CheckIcon, CopyIcon, MailIcon } from "@/components/icons";
import { buttonClass } from "@/components/ui";
import { hasAnyContactChannel, mailtoUrl, whatsappUrl } from "@/lib/contact";

/**
 * Shown once a form passes validation. There is no backend: the enquiry is
 * handed to WhatsApp or the visitor's email app, and the copy says so honestly.
 */
export function EnquiryHandoff({ subject, message, onEdit }: { subject: string; message: string; onEdit: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const [opened, setOpened] = useState(false);
  const wa = whatsappUrl(message);
  const mail = mailtoUrl(subject, message);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  }

  return (
    <div className="rounded-3xl bg-coastal p-6 sm:p-8" role="region" aria-labelledby="handoff-heading">
      <h3 id="handoff-heading" ref={headingRef} tabIndex={-1} className="text-2xl outline-none sm:text-3xl">
        {hasAnyContactChannel ? "Your enquiry is ready to send" : "Your enquiry is ready"}
      </h3>

      {hasAnyContactChannel ? (
        <p className="mt-3 text-ink-soft">
          <strong className="text-ocean">Nothing has been sent yet.</strong> Choose how you’d like to send it — WhatsApp or your email app
          will open with your message filled in, ready for you to press send.
        </p>
      ) : (
        <p className="mt-3 text-ink-soft" role="status">
          <strong className="text-ocean">Our WhatsApp and email channels are still being set up</strong>, so this enquiry can’t be sent from the
          website yet. You can copy your message below and send it once our contact details are available.
        </p>
      )}

      {hasAnyContactChannel && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => setOpened(true)} className={buttonClass("primary")}>
              <ChatIcon className="text-lg" /> Send via WhatsApp
            </a>
          )}
          {mail && (
            <a href={mail} onClick={() => setOpened(true)} className={buttonClass(wa ? "ghost" : "primary", wa ? "bg-white" : "")}>
              <MailIcon className="text-lg" /> Send via email
            </a>
          )}
        </div>
      )}

      {opened && (
        <p className="mt-4 text-sm text-ink-soft" role="status">
          Once you’ve sent the message in WhatsApp or your email app, we’ll get back to you. If nothing opened, copy the message below and send it to
          us directly.
        </p>
      )}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-ocean">Your message</p>
          <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-strong hover:text-ocean">
            {copied === "done" ? <CheckIcon /> : <CopyIcon />}
            {copied === "done" ? "Copied" : "Copy message"}
          </button>
        </div>
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl bg-white p-4 font-sans text-sm text-ink ring-1 ring-ocean/10">{message}</pre>
        {copied === "failed" && (
          <p className="mt-2 text-sm text-red-700" role="alert">
            Copying didn’t work in this browser — please select the text and copy it manually.
          </p>
        )}
      </div>

      <button type="button" onClick={onEdit} className="mt-6 text-sm font-semibold text-ocean underline underline-offset-4 hover:text-teal-strong">
        ← Edit my details
      </button>
    </div>
  );
}
