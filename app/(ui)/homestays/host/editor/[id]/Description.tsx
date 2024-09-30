"use client";

import { createData, updateData } from "@/utils/axios";
import { useState } from "react";
type DescriptionType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};

const Description = ({homestay,setReload} : DescriptionType) => {
  const [description, setDescription] = useState<string>(homestay?.description ?? "");
  const handleSaveDescription = async () => {
      try {
        const res = await updateData({
          id: homestay.homestayid!,
          endpoint: "homestays/host",
          payload: { ...homestay, description },
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
          <div className="text-sm  font-medium pt-15 text-[#666]">
            {" "}
            Remain <span className="font-bold">
              {500 - description.length}
            </span>{" "}
            Character
          </div>
          <textarea
            rows={3}
            maxLength={501}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setDescription(e.target.value);
              }
            }}
            className="resize-none p-5 pt-3 text-4xl font-bold border-none outline-none text-center "
          >
            {description}
          </textarea>
        </div>
        <div className="flex items-center justify-end border-t py-5 ">
          <button
            className={`px-6 rounded-xl py-3 text-white font-bold text-xl bg-blue-500 ${
              description.length == 0 ? "opacity-30" : "hover:scale-105"
            }`}
            onClick={handleSaveDescription}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Description;

;
