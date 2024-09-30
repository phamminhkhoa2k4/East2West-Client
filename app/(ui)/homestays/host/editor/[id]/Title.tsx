"use client";

import { updateData } from "@/utils/axios";
import { useEffect, useState } from "react";
type TitleType = {
  homestay: Homestay;
  setReload : (value : boolean) => void;
};
const Title = ({ homestay, setReload }: TitleType) => {
  const [title, setTitle] = useState<string>(homestay?.title ?? "");

  const handleSaveTitle = async () => {
    try {
      const res = await updateData({
        id: homestay.homestayid!,
        endpoint: "homestays/host",
        payload: { ...homestay, title },
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
          <div className="text-sm  font-medium pt-15 text-[#666]">
            {" "}
            Remain <span className="font-bold">{50 - title.length}</span>{" "}
            Character
          </div>
          <textarea
            rows={3}
            maxLength={51}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setTitle(e.target.value);
              }
            }}
            className="resize-none p-5 pt-3 text-6xl font-bold border-none outline-none text-center "
          >
            {title}
          </textarea>
        </div>
        <div className="flex items-center justify-end border-t py-5 ">
          <button
            className={`px-6 rounded-xl py-3 text-white font-bold text-xl bg-blue-500 ${
              title.length == 0 ? "opacity-30" : "hover:scale-105"
            }`}
            onClick={handleSaveTitle}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Title;
