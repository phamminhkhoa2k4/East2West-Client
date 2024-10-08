"use client";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import Loading from "@/components/Loading";
import { getData, createData } from "@/utils/axios";
import { format } from "date-fns";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
type BookingHomestay = {
  homestayavailabilityId: number;
  userId: number;
  checkin: Date | null;
  checkout: Date | null;
  feeamount: number;
  status: string;
  numberofguest: number;
  totalPrice: number;
};

const Payment = () => {
  const [amount, setAmount] = useState<number>();
  const [loading, setLoading] = useState(true);
 const [checkIn, setCheckIn] = useState<string>("");
 const [checkOut, setCheckOut] = useState<string>("");
 const [numberOfAdults, setNumberOfAdults] = useState<string>("");
 const [numberOfGuests, setNumberOfGuests] = useState<string>("");
 const [numberOfChildren, setNumberOfChildren] = useState<string>("");
 const [numberOfInfants, setNumberOfInfants] = useState<string>("");
 const [homestayId, setHomestayId] = useState<string>("");

  const [info, setInfo] = useState<Homestay>();
  const [paymentData, setPaymentData] = useState<BookingHomestay>();

 useEffect(() => {
   const searchParams = new URLSearchParams(window.location.search);
   const checkInParam = searchParams.get("checkIn");
   const checkOutParam = searchParams.get("checkOut");
   const numberOfAdultsParam = searchParams.get("numberOfAdults");
   const numberOfGuestsParam = searchParams.get("numberOfGuests");
   const numberOfChildrenParam = searchParams.get("numberOfChildren");
   const numberOfInfantsParam = searchParams.get("numberOfInfants");
   const homestayIdParam = searchParams.get("homestayId");

   console.log("Initial params:", {
     checkIn: checkInParam,
     checkOut: checkOutParam,
     numberOfAdults: numberOfAdultsParam,
     numberOfGuests: numberOfGuestsParam,
     numberOfChildren: numberOfChildrenParam,
     numberOfInfants: numberOfInfantsParam,
     homestayId: homestayIdParam,
   });

   setCheckIn(checkInParam!);
   setCheckOut(checkOutParam!);
   setNumberOfAdults(numberOfAdultsParam!);
   setNumberOfGuests(numberOfGuestsParam!);
   setNumberOfChildren(numberOfChildrenParam!);
   setNumberOfInfants(numberOfInfantsParam!);
   setHomestayId(homestayIdParam!);
 }, []);

 useEffect(() => {
   // Log after state updates
   console.log("Updated state:", {
     checkIn,
     checkOut,
     numberOfAdults,
     numberOfGuests,
     numberOfChildren,
     numberOfInfants,
     homestayId,
   });
 }, [
   checkIn,
   checkOut,
   numberOfAdults,
   numberOfGuests,
   numberOfChildren,
   numberOfInfants,
   homestayId,
 ]);
  useEffect(() => {
    const getById = async () => {
      try {
        const data = await getData({
          endpoint: `/homestays/${homestayId}`,
        });
        setInfo(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getById();
  }, [homestayId]);

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const todayAvailability = info?.availability?.find((avail) => {
    return avail.date.startsWith(currentDate);
  });

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

  const numberOfDays = countDaysBetweenDates(checkIn!, checkOut!);

  const effectivePricePerNight = todayAvailability?.pricepernight ?? 0;
  const effectiveCleaningFee = info?.cleaningFee ?? 0;
  const totalPriceAllDay = effectivePricePerNight * numberOfDays;
  const serviceFee = Math.floor(effectivePricePerNight * numberOfDays * 0.03);
  const totalCost =
    effectivePricePerNight * numberOfDays + effectiveCleaningFee + serviceFee;
  const countAdults = numberOfAdults ?? 0;
  const countChildren = numberOfChildren ?? 0;
function convertDateFormat(dateStr: string | null): string | null {
  if (!dateStr) {
    return null;
  }

  const [year, month, day] = dateStr.split("-");

  if (!day || !month || !year) {
    return null;
  }

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}


  const getUrlVNPay = async () => {
    const formattedCheckIn = convertDateFormat(checkIn!);
    const formattedCheckOut = convertDateFormat(checkOut!);
    console.log(formattedCheckIn);
    console.log(formattedCheckOut);

    const paymentData = {
      checkin: formattedCheckIn,
      checkout: formattedCheckOut,
      homestayavailabilityId: todayAvailability?.homestayavailabilityid || 0,
      feeamount: serviceFee,
      numberofguest: Number(countAdults) + Number(countChildren),
      status: "",
      totalPrice: totalCost,
      userId: info?.userId || 0,
    } as BookingHomestay;

    setPaymentData(paymentData);
    setAmount(totalCost);

    try {
      const response = await createData({
        endpoint: `/homestays/bookings/create_payment/${totalCost}`,
        payload: paymentData,
      });
      return response.url;
    } catch (error) {
      console.error("Error fetching VNPay URL:", error);
      return null;
    }
  };

  const router = useRouter();
  const handleSubmit = async () => {
    const url = await getUrlVNPay();
    if (url) {
      router.push(url);
    } else {
      console.error("Failed to get VNPay URL");
    }
  };
  return (
    <Suspense fallback={<Loading />}>
      <>
        <div className="mx-40 mt-40">
          <div className="text-3xl font-semibold my-5">
            Request a reservation/booking
          </div>
          <div className="flex gap-20 justify-between">
            <div className="flex w-1/2 flex-col">
              <div className="text-xl font-semibold py-4">Your Trip</div>
              <div className="flex items-start justify-between mb-5">
                <div className="flex flex-col gap-2">
                  <div className="text-base font-medium">Day</div>
                  <div className="text-base text-[#666]">
                    {checkIn} - {checkOut}
                  </div>
                </div>
                <div>
                  <div className="px-4 py-2 border rounded-3xl">edit</div>
                </div>
              </div>
              <div className="flex items-start justify-between pb-5 border-b-2">
                <div className="flex flex-col gap-2">
                  <div className="text-base font-medium">Guest</div>
                  <div className="text-base text-[#666]">
                    {numberOfGuests} Guest(s) (Adults: {numberOfAdults},
                    Children: {numberOfChildren}, Infants: {numberOfInfants})
                  </div>
                </div>
                <div>
                  <div className="px-4 py-2 border rounded-3xl">edit</div>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-3">
                <SelectGroupTwo
                  label="Payment Method"
                  onChange={(e) => {}}
                  value={"payment"}
                />
              </div>
              <div className="py-5 border-y">
                The host has 24 hours to confirm your booking. You will be
                charged once the request is accepted.
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-3 text-lg font-semibold text-white bg-blue-500 rounded-xl"
              >
                Booking
              </button>
            </div>
            <div className="flex w-1/2 flex-col items-center">
              <div className="border w-full rounded-3xl p-6">
                <div className="flex mb-5 gap-4">
                  <div>
                    <div className="rounded-xl overflow-hidden w-25 h-25">
                      <Image
                        src={"/boat.png"}
                        alt=""
                        height={300}
                        width={300}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="text-base font-semibold">{info?.title}</div>
                    <div>{info?.address}</div>
                  </div>
                </div>
                <div className="px-4 py-2 pt-4 border-t text-xl font-semibold">
                  Price details
                </div>
                <div className=" px-4 py-2 flex items-start justify-between">
                  <div className="underline text-[#222]">
                    ${todayAvailability?.pricepernight} x {numberOfDays} night
                  </div>
                  <div className=" text-[#222]">$ {totalPriceAllDay}</div>
                </div>
                <div className=" px-4 py-2 flex items-start justify-between">
                  <div className="underline text-[#222]">Cleaning Fee</div>
                  <div className=" text-[#222]">$ {effectiveCleaningFee}</div>
                </div>
                <div className="pb-5 px-4 py-2 flex items-start justify-between">
                  <div className="underline text-[#222]">
                    East2West Service Fee
                  </div>
                  <div className=" text-[#222]">$ {serviceFee}</div>
                </div>
                <div className="px-4 pt-5 py-2 border-t flex items-start justify-between">
                  <div className="text-base font-semibold">Total</div>
                  <div className="text-base font-semibold">$ {totalCost}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Suspense>
  );
};

export default Payment;
