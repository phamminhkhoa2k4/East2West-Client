"use client";
import Banner from "@/components/Banner/Banner";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { getData } from "@/utils/axios";
import { IoBedOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { BsDoorClosed } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRegListAlt } from "react-icons/fa";
const MapList = dynamic(() => import("@/components/homestay/MapList"), {
  ssr: false,
});
interface HomestayAvailability {
  homestayavailabilityid: number;
  date: string;
  pricepernight: number;
  status: string;
}

export type Homestay = {
  homestayid: number;
  wardName: string;
  districtName: string;
  cityProvinceName: string;
  longitude: number;
  latitude: number;
  geom: string | null;
  structureId: number;
  userId: number | null;
  type: string; //
  title: string; //
  address: string; //
  photos: string[]; //
  description: string; //
  extraInfo: string; //
  cleaningFee: number; //
  isApproved: boolean;
  maxGuest: number; //
  perkIds: number[]; //
  pricePerNight: number; //
  instant: boolean;
  beds: number;
  bathroom: number;
  room: number | null;
  availability: HomestayAvailability[];
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
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import { useLoading } from "@/store/loadingContext";
import Loading from "@/components/Loading";
import { useHomestaysContext } from "@/store/HomestaysContext";

type photoProps = {
  photos: string[];
  url: number;
};

function CarouselCard({ photos, url }: photoProps) {
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
                    {photos.map((photo, index) => (
                      <Image
                        key={index}
                        className="object-cover object-center aspect-square w-full h-full"
                        src={photo}
                        alt=""
                        height={600}
                        width={600}
                      />
                    ))}

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
type StructureType = {
  structureid: number;
  structurename: string;
};

const Homestays: React.FC = () => {
  const { isLoading, setIsLoading } = useLoading();
  const [homestays, setHomestays] = React.useState<Homestay[]>([]);
  const [structures, setStructures] = React.useState<StructureType[]>([]);
  const [structuresId, setStructuresId] = React.useState<number>();
  const [radius, setRadius] = React.useState<number | null>(null);
  const [isMap, setIsMap] = React.useState<boolean>(false);
  const [isHalfMap, setIsHalfMap] = React.useState<boolean>(false);
  const [isCard, setIsCard] = React.useState<boolean>(true);
  const [scrollY, setScrollY] = React.useState<number>(0);
  const { homestaysContext, is } = useHomestaysContext();
  React.useEffect(() => {
    const getAll = async () => {
      try {
        const homestays = await getData({ endpoint: "/homestays" });
        const structures = await getData({ endpoint: "/homestays/structure" });
        setHomestays(homestays);
        setStructures(structures);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getAll();
  }, []);
  console.log(isMap);

  React.useEffect(() => {
    if (is) {
      setHomestays(homestaysContext as Homestay[]);
      setIsHalfMap(true);
    }
  }, [homestaysContext, is]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  React.useEffect(() => {
    if (!isCard) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  }, [isCard]);

  React.useEffect(() => {
    const fetchFilterStructure = async () => {
      try {
        const homestayStructure = await getData({
          endpoint: `/homestays/homestayStructure/${structuresId}`,
        });
        setHomestays(homestayStructure);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilterStructure();
  }, [structuresId]);

  React.useEffect(() => {
    if (isHalfMap) {
      setIsMap(true);
      setIsCard(true);
    }
  }, [isHalfMap]);
  return (
    <>
      {isLoading && <Loading />}{" "}
      {!isLoading && (
        <>
          {!isMap && (
            <>
              <Banner url={"/banner/homestay_banner.jpeg"} />
              <div className="mx-20">
                <Breadcrumb />
              </div>
            </>
          )}

          <div
            className={`mx-20 ${isCard ? "" : "mt-60"} ${
              isHalfMap ? " pr-[550px] mt-60" : ""
            }`}
          >
            <CarouselType
              structures={structures}
              setStructuresId={setStructuresId}
              structuresId={structuresId}
            />
          </div>
          {!isMap && (
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
          )}
          {isCard && (
            <div className={`  ${isHalfMap ? "grid lg:grid-cols-5 mx-5" : ""}`}>
              <div
                className={`  ${
                  isHalfMap
                    ? "col-span-3 mt-3 gap-x-2 gap-y-8 grid grid-cols-1 lg:grid-cols-3"
                    : "mt-3 gap-x-2 gap-y-8 grid grid-cols-1 sm:grid-cols-3 mx-20 lg:grid-cols-4"
                }`}
              >
                {homestays?.map((homestay, index) => {
                  const currentDate = format(new Date(), "yyyy-MM-dd");
                  const todayAvailability = homestay.availability.find(
                    (avail) => {
                      return avail.date.startsWith(currentDate);
                    }
                  );
                  return (
                    <div
                      key={index}
                      className="w-full  border rounded-2xl p-2 shadow-lg"
                    >
                      <CarouselCard
                        photos={homestay.photos}
                        url={homestay.homestayid}
                      />
                      <Link href={`/homestays/${homestay.homestayid}`}>
                        <h2 className="pl-1 font-bold text-xl font-satoshi mt-2 mb-2">
                          {homestay.title}
                        </h2>
                        <h3 className="flex items-center gap-1 text-lg text-gray-500 font-satoshi mb-2">
                          <CiLocationOn className="h-5 w-5" />
                          {homestay.address}
                        </h3>
                        <div className="flex mt-1 font-satoshi">
                          <span className=" flex items-center gap-1 font-bold text-[#222] text-lg leading-5">
                            <RiMoneyDollarCircleLine className="h-5 w-5" />
                            {todayAvailability
                              ? todayAvailability.pricepernight
                              : "N/A"}
                          </span>{" "}
                          / night
                        </div>
                        <div className="flex gap-2 justify-around mt-1">
                          <div className="flex gap-2 bg-[#f8f9fd] items-center rounded-sm p-2">
                            <IoBedOutline className="h-6 w-6" />
                            <span className="font-bold text-xs">
                              {homestay.beds} Beds
                            </span>
                          </div>
                          <div className="flex gap-2 bg-[#f8f9fd] items-center rounded-sm p-2">
                            <BsDoorClosed className="h-6 w-6" />
                            <span className="font-bold text-xs">
                              {homestay.room} Room
                            </span>
                          </div>
                          <div className="flex gap-2 bg-[#f8f9fd] items-center rounded-sm p-2">
                            <IoPersonOutline className="h-6 w-6" />
                            <span className="font-bold text-xs">
                              {homestay.maxGuest} Guest
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              {isHalfMap && (
                <div
                  className={`col-span-2 flex items-center justify-center fixed  right-0 bottom-0 w-[38%] ${
                    scrollY <= 50 ? "top-60" : "top-44"
                  }`}
                >
                  <MapList
                    homestays={homestays}
                    radius={radius}
                    setRadius={setRadius}
                  />
                </div>
              )}
            </div>
          )}
          {isMap && !isHalfMap && (
            <div className="w-full h-[500px] flex justify-center items-center">
              <MapList
                homestays={homestays}
                radius={radius}
                setRadius={setRadius}
              />
            </div>
          )}
          {!isHalfMap && (
            <div
              className="fixed  z-99 bottom-10 right-10"
              onClick={() => {
                setIsMap((map) => !map);
                setIsCard((card) => !card);
              }}
            >
              <button className="flex gap-3 px-6 py-4 border rounded-xl bg-slate-900">
                {isMap ? (
                  <FaRegListAlt className="text-white h-6 w-6" />
                ) : (
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
                )}

                <span className="text-white font-medium">
                  {isMap ? "Show List" : "Show Map"}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Homestays;
