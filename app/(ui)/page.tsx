import Feature from "@/components/Feature";

import Hero from "@/components/Hero";
import TopCategories from "@/components/TopCategories";
import Faq from "@/components/FAQ";
import Criteria from "@/components/Criteria";
import OtherOffers from "@/components/OtherOffers";
import CarouselFeatures from "@/components/CarouselFeatures";
import Categories from "@/components/Categories";

export default function Home() {
  return (
    <div className="mx-20">
      <Hero />
      <div className="mt-20">
        <TopCategories />
      </div>

      {/* <Categories /> */}
      {/* <OtherOffers /> */}
      <Feature />
      <CarouselFeatures />
      {/* <Criteria /> */}
      {/* <Faq /> */}
    </div>
  );
}
