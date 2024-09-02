"use client";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import { getData, createData } from "@/utils/axios";
import { format } from "date-fns";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const numberOfAdults = searchParams.get("numberOfAdults");
  const numberOfGuests = searchParams.get("numberOfGuests");
  const numberOfChildren = searchParams.get("numberOfChildren");
  const numberOfInfants = searchParams.get("numberOfInfants");
  const homestayId = searchParams.get("homestayId");
  const [info, setInfo] = useState<Homestay>();
  const [paymentData, setPaymentData] = useState<BookingHomestay>();
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
  }, []);

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const todayAvailability = info?.availability.find((avail) => {
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

  const numberOfDays = countDaysBetweenDates(checkIn, checkOut);

  const effectivePricePerNight = todayAvailability?.pricepernight ?? 0;
  const effectiveCleaningFee = info?.cleaningfee ?? 0;
  const totalPriceAllDay = effectivePricePerNight * numberOfDays;
  const serviceFee = effectivePricePerNight * numberOfDays * 0.03;
  const totalCost =
    effectivePricePerNight * numberOfDays + effectiveCleaningFee + serviceFee;
  const countAdults = numberOfAdults ?? 0;
  const countChildren = numberOfChildren ?? 0;
  const checkInDate = checkIn ?? 0;
  function convertDateFormat(dateStr: string | null): string | null {
    if (!dateStr) {
      return null;
    }

    const [day, month, year] = dateStr.split("/");

    if (!day || !month || !year) {
      return null;
    }

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }

  const getUrlVNPay = async () => {
    setPaymentData({
      checkin: convertDateFormat(checkIn),
      checkout: convertDateFormat(checkIn),
      homestayavailabilityId: todayAvailability?.homestayavailabilityid,
      feeamount: serviceFee,
      numberofguest: Number(countAdults) + Number(countChildren),
      status: "",
      totalPrice: totalCost,
      userId: info?.userid,
    } as BookingHomestay);

    setAmount(totalCost);
    try {
      console.log(paymentData);

      const response = await createData({
        endpoint: `/homestays/bookings/create_payment/${amount}`,
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
    <>
      <div className="mx-40 mt-40">
        <div className="text-3xl font-semibold my-5">Request a rental car</div>
        <div className="flex gap-20 justify-between">
          <div className="flex w-1/2 flex-col">
            <div className="text-xl font-semibold py-4">Your car</div>
            <div className="flex items-start justify-between mb-5">
              <div className="flex flex-col gap-2">
                <div className="text-base font-medium">Pick-Up</div>
                <div className="text-base text-[#666]">11/11/2024 - 12:00</div>
              </div>
              <div>
                <div className="px-4 py-2 border rounded-3xl">edit</div>
              </div>
            </div>
            <div className="flex items-start justify-between pb-5 border-b-2">
              <div className="flex flex-col gap-2">
                <div className="text-base font-medium">Drop-Off</div>
                <div className="text-base text-[#666]">11/11/2024 - 12:00</div>
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
              The host has 24 hours to confirm your booking. You will be charged
              once the request is accepted.
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-3 text-lg font-semibold text-white bg-blue-500 rounded-xl"
            >
              Rental
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
                  <div className="text-base font-semibold">MÔ TÔ LỎ</div>
                  <div>miền cực lạc</div>
                </div>
              </div>
              <div className="px-4 py-2 pt-4 border-t text-xl font-semibold">
                Price details
              </div>
              <div className=" px-4 py-2 flex items-start justify-between">
                <div className="underline text-[#222]">
                  $1000 x 6 day
                </div>
                <div className=" text-[#222]">$ 6000</div>
              </div>
              <div className="px-4 pt-5 py-2 border-t flex items-start justify-between">
                <div className="text-base font-semibold">Total</div>
                <div className="text-base font-semibold">$ 6000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
