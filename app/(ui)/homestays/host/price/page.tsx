"use client";
import { useHostContext } from "@/store/Hostcontext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Price = () => {
  const { state, setState } = useHostContext();
  console.log(state?.data.pricePerNight);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [price, setPrice] = useState<string>(
    state?.data.pricePerNight?.toString() ?? "0"
  );
  const router = useRouter();
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

  const handleClick = () => {
    if (numericPrice ?? 0 > 0) {
      setState({
        data: {
          ...state?.data!,
          pricePerNight: numericPrice,
        },
      });
      router.push("/homestays/host/receipt");
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
                  <div className="text-lg text-[#666]">Giá cơ sở</div>{" "}
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
              className={`flex items-center justify-between  gap-44 py-3 ${
                !isExpand ? "border-t-2" : ""
              }`}
            >
              <div className="text-lg text-[#666]">Giá cho khách</div>{" "}
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
                  <div className="text-lg text-[#666]">Giá cơ sở</div>{" "}
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
              className={`flex items-center justify-between  gap-44 py-3 ${
                isExpand ? "border-t-2" : ""
              }`}
            >
              <div className="text-lg text-[#666]">Bạn Kiếm Được</div>{" "}
              <div className="text-lg text-[#666]">${Earn.toFixed(2)}</div>
            </div>
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
            numericPrice === 0 ? "opacity-30" : ""
          }`}
          onClick={handleClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Price;
