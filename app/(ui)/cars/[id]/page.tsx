"use client";
import React, { useState, useEffect } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Gallery from "@/components/car/Gallery";
import InfoCar from "@/components/car/InfoCar";
import IconLabel from "@/components/homestay/IconLabel";
import { BsHouseDoorFill } from "react-icons/bs";
import { FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CiCalendar } from 'react-icons/ci';
import Calendar from '@/components/car/Calendar';

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

interface Locationtype {
  locationtypeid: number;
  locationtypename: string;
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
  locationtype: Locationtype;
  cargearbox: string;
  miles: string;
  fueltankcapacity: string;
  fuel: string;
  location: string;
  thumbnail : string[];
}


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
  const [rentalDate, setRentalDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  
const fetchCarData = async (id: string): Promise<Car> => {
  const response = await fetch(`http://localhost:8080/api/cars/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch car details");
  }
  return response.json();
};

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    const getCarData = async () => {
      try {
        const carData = await fetchCarData(params.id);
        setCar(carData);
        setSlides(carData.thumbnail);
      } catch (error) {
        console.error('Error fetching car data:', error);
        setError('Failed to fetch car data');
      }
    };

    getCarData();
  }, [params.id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  const days = Math.ceil((new Date(returnDate).getTime() - new Date(rentalDate).getTime()) / (1000 * 3600 * 24));
  const totalAmount = car.pricePerDay * days;

  const handleSubmit = async () => {
    if (!car || !userInfo) return;
    const userId = userInfo.userId;
    console.log('Submitting rental data', { userId, carId: car.carId, rentalDate, returnDate, totalAmount });

    const paymentId = 1;

    const rentalData = {
      userId,
      carId: car.carId,
      paymentId,
      rentalDate,
      returnDate,
      totalAmount,
    };
    try {
      const response = await fetch(`http://localhost:8080/api/rental/create_payment/${totalAmount}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rentalData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit rental data');
      }
  
      const result = await response.json();
  
      if (result.status === 'OK' && result.url) {
        alert('Rental successfully booked!');
        // Chuyển hướng người dùng đến URL của cổng thanh toán
        window.location.href = result.url;
      } else {
        throw new Error('Payment URL not available');
      }
    } catch (error) {
      setError('Failed to book rental');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="mx-10 mt-40">
        <Breadcrumb />
      </div>
      <div className="mx-20">
        <Gallery slides={slides} />
        <div className="flex flex-col gap-2 my-15 w-2/3">
          <div className="text-4xl font-bold mt-5 mb-3">{car.carName}</div>
          <div className="text-xl text-blue-500 font-semibold">
            {car.make.makeName}
          </div>
          <div className="text-lg text-gray-700">{car.model.modelName}</div>
          <div className="text-lg text-gray-700">{car.type.typeName}</div>
        </div>
        <div className="flex flex-col space-y-4 my-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6 w-full md:w-fit">
              <IconLabel
                icon={
                  <HiOutlineLocationMarker className="text-gray-500 text-xl" />
                }
              >
                <span className="text-md">
                  {car.locationtype.locationtypename}
                </span>
              </IconLabel>
              <IconLabel
                icon={<BsHouseDoorFill className="text-gray-500 text-xl" />}
                separator={<span className="text-gray-500 font-bold">·</span>}
              >
                <span className="text-md">Seats: {car.seatCapacity}</span>
                <span className="text-md">Type: {car.type.typeName}</span>
                <span className="text-md">Year: {car.year}</span>
                <span className="text-md">Gearbox: {car.cargearbox}</span>
                <span className="text-md">Fuel: {car.fuel}</span>
                <span className="text-md">Miles: {car.miles}</span>
                <span className="text-md">
                  Fuel Capacity: {car.fueltankcapacity}
                </span>
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
            <InfoCar car={car} />
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
                    <span className="text-xl font-bold">
                      ${car.pricePerDay}
                    </span>
                    <span className="text-gray-500">/ Day</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-3 border border-gray-300 rounded-lg">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex gap-1 flex-col space-y-1">
                      <label
                        className="text-xs font-bold uppercase"
                        htmlFor="check-in"
                      >
                        Check-in
                      </label>
                      <button
                        id="check-in"
                        className="w-full justify-between items-center gap-1 p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                      >
                        {rentalDate} <CiCalendar className="h-5 w-5" />
                      </button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      setCheckOutDate={setReturnDate!}
                      setCheckInDate={setRentalDate!}
                      checkInDate={rentalDate}
                      checkOutDate={returnDate}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex gap-1 flex-col space-y-1">
                      <label
                        className="text-xs font-bold uppercase"
                        htmlFor="check-out"
                      >
                        Check-out
                      </label>
                      <button
                        id="check-out"
                        className="w-full justify-between gap-1  p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                      >
                        {returnDate} <CiCalendar className="h-5 w-5" />
                      </button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      setCheckOutDate={setReturnDate!}
                      setCheckInDate={setRentalDate!}
                      checkInDate={rentalDate}
                      checkOutDate={returnDate}
                    />
                  </PopoverContent>
                </Popover>
                {/* <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="rental-date"
                  >
                    Rental Date
                  </label>
                  <input
                    id="rental-date"
                    type="date"
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="return-date"
                  >
                    Return Date
                  </label>
                  <input
                    id="return-date"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div> */}
              </div>
              <div className="border border-gray-300 rounded-2xl mt-5 p-4 px-6">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between">
                    <span>
                      ${car.pricePerDay} x {days} Days
                    </span>
                    <span>${totalAmount}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalAmount}</span>
                  </div>
                </div>
              </div>
              <div className="m-5">
                <button
                  onClick={handleSubmit}
                  className="w-full rounded-md bg-primary py-2.5 text-center text-base font-medium text-white shadow-md transition hover:bg-opacity-80"
                >
                  Rent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
