import Image from "next/image";

// PLACEHOLDER — swap both URLs for Debbie's real product photography
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1523297467724-f6758d7124c5?fm=jpg&q=80&w=1200";
const BADGE_IMAGE_URL =
  "https://images.unsplash.com/photo-1591561954555-607968c989ab?fm=jpg&q=80&w=400";

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center px-6 md:px-12 py-12">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text column */}
          <div className="flex flex-col gap-8 md:gap-10">
            <h1 className="font-serif text-[36px] md:text-[56px] leading-[1.1] text-ink">
              {"C"}
              <span className="italic">R</span>
              {"A"}
              <span className="italic">F</span>
              {"TED & P"}
              <span className="italic">E</span>
              {"RS"}
              <span className="italic">O</span>
              {"NAL"}
            </h1>
            {/* PLACEHOLDER — replace with real brand copy */}
            <p className="text-base text-ink-soft leading-[1.7] max-w-sm">
              Every bag tells your story. Handmade with care, each piece is
              crafted to be as unique as the person carrying it.
            </p>
            <a
              href="#"
              className="self-start border border-ink text-[13px] font-medium tracking-[0.08em] uppercase px-7 py-3 text-ink hover:bg-ink hover:text-cream transition-colors duration-300"
            >
              EXPLORE →
            </a>
          </div>

          {/* Image column — main image offset left to leave room for the badge */}
          <div className="relative">
            {/* Main hero image — PLACEHOLDER: replace with Debbie's real product photo */}
            <div className="relative aspect-[4/5] md:w-[86%] overflow-hidden">
              <Image
                src={HERO_IMAGE_URL}
                fill
                alt="Handmade leather bag on neutral background"
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Badge image — desktop only, overlapping bottom-right of main image.
                The asymmetric overlap is intentional per DESIGN_SYSTEM.md — do not remove on desktop. */}
            {/* PLACEHOLDER: replace with Debbie's real close-up product shot */}
            <div className="hidden md:block absolute bottom-[10%] right-0 w-[36%] bg-cream p-3">
              <div className="relative aspect-square">
                <Image
                  src={BADGE_IMAGE_URL}
                  fill
                  alt="Bag detail close-up"
                  className="object-cover"
                  sizes="20vw"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
