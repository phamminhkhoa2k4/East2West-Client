"use client";
import { useEffect, useState } from 'react';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CiCalendar } from "react-icons/ci";
import Calendar from '@/components/car/Calendar'; // Đảm bảo rằng bạn đã import Calendar
import { createData, getData } from '@/utils/axios';

interface Car {
  carId: number;
  carName: string;
  model: {
    modelId: number;
    modelName: string;
  };
  make: {
    makeId: number;
    makeName: string;
  };
  type: {
    typeId: number;
    typeName: string;
  };
  year: number;
  seatCapacity: number;
  airConditioned: boolean;
  pricePerDay: number;
  status: string;
  locationtype: string | null;
  cargearbox: string | null;
  miles: number | null;
  fueltankcapacity: number | null;
  fuel: string | null;
  location: string | null;
  thumbnail: string[];
}

const RentalStaff = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [car, setCar] = useState<Car | null>(null);
  const [rentalDate, setRentalDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carData: Car = await getData({ endpoint: `/cars/${id}` });
        setCar(carData);
      } catch (error) {
        console.error('Error fetching car data:', error);
        setError('Error loading car data');
      }
    };

    fetchCarData();
  }, [id]);

  const handleSubmit = async () => {
    if (!car) return;

    const userId = Number(localStorage.getItem('userId')) || 1;
    const paymentId = 1;
    const totalDays = Math.ceil((new Date(returnDate).getTime() - new Date(rentalDate).getTime()) / (1000 * 3600 * 24));
    const totalAmount = car.pricePerDay * totalDays;

    const rentalData = {
      userId,
      carId: car.carId,
      paymentId,
      rentalDate,
      returnDate,
      totalAmount,
    };

    try {
      const response = await createData({
        endpoint: "/employee-bookings/rental",
        payload: rentalData,
      });

      if (!response.ok) throw new Error('Failed to submit rental data');
      alert('Rental successfully booked!');
    } catch (error) {
      setError('Failed to book rental');
      console.error(error);
    }
  };

  if (error) return <p>{error}</p>;
  if (!car) return <p>Loading...</p>;

  const totalDays = Math.ceil((new Date(returnDate).getTime() - new Date(rentalDate).getTime()) / (1000 * 3600 * 24));
  const totalAmount = car.pricePerDay * totalDays;

  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Rental" />
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Rental Via Staff
              </h3>
            </div>
            <div className="flex items-center gap-5 mx-5 mt-5">
              <div className="flex items-center gap-10 p-4 border border-gray-300 rounded-2xl overflow-hidden w-3/5">
                <div className="h-35 rounded-lg overflow-hidden">
                  <Image
                    src={car.thumbnail[0]}
                    alt={car.carName}
                    height={300}
                    width={300}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-base font-extrabold">
                    {car.make.makeName} {car.model.modelName} ({car.year})
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-base font-bold">
                      ${car.pricePerDay} / Day
                    </span>
                    <span className="text-gray-500">{car.type.typeName}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 mb-2">
                    <span className="text-sm">Seats: {car.seatCapacity}</span>
                    <span className="text-sm">
                      Air Conditioned: {car.airConditioned ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-[19px] border border-gray-300 rounded-lg w-2/5">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex gap-1 flex-col space-y-1">
                      <label
                        className="text-xs font-bold uppercase"
                        htmlFor="rental-date"
                      >
                        Rental Date
                      </label>
                      <button
                        id="rental-date"
                        className="w-full justify-between gap-1 p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                      >
                        {rentalDate || 'Select Date'} <CiCalendar className="h-5 w-5" />
                      </button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      setCheckInDate={setRentalDate} 
                      checkInDate={rentalDate}
                      setCheckOutDate={setReturnDate}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex gap-1 flex-col space-y-1">
                      <label
                        className="text-xs font-bold uppercase"
                        htmlFor="return-date"
                      >
                        Return Date
                      </label>
                      <button
                        id="return-date"
                        className="w-full justify-between gap-1 p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                      >
                        {returnDate || 'Select Date'} <CiCalendar className="h-5 w-5" />
                      </button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      setCheckInDate={setReturnDate}
                      checkInDate={returnDate}
                      setCheckOutDate={setReturnDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="border border-gray-300 rounded-2xl mx-5 mt-5 p-4 px-6">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span>
                    ${car.pricePerDay} x {totalDays} Days
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
    </DefaultLayout>
  );
};

export default RentalStaff;
