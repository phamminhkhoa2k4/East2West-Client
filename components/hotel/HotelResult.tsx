import HotelResultItem from "./HotelResultItem";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function HotelResult() {
    return (
      <>
        <ScrollArea>
          <div className="w-full h-[58rem] overflow-scroll  overflow-x-hidden">
            <div className="p-3">
              <h3 className="my-3 ml-1">
                gần Cần Thơ, Ninh Kiều, Cần Thơ · 204 kết quả
              </h3>
              <div className="flex flex-col gap-y-5">
                <HotelResultItem />
                <HotelResultItem />
                <HotelResultItem />
                <HotelResultItem />
                <HotelResultItem />
              </div>
            </div>
          </div>
        </ScrollArea>
      </>
    );
}