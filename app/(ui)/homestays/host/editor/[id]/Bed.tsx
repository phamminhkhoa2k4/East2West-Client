"use client";
import { createData, updateData } from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
type BedType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};
const Bed = ({homestay,setReload} :BedType ) => {
  const [bed, setBed] = useState<number>(homestay?.beds ?? 1);

  useEffect(() => {
    const updateBathroom = async () => {
      try {
        const response = await updateData({
          id: homestay?.homestayid!,
          endpoint: "homestays/host",
          payload: { ...homestay, beds: bed },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setReload(true);
      }
    };

    updateBathroom();
  }, [bed]);
  return (
    <>
      <div className="flex items-center my-26 flex-col  h-screen">
        <div className="flex items-center gap-2 mt-20 mb-10">
          {bed >= 1 && (
            <div className="w-15 h-20">
              <Image
                src={"/bed/1.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {bed >= 2 && (
            <div className="w-20 h-20">
              <Image
                src={"/bed/2.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {bed >= 3 && (
            <div className="w-20 h-20">
              <Image
                src={"/bed/3.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {bed >= 4 && (
            <div className="w-20 h-20">
              <Image
                src={"/bed/4.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {bed >= 5 && (
            <div className="w-20 h-20">
              <Image
                src={"/bed/5.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {bed >= 6 && (
            <div className="w-20 h-20">
              <Image
                src={"/bed/6.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {bed >= 7 && (
            <div className="w-20 h-20">
              <Image
                src={"/bed/1.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {bed >= 8 && (
            <div className="w-20 h-20">
              <Image
                src={"/bed/2.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {bed >= 9 && (
            <div className="w-20 h-20">
              <Image
                src={"/bed/3.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="text-lg font-medium py-2">
          How many beds do you have in your house?
        </div>
        <div className="flex items-center gap-20">
          <div
            className={`${
              bed == 1 ? "opacity-30 cursor-no-drop" : ""
            } border rounded-full p-3`}
            onClick={() => setBed((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            <AiOutlineMinus className="h-5 w-5" />
          </div>
          <div className="text-9xl font-extrabold w-30 text-center">{bed}</div>
          <div
            className={`border rounded-full p-3 ${
              bed >= 9  ? "opacity-30 cursor-no-drop" : ""
            }`}
            onClick={() => setBed((prev) => prev < 9 ? prev + 1 : prev)}
          >
            <AiOutlinePlus className="h-5 w-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bed;
