"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StitchLine } from "@/components/ui/StitchLine";

type PlaceholderProduct = {
  id: number;
  name: string;
  price: number;
};

// PLACEHOLDER — replace with real products fetched from DB
const PLACEHOLDER_PRODUCTS: PlaceholderProduct[] = [
  { id: 1, name: "תיק לדוגמה 1", price: 350 },
  { id: 2, name: "תיק לדוגמה 2", price: 420 },
  { id: 3, name: "תיק לדוגמה 3", price: 290 },
  { id: 4, name: "תיק לדוגמה 4", price: 510 },
  { id: 5, name: "תיק לדוגמה 5", price: 380 },
  { id: 6, name: "תיק לדוגמה 6", price: 460 },
];

export function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // In RTL, ← (ChevronLeft) is the "forward/next" direction, so it scrolls toward the end (negative x).
  // scrollBy left values work in physical pixel space regardless of dir; RTL flex lays items right→left.
  function scrollTowardEnd() {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: -(scrollRef.current.offsetWidth * 0.75),
      behavior: "smooth",
    });
  }

  function scrollTowardStart() {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth * 0.75,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-12 md:py-24">
      <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-4 md:mb-6">
          <h2 className="font-display font-semibold text-[30px] md:text-[40px] leading-[1.2] text-ink">
            הקולקציה שלנו
          </h2>
          <div className="hidden md:flex gap-2">
            {/* ChevronRight = ← visual direction in RTL layout = scroll toward start (first items) */}
            <button
              onClick={scrollTowardStart}
              aria-label="פריטים קודמים"
              className="w-10 h-10 flex items-center justify-center border border-border text-ink hover:border-leather hover:text-leather transition-colors duration-200"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
            {/* ChevronLeft = → visual direction in RTL layout = scroll toward end (later items) */}
            <button
              onClick={scrollTowardEnd}
              aria-label="פריטים הבאים"
              className="w-10 h-10 flex items-center justify-center border border-border text-ink hover:border-leather hover:text-leather transition-colors duration-200"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <StitchLine className="text-border mb-8 md:mb-12" />
      </div>

      {/* Start-padded scroll container (ps- = padding-inline-start = right in RTL).
          First card sits at the right edge after padding; carousel bleeds past max-width on the left. */}
      <div className="ps-6 md:ps-12">
        <div
          ref={scrollRef}
          className="flex items-start gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {PLACEHOLDER_PRODUCTS.map(({ id, name, price }, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={id}
                className={`flex-none snap-start ${
                  isFeatured
                    ? "w-[90%] sm:w-[70%] md:w-[calc(42%-12px)] lg:w-[calc(32%-16px)]"
                    : "w-[85%] sm:w-[60%] md:w-[calc(33%-12px)] lg:w-[calc(25%-16px)]"
                }`}
              >
                {isFeatured && (
                  <p className="font-sans font-light text-leather text-[12px] mb-2">
                    החתימה שלנו
                  </p>
                )}
                {/* PLACEHOLDER image — replace with real product photo */}
                <div className="aspect-[3/4] bg-border flex items-center justify-center hover:bg-border/80 transition-colors duration-300">
                  <span className="font-sans font-light text-ink-soft text-[12px]">
                    תמונת מוצר
                  </span>
                </div>
                <div className="pt-4 pb-2">
                  <p className="font-sans font-light text-ink text-[15px] leading-snug">
                    {name}
                  </p>
                  {/* Price numerals stay LTR per Unicode bidi — browser handles this automatically */}
                  {/* PLACEHOLDER price — real prices come from DB in agorot, convert to ₪ */}
                  <p className="font-sans font-light text-leather text-[14px] mt-1">
                    ₪{price}
                  </p>
                </div>
              </div>
            );
          })}
          {/* Spacer so last card clears the left (end) edge */}
          <div className="flex-none w-6 md:w-12" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
