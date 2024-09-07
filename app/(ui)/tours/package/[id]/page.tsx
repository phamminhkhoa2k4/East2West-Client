"use client"
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import { FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Itinerary from "@/components/tour/Itinerary";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CiUser } from "react-icons/ci";

interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
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
  pricereduce: number;
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

const Package = ({ params }: { params: { id: string } }) => {
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    if (params.id) {
      fetch(`http://localhost:8080/api/tours/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setPackageData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching the package data:", error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [params.id]);

  const handleBooking = async () => {
    if (!packageData || !selectedDate || !userInfo) return;

    const userId = userInfo.userId;
    const paymentId = 1;
    const packageId = params.id;
    const tourDate = new Date(selectedDate).toISOString();
    const numberOfPeople = guestCount;
    const totalPrice = packageData.pricereduce * guestCount;
    const depositAmount = totalPrice * 0.1; // Assuming 10% deposit

    const bookingData = {
        userId,
        paymentId,
        packageId,
        tourDate,
        numberOfPeople,
        totalPrice,
        depositAmount,
    };

    try {
        const response = await fetch(`http://localhost:8080/api/bookings/create_payment/${totalPrice.toFixed(2)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit booking data');
        }

        const result = await response.json();

        if (result.status === 'OK' && result.url) {
            alert('Booking Tour successfully booked!');
            // Redirect to the payment URL
            window.location.href = result.url;
        } else {
            throw new Error('Payment URL not available');
        }
    } catch (error) {
        setError('Failed to complete booking');
        console.error(error);
    }
};


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading package data</div>;
  }

  if (!packageData) {
    return <div>No package data available</div>;
  }

  return (
    <>
      <div className="mx-10 mt-36">
        <Breadcrumb />
      </div>
      <div className="mx-20">
        <div className="mb-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{packageData.title}</h1>
            <div className="flex items-center gap-3">
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
          <div className="flex my-2 gap-5">
            <div className="border px-2 rounded-md">e</div>
            <div className="flex gap-1 items-center">
              <div className="text-lg font-medium">3N {packageData.title}</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                  />
                </svg>
              </div>
              <div className="text-lg font-medium">3N Destination</div>
            </div>
          </div>
        </div>
        <Tabs defaultValue="Itinerary" className="flex w-full flex-col">
          <TabsList className="grid w-1/3 grid-cols-3">
            <TabsTrigger value="Itinerary">ITINERARY</TabsTrigger>
            <TabsTrigger value="Policies">POLICIES</TabsTrigger>
            <TabsTrigger value="Summary">SUMMARY</TabsTrigger>
          </TabsList>
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <TabsContent value="Itinerary">
                <Itinerary itineraries={packageData.itineraries} />
              </TabsContent>
              <TabsContent value="Policies">
                <div>
                  <h2>Booking Hold: {packageData.bookinghold}</h2>
                  <p>Booking Change: {packageData.bookingchange}</p>
                  <p>Deposit: {packageData.deposit}</p>
                </div>
              </TabsContent>
              <TabsContent value="Summary">
                <div>
                  <h2>Group Size: {packageData.groupsize}</h2>
                  <p>Price: ${packageData.price}</p>
                  <p>Price Reduce: ${packageData.pricereduce}</p>
                </div>
              </TabsContent>
            </div>
            <div className="col-span-1">
              <div className="mx-20">
                <div className="mb-5">
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
                        <option value="" disabled>Select a departure date</option>
                        {packageData.departureDates && packageData.departureDates.map((date) => (
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
                        <div className="flex items-center justify-center space-x-4">
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
                      <span>${packageData.pricereduce} x {guestCount}</span>
                      <span>${packageData.pricereduce * guestCount}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${packageData.pricereduce * guestCount}</span>
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
        </Tabs>
      </div>
    </>
  );
};

export default Package;
