"use client";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import { FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Itinerary from "@/components/tour/Itinerary";
import { useParams, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiUser } from "react-icons/ci";
import Gallery from "@/components/tour/Gallerry";
import CheckoutPackage from "@/components/tour/CheckoutPackage";
import { getData } from "@/utils/axios";

interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string[];
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

const Package = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    if (id) {
      const fetchData = async () => {
        try {
          const res = await getData({ endpoint: `/tours/${id}` });
          setPackageData(res);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <>
      <div className="mx-10 mt-40">
        {/* <Breadcrumb /> */}
      </div>
      <div className="mx-20">
        <div className="mb-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{packageData?.title}</h1>
            <div className="flex items-center gap-3">
              {/* <button
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
              </button> */}
            </div>
          </div>
          <div className="flex my-2 gap-5">
            <div className="border px-2 rounded-md">
              {packageData?.itineraries.length! - 1}N/
              {packageData?.itineraries.length!}D
            </div>
            {/* <div className="flex gap-1 items-center">
              <div className="text-lg font-medium">3N Hanoi</div>
              <div>
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
              </div>
              <div className="text-lg font-medium">3N Da Nang</div>
            </div> */}
          </div>
        </div>
        <Gallery packageData={packageData!} />
        <Tabs defaultValue="Itinerary" className="flex w-full flex-col  ">
          <TabsList className="grid w-1/3 grid-cols-3">
            <TabsTrigger value="Itinerary">ITINERARY</TabsTrigger>
            {/* <TabsTrigger value="Policies">POLICIES</TabsTrigger>
            <TabsTrigger value="Summary">SUMMARY</TabsTrigger> */}
          </TabsList>
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <TabsContent value="Itinerary">
                <Itinerary packageData={packageData!} />
              </TabsContent>
              {/* <TabsContent value="Policies">22</TabsContent>
              <TabsContent value="Summary">33</TabsContent> */}
            </div>
            <div className="col-span-1">
              <CheckoutPackage packageData={packageData!} />
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Package;


