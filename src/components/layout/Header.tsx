"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, ShoppingBag, User } from "lucide-react";

const leftNavLinks = [
  { label: "SHOP", href: "#" },
  { label: "ABOUT", href: "#" },
];

const rightNavLinks = [{ label: "CONTACT", href: "#" }];

const navLinkClass =
  "text-[13px] font-medium tracking-[0.12em] text-ink hover:text-leather transition-colors duration-200";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-cream relative z-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 md:py-8 flex items-center">
        {/* Left nav — desktop only */}
        <nav className="hidden md:flex items-center gap-10 flex-1">
          {leftNavLinks.map(({ label, href }) => (
            <a key={label} href={href} className={navLinkClass}>
              {label}
            </a>
          ))}
        </nav>

        {/* Logo — centered on all breakpoints */}
        <div className="flex-1 md:flex-none flex justify-center">
          <a href="/" aria-label="Debbies home">
            <Image
              src="/logo-transparent.svg"
              alt="Debbies"
              width={198}
              height={35}
              priority
            />
          </a>
        </div>

        {/* Right: nav + icons (desktop) | hamburger (mobile) */}
        <div className="flex-1 flex items-center justify-end gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {rightNavLinks.map(({ label, href }) => (
              <a key={label} href={href} className={navLinkClass}>
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-5">
            <a href="#" aria-label="Account">
              <User
                size={20}
                strokeWidth={1.5}
                className="text-ink hover:text-leather transition-colors duration-200"
              />
            </a>
            <a href="#" aria-label="Cart">
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
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay — slides in from right */}
      <div
        className={`fixed inset-0 bg-cream z-50 flex flex-col px-6 py-6 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="/" aria-label="Debbies home">
            <Image
              src="/logo-transparent.svg"
              alt="Debbies"
              width={198}
              height={35}
            />
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-ink"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center flex-1 gap-10">
          {[...leftNavLinks, ...rightNavLinks].map(({ label, href }) => (
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
            <a href="#" aria-label="Account" className="text-ink">
              <User size={20} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Cart" className="text-ink">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
