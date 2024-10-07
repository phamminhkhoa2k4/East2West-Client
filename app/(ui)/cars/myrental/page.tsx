import Breadcrumb from "@/components/Breadcrumbs/Breadcrumbs";
import CardSearch from "@/components/tour/CardSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

const MyRental = () => {
  return (
    <>
      {/* <div className="mx-10 mt-36">
        <Breadcrumb />
      </div> */}
      <div className="mx-20 rounded-2xl border shadow-md">
        <Tabs
          defaultValue="Upcoming"
          className="flex w-full flex-col pt-2 pl-2 "
        >
          <TabsList className="grid w-1/3 grid-cols-3 pb-10">
            <TabsTrigger value="Upcoming">UPCOMING</TabsTrigger>
            <TabsTrigger value="Cancelled">CANCELLED</TabsTrigger>
            <TabsTrigger value="Completed">COMPLETED</TabsTrigger>
          </TabsList>
          <div className="pt-10 border-t">
            <div className="">
              <TabsContent value="Upcoming">
                <div className="flex flex-col gap-5 mx-5">
                  <>
                    <div className="flex border rounded-xl overflow-hidden">
                      <div className="w-full">
                        <div className="p-4">
                          <div className="border-b">
                            <div className="flex items-center gap-10 px-5 pb-4">
                              <div className="h-25 rounded-lg overflow-hidden ">
                                <Image
                                  src={"/boat.png"}
                                  alt=""
                                  height={300}
                                  width={300}
                                  className="object-cover object-center w-full h-full"
                                />
                              </div>
                              <div className="flex flex-col gap-1 ">
                                <div className="text-base font-extrabold capitalize">
                                  chiec xe mau xanh
                                </div>
                                <div className=" flex items-center gap-2">
                                  <CiLocationOn className="h-5 w-5" />
                                  <span>miền cực lạc</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col border-y">
                            <div className="flex gap-14 p-4 px-5">
                              <div className="text-sm font-semibold text-[#666] w-10 text-nowrap">
                                Full Name
                              </div>
                              <div className="flex gap-3 items-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Email
                              </div>
                              <div className="flex gap-3 items-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Phone
                              </div>
                              <div className="flex gap-3 items-center justify-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Address
                              </div>
                              <div className="flex gap-3 items-center justify-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                          </div>
                          <ul className="grid grid-cols-2 p-4 gap-5 px-5 ">
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Rental Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Price Per Day
                                </div>
                                <div className="text-gray-6">$51,588</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Pick-Up Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Pick-Up Time
                                </div>
                                <div className="text-gray-6">12:00</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Drop-Off Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Drop-Off Time
                                </div>
                                <div className="text-gray-6">12:00</div>
                              </div>
                            </li>
                          </ul>
                          <div className="flex border border-[#e5e5e5] items-center justify-between p-4 bg-[#f9f9f9] rounded-lg">
                            <div className="flex items-center">
                              <span className="mr-5">Total Price :</span>
                              <span className="text-black font-bold text-lg">
                                $51,588
                              </span>
                            </div>
                            <div className="flex gap-5">
                              <div className="px-5 py-2 text-white bg-orange-500 text-lg font-semibold rounded-lg">
                                Print PDF
                              </div>
                              <div className="px-5 py-2 text-white bg-red-500 text-lg font-semibold rounded-lg">
                                Cancel
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </TabsContent>
              <TabsContent value="Cancelled">
                <div className="flex flex-col gap-5 mx-5">
                  <>
                    <div className="flex border rounded-xl overflow-hidden">
                      <div className="w-full">
                        <div className="p-4">
                          <div className="border-b">
                            <div className="flex items-center gap-10 px-5 pb-4">
                              <div className="h-25 rounded-lg overflow-hidden ">
                                <Image
                                  src={"/boat.png"}
                                  alt=""
                                  height={300}
                                  width={300}
                                  className="object-cover object-center w-full h-full"
                                />
                              </div>
                              <div className="flex flex-col gap-1 ">
                                <div className="text-base font-extrabold capitalize">
                                  chiec xe mau xanh
                                </div>
                                <div className=" flex items-center gap-2">
                                  <CiLocationOn className="h-5 w-5" />
                                  <span>miền cực lạc</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col border-y">
                            <div className="flex gap-14 p-4 px-5">
                              <div className="text-sm font-semibold text-[#666] w-10 text-nowrap">
                                Full Name
                              </div>
                              <div className="flex gap-3 items-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Email
                              </div>
                              <div className="flex gap-3 items-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Phone
                              </div>
                              <div className="flex gap-3 items-center justify-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Address
                              </div>
                              <div className="flex gap-3 items-center justify-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                          </div>
                          <ul className="grid grid-cols-2 p-4 gap-5 px-5 ">
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Rental Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Price Per Day
                                </div>
                                <div className="text-gray-6">$51,588</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Pick-Up Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Pick-Up Time
                                </div>
                                <div className="text-gray-6">12:00</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Drop-Off Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Drop-Off Time
                                </div>
                                <div className="text-gray-6">12:00</div>
                              </div>
                            </li>
                          </ul>
                          <div className="flex border border-[#e5e5e5] items-center justify-between p-4 bg-[#f9f9f9] rounded-lg">
                            <div className="flex items-center">
                              <span className="mr-5">Total Price :</span>
                              <span className="text-black font-bold text-lg">
                                $51,588
                              </span>
                            </div>
                            <div className="flex gap-5">
                              <div className="px-5 py-2 text-white bg-blue-500 text-lg font-semibold rounded-lg">
                                Rebook
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </TabsContent>
              <TabsContent value="Completed">
                <div className="flex flex-col gap-5 mx-5">
                  <>
                    <div className="flex border rounded-xl overflow-hidden">
                      <div className="w-full">
                        <div className="p-4">
                          <div className="border-b">
                            <div className="flex items-center gap-10 px-5 pb-4">
                              <div className="h-25 rounded-lg overflow-hidden ">
                                <Image
                                  src={"/boat.png"}
                                  alt=""
                                  height={300}
                                  width={300}
                                  className="object-cover object-center w-full h-full"
                                />
                              </div>
                              <div className="flex flex-col gap-1 ">
                                <div className="text-base font-extrabold capitalize">
                                  chiec xe mau xanh
                                </div>
                                <div className=" flex items-center gap-2">
                                  <CiLocationOn className="h-5 w-5" />
                                  <span>miền cực lạc</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col border-y">
                            <div className="flex gap-14 p-4 px-5">
                              <div className="text-sm font-semibold text-[#666] w-10 text-nowrap">
                                Full Name
                              </div>
                              <div className="flex gap-3 items-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Email
                              </div>
                              <div className="flex gap-3 items-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Phone
                              </div>
                              <div className="flex gap-3 items-center justify-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-14 px-5 pb-4">
                              <div className="text-sm font-semibold text-[#666] w-10">
                                Address
                              </div>
                              <div className="flex gap-3 items-center justify-center">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                  </svg>
                                </span>
                                <div className="text-sm font-semibold text-[#222]">
                                  khoapham280@gmail.com
                                </div>
                              </div>
                            </div>
                          </div>
                          <ul className="grid grid-cols-2 p-4 gap-5 px-5 ">
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Rental Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Price Per Day
                                </div>
                                <div className="text-gray-6">$51,588</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Pick-Up Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Pick-Up Time
                                </div>
                                <div className="text-gray-6">12:00</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Drop-Off Date
                                </div>
                                <div className="text-gray-6">12/12/2024</div>
                              </div>
                            </li>
                            <li>
                              <div className="flex flex-col gap-2">
                                <div className="text-lg font-medium">
                                  Drop-Off Time
                                </div>
                                <div className="text-gray-6">12:00</div>
                              </div>
                            </li>
                          </ul>
                          <div className="flex border border-[#e5e5e5] items-center justify-between p-4 bg-[#f9f9f9] rounded-lg">
                            <div className="flex items-center">
                              <span className="mr-5">Total Price :</span>
                              <span className="text-black font-bold text-lg">
                                $51,588
                              </span>
                            </div>
                            <div className="flex gap-5">
                              <div className="px-5 py-2 text-white bg-blue-500 text-lg font-semibold rounded-lg">
                                Rebook
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default MyRental;
