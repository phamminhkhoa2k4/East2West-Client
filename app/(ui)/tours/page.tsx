import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import CarouselFeatures from "@/components/CarouselFeatures";
import Categories from "@/components/Categories";
import OtherOffers from "@/components/OtherOffers";
import Packages from "@/components/tour/Packages";
import Recently from "@/components/tour/Recently";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours Package | East2West",
  description: "This Is Tours Package Page Of East2West Tours and Travel",
};



const Tours = () => {
  return (
    <>
      <Banner url={"/banner/tour_banner.jpeg"} />
      <div className="mx-20">
        <Breadcrumb />
      </div>
      <div className="mx-40">
        <Recently />
        <CarouselFeatures />
        <Packages />
        <Packages />
      </div>
      {/* <Categories /> */}
      {/* <OtherOffers /> */}
    </>
  );
};

export default Tours;
