"use client";
import { GoPencil } from "react-icons/go";
import { useHostContext } from "@/store/Hostcontext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Cleaning = () => {
  const { state, setState } = useHostContext();
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef <HTMLInputElement>(null);
  const router = useRouter();
 const [cleaning, setCleaning] = useState<number | string>(
   state?.data.cleaningFee ?? ""
 );

  const handleClick = () => {
    if (typeof cleaning === "number" && cleaning  > 0) {
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
    const value = event.target.value;
   
    if (value === "") {
      setCleaning(""); 
    } else {
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        setCleaning(numericValue); 
      }
    }
  };

  const handlePencilClick = () => {
    if (cleaning === 0 || cleaning === "") {
      setShowInput(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } else {
      setShowInput(true);
    }
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
            {/* Bây giờ, hãy đặt mức phí vệ sinh mà bạn muốn */}
            Now set the cleaning fee you want
          </div>
          <div className="text-lg font-medium text-[#666]">
            {/* Bạn có thể chọn mức phí phù hợp với homestay của bạn. */}
            You can choose the fee that suits your homestay.
          </div>
        </div>
        <div className="flex my-5 relative">
          {showInput && (
            <input
              type="text"
              value={cleaning}
              onChange={(e) => handleChange(e)}
              ref={inputRef}
              className="border-none outline-none font-5xl font-bold w-20 input-number"
            />
          )}
          <div
            className="rounded-full border shadow-md p-2"
            onClick={handlePencilClick}
          >
            <GoPencil className="h-5 w-5" />
          </div>
        </div>
        {showInput && (
          <div className="flex justify-center w-[400px]  mt-5">
            <div className="border rounded-lg p-4">
              <>
                <div className="flex items-center justify-between gap-44 py-3">
                  <div className="text-lg text-[#666] text-nowrap">
                    Cleaning fee
                  </div>{" "}
                  <div className="text-lg text-[#666]">
                    ${Number(cleaning)?.toFixed(2)}
                  </div>
                </div>
              </>
            </div>
          </div>
        )}
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
            cleaning == 0 ? "opacity-30 cursor-not-allowed" : ""
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
