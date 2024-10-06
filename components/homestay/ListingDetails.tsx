"use client";

import { CiCalendar } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import Image from "next/image";
import { useRouter } from "next/navigation";


import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Guest from "./GuestSmall";
import Calendar from "./CalendarSmall";

type Role = {
  roleId: number;
  roleName: string;
};
type User = {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  roles: Role;
};

type ListingDetailsProps = {
  description: string | undefined;
  extraInfo: string | undefined;
  pricePerNight: number | undefined;
  cleaningFee: number | undefined;
  maxGuest: number | undefined;
  homestayId: number | undefined | null;
  owner: User | undefined;
};

const ListingDetails = ({
  description,
  extraInfo,
  pricePerNight,
  maxGuest,
  cleaningFee,
  homestayId,
  owner,
}: ListingDetailsProps) => {
  const [amount, setAmount] = useState<number>();
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  const [countAdult, setCountAdult] = useState<number>(1);
  const [countChildren, setCountChildren] = useState<number>(0);
  const [countBaby, setCountBaby] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  type totalGuestProps = {
    countAdult: number;
    countChildren: number;
  };

  const totalGuest = ({ countAdult, countChildren }: totalGuestProps) => {
    return countAdult + countChildren;
  };
  const guest = totalGuest({ countAdult, countChildren });
  const countDaysBetweenDates = (
    start: string | null,
    end: string | null
  ): number => {
    if (!start || !end) return 0;

    const startDate = new Date(start.split("/").reverse().join("-"));
    const endDate = new Date(end.split("/").reverse().join("-"));

    const timeDiff = endDate.getTime() - startDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return dayDiff;
  };

  const numberOfDays = countDaysBetweenDates(checkInDate, checkOutDate);

  const effectivePricePerNight = pricePerNight ?? 0;
  const effectiveCleaningFee = cleaningFee ?? 0;
  const totalPriceAllDay = effectivePricePerNight * numberOfDays;
  const serviceFee = effectivePricePerNight * numberOfDays * 0.03;
  const totalCost =
    effectivePricePerNight * numberOfDays + effectiveCleaningFee + serviceFee;

  const router = useRouter();

  const HandleSubmit = async () => {
    setAmount(totalCost);

    setTimeout(async () => {
      const paymentUrl = `/homestays/payment?checkIn=${checkInDate}&checkOut=${checkOutDate}&numberOfAdults=${countAdult}&numberOfGuests=${guest}&numberOfChildren=${countChildren}&numberOfInfants=${countBaby}&homestayId=${homestayId}`;
      if (paymentUrl) {
        router.push(paymentUrl);
      } else {
        console.error("Failed to get VNPay URL");
      }
    }, 1000);
  };
  return (
    <div className="flex justify-between flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 my-8">
      <div className="flex w-full flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-bold">
            All about {owner?.username ?? ""} place
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Hosted by</span>
            {/* <Image
              src="/image/service/blog-3.png"
              alt="Lazar"
              className="w-6 h-6 rounded-full"
              height={100}
              width={100}
            /> */}
            <div className="h-8 w-8 flex items-center justify-center rounded-full text-lg text-white font-bold bg-black">
              {owner?.username[0]}
            </div>
            <span className="text-brand-500">{owner?.username}</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-col space-y-4">
          <p>
            {" "}
            <strong>Description</strong>
            <br />
            {description}
          </p>
          <p>
            <strong>Extra Information</strong>
            <br />
            {extraInfo}
          </p>
        </div>
      </div>
      <div className="flex flex-col  w-full max-w-md lg:max-w-xs p-6 space-y-6 bg-white border border-gray-300 rounded-2xl">
        <div className="flex justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              {/* <span className="text-lg line-through text-gray-500">$115</span> */}
              <span className="text-lg">${pricePerNight}</span>
              <span className="text-gray-500">/ night</span>
            </div>
          </div>
          <div className="relative">
            {/* <Image
              src="/image/service/blog-3.png"
              alt="Lazar"
              className="w-12 h-12 rounded-full"
              height={100}
              width={100}
            /> */}
            <div className="h-12 w-12 flex items-center justify-center rounded-full text-xl text-white font-bold bg-black">
              {owner?.username[0]}
            </div>
            {/* <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div> */}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-3 border  border-gray-300 rounded-lg">
          <Popover open={open} onOpenChange={setOpen}>
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
                  className="w-full items-center gap-1 p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                >
                  {checkInDate} <CiCalendar className="h-5 w-5" />
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                setCheckOutDate={setCheckOutDate}
                setCheckInDate={setCheckInDate}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
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
                  className="w-full gap-1  p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                >
                  {checkOutDate} <CiCalendar className="h-5 w-5" />
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                setCheckOutDate={setCheckOutDate}
                setCheckInDate={setCheckInDate}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <div className="col-span-2 ">
                <label className="text-xs font-bold uppercase" htmlFor="guests">
                  Guests
                </label>
                <button
                  id="guests"
                  className="w-full p-2 flex items-center justify-between px-4 text-left bg-white border border-gray-300 rounded-lg text-sm"
                >
                  {totalGuest({ countAdult, countChildren })} Guest{" "}
                  {countBaby > 0 && <> , {countBaby} Infant</>}
                  <CiUser className="h-5 w-5" />
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Guest
                setCountBaby={setCountBaby}
                setCountChildren={setCountChildren}
                setCountAdult={setCountAdult}
                countAdult={countAdult}
                countBaby={countBaby}
                countChildren={countChildren}
                maxGuest={maxGuest}
                guest={guest}
              />
            </PopoverContent>
          </Popover>
        </div>
        {numberOfDays > 0 && (
          <>
            <div className="flex flex-col space-y-2">
              <button
                onClick={HandleSubmit}
                className="w-full p-4 text-white bg-blue-500 rounded-lg text-lg"
              >
                Reserve
              </button>
              <span className="text-gray-500 text-center">
                You won’t be charged yet
              </span>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between">
                <span>
                  ${pricePerNight} x {numberOfDays} nights
                </span>
                <span>${totalPriceAllDay}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>8% weekly price discount</span>
                <span className="text-green-500">-$54</span>
              </div> */}
              <div className="flex justify-between">
                <span>East2West Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>${effectiveCleaningFee}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalCost}</span>
              </div>
            </div>
          </>
        )}
        {numberOfDays === 0 && (
          <>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setOpen(true)}
                className="w-full p-4 text-white bg-blue-500 rounded-lg text-base font-bold"
              >
                Check Room Availability
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
