"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PlaceholderProduct = {
  id: number;
  name: string;
  price: number;
};

// PLACEHOLDER — replace with real products fetched from DB
const PLACEHOLDER_PRODUCTS: PlaceholderProduct[] = [
  { id: 1, name: "Placeholder Bag 1", price: 350 },
  { id: 2, name: "Placeholder Bag 2", price: 420 },
  { id: 3, name: "Placeholder Bag 3", price: 290 },
  { id: 4, name: "Placeholder Bag 4", price: 510 },
  { id: 5, name: "Placeholder Bag 5", price: 380 },
  { id: 6, name: "Placeholder Bag 6", price: 460 },
];

export function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: -(scrollRef.current.offsetWidth * 0.75),
      behavior: "smooth",
    });
  }

  function scrollRight() {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth * 0.75,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-12 md:py-24">
      <div className="px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <h2 className="font-serif text-[28px] md:text-[36px] leading-[1.2] text-ink">
            OUR COLLECTION
          </h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="w-10 h-10 flex items-center justify-center border border-border text-ink hover:border-leather hover:text-leather transition-colors duration-200"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="w-10 h-10 flex items-center justify-center border border-border text-ink hover:border-leather hover:text-leather transition-colors duration-200"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Left-padded scroll container — intentionally bleeds past max-width on the right */}
      <div className="pl-6 md:pl-12">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          {PLACEHOLDER_PRODUCTS.map(({ id, name, price }) => (
            <div
              key={id}
              className="flex-none snap-start w-[85%] sm:w-[60%] md:w-[calc(33%-12px)] lg:w-[calc(25%-16px)]"
            >
              {/* PLACEHOLDER image — replace with real product photo */}
              <div className="aspect-[3/4] bg-border flex items-center justify-center hover:bg-border/80 transition-colors duration-300">
                <span className="text-ink-soft text-[12px] font-medium tracking-[0.08em] uppercase">
                  Product image
                </span>
              </div>
              <div className="pt-4 pb-2">
                <p className="font-sans font-medium text-ink text-[15px] leading-snug">
                  {name}
                </p>
                {/* PLACEHOLDER price — real prices come from DB in agorot, convert to ₪ */}
                <p className="font-sans text-leather text-[14px] mt-1">
                  ₪{price}
                </p>
              </div>
            </div>
          ))}
          {/* Spacer so last card clears the right edge */}
          <div className="flex-none w-6 md:w-12" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
