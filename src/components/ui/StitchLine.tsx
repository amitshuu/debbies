type StitchLineProps = {
  animated?: boolean;
  className?: string;
};

// Hand-stitch signature motif: an irregular dashed, gently undulating line.
// `animated` draws it in once (hero-only "signature moment"); otherwise it's
// a static, quiet section-divider reused in place of a plain hairline border.
export function StitchLine({ animated = false, className = "" }: StitchLineProps) {
  return (
    <svg
      viewBox="0 0 320 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`h-2 w-full ${animated ? "stitch-line-animated" : ""} ${className}`}
    >
      <path
        d="M0,4 Q10,1.5 20,4 T40,4 T60,4 T80,4 T100,4 T120,4 T140,4 T160,4 T180,4 T200,4 T220,4 T240,4 T260,4 T280,4 T300,4 T320,4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="7 5 4 6"
      />
    </svg>
  );
}
