"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { useHostContext } from "@/store/Hostcontext";
import { useEffect, useState } from "react";
import { getData } from "@/utils/axios";

type AmenitiesType = {
  amenitiesid: number;
  amenitiesname: string;
};

const Amenities = () => {
  const { state, setState } = useHostContext();
  const [amenities, setAmenities] = useState<AmenitiesType[] | null>([]);
  const [checkAmenities, setCheckAmenities] = useState<number[]>(
    state?.data.perkIds ?? []
  );
  const router = useRouter();
  const handleClick = () => {
    if (checkAmenities.length > 0) {
      setState({
        data: {
          ...state?.data!,
          perkIds: checkAmenities as number[],
        },
      });
      console.log(state);

      router.push("/homestays/host/photos");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const toggleAmenity = (id: number) => {
    setCheckAmenities((prev) =>
      prev.includes(id)
        ? prev.filter((amenityId) => amenityId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await getData({
          endpoint: `/homestays/host/amenities`,
        });
        setAmenities(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAmenities();
  }, []);
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
        <div className="text-4xl font-semibold w-[640px]">
          {/* Điều nào sau đây mô tả chính xác nhất về chỗ ở của bạn? */}
          Which of the following best describes your accommodation?
        </div>
        <div className="text-[#666] py-5 text-left">
          {/* Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê. */}
          You can add amenities after posting your listing.
        </div>
        <div className="w-[630px] grid grid-cols-3 gap-5 my-5 ">
          {amenities?.map((amenity) => (
            <div
              key={amenity.amenitiesid}
              onClick={() => toggleAmenity(amenity.amenitiesid)}
              className={`flex flex-col p-5 border-2 rounded-lg cursor-pointer ${
                checkAmenities.includes(amenity.amenitiesid)
                  ? "border-blue-500"
                  : ""
              }`}
            >
              <IoHomeOutline className="w-8 h-8" />
              <span className="font-medium">{amenity.amenitiesname}</span>
            </div>
          ))}
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
            checkAmenities.length == 0 ? "opacity-30 cursor-not-allowed" : ""
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Amenities;
