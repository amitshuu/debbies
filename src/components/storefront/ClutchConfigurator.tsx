"use client";

import Image from "next/image";
import { useState } from "react";
import { StitchLine } from "@/components/ui/StitchLine";

// ---------------------------------------------------------------------------
// Label overlay — calibrated constants, do not recalculate.
// All values are fractions of the 1010×1024 base image dimensions.
// See docs/PROGRESS.md for full calibration history.
// ---------------------------------------------------------------------------
const LABEL_CENTER_X = 0.45;
const LABEL_CENTER_Y = 0.36;
const LABEL_WIDTH    = 0.11;
const LABEL_HEIGHT   = 0.06;
const LABEL_ROTATION = -0.15; // radians (≈−8.6°)

// Each option needs a `imageUrl` pointing to a pre-composited lining PNG
// (1010×1024, transparent outside the lining shape, opaque inside).
// Options without a real asset yet are kept in the list but marked disabled
// in the dropdown with "(בקרוב)" until their PNG is generated and added.
const LINING_OPTIONS = [
  { name: "זברה",       swatchColor: "#C8C8C8", imageUrl: "/images/clutch/lining-zebra.png" },
  { name: "אריות",     swatchColor: "#7E7760", imageUrl: "/images/clutch/lining-lion.png" },
  { name: "שנהב",      swatchColor: "#F5F0E0", imageUrl: null },
  { name: "ורוד אבק",  swatchColor: "#D4A5A0", imageUrl: null },
  { name: "כחול נייבי", swatchColor: "#1C2B4A", imageUrl: null },
  { name: "יין",       swatchColor: "#6B2A3A", imageUrl: null },
  { name: "ירוק יער",  swatchColor: "#2A5A3A", imageUrl: null },
  { name: "שחור",      swatchColor: "#1A1A1A", imageUrl: null },
];

const DEFAULT_OPTION = LINING_OPTIONS[0];

export function ClutchConfigurator() {
  const [selectedName, setSelectedName] = useState(DEFAULT_OPTION.name);
  const selected = LINING_OPTIONS.find((o) => o.name === selectedName) ?? DEFAULT_OPTION;

  return (
    <section className="py-12 md:py-24 px-6 md:px-12">
      <StitchLine className="text-border mb-12 md:mb-16" />
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Preview — DOM-first = visually right in RTL */}
          <div className="relative w-full aspect-[1010/1024]">

            {/* Layer 1: bag body photo */}
            <Image
              src="/images/clutch/clutch-base.png"
              fill
              alt="קלאץ' עשוי ביד"
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            {/* Layer 2: selected lining — same 1010×1024 canvas, transparent outside lining shape */}
            {selected.imageUrl && (
              <Image
                src={selected.imageUrl}
                fill
                alt=""
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}

            {/* Layer 3: DEBBIE'S label at calibrated position/rotation */}
            <div
              style={{
                position: "absolute",
                left: `${LABEL_CENTER_X * 100}%`,
                top: `${LABEL_CENTER_Y * 100}%`,
                width: `${LABEL_WIDTH * 100}%`,
                height: `${LABEL_HEIGHT * 100}%`,
                transform: `translate(-50%, -50%) rotate(${LABEL_ROTATION}rad)`,
              }}
            >
              <Image
                src="/images/clutch/debbies-label.png"
                fill
                alt=""
                style={{ objectFit: "fill" }}
              />
            </div>

          </div>

          {/* Controls */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="font-sans font-light text-[13px] text-ink-soft">
                התאמה אישית
              </p>
              <h2 className="font-display font-semibold text-[30px] md:text-[40px] leading-[1.2] text-ink">
                קלאץ׳ בהתאמה אישית
              </h2>
            </div>
            <p className="font-sans font-light text-base text-ink-soft leading-[1.7]">
              בחרי את בטנת הקלאץ׳ שמדברת אלייך. כל שילוב הוא פריט אחד במינו —
              עשוי ביד, בשבילך.
            </p>

            <div className="flex flex-col gap-4">
              <span className="font-sans font-light text-[13px] text-ink-soft">
                צבע בטנה
              </span>

              {/* Swatches — visual chooser layered on top of the select below.
                  Same selectedName state, same LINING_OPTIONS/imageUrl availability logic. */}
              <div className="flex flex-wrap gap-3">
                {LINING_OPTIONS.map((option) => {
                  const isActive = option.name === selectedName;
                  const isAvailable = Boolean(option.imageUrl);
                  return (
                    <button
                      key={option.name}
                      type="button"
                      disabled={!isAvailable}
                      aria-pressed={isActive}
                      aria-label={option.name}
                      onClick={() => setSelectedName(option.name)}
                      className={`relative w-9 h-9 rounded-full border transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leather ${
                        isActive ? "border-leather" : "border-border"
                      } ${
                        isAvailable
                          ? "cursor-pointer hover:border-leather"
                          : "cursor-not-allowed opacity-30"
                      }`}
                      style={{ backgroundColor: option.swatchColor }}
                    >
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute -inset-1 rounded-full border border-leather"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <label htmlFor="lining-option" className="sr-only">
                צבע בטנה
              </label>
              <select
                id="lining-option"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                className="border border-border bg-cream text-ink font-sans font-light text-base px-4 py-3 focus:outline-none focus:ring-1 focus:ring-ink focus:border-ink hover:border-leather transition-colors duration-200 cursor-pointer appearance-none"
                style={{ direction: "rtl" }}
              >
                {LINING_OPTIONS.map((option) => (
                  <option
                    key={option.name}
                    value={option.name}
                    disabled={!option.imageUrl}
                  >
                    {option.name}{!option.imageUrl ? " (בקרוב)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
