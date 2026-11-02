"use client";

import { type ReactNode, useSyncExternalStore } from "react";

export const inputClass =
  "block w-full rounded-xl border border-ocean/20 bg-white px-4 py-3 text-[1rem] text-ink shadow-sm transition placeholder:text-ink-soft/60 focus:border-teal focus:outline-none focus:ring-4 focus:ring-teal/20 aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/10";

export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ocean">
        {label}
        {required ? (
          <span className="text-red-700" aria-hidden="true">
            {" "}*
          </span>
        ) : (
          <span className="font-normal text-ink-soft"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria props wiring a control to its hint/error text. */
export function describedBy(id: string, error?: string, hint?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  } as const;
}

const noopSubscribe = () => () => {};

/**
 * True once React has hydrated. Forms keep their submit button disabled until
 * then, so a fast click can never fall back to a native submission that would
 * put personal details in the URL.
 */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
