import { Hotel } from "@/types/hotel";
import HotelResultItem from "./HotelResultItem";
import { ScrollArea } from "@/components/ui/scroll-area";


type HotelResultType = {
 hotel: Hotel
}
export default function HotelResult({ hotel }: HotelResultType) {
  return (
    <>
      <ScrollArea>
        <div className="w-full h-[58rem] overflow-scroll  overflow-x-hidden">
          <div className="p-3">
            <h3 className="my-3 ml-1">
              {hotel.properties.length} kết quả
            </h3>
            <div className="flex flex-col gap-y-5">
              {hotel.properties.map((hotell, index) => (
                <div key={index}>
                  <HotelResultItem hotel={hotell} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}