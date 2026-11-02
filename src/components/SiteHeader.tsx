"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatIcon, MenuIcon, XIcon } from "@/components/icons";
import { SeaFreshLogo } from "@/components/SeaFreshLogo";
import { buttonClass } from "@/components/ui";
import { mainNav } from "@/content/navigation";
import { enquiryLinks } from "@/lib/contact";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const whatsapp = enquiryLinks().whatsapp;

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow ${
        scrolled ? "border-ocean/10 shadow-[0_6px_24px_-18px_rgba(16,59,80,0.5)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <SeaFreshLogo size="md" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.slice(1).map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3 py-2 text-[0.92rem] font-semibold transition-colors ${
                      active ? "bg-coastal text-ocean" : "text-ink-soft hover:text-ocean"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "hidden !px-4 !py-2.5 sm:inline-flex")}>
              <ChatIcon className="text-lg" /> WhatsApp us
            </a>
          )}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-2xl text-ocean hover:bg-coastal lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-18 overflow-y-auto border-t border-ocean/10 bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="px-4 pb-10 pt-4 sm:px-6">
          <ul className="divide-y divide-ocean/10">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 font-display text-2xl ${active ? "text-teal-strong" : "text-ocean"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "mt-8 w-full")}>
              <ChatIcon className="text-lg" /> Chat to us on WhatsApp
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
