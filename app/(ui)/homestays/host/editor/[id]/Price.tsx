"use client"

import { createData, updateData } from "@/utils/axios";
import { format } from "date-fns";
import { useState } from "react";
type PriceType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};
const Price = ({homestay,setReload} : PriceType) => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const todayAvailability = homestay?.availability.find((avail) => {
    return avail.date.startsWith(currentDate);
  });
    const [isExpand, setIsExpand] = useState<boolean>(false);
    const [price, setPrice] = useState<string>(
      String(todayAvailability?.pricepernight)
    );
    const numericPrice = Number(price) || 0;
    const FeeForGuest = numericPrice * 0.03;
    const FeeForHost = numericPrice * 0.04;

    const TotalForGuest = numericPrice + FeeForGuest;

    const Earn = numericPrice - FeeForHost;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (/^\d*$/.test(value)) {
        setPrice(value);
      }
    };
  const handleSavePrice = async () => {
     try {
       const res = await createData({
         endpoint: "/homestays/host/baseprice",
         payload: { ...homestay, pricePerNight: Number(price) },
       });
     } catch (error) {
       console.log(error);
     } finally {
       setReload(true);
     }
  }
  return (
    <>
      <div className="">
        <div className="h-[585px] flex flex-col items-center justify-center">
          <div className="text-3xl font-bold mb-5">Price Per Night</div>
          <div className="flex my-5">
            <input
              type="number"
              value={price?.toString() || ""}
              min={1}
              onChange={(e) => handleChange(e)}
              className="border-none outline-none font-5xl font-bold w-20 input-number text-center"
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
                    <div className="text-lg text-[#666] text-nowrap">
                      Base price
                    </div>{" "}
                    <div className="text-lg text-[#666]">
                      ${numericPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 gap-10">
                    <div className="text-lg text-[#666] text-nowrap">
                      Guest Service Charges
                    </div>{" "}
                    <div className="text-lg text-[#666]">
                      ${FeeForGuest.toFixed(2)}
                    </div>
                  </div>
                </>
              )}

              <div
                className={`flex items-center justify-between  gap-44 py-3 ${
                  !isExpand ? "border-t-2" : ""
                }`}
              >
                <div className="text-lg text-[#666] text-nowrap">
                  Price for guests
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
                    <div className="text-lg text-[#666] text-nowrap">
                      Base price
                    </div>{" "}
                    <div className="text-lg text-[#666]">
                      ${numericPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 gap-10">
                    <div className="text-lg text-[#666] text-nowrap">
                      Landlord Service Fee
                    </div>{" "}
                    <div className="text-lg text-[#666]">
                      $ -{FeeForHost.toFixed(2)}
                    </div>
                  </div>
                </>
              )}

              <div
                className={`flex items-center justify-between  gap-44 py-3 ${
                  isExpand ? "border-t-2" : ""
                }`}
              >
                <div className="text-lg text-[#666] text-nowrap">You Earn</div>{" "}
                <div className="text-lg text-[#666]">${Earn.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end border-t py-5 ">
          <button
            className={`px-6 rounded-xl py-3 text-white font-bold text-xl bg-blue-500 ${
              numericPrice == 0 ? "opacity-30" : "hover:scale-105"
            }`}
            onClick={handleSavePrice}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Price;
