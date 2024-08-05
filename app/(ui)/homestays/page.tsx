import Banner from "@/components/Banner/Banner";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Homestays | East2West",
  description: "This Is Homestays Page Of East2West Tours and Travel",
};

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselType } from "@/components/HomestayType";

function CarouselCard() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index): any => (
          <CarouselItem key={index}>
            <Link href={"/"}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center overflow-hidden p-0 rounded-2xl w-full h-full">
                    {/* <div className="bg-gray-500 rounded-2xl w-full h-full "> */}
                    <Image
                      className="object-cover aspect-square w-full h-full"
                      src={"/boat.png"}
                      alt=""
                      height={600}
                      width={600}
                    />
                    {/* </div> */}
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}







const Homestays: React.FC = () => {
  return (
    <>
      <Banner url={"/banner/homestay_banner.jpeg"} pageName={"Homestays"}  />
      <div className="mx-10 my-5">
        <CarouselType />
      </div>

      <div className="mt-3 gap-x-6 gap-y-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mx-20">
        <div className="w-full  border rounded-2xl p-2 shadow-lg">
          <CarouselCard />
          <Link href={"/"}>
            <h2 className="font-bold text-xl font-satoshi mt-2">
              Tay Ho Viet Nam
            </h2>
            <h3 className="text-lg text-gray-500 font-satoshi mb-2">
              1 Giuong
            </h3>
            <div className="mt-1 font-satoshi">
              <span className="font-bold text-[#222] text-lg leading-5">
                $ 200
              </span>{" "}
              / night
            </div>
            <div className="flex gap-2 justify-around mt-1">
              <div className="flex gap-2 bg-[#f8f9fd] items-center rounded-sm p-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </span>
                <span className="font-bold text-xs">6 Beds</span>
              </div>
              <div className="flex gap-2 bg-[#f8f9fd] items-center rounded-sm p-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </span>
                <span className="font-bold text-xs">6 Beds</span>
              </div>
              <div className="flex gap-2 bg-[#f8f9fd] items-center rounded-sm p-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </span>
                <span className="font-bold text-xs">6 Beds</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homestays;
