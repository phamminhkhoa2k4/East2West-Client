import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import HotelResult from "@/components/hotel/HotelResult";
import Map from "@/components/hotel/Map";
import Search from "@/components/hotel/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotels | East2West",
  description: "This Is Hotels Page Of East2West Tours and Travel",
};

const Hotels = () => {
  return (
    <>
      <Banner url={"/banner/hotel_banner.jpeg"}  />
      <div className="mx-20">
        <Breadcrumb />
      </div>
      <Search />
      <div className="grid grid-cols-2 gap-5 p-5 *:border-2 *:rounded-xl">
        <HotelResult />
        <Map />
      </div>
    </>
  );
};

export default Hotels;