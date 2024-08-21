import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Brands from "@/components/car/Brands";
import Collection from "@/components/car/Collection";
import OurPopular from "@/components/car/OurPopular";
import OurService from "@/components/car/OurService";
import Categories from "@/components/Categories";
import OtherOffers from "@/components/OtherOffers";
import { Metadata } from "next";export const metadata: Metadata = {
  title: "Rental Cars | East2West",
  description: "This Is Rental Cars Page Of East2West Tours and Travel",
};const Cars = () => {
  return (
    <>
      <Banner url={"/banner/car_banner.jpeg"} />
      <div className="mx-20">
        <Breadcrumb />
      </div>
      <Brands />
      <div className="mx-20">
        <OurService />
        <OurPopular />
        <Collection/>
      </div>


      {/* <Categories /> */}
      {/* <OtherOffers />  */}
    </>
  );
};

export default Cars;