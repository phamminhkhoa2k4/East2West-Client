"use client"
import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
// import { Metadata } from "next";
import HotelResult from "@/components/hotel/HotelResult";
import Map from "@/components/hotel/Map";
import Search from "@/components/hotel/Search";
import { Hotel } from "@/types/hotel";

import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Hotels | East2West",
//   description: "This Is Hotels Page Of East2West Tours and Travel",
// };

const Hotels = () => {
  const [hotels, setHotel] = useState<Hotel>();
  return (
    <>
      <Banner url={"/banner/hotel_banner.jpeg"} />
      {/* <div className="mx-20">
        <Breadcrumb />
      </div> */}
      <div className="mb-5">

      <Search setHotel={setHotel} />
      </div>
      {hotels?.properties.length! > 0 && (
        <div className="grid grid-cols-2 gap-5 p-5 *:border-2 *:rounded-xl">
          <HotelResult hotel={hotels!} />
          <Map hotels={hotels?.properties!} />
        </div>
      )}
    </>
  );
};

export default Hotels;