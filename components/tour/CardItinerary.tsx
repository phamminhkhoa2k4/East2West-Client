import Image from "next/image";
import AccommodationInfo from "./AccommodationInfo";
import PlaceInfo from "./PlaceInfo";
import MealInfo from "./MealInfo";
import TransferInfo from "./TransferInfo";

const CardItinerary = () => {
    return (
      <>
        <div className="flex gap-5 mx-5">
          <div className="w-[250px] h-[170px] rounded-lg overflow-hidden">
            <Image
              src={"/boat.png"}
              alt=""
              height={500}
              width={500}
              className="object-cover object-center w-full h-full"
            />
          </div>
          {/* <AccommodationInfo/> */}
          {/* <PlaceInfo/> */}
          {/* <MealInfo/> */}
          <TransferInfo/>
        </div>
      </>
    );
}

export default CardItinerary;