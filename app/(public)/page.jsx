'use client'
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";

export default function Home() {
  return (
    <div className="space-y-12">

      {/* HERO */}
      <Hero />

      {/* LATEST PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4">
        <LatestProducts />
      </section>

      {/* BEST SELLING */}
      <section className="max-w-7xl mx-auto px-4">
        <BestSelling />
      </section>

      {/* FEATURES / SPECS */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <OurSpecs />
        </div>
      </section>

    </div>
  );
}