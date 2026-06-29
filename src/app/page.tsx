import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/storefront/Hero";
import { ClutchConfigurator } from "@/components/storefront/ClutchConfigurator";
import { ProductCarousel } from "@/components/storefront/ProductCarousel";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ClutchConfigurator />
        <ProductCarousel />
      </main>
      <Footer />
    </>
  );
}
