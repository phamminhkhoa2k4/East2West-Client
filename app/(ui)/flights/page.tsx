  "use client";
import Banner from "@/components/Banner/Banner";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Faq from "@/components/FAQ";
import Map from "@/components/flight/Map";
import Search from "@/components/flight/Search";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import FlightResult from "./FlightResult";

import { useLoading } from "@/store/loadingContext";
import Loading from "@/components/Loading";
import { createData } from "@/utils/axios";

// export const metadata: Metadata = {
//   title: "Flights | East2West",
//   description: "This Is Flights Page Of East2West Tours and Travel",
// };



const Flights = () => {
  const [flights, setFlights] = useState<FlightSearchResponse>();
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useLoading();
  setIsLoading(false)
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isDetail]);
  console.log(flights);
  
  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && (
        <>
          {!isDetail && <Banner url={"/banner/flight_banner.jpeg"} />}
          {/* <div className={`mx-20 ${!isDetail ? "" : "mt-45"}`}>
            <Breadcrumb />
          </div> */}
          {!isDetail && <Search setFlights={setFlights} />}
          {console.log(flights!)}

          <FlightResult
            flights={flights!}
            isDetail={isDetail}
            setIsDetail={setIsDetail}
          />
          {/* <Map /> */}
        </>
      )}
     
    </>
  );
};

export default Flights;
