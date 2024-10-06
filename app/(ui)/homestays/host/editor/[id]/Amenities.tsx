"use client";
import { getData, updateData } from "@/utils/axios";
import { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";

type AmenitiesType = {
  amenitiesid: number;
  amenitiesname: string;
};

type AmenitiesParams = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
};

const Amenities = ({ homestay , setReload }: AmenitiesParams) => {
  const [amenities, setAmenities] = useState<AmenitiesType[] | null>();
  const [checkAmenities, setCheckAmenities] = useState<number[]>(homestay?.perkIds);

  const toggleAmenity = (id: number) => {
    setCheckAmenities((prev) =>
      prev.includes(id)
        ? prev.filter((amenityId) => amenityId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchAmenities = async () => {
      try{
        const amenities = await getData({
          endpoint: "/homestays/host/amenities",
        });
        setAmenities(amenities);
      }catch(error){
        console.log(error);
        
      }
    }

    fetchAmenities();
  },[])

  useEffect(() => {
    const updateAmenities = async () => {
      try {
        const response = await updateData({
          id: homestay?.homestayid!,
          endpoint: "homestays/host",
          payload: { ...homestay, perkIds: checkAmenities },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setReload(true);
      }
    };

    updateAmenities();
  }, [checkAmenities]);
  return (
    <>
      <div>
        <div className="flex items-center flex-col gap-5 mt-15">
          <div className="text-3xl font-bold">Amenities</div>
          <div>
            Here are the amenities you&apos;ve added to your listing so far.
          </div>
        </div>
        <div>
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
      </div>
    </>
  );
};

export default Amenities;
