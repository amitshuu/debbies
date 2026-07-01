import Image from "next/image";
import { StitchLine } from "@/components/ui/StitchLine";

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
            {/* Eyebrow + signature stitch — the one animated moment on the page */}
            <div className="flex flex-col gap-3">
              <p className="font-sans font-light text-[13px] text-ink-soft">
                עשוי ביד · תפירה בעבודת יד
              </p>
              <StitchLine animated className="w-28 text-leather" />
            </div>
            {/* Plain upright — no italic mix, per RTL_AND_LOCALIZATION.md §5 */}
            <h1 className="font-display font-semibold text-[46px] md:text-[64px] lg:text-[88px] leading-[1.05] text-ink">
              מעוצב בידיים, נוצר בשבילך
            </h1>
            {/* PLACEHOLDER — replace with real brand copy */}
            <p className="font-sans font-light text-base text-ink-soft leading-[1.7] max-w-sm">
              כל תיק מספר סיפור. מעוצב ביד ומותאם אישית — כי מה שנושאים אותנו
              צריך להיות ייחודי בדיוק כמונו.
            </p>
            {/* Arrow points left (←) — RTL "forward" direction */}
            <a
              href="#"
              className="self-start border border-ink text-[13px] font-sans font-light uppercase px-7 py-3 text-ink hover:bg-ink hover:text-cream transition-colors duration-300"
            >
              ← גלו עוד
            </a>
          </div>

          {/* Image column — main image offset toward start (right in RTL) to leave room for badge */}
          <div className="relative">
            {/* Main hero image — PLACEHOLDER: replace with Debbie's real product photo */}
            <div className="relative aspect-[4/5] md:w-[86%] overflow-hidden">
              <Image
                src={HERO_IMAGE_URL}
                fill
                alt="תיק עור עשוי ביד על רקע נייטרלי"
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Badge image — desktop only, overlapping the end (left in RTL) corner of the main image.
                end-0 maps to left:0 in RTL, placing the badge in the 14% gap left of the 86%-wide main image. */}
            {/* PLACEHOLDER: replace with Debbie's real close-up product shot */}
            <div className="hidden md:block absolute bottom-[10%] end-0 w-[36%] bg-cream p-3">
              <div className="relative aspect-square">
                <Image
                  src={BADGE_IMAGE_URL}
                  fill
                  alt="תקריב של פרטי התיק"
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
