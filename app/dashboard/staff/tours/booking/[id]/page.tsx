"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CiUser } from "react-icons/ci";
import { createData } from "@/utils/axios";

interface Tour {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  pricereduce: number;
  groupsize: number;
  disposit: string;
  departureDates: { departuredateid: number; departuredate: string }[] | null;
  itineraries: Itinerary[];
}

interface Itinerary {
  itineraryId: number;
  accommodations: Accommodation[];
  meals: Meal[];
  places: Place[];
  day: string;
}
interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string[];
  roomtype: string;
}

interface Meal {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}

interface Place {
  placeid: number;
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}


const BookingStaff = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [tour, setTour] = useState<Tour | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/tours/${id}`);
        if (!response.ok) throw new Error("Failed to fetch tour data");
        const data: Tour = await response.json();
        setTour(data);
      } catch (error:any) {
        setError(error.message);
      }
    };

    fetchTourData();
  }, [id]);

  const handleBooking = async () => {
    if (!tour || !selectedDate) return;

    const userId = Number(localStorage.getItem('userId')) || 1;
    const paymentId = 2;
    const packageId = id;
    const tourDate = new Date(selectedDate).toISOString();
    const numberOfPeople = guestCount;
    const totalPrice = (tour.price * guestCount);
    

    const bookingData = {
      userId,
      paymentId,
      packageId,
      tourDate,
      numberOfPeople,
      totalPrice,
      depositAmount: tour.disposit,
    };

    try {
     const response = await createData({endpoint:"/bookings",payload: bookingData}
      );

      if (!response.ok) throw new Error("Failed to submit booking data");
      alert('Booking successfully completed!');
    } catch (error) {
      setError('Failed to complete booking');
      console.error(error);
    }
  };

  if (error) return <p>{error}</p>;
  if (!tour) return <p>Loading...</p>;

  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Booking" />
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Booking Via Staff
              </h3>
            </div>
            <div className="flex items-center gap-5 mx-5 mt-5">
              <div className="flex items-center gap-10 p-4 border border-gray-300 rounded-2xl overflow-hidden w-3/5">
                <div className="h-35 rounded-lg overflow-hidden">
                  <Image
                    src={tour.thumbnail[0]}
                    alt={tour.title}
                    height={300}
                    width={300}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="border rounded-md border-blue-600 text-blue-600 px-[5px] py-[3px] text-xs w-12">
                    {tour?.itineraries.length - 1}N/{tour.itineraries.length}D
                  </span>
                  <div className="text-base font-extrabold">
                    {tour.title}
                  </div>
                  <div className="flex items-baseline space-x-2">
                 
                    <span className="text-base">$ {tour.price}</span>
                    <span className="text-gray-500">/ Person</span>
                  </div>
                  {/* <div className="flex items-center gap-1 mt-1 mb-2">
                    <span className="text-sm">2N Hanoi</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm">2N HoChiMinh</span>
                  </div> */}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 p-[19px] border border-gray-300 rounded-lg w-2/5">
                <div className="col-span-2">
                  <label
                    className="text-xs font-bold uppercase"
                    htmlFor="departure-date"
                  >
                    Departure Date
                  </label>
                  <select
                    id="departure-date"
                    className="w-full p-2 text-left bg-white border border-gray-300 rounded-lg text-sm"
                    value={selectedDate || ""}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="" disabled>Select a departure date</option>
                    {tour.departureDates && tour.departureDates.map((date) => (
                      <option key={date.departuredateid} value={date.departuredate}>
                        {new Date(date.departuredate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="col-span-2">
                      <label className="text-xs font-bold uppercase" htmlFor="guests">
                        Guests
                      </label>
                      <button
                        id="guests"
                        className="w-full p-2 flex items-center justify-between px-4 text-left bg-white border border-gray-300 rounded-lg text-sm"
                      >
                        <CiUser className="h-5 w-5" />
                        <span>{guestCount}</span>
                      </button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 border border-gray-300 rounded-lg"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      >
                        -
                      </button>
                      <span>{guestCount}</span>
                      <button
                        className="p-2 border border-gray-300 rounded-lg"
                        onClick={() => setGuestCount(guestCount + 1)}
                      >
                        +
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="border border-gray-300 rounded-2xl mx-5 mt-5 p-4 px-6">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between">
                  <span>${tour.price} x {guestCount}</span>
                  <span>${tour.price * guestCount}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${tour.price * guestCount}</span>
                </div>
              </div>
            </div>
            <div className="m-5">
              <button
                onClick={handleBooking}
                className="w-full rounded-md bg-primary py-2.5 text-center text-base font-medium text-white shadow-md transition hover:bg-opacity-80"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BookingStaff;
