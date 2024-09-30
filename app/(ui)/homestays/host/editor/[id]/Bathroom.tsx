"use client";
import { createData, updateData } from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
type BathroomType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};

const Bathroom = ({ homestay , setReload}: BathroomType) => {
  const [bathroom, setBathroom] = useState<number>(homestay?.bathroom! ?? 1);

 useEffect(() => {
   const updateBathroom = async () => {
     try {
       const response = await updateData({
         id: homestay?.homestayid!,
         endpoint: "homestays/host",
         payload: { ...homestay, bathroom },
       });
     } catch (error) {
       console.log(error);
     } finally {
       setReload(true);
      
     }
   };

   updateBathroom();
 }, [bathroom]);

  
  return (
    <>
      <div className="flex items-center my-26 flex-col  h-screen">
        <div className="flex items-center gap-2 mt-20 mb-10">
          {bathroom >= 1 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/1.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {bathroom >= 2 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/2.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {bathroom >= 3 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/3.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {bathroom >= 4 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/4.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {bathroom >= 5 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/5.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {bathroom >= 6 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/6.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {bathroom >= 7 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/7.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {bathroom >= 8 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/8.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {bathroom >= 9 && (
            <div className="w-20 h-20">
              <Image
                src={"/bathroom/9.jpg"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        <div className="text-lg font-medium py-2">
          How many rooms do you have in your house?
        </div>
        <div className="flex items-center gap-20">
          <div
            className={`${
              bathroom == 1 ? "opacity-30 cursor-no-drop" : ""
            } border rounded-full p-3`}
            onClick={() => setBathroom((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            <AiOutlineMinus className="h-5 w-5" />
          </div>
          <div className="text-9xl font-extrabold w-30 text-center">
            {bathroom}
          </div>
          <div
            className={`border rounded-full p-3 ${
              bathroom >= 9 ? "opacity-30 cursor-no-drop" : ""
            }`}
            onClick={() => setBathroom((prev) => (prev < 9 ? prev + 1 : prev))}
          >
            <AiOutlinePlus className="h-5 w-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bathroom;
