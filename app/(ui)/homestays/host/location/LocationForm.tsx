"use client"
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import { decodeWKB } from "@/utils/decodeWKB";
import dynamic from "next/dynamic";
import { Point } from "geojson";
const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });
const LocationForm = () => {
   const wkbArray = [
     "0101000020110F0000C250E51332715A40B1649ABA490D2440",
     "0101000020110F0000A155F0A909715A40111ACF6F0D0D2440",
   ];

   const coordinates = wkbArray.map((wkbString) => {
     const geoJSON: Point = decodeWKB(wkbString);
     return geoJSON.coordinates as [number, number];
   });
  return (
    <>
      <div className="text-[32px] font-medium w-[640px]">
        Xác nhận địa chỉ của bạn
      </div>
      <div className="text-lg text-[#6a6a6a] tracking-tight  w-[640px]">
        Địa chỉ của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành
        công.
      </div>

      <div className="w-[640px] mt-5 pb-5 border-b-2">
        <SelectGroupTwo />
        <InputGroup
          label="Địa Chỉ Đường/Phố"
          type="text"
          placeholder="Please Enter Title !"
          customClasses="w-full mb-4.5 mt-5"
        />
        <InputGroup
          label="Quận/Thị Xã"
          type="text"
          placeholder="Please Enter Title !"
          customClasses="w-full mb-4.5"
        />
        <InputGroup
          label="Tỉnh/Thành Phố"
          type="text"
          placeholder="Please Enter Title !"
          customClasses="w-full mb-4.5"
        />
      </div>
      <div className="flex items-center justify-between w-[640px] py-5">
        <div>
          <div className="text-base font-medium">
            Hiển thị vị trí chính xác của bạn
          </div>
          <div className="text-sm font-medium text-[#666]">
            Chỉ rõ cho khách vị trí chỗ ở của bạn. Chúng tôi sẽ chỉ chia sẻ địa
            chỉ của bạn sau khi khách đặt phòng thành công
          </div>
        </div>
        <div>
          <label className="inline-flex items-start  cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </div>
      <div className="w-[640px] overflow-hidden pt-5 rounded-2xl mb-90">
        <DynamicMap coordinates={coordinates} />
      </div>
    </>
  );
};

export default LocationForm;
