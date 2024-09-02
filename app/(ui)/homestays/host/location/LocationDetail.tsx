"use client";
import SearchMap from "@/components/homestay/SearchMap";
import dynamic from "next/dynamic";
import { IoLocationOutline } from "react-icons/io5";
const MapMove = dynamic(() => import("@/components/homestay/MapMove"), {
  ssr: false,
});

type Coordinates = {
  lat: number;
  lng: number;
};

type Location = {
  label: string | null;
  countryCode: string | null;
  countryName: string | null;
  county: string | null;
  city: string | null;
  district: string | null;
  street: string | null;
  postalCode: string | null;
  houseNumber: string | null;
};

type LocationDetailProps = {
  position: Coordinates | null;
  setPosition: (value: Coordinates | null) => void;
  location: string | null
};

const LocationDetail = ({
  position,
  setPosition,
  location,
}: LocationDetailProps) => {
  const handleSelect = (lat: number, lng: number) => {
    setPosition({ lat, lng });
  };
  return (
    <>
      <div className="text-[32px] font-medium w-[640px]">
        Chỗ ở của bạn nằm ở đâu?
      </div>
      <div className="text-lg text-[#6a6a6a] tracking-tight  w-[640px]">
        Địa chỉ của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành
        công.
      </div>
      <div className="w-[640px] relative h-[500px] mt-5">

        {position && <MapMove position={position} setPosition={setPosition} />}
        <div className={`absolute left-10 top-5 w-[566px]`}>
          <div className="relative">
            <div className={`w-full h-full relative flex items-center bg-white rounded-3xl `}>
              <IoLocationOutline className="ml-4 w-8 h-8" />
              <div
                className={`w-full h-full  p-4  `}
              >{location}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetail;
