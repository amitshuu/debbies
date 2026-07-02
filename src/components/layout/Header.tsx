"use client";

import { useState } from "react";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const startNavLinks = [
  { label: "חנות", href: "#" },
  { label: "אודות", href: "#" },
];

const endNavLinks = [{ label: "צור קשר", href: "#" }];

// No tracking for Hebrew nav text — wide letter-spacing breaks Hebrew readability
const navLinkClass =
  "font-sans font-light text-[15px] text-ink hover:text-leather transition-colors duration-200";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-cream relative z-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 md:py-8 flex items-center">
        {/* Start-side nav (right in RTL) — desktop only */}
        <nav className="hidden md:flex items-center gap-10 flex-1">
          {startNavLinks.map(({ label, href }) => (
            <a key={label} href={href} className={navLinkClass}>
              {label}
            </a>
          ))}
        </nav>

        {/* Logo — centered on all breakpoints; dir="ltr" keeps the Latin wordmark left-to-right */}
        <div className="flex-1 md:flex-none flex justify-center">
          <a href="/" aria-label="Debbies home" dir="ltr">
            <Logo width={164} height={35} priority />
          </a>
        </div>

        {/* End-side: nav + icons (desktop) | hamburger (mobile) */}
        <div className="flex-1 flex items-center justify-end gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {endNavLinks.map(({ label, href }) => (
              <a key={label} href={href} className={navLinkClass}>
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <a href="#" aria-label="חשבון">
              <User
                size={20}
                strokeWidth={1.5}
                className="text-ink hover:text-leather transition-colors duration-200"
              />
            </a>
            <a href="#" aria-label="עגלת קנייה">
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="text-ink hover:text-leather transition-colors duration-200"
              />
            </a>
          </div>
          <button
            className="md:hidden text-ink"
            onClick={() => setMenuOpen(true)}
            aria-label="פתח תפריט"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay — slides in from the end (left) edge in RTL */}
      <div
        className={`fixed inset-0 bg-cream z-50 flex flex-col px-6 py-6 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* dir="ltr" keeps the DEBBIES wordmark reading left-to-right inside the RTL overlay */}
          <a href="/" aria-label="Debbies home" dir="ltr">
            <Logo width={164} height={35} />
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="סגור תפריט"
            className="text-ink"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center flex-1 gap-10">
          {[...startNavLinks, ...endNavLinks].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="flex gap-6 mt-4">
            <a href="#" aria-label="חשבון" className="text-ink">
              <User size={20} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="עגלת קנייה" className="text-ink">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
