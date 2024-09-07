"use client";
import { IoIosArrowDown } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiBookmarkCheck, CiSearch } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { TfiViewList } from "react-icons/tfi";
import { useState } from "react";
import Image from "next/image";
import { TbCircleDotFilled } from "react-icons/tb";
import CalendarManage from "@/components/homestay/CalendarManage";
import { IoCloseOutline } from "react-icons/io5";
import { useHomestaysContext } from "@/store/HomestaysContext";
import { useHostContext } from "@/store/Hostcontext";
import { useRouter } from "next/navigation";
const MultiCalendar = () => {
  const [tab, setTable] = useState<string>("today");
  const [bookingTab,setBookingTab] = useState<string>("confirm");
  const [isOpenPrice, setIsOpenPrice] = useState<boolean>(false);
  const [layout,setLayout] = useState<boolean>(true);
  const [isOpenPriceWeek, setIsOpenPriceWeek] = useState<boolean>(false);
  const [isOpenPriceCleaning, setIsOpenPriceCleaning] =
    useState<boolean>(false);
  const [isOpenHomestay, setIsOpenHomestay] = useState<boolean>(false);
  const [price, setPrice] = useState<string>();
  const [priceWeek, setPriceWeek] = useState<string>();
  const [cleaning, setCleaning] = useState<number | undefined>();
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isExpandWeek, setIsExpandWeek] = useState<boolean>(false);

  const numericPrice = Number(price) || 0;
  const FeeForGuest = numericPrice * 0.03;
  const FeeForHost = numericPrice * 0.04;
  const TotalForGuest = numericPrice + FeeForGuest;

  const numericPriceWeek = Number(priceWeek) || 0;
  const FeeForGuestWeek = numericPriceWeek * 0.03;
  const FeeForHostWeek = numericPriceWeek * 0.04;
  const TotalForGuestWeek = numericPriceWeek + FeeForGuestWeek;

  const Earn = numericPrice - FeeForHost;
  const EarnWeek = numericPriceWeek - FeeForHostWeek;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  const handleChangeWeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setPriceWeek(value);
    }
  };
  const handleChangeCleaning = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? Number(event.target.value) : undefined;
    setCleaning(value);
  };
  const {setState} = useHostContext();
  const router = useRouter();
  const handleRedirectHost = () => {
    
      setState(null);
      router.push('/homestays/host');
      
  }
  return (
    <>
      <div className="mt-59">
        <div className="flex items-center justify-center border-b ">
          <div className="flex justify-between items-center gap-5">
            <div
              className={`text-base   ${
                tab === "today"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTable("today")}
            >
              Today
            </div>
            <div
              className={`text-base   ${
                tab === "manage"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTable("manage")}
            >
              Manage Homestay
            </div>
            <div
              className={`text-base   ${
                tab === "calendar"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTable("calendar")}
            >
              Calendar
            </div>
          </div>
        </div>
      </div>
      {tab === "calendar" && (
        <div className="flex ">
          <div className="w-2/3 border-b ">
            <div className="flex justify-between items-center px-5 py-6">
              <div className="text-2xl font-semibold"></div>
              <div className="relative">
                <div
                  className="flex items-center gap-2 border rounded-lg px-4 py-2 "
                  onClick={() => setIsOpenHomestay((prev) => !prev)}
                >
                  <span className="text-[#666] font-medium">homestay</span>
                  <IoIosArrowDown />
                </div>
                {isOpenHomestay && (
                  <div className="absolute z-99 top-10 right-[-2px]">
                    <div className="border shadow-md rounded-2xl p-4 px-6 w-[500px] cursor-pointer bg-white">
                      <div className="flex items-center justify-between">
                        <div className="mb-5 flex items-center gap-5">
                          <div className="h-20 w-20 rounded-lg overflow-hidden">
                            <Image
                              src={"/boat.png"}
                              alt=""
                              height={400}
                              width={400}
                              className="object-center object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="capitalize text-base font-bold">
                              name homestay
                            </div>
                            <div className="capitalize text-xs text-[#666] font-medium">
                              name homestay
                            </div>
                          </div>
                        </div>
                        <div>
                          <input type="radio" className="h-6 w-6 mr-2" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <div className="h-20 w-20 rounded-lg overflow-hidden">
                            <Image
                              src={"/boat.png"}
                              alt=""
                              height={400}
                              width={400}
                              className="object-center object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="capitalize text-base font-bold">
                              name homestay
                            </div>
                            <div className="capitalize text-xs text-[#666] font-medium">
                              name homestay
                            </div>
                          </div>
                        </div>
                        <div>
                          <input type="radio" className="h-6 w-6 mr-2" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t mt-3 pt-5">
                        <button
                          onClick={() => setIsOpenHomestay(false)}
                          className="px-6 py-2 border bg-slate-500 rounded-lg font-bold text-white "
                        >
                          Close
                        </button>
                        <button className="px-6 py-2 border bg-blue-500 rounded-lg font-bold text-white ">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <CalendarManage />
            </div>
          </div>
          <div className="w-1/3 border-l border-b">
            <div className="px-6 py-8 overflow-y-scroll">
              <div className="text-2xl font-semibold">Setting</div>
              <div className="my-8 text-base font-light text-[#666]">
                These options apply to all nights, unless you customize by day.
              </div>
              <div className="font-medium text-lg p-3">Base price</div>

              <Dialog open={isOpenPrice} onOpenChange={setIsOpenPrice}>
                <DialogTrigger asChild>
                  <div className="border rounded-xl p-6">
                    <div className="text-sm text-[#666] font-light py-1 pb-2">
                      Night
                    </div>
                    <div className="text-3xl font-bold">$23</div>
                  </div>
                </DialogTrigger>
                <DialogContent className="min-w-[700px]">
                  <DialogTitle></DialogTitle>
                  <div className="flex flex-col items-center justify-center mb-5">
                    <div className="w-[640px]">
                      <div className="text-3xl text-center font-medium py-5">
                        Every Night
                      </div>
                    </div>
                    <div className="flex my-5">
                      <input
                        type="number"
                        value={price?.toString() || ""}
                        min={1}
                        onChange={(e) => handleChange(e)}
                        className="border-none outline-none font-5xl font-bold w-20 input-number"
                      />
                    </div>
                    <div
                      className="flex justify-center w-[400px]  mt-5"
                      onClick={() => setIsExpand(false)}
                    >
                      <div className="border rounded-lg p-4">
                        {!isExpand && (
                          <>
                            <div className="flex items-center justify-between py-3">
                              <div className="text-lg text-[#666]">
                                Giá cơ sở
                              </div>{" "}
                              <div className="text-lg text-[#666]">
                                ${numericPrice.toFixed(2)}
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-3 gap-10">
                              <div className="text-lg text-[#666]">
                                Phí dịch vụ dành cho khách
                              </div>{" "}
                              <div className="text-lg text-[#666]">
                                ${FeeForGuest.toFixed(2)}
                              </div>
                            </div>
                          </>
                        )}

                        <div
                          className={`flex items-center justify-between   py-3 ${
                            !isExpand ? "border-t-2" : ""
                          }`}
                        >
                          <div className="text-lg text-[#666]">
                            Giá cho khách
                          </div>{" "}
                          <div className="text-lg text-[#666]">
                            ${TotalForGuest.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex justify-center w-[400px]  mt-5"
                      onClick={() => setIsExpand(true)}
                    >
                      <div className="border rounded-lg p-4">
                        {isExpand && (
                          <>
                            <div className="flex items-center justify-between py-3">
                              <div className="text-lg text-[#666]">
                                Giá cơ sở
                              </div>{" "}
                              <div className="text-lg text-[#666]">
                                ${numericPrice.toFixed(2)}
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-3 gap-10">
                              <div className="text-lg text-[#666]">
                                Phí dịch vụ dành cho chủ nhà
                              </div>{" "}
                              <div className="text-lg text-[#666]">
                                $ -{FeeForHost.toFixed(2)}
                              </div>
                            </div>
                          </>
                        )}

                        <div
                          className={`flex items-center justify-between w-[400px] py-3 ${
                            isExpand ? "border-t-2" : ""
                          }`}
                        >
                          <div className="text-lg text-[#666]">
                            Bạn Kiếm Được
                          </div>{" "}
                          <div className="text-lg text-[#666]">
                            ${Earn.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex gap-3">
                      <button
                        className="border rounded-lg bg-slate-400 opacity-50 text-white font-bold px-5 py-4"
                        onClick={() => setIsOpenPrice(false)}
                      >
                        Cancel
                        {isOpenPriceWeek}
                      </button>
                      <button
                        className="border rounded-lg bg-blue-500 text-white font-bold px-5 py-4"
                        onClick={() => setIsOpenPrice(false)}
                      >
                        Save changes
                      </button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isOpenPriceWeek} onOpenChange={setIsOpenPriceWeek}>
                <DialogTrigger asChild>
                  <div className="border rounded-xl p-6 mt-5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[#666] font-light pb-2 py-1">
                        Custom pricing per week
                      </div>
                      {true ? (
                        <div className="text-sm text-black font-semibold underline">
                          Delete
                        </div>
                      ) : (
                        <div className="text-sm text-black font-semibold underline">
                          Add
                        </div>
                      )}
                    </div>
                    {true ? (
                      <div className="text-3xl font-bold">$23</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="min-w-[700px]">
                  <div className="flex flex-col items-center justify-center mb-5">
                    <div className="w-[640px]">
                      <div className="text-2xl text-center font-medium py-5">
                        Every Night
                      </div>
                      <div className="text-center text-base text-[#666]">
                        Friday and Saturday nights
                      </div>
                    </div>
                    <div className="flex my-5">
                      <input
                        type="number"
                        value={priceWeek?.toString() || ""}
                        min={1}
                        onChange={(e) => handleChangeWeek(e)}
                        className="border-none outline-none font-5xl font-bold w-20 input-number"
                      />
                    </div>
                    <div
                      className="flex justify-center w-[400px]  mt-5"
                      onClick={() => setIsExpandWeek(false)}
                    >
                      <div className="border rounded-lg p-4">
                        {!isExpandWeek && (
                          <>
                            <div className="flex items-center justify-between py-3">
                              <div className="text-lg text-[#666]">
                                Giá cơ sở
                              </div>{" "}
                              <div className="text-lg text-[#666]">
                                ${numericPriceWeek.toFixed(2)}
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-3 gap-10">
                              <div className="text-lg text-[#666]">
                                Phí dịch vụ dành cho khách
                              </div>{" "}
                              <div className="text-lg text-[#666]">
                                ${FeeForGuestWeek.toFixed(2)}
                              </div>
                            </div>
                          </>
                        )}

                        <div
                          className={`flex items-center justify-between   py-3 ${
                            !isExpandWeek ? "border-t-2" : ""
                          }`}
                        >
                          <div className="text-lg text-[#666]">
                            Giá cho khách
                          </div>{" "}
                          <div className="text-lg text-[#666]">
                            ${TotalForGuestWeek.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex justify-center w-[400px]  mt-5"
                      onClick={() => setIsExpand(true)}
                    >
                      <div className="border rounded-lg p-4">
                        {isExpandWeek && (
                          <>
                            <div className="flex items-center justify-between py-3">
                              <div className="text-lg text-[#666]">
                                Giá cơ sở
                              </div>{" "}
                              <div className="text-lg text-[#666]">
                                ${numericPriceWeek.toFixed(2)}
                              </div>
                            </div>
                            <div className="flex items-center justify-between py-3 gap-10">
                              <div className="text-lg text-[#666]">
                                Phí dịch vụ dành cho chủ nhà
                              </div>{" "}
                              <div className="text-lg text-[#666]">
                                $ -{FeeForHostWeek.toFixed(2)}
                              </div>
                            </div>
                          </>
                        )}

                        <div
                          className={`flex items-center justify-between w-[400px] py-3 ${
                            isExpandWeek ? "border-t-2" : ""
                          }`}
                        >
                          <div className="text-lg text-[#666]">
                            Bạn Kiếm Được
                          </div>{" "}
                          <div className="text-lg text-[#666]">
                            ${EarnWeek.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex gap-3">
                      <button
                        className="border rounded-lg bg-slate-400 opacity-50 text-white font-bold px-5 py-4"
                        onClick={() => setIsOpenPriceWeek(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="border rounded-lg bg-blue-500 text-white font-bold px-5 py-4"
                        onClick={() => setIsOpenPriceWeek(false)}
                      >
                        Save changes
                      </button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isOpenPriceCleaning}
                onOpenChange={setIsOpenPriceCleaning}
              >
                <DialogTrigger asChild>
                  <div className="border rounded-xl p-6 mt-5">
                    <div className="text-sm text-[#666] font-light pb-2 py-1">
                      Cleaning Fee
                    </div>
                    <div className="text-3xl font-bold">$23</div>
                  </div>
                </DialogTrigger>
                <DialogContent className="min-w-[700px]">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-[640px]">
                      <div className="text-xl text-center font-medium py-5">
                        Enter Cleaning Fee of you
                      </div>
                    </div>
                    <div className="flex my-5">
                      <input
                        type="number"
                        value={cleaning}
                        min={1}
                        onChange={(e) => handleChangeCleaning(e)}
                        className="border-none outline-none font-5xl font-bold w-20 input-number"
                      />
                    </div>
                    <div className="flex justify-center w-[400px]  mt-5">
                      <div className="border rounded-lg p-4">
                        <>
                          <div className="flex items-center justify-between gap-44 py-3">
                            <div className="text-lg text-[#666]">
                              Cleaning Fee
                            </div>{" "}
                            <div className="text-lg text-[#666]">
                              ${cleaning?.toFixed(2)}
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <div className="flex gap-3">
                      <button
                        className="border rounded-lg bg-slate-400 opacity-50 text-white font-bold px-5 py-4"
                        onClick={() => setIsOpenPriceCleaning(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="border rounded-lg bg-blue-500 text-white font-bold px-5 py-4"
                        onClick={() => setIsOpenPriceCleaning(false)}
                      >
                        Save changes
                      </button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
      {tab === "manage" && (
        <div className="mx-20">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold my-5">Your rental homestay</div>
            <div className="flex items-center gap-5">
              <div className="p-3 bg-slate-200 rounded-full">
                <CiSearch className="h-5 w-5 " />
              </div>
              {layout && (
                <div
                  className="p-3 bg-slate-200 rounded-full"
                  onClick={() => setLayout(false)}
                >
                  <TfiViewList className="h-5 w-5 " />
                </div>
              )}
              {!layout && (
                <div
                  className="p-3 bg-slate-200 rounded-full"
                  onClick={() => setLayout(true)}
                >
                  <RxDashboard className="h-5 w-5 " />
                </div>
              )}

              <div className="p-3 bg-slate-200 rounded-full">
                <GoPlus className="h-5 w-5 " onClick={handleRedirectHost} />
              </div>
            </div>
          </div>
          {!layout && (
            <div className="grid grid-cols-3 gap-5">
              <div className="text-black font-bold">Item</div>
              <div className="text-black font-bold">Location</div>
              <div className="text-black font-bold">status</div>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 overflow-hidden rounded-lg">
                  <Image
                    src={"/boat.png"}
                    alt=""
                    height={400}
                    width={400}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <div className="text-lg font-semibold">name 1</div>
              </div>
              <div className="text-[#666] font-medium flex items-center">
                Can Tho Viet Nam
              </div>
              <div className="flex gap-3 items-center">
                <TbCircleDotFilled className="text-red-400" />
                <span className="text-[#666] font-medium">
                  Pending approval
                </span>
              </div>
            </div>
          )}
          {layout && (
            <div className="grid gap-5 grid-cols-3">
              <div>
                <div className="w-full h-[400px] overflow-hidden rounded-lg relative">
                  <Image
                    src={"/boat.png"}
                    alt=""
                    height={400}
                    width={400}
                    className="object-cover object-center w-full h-full"
                  />
                  <div className="text-black font-medium bg-white absolute top-5 left-5 flex gap-2 items-center px-4 py-1 rounded-lg">
                    <TbCircleDotFilled className="text-red-400" />
                    <span className="text-[#666] font-medium">
                      Pending approval
                    </span>
                  </div>
                </div>
                <div className="text-lg font-semibold">name 1</div>
                <div className="text-[#666] font-medium">can tho vilaf</div>
              </div>
            </div>
          )}
        </div>
      )}
      {tab === "today" && (
        <div className="mx-20">
          <div className="text-3xl font-bold my-5">Booking</div>
          <div>
            <div className="flex items-center justify-start border-b ">
              <div className="flex justify-between items-center gap-5">
                <div
                  className={`text-base   ${
                    bookingTab === "confirm"
                      ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                      : "font-medium text-[#666] py-5"
                  }  `}
                  onClick={() => setBookingTab("confirm")}
                >
                  Confirm
                </div>
                <div
                  className={`text-base   ${
                    bookingTab === "complete"
                      ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                      : "font-medium text-[#666] py-5"
                  }  `}
                  onClick={() => setBookingTab("complete")}
                >
                  Complete
                </div>
                <div
                  className={`text-base   ${
                    bookingTab === "all"
                      ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                      : "font-medium text-[#666] py-5"
                  }  `}
                  onClick={() => setBookingTab("all")}
                >
                  All
                </div>
              </div>
            </div>
          </div>
          {bookingTab == "confirm" && (
            <div className="mx-20 mt-5">
              <div className="rounded-2xl border">
                <div className="flex gap-3 flex-col">
                  <div className="flex items-center gap-3 px-7">
                    <div className="h-20 w-20 overflow-hidden rounded-full p-4">
                      <Image
                        src="/boat.png"
                        alt=""
                        className="h-full w-full rounded-full object-cover object-center"
                        height={300}
                        width={300}
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Wisdom Pham</div>
                      <span className="rounded-full bg-blue-100 px-4 text-sm font-medium text-blue-950">
                        User
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col border-y">
                    <div className="flex gap-14 p-4 px-10">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                  <div>
                    <div className="grid  grid-cols-2 gap-5 px-10  py-6">
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Check In
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Check Out
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Number Of Guest
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Booking Date
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t">
                    <div className="text-lg px-10 py-5 font-bold text-[#666]">
                      Information Homestay{" "}
                    </div>
                    <div>
                      <div className="flex  flex-col items-center px-7 mb-10">
                        <div className="border w-full rounded-2xl p-6">
                          <div className="flex mb-5 gap-4">
                            <div>
                              <div className="rounded-xl overflow-hidden w-60 h-40">
                                <Image
                                  src="/boat.png"
                                  alt=""
                                  className="object-cover object-center w-full h-full"
                                  height={300}
                                  width={300}
                                />
                              </div>
                            </div>
                            <div className="">
                              <div className="text-base font-semibold">
                                Title
                              </div>
                              <div>Address</div>
                            </div>
                          </div>
                          <div className="px-4 py-2 pt-4 border-t text-xl font-semibold">
                            Price details
                          </div>
                          <div className=" px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              $100 x 7 night
                            </div>
                            <div className=" text-[#222]">$ 7000</div>
                          </div>
                          <div className=" px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              Cleaning Fee
                            </div>
                            <div className=" text-[#222]">$ 20</div>
                          </div>
                          <div className="pb-5 px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              East2West Service Fee
                            </div>
                            <div className=" text-[#222]">$ 30</div>
                          </div>
                          <div className="px-4 pt-5 py-2 border-t flex items-start justify-between">
                            <div className="text-base font-semibold">Total</div>
                            <div className="text-base font-semibold">$ 999</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t flex items-center  justify-end">
                    <button className="flex items-center gap-2 px-10 border rounded-lg py-2 mx-7 my-2 cursor-pointer bg-red-400">
                      <IoCloseOutline className="h-6 w-6 text-white font-extrabold" />
                      <span className="text-base font-semibold text-white">
                        Cancel
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-10 border rounded-lg py-2 mx-7 my-2 cursor-pointer bg-blue-400">
                      <CiBookmarkCheck className="h-6 w-6 text-white font-extrabold" />
                      <span className="text-base font-semibold text-white">
                        Confirm
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {bookingTab == "complete" && (
            <div className="mx-20 mt-5">
              <div className="rounded-2xl border">
                <div className="flex gap-3 flex-col">
                  <div className="flex items-center gap-3 px-7">
                    <div className="h-20 w-20 overflow-hidden rounded-full p-4">
                      <Image
                        src="/boat.png"
                        alt=""
                        className="h-full w-full rounded-full object-cover object-center"
                        height={300}
                        width={300}
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Wisdom Pham</div>
                      <span className="rounded-full bg-blue-100 px-4 text-sm font-medium text-blue-950">
                        User
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col border-y">
                    <div className="flex gap-14 p-4 px-10">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                  <div>
                    <div className="grid  grid-cols-2 gap-5 px-10  py-6">
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Check In
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Check Out
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Number Of Guest
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Booking Date
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t">
                    <div className="text-lg px-10 py-5 font-bold text-[#666]">
                      Information Homestay{" "}
                    </div>
                    <div>
                      <div className="flex  flex-col items-center px-7 mb-10">
                        <div className="border w-full rounded-2xl p-6">
                          <div className="flex mb-5 gap-4">
                            <div>
                              <div className="rounded-xl overflow-hidden w-60 h-40">
                                <Image
                                  src="/boat.png"
                                  alt=""
                                  className="object-cover object-center w-full h-full"
                                  height={300}
                                  width={300}
                                />
                              </div>
                            </div>
                            <div className="">
                              <div className="text-base font-semibold">
                                Title
                              </div>
                              <div>Address</div>
                            </div>
                          </div>
                          <div className="px-4 py-2 pt-4 border-t text-xl font-semibold">
                            Price details
                          </div>
                          <div className=" px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              $100 x 7 night
                            </div>
                            <div className=" text-[#222]">$ 7000</div>
                          </div>
                          <div className=" px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              Cleaning Fee
                            </div>
                            <div className=" text-[#222]">$ 20</div>
                          </div>
                          <div className="pb-5 px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              East2West Service Fee
                            </div>
                            <div className=" text-[#222]">$ 30</div>
                          </div>
                          <div className="px-4 pt-5 py-2 border-t flex items-start justify-between">
                            <div className="text-base font-semibold">Total</div>
                            <div className="text-base font-semibold">$ 999</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t flex justify-end">
                    <button className="flex items-center gap-2 px-10 border rounded-lg py-2 mx-7 my-2 cursor-pointer bg-orange-400">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </span>
                      <span className="text-base font-semibold text-white">
                        Download Receipt
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {bookingTab == "all" && (
            <div className="mx-20 mt-5">
              <div className="rounded-2xl border">
                <div className="flex gap-3 flex-col">
                  <div className="flex items-center gap-3 px-7">
                    <div className="h-20 w-20 overflow-hidden rounded-full p-4">
                      <Image
                        src="/boat.png"
                        alt=""
                        className="h-full w-full rounded-full object-cover object-center"
                        height={300}
                        width={300}
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold">Wisdom Pham</div>
                      <span className="rounded-full bg-blue-100 px-4 text-sm font-medium text-blue-950">
                        User
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col border-y">
                    <div className="flex gap-14 p-4 px-10">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                    <div className="flex gap-14 px-10 pb-4">
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
                  <div>
                    <div className="grid  grid-cols-2 gap-5 px-10  py-6">
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Check In
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Check Out
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Number Of Guest
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-[#666]">
                          Booking Date
                        </div>
                        <div className="text-base font-semibold text-[#222]">
                          12/12/2334
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t">
                    <div className="text-lg px-10 py-5 font-bold text-[#666]">
                      Information Homestay{" "}
                    </div>
                    <div>
                      <div className="flex  flex-col items-center px-7 mb-10">
                        <div className="border w-full rounded-2xl p-6">
                          <div className="flex mb-5 gap-4">
                            <div>
                              <div className="rounded-xl overflow-hidden w-60 h-40">
                                <Image
                                  src="/boat.png"
                                  alt=""
                                  className="object-cover object-center w-full h-full"
                                  height={300}
                                  width={300}
                                />
                              </div>
                            </div>
                            <div className="">
                              <div className="text-base font-semibold">
                                Title
                              </div>
                              <div>Address</div>
                            </div>
                          </div>
                          <div className="px-4 py-2 pt-4 border-t text-xl font-semibold">
                            Price details
                          </div>
                          <div className=" px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              $100 x 7 night
                            </div>
                            <div className=" text-[#222]">$ 7000</div>
                          </div>
                          <div className=" px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              Cleaning Fee
                            </div>
                            <div className=" text-[#222]">$ 20</div>
                          </div>
                          <div className="pb-5 px-4 py-2 flex items-start justify-between">
                            <div className="underline text-[#222]">
                              East2West Service Fee
                            </div>
                            <div className=" text-[#222]">$ 30</div>
                          </div>
                          <div className="px-4 pt-5 py-2 border-t flex items-start justify-between">
                            <div className="text-base font-semibold">Total</div>
                            <div className="text-base font-semibold">$ 999</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t">
                    <button className="flex items-center gap-2 px-10 border rounded-lg py-2 mx-7 my-2 cursor-pointer bg-orange-400">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                          />
                        </svg>
                      </span>
                      <span className="text-base font-semibold text-white">
                        Download Receipt
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mx-20"></div>
    </>
  );
};

export default MultiCalendar;
