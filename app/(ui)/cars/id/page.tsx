"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Gallery from "@/components/car/Gallery";
import InfoCar from "@/components/car/InfoCar";
import IconLabel from "@/components/homestay/IconLabel";
import Image from "next/image";
import { useState } from "react";
import { BsHouseDoorFill } from "react-icons/bs";
import { CgHeart } from "react-icons/cg";
import { FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { HiOutlineLocationMarker, HiStar } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

const Detail = () => {
  const [slides, setSlides] = useState<string[]>([
    "/boat.png",
    "/boat.png",
    "/boat.png",
    "/boat.png",
    "/boat.png",
    "/boat.png",
  ]);

  return (
    <>
      <div className="mx-10">
        <Breadcrumb />
      </div>
      <div className="mx-20">
        <Gallery slides={slides} />
        <div className="flex flex-col gap-2 my-15 w-2/3">
          <div className="text-4xl font-bold mt-5 mb-3">
            Seltos K3 - Modern compact SUV in blue color on beautiful dark
            wheels
          </div>
          <div className="text-xl text-blue-500 font-semibold">Honda</div>
        </div>
        <div className="flex flex-col space-y-4 my-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6 w-full md:w-fit">
              <IconLabel
                icon={
                  <HiOutlineLocationMarker className="text-gray-500 text-xl" />
                }
              >
                <span className="text-md">Belgrade, Serbia</span>
              </IconLabel>
              <IconLabel
                icon={<BsHouseDoorFill className="text-gray-500 text-xl" />}
                separator={<span className="text-gray-500 font-bold">·</span>}
              >
                <span className="text-md">4 guests</span>
                <span className="text-md">1 bedroom</span>
                <span className="text-md">2 beds</span>
                <span className="text-md">1 bath</span>
              </IconLabel>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
                aria-label="Get location"
              >
                <HiOutlineLocationMarker className="text-xl" />
              </button>
              <button
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
                aria-label="Share"
              >
                <FiShare2 className="text-xl" />
              </button>
              <button
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
                aria-label="More options"
              >
                <FiMoreHorizontal className="text-xl" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-5 w-full ">
          <div className="w-2/3">
            <InfoCar />
            <div className="mt-5 border rounded-lg p-5">
              <div className="text-3xl font-bold mx-5">Overview</div>
              <p className="m-5">
                Elevate your Las Vegas experience to new heights with a journey
                aboard The High Roller at The LINQ. As the tallest observation
                wheel in the world, standing at an impressive 550 feet tall, The
                High Roller offers a bird&apos;s-eye perspective of the iconic
                Las Vegas Strip and its surrounding desert landscape. From the
                moment you step into one of the spacious cabins, you&apos;ll be
                transported on a mesmerizing adventure, where every turn offers
                a new and breathtaking vista of the vibrant city below.Elevate
                your Las Vegas experience to new heights with a journey aboard
                The High Roller at The LINQ. As the tallest observation wheel in
                the world, standing at an impressive 550 feet tall, The High
                Roller offers a bird&apos;s-eye perspective of the iconic Las
                Vegas Strip and its surrounding desert landscape. From the
                moment you step into one of the spacious cabins, you&apos;ll be
                transported on a mesmerizing adventure, where every turn offers
                a new and breathtaking vista of the vibrant city below.
              </p>
              <p className="m-5">
                Whether you&apos;re a first-time visitor or a seasoned Las Vegas
                aficionado, The High Roller promises an unparalleled experience
                that will leave you in awe. With its climate-controlled cabins
                and immersive audio commentary, this attraction provides a
                unique opportunity to see Las Vegas from a whole new
                perspective, while learning about its rich history and famous
                landmarks along the way.
              </p>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col w-full   p-6 space-y-6 bg-white border border-gray-300 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg line-through text-gray-500">
                      $115
                    </span>
                    <span className="text-xl font-bold">$98</span>
                    <span className="text-gray-500">/ Day</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-3 border border-gray-300 rounded-lg">
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="check-in"
                  >
                    Pick-up
                  </label>
                  <button
                    id="check-in"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                  >
                    09/03/2021 <IoIosArrowDown className="inline-block ml-2" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="check-out"
                  >
                    Drop-Off
                  </label>
                  <button
                    id="check-out"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                  >
                    09/10/2021 <IoIosArrowDown className="inline-block ml-2" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="check-in"
                  >
                    Time
                  </label>
                  <button
                    id="check-in"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                  >
                    12:00 <IoIosArrowDown className="inline-block ml-2" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="check-out"
                  >
                    Time
                  </label>
                  <button
                    id="check-out"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                  >
                    12:00 <IoIosArrowDown className="inline-block ml-2" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-20 ">
                <button className="w-full p-4 text-white bg-blue-500 rounded-lg text-lg">
                  Reserve
                </button>
                <span className="text-gray-500 text-center">
                  You won’t be charged yet
                </span>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span>$98 x 7 nights</span>
                  <span>$686</span>
                </div>
                <div className="flex justify-between">
                  <span>8% weekly price discount</span>
                  <span className="text-green-500">-$54</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>$97</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>$729</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
