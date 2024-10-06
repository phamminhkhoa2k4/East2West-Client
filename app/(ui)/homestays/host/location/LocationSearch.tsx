"use client"
import SearchMap from "@/components/homestay/SearchMap";
import dynamic from "next/dynamic";
import Image from "next/image";
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
        {/* Chỗ ở của bạn nằm ở đâu? */}
        Where is your accommodation located?
      </div>
      <div className="text-lg text-[#6a6a6a] tracking-tight  w-[640px]">
        {/* Địa chỉ của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành
        công. */}
        Your address is only shared with guests after they have successfully
        booked.
      </div>
      <div className="w-[640px] relative h-[500px] mt-5">
        {!position && (
          <div className="rounded-3xl overflow-hidden w-full h-full">
            <Image
              src={"/host/vietnam.png"}
              alt=""
              height={400}
              width={400}
              className="w-full h-full object-center object-cover"
            />
          </div>
        )}
        {position && <Map lat={position.lat} lng={position.lng} />}
        <SearchMap onSelect={handleSelect} setLocation={setLocation} />
      </div>
    </>
  );
};

export default LocationSearch;