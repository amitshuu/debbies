const navLinks = ["Shop", "About", "Contact", "Custom Clutch"];
const shopLinks = ["Ready-made Bags", "Custom Bags", "New Arrivals", "Gift Cards"];

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-espresso rounded-t-2xl">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Column 1: Brand + social */}
          <div className="flex flex-col gap-5">
            <p className="font-serif text-[22px] text-cream leading-snug">
              Debbies
            </p>
            {/* PLACEHOLDER — replace with real tagline */}
            <p className="text-[13px] text-espresso-soft leading-[1.7]">
              Handmade bags, made just for you.
            </p>
            <div className="flex gap-5 mt-1">
              {/* PLACEHOLDER links — replace with real social URLs */}
              <a
                href="#"
                aria-label="Instagram"
                className="text-espresso-soft hover:text-cream transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-espresso-soft hover:text-cream transition-colors duration-200"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="text-espresso-soft hover:text-cream transition-colors duration-200"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-cream mb-1">
              Navigate
            </p>
            {navLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="text-[14px] text-espresso-soft hover:text-cream transition-colors duration-200 leading-relaxed"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Column 3: Shop */}
          <div className="flex flex-col gap-4">
            <p className="text-[13px] font-medium tracking-[0.12em] uppercase text-cream mb-1">
              Shop
            </p>
            {shopLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="text-[14px] text-espresso-soft hover:text-cream transition-colors duration-200 leading-relaxed"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-espresso-soft/30">
          <p className="text-[13px] text-espresso-soft">
            © Debbies {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
