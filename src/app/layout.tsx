import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Debbies — תיקים עשויים ביד",
  description:
    "תיקים עשויים ביד ומותאמים אישית. עיינו בקולקציה שלנו של תיקים מוכנים וקלאץ׳ מותאם אישית.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
    >
      <body className="min-h-screen flex flex-col bg-cream text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
