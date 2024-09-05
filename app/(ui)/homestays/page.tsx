"use client"
import Banner from "@/components/Banner/Banner";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getData } from "@/utils/axios";
// export const metadata: Metadata = {
//   title: "Homestays | East2West",
//   description: "This Is Homestays Page Of East2West Tours and Travel",
// };
interface HomestayAvailability {
  homestayavailabilityid: number;
  date: string;
  pricepernight: number;
  status: string;
}

interface Homestay {
  homestayid: number;
  wardId: number;
  hometypeId: number;
  userid: number;
  longitude: number;
  latitude: number;
  title: string;
  address: string;
  geom: string;
  photos: string;
  description: string;
  exactinfo: string;
  cleaningfee: number;
  isapproved: boolean;
  maxguest: number;
  perkIds: number[];
  availability: HomestayAvailability[];
}
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
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";

type photoProps = {
  photos : string
  url : number
}

function CarouselCard({ photos ,url }: photoProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index): any => (
          <CarouselItem key={index}>
            <Link href={`/homestays/${url}`}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center overflow-hidden p-0 rounded-xl w-full h-full">
                    {/* <div className="bg-gray-500 rounded-2xl w-full h-full "> */}
                    <Image
                      className="object-cover aspect-square w-full h-full"
                      src={photos}
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
  const [homestays, setHomestays] = React.useState<Homestay[]>([]);
   const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
      const getAll = async () => {
        try {
          const data = await getData({ endpoint: "/homestays" });
          setHomestays(data);
        } catch (err) {
          console.log(err);
          
        } finally {
          setLoading(false);
        }
      };
    
      getAll();
  }, []);
  return (
    <>
      <Banner url={"/banner/homestay_banner.jpeg"} />
      <div className="mx-20">
        <Breadcrumb />
      </div>
      <div className="mx-20">
        <CarouselType />
      </div>
      <div className="flex mx-20 gap-5 items-center">
        <div className="flex justify-between items-center p-6 border rounded-lg h-20 w-1/2">
          <div className="flex gap-5 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-normal text-lg">Filters</h3>
              <p className="underline underline-offset-2 text-xs">
                Type of accommodation,Rooms and bedrooms,Amenities
              </p>
            </div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="flex justify-between items-center p-6 border rounded-lg h-20 w-1/2">
          <div className="flex gap-5 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-normal text-lg">Display Total Price</h3>
              <div className="flex gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                    />
                  </svg>
                </div>
                <p className="text-xs">Includes All Fees, Before Taxes</p>
              </div>
            </div>
          </div>
          <div>
            <label className="inline-flex items-center  cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="mt-3 gap-x-2 gap-y-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mx-20">
        {homestays?.map((homestay, index) =>  {
          const currentDate = format(new Date(), "yyyy-MM-dd");
            const todayAvailability = homestay.availability.find(avail => {
        return avail.date.startsWith(currentDate);
    });
          return (
          <div key={index} className="w-full  border rounded-2xl p-2 shadow-lg">
            <CarouselCard photos="/boat.png" url={homestay.homestayid}/>
            <Link href={`/homestays/${homestay.homestayid}`}>
              <h2 className="font-bold text-xl font-satoshi mt-2 mb-2">
                {homestay.title}
              </h2>
              <h3 className="text-lg text-gray-500 font-satoshi mb-2">
                {homestay.address}
              </h3>
              <div className="mt-1 font-satoshi">
                <span className="font-bold text-[#222] text-lg leading-5">
                  $ {todayAvailability ? todayAvailability.pricepernight : "N/A"}
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
                  <span className="font-bold text-xs">6 Bath</span>
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
                  <span className="font-bold text-xs">{homestay.maxguest} Guest</span>
                </div>
              </div>
            </Link>
          </div>
        )})}
      </div>
      <div className="fixed  z-99 bottom-10 right-10">
        <button className="flex gap-3 px-6 py-4 border rounded-xl bg-slate-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
            />
          </svg>
          <span className="text-white font-medium">Show Map</span>
        </button>
      </div>
    </>
  );
};

export default Homestays;
