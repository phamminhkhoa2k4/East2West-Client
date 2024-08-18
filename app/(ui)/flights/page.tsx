import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Faq from "@/components/FAQ";
import Map from "@/components/flight/Map";
import Search from "@/components/flight/Search";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Flights | East2West",
  description: "This Is Flights Page Of East2West Tours and Travel",
};

const Flights = () => {
  return (
    <>
      <Banner url={"/banner/flight_banner.jpeg"}  />
      <div className="mx-20">
        <Breadcrumb />
      </div>
      <Search />
      <Map />
      <Faq />
    </>
  );
};

export default Flights;