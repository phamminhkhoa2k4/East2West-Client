import { IoIosArrowDown } from "react-icons/io";
import IconLabel from "../homestay/IconLabel";
import { HiStar } from "react-icons/hi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createData, getData } from "@/utils/axios";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CiUser } from "react-icons/ci";
interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string;
  roomtype: string;
}
interface Transfer {
  transferid: number;
  transfername: string;
  transferthumbnail: string;
  description: string;
  transferduration: string;
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
interface Itinerary {
  itineraryId: number;
  accommodations: Accommodation[];
  meals: Meal[];
  places: Place[];
  transfers: Transfer[];
  day: string | null;
}
interface CategoryTour {
  categoryTourId: number;
  categoryTourName: string;
}
interface ThemeTour {
  themeTourId: number;
  themeTourName: string;
}
interface DepartureDate {
  departuredateid: number;
  departuredate: string;
}
interface SuitableTour {
  suitableTourId: number;
  suitableName: string;
}
interface PackageData {
  packageid: number;
  title: string;
  thumbnail: string;
  price: number;
  groupsize: string;
  deposit: string;
  bookinghold: string;
  bookingchange: string;
  itineraries: Itinerary[];
  categoryTours: CategoryTour[];
  themeTours: ThemeTour[];
  departureDates: DepartureDate[];
  suitableTours: SuitableTour[];
}
type CheckoutPackageProps = {
  packageData: PackageData;
};

const CheckoutPackage = ({ packageData }: CheckoutPackageProps) => {
  const {id} = useParams();
  const router = useRouter();
 
   const [selectedDate, setSelectedDate] = useState<string | null>(null);
   const [guestCount, setGuestCount] = useState<number>(1);
   const [userInfo, setUserInfo] = useState<any>(null);

 const total =
   Number(packageData?.price) * guestCount +
   Number(packageData?.bookinghold) +
   Number(packageData?.deposit) +
   Number(packageData?.bookingchange);
  const handleBooking = async () => {
    if (!packageData || !selectedDate || !userInfo) return;

    const userId = userInfo.userId;
    const paymentId = 1;
    const tourDate = new Date(selectedDate).toISOString();
    const numberOfPeople = guestCount;
    const totalPrice = packageData?.price * guestCount;
    const packageId=packageData?.packageid

    const bookingData = {
      packageId,
      userId,
      paymentId,
      id,
      tourDate,
      numberOfPeople,
      totalPrice:totalPrice,
      depositAmount: Number(packageData?.deposit),
    };

    try {
      const response = await createData({
        endpoint: `bookings/create_payment/${totalPrice.toFixed(2)}`,
        payload: bookingData,
      }).then((data) => {
            
      if (data.status === "OK" && data.url) {

        router.push(data.url);
      }
      } )

    
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
  },[])

  return (
    <>
      <div className="flex flex-col w-full max-w-md lg:max-w-xs p-6 space-y-6 bg-white mt-2 shadow-md border border-gray-300 rounded-xl">
        <div className="flex justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">${packageData?.price}</span>
              <span className="text-gray-500">/ Guest</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-[19px] border border-gray-300 rounded-lg">
          <div className="col-span-1">
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
              <option value="" disabled>
                Select a departure date
              </option>
              {packageData?.departureDates &&
                packageData?.departureDates.map((date) => (
                  <option key={date.departuredateid} value={date.departuredate}>
                    {new Date(date.departuredate).toLocaleDateString()}
                  </option>
                ))}
            </select>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <div className="col-span-1">
                <label className="text-xs font-bold uppercase" htmlFor="guests">
                  Guests
                </label>
                <button
                  id="guests"
                  className="w-full p-2 flex items-center justify-between bg-white border border-gray-300 rounded-lg text-sm"
                >
                  <CiUser className="h-5 w-5" />
                  <span>{guestCount}</span>
                </button>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex items-center justify-center space-x-4 bg-white shadow-md border py-5 px-20">
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
        <div className="flex flex-col ">
          <button
            className="w-full p-4 text-white bg-blue-400 rounded-lg text-lg"
            onClick={handleBooking}
          >
            Proceed To Payment
          </button>
          <span className="text-gray-500 text-center">
            You won’t be charged yet
          </span>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between">
            <span>
              ${packageData?.price} X {guestCount}
            </span>
            <span>${packageData?.price * guestCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Booking Hold</span>
            <span>${packageData?.bookinghold}</span>
          </div>
          <div className="flex justify-between">
            <span>Booking Change</span>
            <span>${packageData?.bookingchange}</span>
          </div>
          <div className="flex justify-between">
            <span>Deposit</span>
            <span>${packageData?.deposit}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPackage;