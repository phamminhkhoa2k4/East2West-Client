"use client";
import { createData, updateData } from "@/utils/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

type RoomType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};
const Room = ({homestay,setReload} : RoomType) => {
  const [room, setRoom] = useState<number>( homestay?.room ?? 1);

  useEffect(() => {
      const updateRoom = async () => {
        try{
            const  response = await updateData({id: homestay?.homestayid!,endpoint: "homestays/host",payload: {...homestay,room}})
        }catch(error){
          console.log(error);
          
        }finally{
          setReload(true);
          
        }
      }

      updateRoom();
  },[room])
  return (
    <>
      <div className="flex items-center my-26 flex-col  h-screen">
        <div className="flex items-center gap-2 mt-20 mb-10">
          {room >= 1 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/1.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {room >= 2 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/2.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {room >= 3 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/3.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {room >= 4 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/4.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {room >= 5 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/5.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {room >= 6 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/6.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {room >= 7 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/7.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {room >= 8 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/8.png"}
                alt=""
                height={400}
                width={400}
                className="object-center object-cover w-full h-full"
              />
            </div>
          )}
          {room >= 9 && (
            <div className="w-20 h-20">
              <Image
                src={"/room/9.png"}
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
          {homestay?.type == "entire-house" && (
            <div
              className={`${
                room == 1 ? "opacity-30 cursor-no-drop" : ""
              } border rounded-full p-3`}
              onClick={() => setRoom((prev) => (prev > 1 ? prev - 1 : prev))}
            >
              <AiOutlineMinus className="h-5 w-5" />
            </div>
          )}

          <div className="text-9xl font-extrabold w-30 text-center">{room}</div>
          {homestay?.type == "entire-house" && (
            <div
              className={`border rounded-full p-3 ${
                room >= 9 ? "opacity-30 cursor-no-drop" : ""
              }`}
              onClick={() => setRoom((prev) => (prev < 9 ? prev + 1 : prev))}
            >
              <AiOutlinePlus className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Room;
