import { Property } from "@/types/hotel";
import Image from "next/image";
import Link from "next/link";

type HotelResultItemType = {
  hotel: Property;
};


export default function HotelResultItem({ hotel }: HotelResultItemType) {
  return (
    <Link href={hotel?.link! ?? "#"} >
      <div className="border-2 rounded-lg h-50 overflow-hidden">
        <div className="flex relative">
          <div className="w-1/3 h-50">
            <Image
              src={hotel.images[0].original_image}
              alt=""
              height={200}
              width={300}
              className="w-full h-full object-cover "
            />
          </div>
          <div className="p-4 w-2/3">
            <div>
              <div className="flex justify-between">
                <span className="font-medium text-lg w-80">{hotel.name}</span>
                <span>{hotel.total_rate?.lowest} USD</span>
              </div>
              <div className=" mt-3 w-[420px] grid grid-cols-3 gap-0">
                {hotel.amenities?.map((amenity,index) => (
                    <div key={index} className="flex gap-2 items-start">
                    
                      <span className="text-xs">{amenity}</span>
                    </div>
                ))}
                
              </div>
            </div>
          </div> 
        </div>
      </div>
    </Link>
  );
}