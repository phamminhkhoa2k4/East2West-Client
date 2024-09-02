"use client"
import { decodeWKB } from "@/utils/decodeWKB";
import dynamic from "next/dynamic";
import { Point } from "geojson";
import MapSearch from "@/components/homestay/MapSearch";
import Head from "next/head";
import SearchMap from "@/components/homestay/SearchMap";
import Mapp from "@/components/homestay/Map";
import { useState } from "react";
import DraggableMap from "@/components/homestay/MapMove";
import HereMap from "@/components/homestay/MapMove";




const DynamicMap = dynamic(
  () => import("@/components/Map"),
  { ssr: false }
);
export default function Map(){
  const handleMarkerDragEnd = (lat: number, lng: number) => {
    console.log("Marker dragged to:", lat, lng);
  };
  const APIKEY = process.env.NEXT_PUBLIC_HERE_API_KEY;
  // const[position, setPosition] = useState<{ lat: number; lng: number } | null>(
  //   null
  // );

  // const handleSelect = (lat: number, lng: number) => {
  //   setPosition({ lat, lng });
  // };
  //   const wkbArray = [
  //     "0101000020110F0000C250E51332715A40B1649ABA490D2440",
  //     "0101000020110F0000A155F0A909715A40111ACF6F0D0D2440",
  //   ];
    
  //    const coordinates  = wkbArray.map((wkbString) => {
  //      const geoJSON: Point = decodeWKB(wkbString);
  //      return geoJSON.coordinates as [number, number];
  //    });
    return (
      <div className="mt-72">
        {/* <Head>
          <title>HERE Map Search</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://js.api.here.com/v3/3.1/mapsjs-ui.css"
          />
        </Head> */}
        {/* <DynamicMap coordinates={coordinates} /> */}
        {/* <HereMap /> */}
        {/* <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://js.api.here.com/v3/3.1/mapsjs-ui.css"
          />
        </Head> */}
        {/* <SearchMap onSelect={handleSelect} />
        {position && <Mapp lat={position.lat} lng={position.lng} />} */}
       {/* <HereMap/> */}
      </div>
    );
}