"use client"
import SearchMap from "@/components/homestay/SearchMap";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/homestay/Map"), {
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

type LocationSearchProps = {
  position: Coordinates | null;
  setPosition: (value: Coordinates | null) => void;
  setLocation: (value: Location | null) => void;
};

const LocationSearch = ({ position, setPosition , setLocation }: LocationSearchProps) => {
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
        {!position && (
          <div className="rounded-3xl bg-[url('/boat.png')] w-full h-full"></div>
        )}
        {position && <Map lat={position.lat} lng={position.lng} />}
        <SearchMap onSelect={handleSelect} setLocation={setLocation} />
      </div>
    </>
  );
};

export default LocationSearch;