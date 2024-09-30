"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { updateData } from "@/utils/axios";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { MdOutlineBedroomParent } from "react-icons/md";
type TypeType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};
const Type = ({ homestay, setReload }: TypeType) => {
  const [type, setType] = useState<string>(homestay?.type ?? "single-room");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSaveType = async () => {
    try {
      if (type != "entire-house") {
        const res = await updateData({
          id: homestay.homestayid!,
          endpoint: "homestays/host",
          payload: { ...homestay, type, room: 1 },
        });
      } else {
        const res = await updateData({
          id: homestay.homestayid!,
          endpoint: "homestays/host",
          payload: { ...homestay, type },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setReload(true);
      setIsOpen(false);
    }
  };

  const confirmSaveARoom = () => {
    if (type != "entire-house") {
      if (homestay?.type != "entire-house") {
        handleSaveType();
      } else {
        setIsOpen(true);
      }
    } else {
      handleSaveType();
    }
  };

  return (
    <>
      <div className="">
        <div className="h-[585px] flex flex-col items-center justify-center">
          <div className="text-3xl font-bold mb-5">Type</div>
          <div className="w-[630px] flex flex-col gap-5 my-5">
            <div
              onClick={() => {
                setType("entire-house");
              }}
              className={`flex items-center justify-between ${
                type === "entire-house" ? "border-2 border-[#666]" : "border"
              }  rounded-lg p-6`}
            >
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Toàn Bộ Nhà</div>
                <div className="text-sm text-[#6a6a6a]">
                  Khách Được sử dụng riêng toàn bộ ở chổ này
                </div>
              </div>
              <IoHomeOutline className="w-11 h-11" />
            </div>
            <div
              onClick={() => {
                setType("single-room");
              }}
              className={`flex items-center justify-between ${
                type === "single-room" ? "border-2 border-[#666]" : "border"
              }  rounded-lg p-6`}
            >
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Một căn phòng</div>
                <div className="text-sm text-[#6a6a6a]">
                  Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng
                  những khu vực chung.
                </div>
              </div>
              <LuDoorOpen className="w-11 h-11" />
            </div>
            <div
              onClick={() => {
                setType("common-room");
              }}
              className={`flex items-center justify-between ${
                type === "common-room" ? "border-2 border-[#666]" : "border"
              }  rounded-lg p-6`}
            >
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Phòng chung</div>
                <div className="text-sm text-[#6a6a6a]">
                  Khách ngủ trong một phòng hoặc khu vực chung – nơi bạn hoặc
                  người khác có thể cùng sử dụng.
                </div>
              </div>
              <MdOutlineBedroomParent className="w-11 h-11" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end border-t py-5 ">
          <button
            className={`px-6 rounded-xl py-3 text-white font-bold text-xl bg-blue-500 ${
              type == homestay?.type ? "opacity-30" : "hover:scale-105"
            }`}
            onClick={confirmSaveARoom}
            disabled={type == homestay?.type}
          >
            Save
          </button>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[375px] ">
          <div className="w-full h-full ">
            <AiOutlineClose
              className="w-4 h-4"
              onClick={() => setIsOpen(false)}
            />

            <div className="mx-5 my-8   text-xl font-semibold text-center">
              If you choose this type, your maximum room number is one.
            </div>
            <div
              className="rounded-lg text-lg font-semibold py-3 bg-slate-900 mt-4 mb-2 text-white text-center"
              onClick={handleSaveType}
            >
              Confirm
            </div>
            <div
              className="rounded-lg text-lg font-semibold py-3 text-center"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Type;
