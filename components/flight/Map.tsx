import { decodeWKB } from "@/utils/decodeWKB";
import dynamic from "next/dynamic";
import { Point } from "geojson";
import Image from "next/image";
const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Faq from "../FAQ";

function CarouselRecommendDestination() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full "
    >
      <CarouselContent>
        {Array.from({ length: 12 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/6 lg:basis-1/8">
            <div className="p-1">
              <Card>
                <CardContent className="flex  items-center justify-center p-6 px-0">
                  <div className="relative ml-[13px]">
                    <div className="rounded-lg overflow-hidden  ">
                      <Image
                        src={"/boat.png"}
                        alt=""
                        height={150}
                        width={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="absolute  text-lg  text-white left-4 top-13">Tokyo</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}


export default function Map() {
   const wkbArray = [
     "0101000020110F0000C250E51332715A40B1649ABA490D2440",
     "0101000020110F0000A155F0A909715A40111ACF6F0D0D2440",
   ];

   const coordinates = wkbArray.map((wkbString) => {
     const geoJSON: Point = decodeWKB(wkbString);
     return geoJSON.coordinates as [number, number];
   });
   return (
     <>
       <h3 className="text-bold text-xl mx-auto w-[1400px] my-5 pl-3">
         Find cheap flights from Ho Chi Minh City to anywhere
       </h3>
       <div className="mx-auto w-[1400px] flex gap-5 my-3 mb-5">
         <button className="p-3 px-5 border rounded-full">Can Tho</button>
         <button className="p-3 px-5 border rounded-full">Can Tho</button>
         <button className="p-3 px-5 border rounded-full">Can Tho</button>
       </div>
       <div className="mx-auto h-[500px] w-[1400px] rounded-3xl overflow-hidden bg-black">
         <DynamicMap coordinates={coordinates} />
       </div>
       <div className="mx-auto mt-10 w-[1400px] grid grid-cols-4 gap-5">
         <div>
           <div className="w-full h-[150px] rounded-2xl overflow-hidden">
             <Image
               src={"/boat.png"}
               alt=""
               height={200}
               width={300}
               className="object-cover w-full h-full"
             />
           </div>
           <div className="flex justify-between my-3">
             <h3 className="font-bold text-md">Pa ri</h3>
             <span className="font-bold text-md">37.300.000 USD</span>
           </div>
           <div className="font-medium">12 thg 8 - 18 thg 8</div>
           <div className="mt-1 font-medium">2 stop fffsd dsfsd </div>
         </div>
       </div>
       <div className="mx-auto mt-10 w-[1400px] ">
         <h3 className="my-3 text-lg font-bold">Điểm đến phổ biến khi bay từ Cần Thơ</h3>
         <CarouselRecommendDestination/>
       </div>
       

     </>
   );
}
