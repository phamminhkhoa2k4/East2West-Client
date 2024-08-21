"use client";
import React, { useState, useEffect } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Gallery from "@/components/car/Gallery";
import InfoCar from "@/components/car/InfoCar";
import IconLabel from "@/components/homestay/IconLabel";
import Image from "next/image";
import { BsHouseDoorFill } from "react-icons/bs";
import { CgHeart } from "react-icons/cg";
import { FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { HiOutlineLocationMarker, HiStar } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

interface Model {
  modelId: number;
  modelName: string;
}

interface Make {
  makeId: number;
  makeName: string;
}

interface Type {
  typeId: number;
  typeName: string;
}

interface Car {
  carId: number;
  carName: string;
  model: Model;
  make: Make;
  type: Type;
  year: number;
  seatCapacity: number;
  airConditioned: boolean;
  pricePerDay: number;
  status: string;
  locationtype: string | null;
  cargearbox: string;
  miles: string;
  fueltankcapacity: string;
  fuel: string;
  location: string;
}

const fetchCarData = async (id: string): Promise<Car> => {
  const response = await fetch(`http://localhost:8080/api/cars/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch car details');
  }
  return response.json();
};

const CarDetail = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useState<Car | null>(null);
  const [slides, setSlides] = useState<string[]>([
    "/boat.png",
    "/boat.png",
    "/boat.png",
    "/boat.png",
    "/boat.png",
    "/boat.png",
  ]);

  useEffect(() => {
    const getCarData = async () => {
      try {
        const carData = await fetchCarData(params.id);
        setCar(carData);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    getCarData();
  }, [params.id]);

  if (!car) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div className="mx-10">
        <Breadcrumb />
      </div>
      <div className="mx-20">
        <Gallery slides={slides} />
        <div className="flex flex-col gap-2 my-15 w-2/3">
          <div className="text-4xl font-bold mt-5 mb-3">{car.carName}</div>
          <div className="text-xl text-blue-500 font-semibold">{car.make.makeName}</div>
        </div>
        <div className="flex flex-col space-y-4 my-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6 w-full md:w-fit">
              <IconLabel
                icon={<HiOutlineLocationMarker className="text-gray-500 text-xl" />}
              >
                <span className="text-md">{car.location}</span>
              </IconLabel>
              <IconLabel
                icon={<BsHouseDoorFill className="text-gray-500 text-xl" />}
                separator={<span className="text-gray-500 font-bold">·</span>}
              >
                <span className="text-md">Seats: {car.seatCapacity}</span>
                <span className="text-md">Type: {car.type.typeName}</span>
                <span className="text-md">Year: {car.year}</span>
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
        <div className="flex gap-5 w-full">
          <div className="w-2/3">
            <InfoCar />
            <div className="mt-5 border rounded-lg p-5">
              <div className="text-3xl font-bold mx-5">Overview</div>
              <p className="m-5">
                {/* {car.description || "No description available."} */}
              </p>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col w-full p-6 space-y-6 bg-white border border-gray-300 rounded-2xl">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg line-through text-gray-500">
                      ${car.pricePerDay + 20}
                    </span>
                    <span className="text-xl font-bold">${car.pricePerDay}</span>
                    <span className="text-gray-500">/ Day</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-3 border border-gray-300 rounded-lg">
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="pick-up"
                  >
                    Pick-up
                  </label>
                  <button
                    id="pick-up"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                  >
                    09/03/2021 <IoIosArrowDown className="inline-block ml-2" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="drop-off"
                  >
                    Drop-Off
                  </label>
                  <button
                    id="drop-off"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                  >
                    09/10/2021 <IoIosArrowDown className="inline-block ml-2" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="pick-up-time"
                  >
                    Time
                  </label>
                  <button
                    id="pick-up-time"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                  >
                    12:00 <IoIosArrowDown className="inline-block ml-2" />
                  </button>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="drop-off-time"
                  >
                    Time
                  </label>
                  <button
                    id="drop-off-time"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                  >
                    12:00 <IoIosArrowDown className="inline-block ml-2" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-20">
                <button className="w-full p-4 text-white bg-blue-500 rounded-lg text-lg">
                  Reserve
                </button>
                <span className="text-gray-500 text-center">
                  You won’t be charged yet
                </span>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span>${car.pricePerDay} x 7 nights</span>
                  <span>${car.pricePerDay * 7}</span>
                </div>
                <div className="flex justify-between">
                  <span>8% weekly price discount</span>
                  <span className="text-green-500">-${car.pricePerDay * 0.08}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>$97</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${car.pricePerDay * 7 - car.pricePerDay * 0.08 + 97}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
