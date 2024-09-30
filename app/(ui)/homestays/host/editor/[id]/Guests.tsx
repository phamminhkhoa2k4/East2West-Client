"use client";
import { createData, updateData } from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

type GuestsType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};
const Guests = ({ homestay, setReload }: GuestsType) => {
  const [guests, setGuests] = useState<number>(homestay?.maxGuest ?? 1);

  useEffect(() => {
    const updateGuests = async () => {
      try {
        const response = await updateData({
          id: homestay?.homestayid!,
          endpoint: "homestays/host",
          payload: { ...homestay, maxGuest: guests },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setReload(true);
      }
    };

    updateGuests();
  }, [guests]);
  return (
    <>
      <div className="flex items-center my-26 flex-col  h-screen">
        <div className="flex items-center  mt-20 mb-10">
          {guests >= 1 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/1.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 2 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/2.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 3 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/3.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 4 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/4.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 5 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/5.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 6 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/6.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 7 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/7.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 8 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/8.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 9 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/9.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 10 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/10.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 11 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/11.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 12 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/12.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 13 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/13.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 14 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/14.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 15 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/15.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 16 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/16.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
          {guests >= 17 && (
            <div className="w-10 h-20">
              <Image
                src={"/guests/17.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-contain w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="text-lg font-medium py-2">
          How many guestss do you have in your house?
        </div>
        <div className="flex items-center gap-20">
          <div
            className={`${
              guests == 1 ? "opacity-30 cursor-no-drop" : ""
            } border rounded-full p-3`}
            onClick={() => setGuests((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            <AiOutlineMinus className="h-5 w-5" />
          </div>
          <div className="text-9xl font-extrabold w-20 text-center">
            {guests}
          </div>
          <div
            className={`border rounded-full p-3 ${
              guests >= 17 ? "opacity-30 cursor-no-drop" : ""
            }`}
            onClick={() => setGuests((prev) => (prev < 17 ? prev + 1 : prev))}
          >
            <AiOutlinePlus className="h-5 w-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Guests;
