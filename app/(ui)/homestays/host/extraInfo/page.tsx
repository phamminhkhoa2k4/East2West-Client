"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHostContext } from "@/store/Hostcontext";
import { useState } from "react";

const ExtraInfo = () => {
  const { state, setState } = useHostContext();
  const [extraInfo, setExtraInfo] = useState<string>(
    state?.data.extraInfo ?? ""
  );
  const router = useRouter();
  const handleClick = () => {
    if (extraInfo.length > 0) {
      setState({
        data: {
          ...state?.data!,
          extraInfo: extraInfo,
        },
      });
      router.push("/homestays/host/finish");
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
        <div className="w-[640px]">
          <div className="text-3xl font-medium py-5">
            {/* Tạo phần thông tin bổ sung */}
            Create additional information section
          </div>
          <div className="text-lg font-medium text-[#666]">
            {/* Ghi chú các phần thông tin bổ sung của bạn */}
            Make notes of your additional information
          </div>
        </div>
        <div className="w-[640px]  mt-5">
          <div className="mb-6">
            <textarea
              rows={6}
              placeholder="Enter Your Extra Information"
              maxLength={500}
              className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              onChange={(e) => setExtraInfo(e.target.value)}
            >
              {extraInfo}
            </textarea>
          </div>
          <span className="text-[#666] font-medium">
            {extraInfo.length}/500
          </span>
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
            extraInfo.length === 0 ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ExtraInfo;
