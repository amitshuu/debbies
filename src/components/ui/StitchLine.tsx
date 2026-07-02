import { useId } from "react";

type StitchLineProps = {
  animated?: boolean;
  className?: string;
};

// Hand-stitch signature motif: a straight line of short, even dashes — the
// "handmade" feel comes from the stitch rhythm (and, in the Hero, the
// needle-pulled draw-in), not from any wobble in the line itself.
//
// The animated variant reveals right-to-left via an SVG mask (matching
// Hebrew RTL reading direction — see docs/RTL_AND_LOCALIZATION.md). The mask
// is a solid full-length line whose stroke-dashoffset draws in classically;
// the visible thread keeps its fixed "9 6" dash pattern the whole time, so
// each stitch appears to snap into place as the mask sweeps past it, and a
// needle travels the same path to sell the "pulling the thread" moment.
export function StitchLine({ animated = false, className = "" }: StitchLineProps) {
  const maskId = useId();

  if (!animated) {
    return (
      <svg
        viewBox="0 0 320 8"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`h-2 w-full ${className}`}
      >
        <line
          x1="0"
          y1="4"
          x2="320"
          y2="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="9 6"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`h-5 stitch-line-animated ${className}`}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <line
            x1="298"
            y1="16"
            x2="0"
            y2="16"
            stroke="#fff"
            strokeWidth="8"
            strokeDasharray="298"
            strokeDashoffset="298"
            className="stitch-thread-reveal"
          />
        </mask>
      </defs>
      <line
        x1="298"
        y1="16"
        x2="0"
        y2="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="9 6"
        mask={`url(#${maskId})`}
      />
      {/* Needle: minimal filled silhouette (point leading, eye trailing) in
          ink — reads as metal against the leather-colored thread. Rides
          above the thread (authored at y≈4, 12 units clear of the y=16
          line) for the whole horizontal travel, then drops to land exactly
          on the line as the final "settle" — the needle sewing itself in. */}
      <g className="stitch-needle fill-ink" fillRule="evenodd">
        <path
          d="M 298 4 L 303 2.65 L 316 2.65 Q 320 2.65 320 4 Q 320 5.35 316 5.35 L 303 5.35 Z
             M 314.3 4 m -1.15 0 a 1.15 1.15 0 1 0 2.3 0 a 1.15 1.15 0 1 0 -2.3 0"
        />
      </g>
    </svg>
  );
}
