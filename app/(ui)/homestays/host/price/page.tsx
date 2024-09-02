"use client"
import { useHostContext } from "@/context/context";
import Image from "next/image";
import { useState } from "react";

const Price = () => {
  const {state,setState} = useHostContext();
  console.log(state?.data.pricePerNight);
  
  const [price,setPrice] = useState<number | undefined>(state?.data.pricePerNight  ?? 0);

  

     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? Number(event.target.value) : undefined;
    setPrice(value);      
     }
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
            Bây giờ, hãy đặt mức giá mà bạn muốn
          </div>
          <div className="text-lg font-medium text-[#666]">
            Bạn có thể thay đổi giá này bất cứ lúc nào.
          </div>
        </div>
        <div className="flex my-5">
          <input
            type="number"
            value={price}
            min={1}
            onChange={(e) => handleChange(e)}
            className="border-none outline-none font-5xl font-bold w-20 input-number"
          />
        </div>
        <div className="flex justify-center w-[340px]  mt-5">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between py-3">
              <div className="text-lg text-[#666]">Giá cơ sở</div>{" "}
              <div className="text-lg text-[#666]">${price}</div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="text-lg text-[#666]">
                Phí dịch vụ dành cho khách
              </div>{" "}
              <div className="text-lg text-[#666]">$0</div>
            </div>
            <div className="flex items-center justify-between border-t-2  py-3">
              <div className="text-lg text-[#666]">
                Giá cho khách (trước thuế)
              </div>{" "}
              <div className="text-lg text-[#666]">$0</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-[340px]  mt-5">
          <div className="flex w-full border rounded-xl justify-between p-6">
            <div>Ban Kiem Duoc</div>
            <div>$0</div>
          </div>
        </div>
      </div>
      <div className=" bg-white border-t-4 flex fixed left-0 right-0 bottom-0 items-center justify-between">
        <button className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-400">
          Back
        </button>
        <button className="px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Price;
