"use client";

import { updateData } from "@/utils/axios";
import { format } from "date-fns";
import { useState } from "react";
type CleaningType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};
const Cleaning = ({ homestay, setReload }: CleaningType) => {


  
  const [cleaning, setCleaning] = useState<number | undefined>(
    homestay?.cleaningFee ?? 0
  );

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const value = event.target.value ? Number(event.target.value) : undefined;
   setCleaning(value);
 };
  const handleSaveCleaning = async () => {
    try {
      const res = await updateData({
        id: homestay.homestayid!,
        endpoint: "homestays/host",
        payload: { ...homestay, cleaningFee: cleaning },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReload(true);
    }
  };
  return (
    <>
      <div className="">
        <div className="h-[585px] flex flex-col items-center justify-center">
          <div className="text-3xl font-bold mb-5">Cleaning Fee</div>
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
        <div className="flex items-center justify-end border-t py-5 ">
          <button
            className={`px-6 rounded-xl py-3 text-white font-bold text-xl bg-blue-500 ${
              cleaning == 0 ? "opacity-30" : "hover:scale-105"
            }`}
            onClick={handleSaveCleaning}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Cleaning;
