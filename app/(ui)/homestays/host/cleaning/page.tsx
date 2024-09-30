"use client";
import { useHostContext } from "@/store/Hostcontext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Cleaning = () => {
  const { state, setState } = useHostContext();
  const router = useRouter();
  const [cleaning, setCleaning] = useState<number | undefined>(
    state?.data.cleaningFee ?? 0
  );

  const handleClick = () => {
    if (cleaning ?? 0 > 0) {
      setState({
        data: {
          ...state?.data!,
          cleaningFee: cleaning ?? 0,
        },
      });
      router.push("/homestays/host/price");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? Number(event.target.value) : undefined;
    setCleaning(value);
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
            <button className="border px-4 py-2 rounded-full">Exit</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-36 mb-30">
        <div className="w-[640px]">
          <div className="text-3xl font-medium py-5">
            Bây giờ, hãy đặt mức phí vệ sinh mà bạn muốn
          </div>
          <div className="text-lg font-medium text-[#666]">
            Bạn có thể chọn mức phí phù hợp với homestay của bạn.
          </div>
        </div>
        <div className="flex my-5">
          <input
            type="number"
            value={cleaning}
            min={1}
            onChange={(e) => handleChange(e)}
            className="border-none outline-none font-5xl font-bold w-20 input-number"
          />
        </div>
        <div className="flex justify-center w-[400px]  mt-5">
          <div className="border rounded-lg p-4">
            <>
              <div className="flex items-center justify-between gap-44 py-3">
                <div className="text-lg text-[#666]">Cleaning fee</div>{" "}
                <div className="text-lg text-[#666]">
                  ${cleaning?.toFixed(2)}
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
      <div className=" bg-white border-t-4 flex fixed left-0 right-0 bottom-0 items-center justify-between">
        <button
          className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-400"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className={`px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500 ${
            cleaning == 0 ? "opacity-30" : ""
          }`}
          onClick={handleClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Cleaning;
