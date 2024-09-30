"use client";
import { createData, updateData } from "@/utils/axios";
import { useState } from "react";
import { MdOutlineElectricBolt } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
type InstantType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};

const Instant = ({ homestay, setReload }: InstantType) => {
  const [instant, setInstant] = useState<boolean>(homestay?.instant);

  const handleSaveInstant = async () => {
    try {
      const response = await updateData({
        id: homestay?.homestayid!,
        endpoint: "homestays/host",
        payload: { ...homestay, instant },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReload(true);
    }
  };

  return (
    <>
      <div>
        <div className="w-auto flex flex-col gap-5 my-5 justify-center">
          <div className="text-3xl font-bold mb-15 my-20">Booking settings</div>
          <div
            className={`flex items-center justify-between border rounded-lg p-6 ${
              !instant ? "border-blue-500 border-2" : ""
            }`}
            onClick={() => setInstant(false)}
          >
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium">
                Chấp thuận hoặc từ chối yêu cầu
              </div>
              <div className="text-sm text-[#6a6a6a]">
                Khách phải hỏi xem họ có thể đặt phòng không
              </div>
            </div>
            <TiMessages className="w-11 h-11" />
          </div>
          <div
            className={`flex items-center justify-between border rounded-lg p-6 ${
              instant ? "border-blue-500 border-2" : ""
            }`}
            onClick={() => setInstant(true)}
          >
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium">
                Sử dụng tính năng Đặt ngay
              </div>
              <div className="text-sm text-[#6a6a6a]">
                Khách có thể đặt phòng tự động.
              </div>
            </div>
            <MdOutlineElectricBolt className="w-11 h-11" />
          </div>
        </div>
        <div className="flex items-center justify-end border-t py-5 mt-33">
          <button
            className={`px-6 rounded-xl py-3 text-white font-bold text-xl bg-blue-500 ${
              homestay?.instant === instant ? "opacity-30" : "hover:scale-105"
            }`}
            onClick={handleSaveInstant}
            disabled={homestay?.instant === instant}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Instant;
