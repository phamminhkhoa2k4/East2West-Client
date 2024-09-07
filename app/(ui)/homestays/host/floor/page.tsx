"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useHostContext } from "@/store/Hostcontext";
import Link from "next/link";
import Image from "next/image";

const Floor = () => {
  const { state, setState } = useHostContext();
  const [countMaxGuest, setCountMaxGuest] = useState<number | undefined>(
    state?.data.maxGuest ?? 0
  );
  const [countRoom, SetCountRoom] = useState<number | undefined>(state?.data.room ?? 0);
  const [countBed, SetCountBed] = useState<number | undefined>(state?.data.beds ?? 0);
  const [countBathroom, SetCountBathroom] = useState<number | undefined>(state?.data.bathroom ?? 0);
  const router = useRouter();
  const handleClick = () => {
    if (countMaxGuest! > 0 && countBed! > 0 ) {
      setState({
        data: {
          ...state?.data!,
          maxGuest: countMaxGuest as number,
          room:countRoom as number,
          beds:countBed as number,
          bathroom:countBathroom as number,
        },
      });

      router.push("/homestays/host/standout");
    }
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <div>
      <div className="bg-white fixed right-0 left-0 top-0  px-15 pt-5 pb-5 z-999 border-b">
        <div className="flex items-center justify-between">
          <div className="w-20 h-20">
            <Image
              src={"/Logo.png"}
              alt=""
              height={300}
              width={300}
              className="object-center object-cover w-full h-full"
            />
          </div>
          <div>
            <Link href={"/"} className="border px-4 py-2 rounded-full">
              Exit
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-36 mb-30">
        <div className="text-4xl font-semibold w-[630px]">
          Hãy bắt đầu từ những điều cơ bản
        </div>
        <div className="w-[630px]  text-lg font-semibold">
          Bao nhiêu người có thể ở tại đây?
        </div>
        <div className="w-[630px]  mt-5 ">
          <div className="bg-white w-full py-4 px-10 border rounded-2xl shadow-md">
            <div className="flex items-center w-full justify-between py-6 border-b-2">
              <div>
                <h3 className="font-medium text-lg">Khách</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="border rounded-full p-2"
                  onClick={() =>
                    setCountMaxGuest((prev) => (prev! > 0 ? prev! - 1 : prev))
                  }
                >
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
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <span>{countMaxGuest}</span>
                <button
                  className="border rounded-full p-2"
                  onClick={() => setCountMaxGuest((prev) => prev! + 1)}
                >
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {state?.data.type === "entire-house" && (
              <div className="flex items-center w-full justify-between py-6 border-b-2">
                <div>
                  <h3 className="font-medium text-lg">Phòng Ngủ</h3>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="border rounded-full p-2"
                    onClick={() => {
                      SetCountRoom((prev) => (prev! > 0 ? prev! - 1 : prev));
                    }}
                  >
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
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                  <span>{countRoom}</span>
                  <button
                    className="border rounded-full p-2"
                    onClick={() => {
                      SetCountRoom((prev) => prev! + 1);
                    }}
                  >
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center w-full justify-between py-6 border-b-2">
              <div>
                <h3 className="font-medium text-lg">Phòng Tắm</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="border rounded-full p-2"
                  onClick={() => {
                    SetCountBathroom((prev) => (prev! > 0 ? prev! - 1 : prev));
                  }}
                >
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
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <span>{countBathroom}</span>
                <button
                  className="border rounded-full p-2"
                  onClick={() => {
                    SetCountBathroom((prev) => prev! + 1);
                  }}
                >
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center w-full justify-between py-6 ">
              <div>
                <h3 className="font-medium text-lg">Giường</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="border rounded-full p-2"
                  onClick={() => {
                    SetCountBed((prev) => (prev! > 0 ? prev! - 1 : prev));
                  }}
                >
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
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <span>{countBed}</span>
                <button
                  className="border rounded-full p-2"
                  onClick={() => {
                    SetCountBed((prev) => prev! + 1);
                  }}
                >
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white border-t-4 flex fixed left-0 right-0 bottom-0 items-center justify-between">
        <button
          onClick={handleBack}
          className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-300"
        >
          Back
        </button>
        <button
          onClick={handleClick}
          className={`px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500 ${
            countMaxGuest! > 0 && countBed! > 0 && countRoom! > 0
              ? "opacity-100"
              : "opacity-30"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Floor;
