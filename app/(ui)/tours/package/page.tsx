import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import Gallery from "@/components/tour/Gallerry";
import { FiMoreHorizontal, FiShare2 } from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Itinerary from "@/components/tour/Itinerary";
import CheckoutPackage from "@/components/tour/CheckoutPackage";
export default function Package() {
  return (
    <>
      <div className="mx-10">
        <Breadcrumb />
      </div>
      <div className="mx-20">
        <div className="mb-5">
          <div className="flex justify-between">  
            <h1 className="text-3xl font-bold">
              Hanoi to Danang - Super Saver
            </h1>
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
            <div className="border px-2 rounded-md">6N/7D</div>
            <div className="flex gap-1 items-center">
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
            </div>
          </div>
        </div>
        <Gallery />
        <Tabs defaultValue="Itinerary" className="flex w-full flex-col  ">
          <TabsList className="grid w-1/3 grid-cols-3">
            <TabsTrigger value="Itinerary">ITINERARY</TabsTrigger>
            <TabsTrigger value="Policies">POLICIES</TabsTrigger>
            <TabsTrigger value="Summary">SUMMARY</TabsTrigger>
          </TabsList>
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <TabsContent value="Itinerary">
                <Itinerary/>
              </TabsContent>
              <TabsContent value="Policies">22</TabsContent>
              <TabsContent value="Summary">33</TabsContent>
            </div>
            <div className="col-span-1">
                <CheckoutPackage/>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
