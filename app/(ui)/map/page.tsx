"use client"
import { decodeWKB } from "@/utils/decodeWKB";
import dynamic from "next/dynamic";
import { Point } from "geojson";
const DynamicMap = dynamic(
  () => import("@/components/Map"),
  { ssr: false }
);
export default function Map(){
    const wkbArray = [
      "0101000020110F0000C250E51332715A40B1649ABA490D2440",
      "0101000020110F0000A155F0A909715A40111ACF6F0D0D2440",
    ];
    
     const coordinates  = wkbArray.map((wkbString) => {
       const geoJSON: Point = decodeWKB(wkbString);
       return geoJSON.coordinates as [number, number];
     });
    return (
      <>
        {/* <DynamicMap coordinates={coordinates} /> */}
      </>
    );
}