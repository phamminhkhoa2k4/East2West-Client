import Image from "next/image";
import AccommodationInfo from "./AccommodationInfo";
import PlaceInfo from "./PlaceInfo";
import MealInfo from "./MealInfo";
import TransferInfo from "./TransferInfo";
import MealInclude from "./MealInclude";

interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string;
  roomtype: string;
}

interface Meal {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}

interface Place {
  placeid: number;
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}

interface Transfer {
  transferid: number;
  transfername: string;
  transferthumbnail: string;
  description: string;
  transferduration: string;
}

type CardItineraryType = {
  data: Accommodation | Meal | Place | Transfer;
};

const CardItinerary = ({ data }: CardItineraryType) => {
  const renderContent = () => {
    if ("accommodationthumbnail" in data) {
      return (
        <>
          <div className="w-[250px] h-[170px] rounded-lg overflow-hidden">
            <Image
              src={data.accommodationthumbnail}
              alt={data.accommodationname}
              height={500}
              width={500}
              className="object-cover object-center w-full h-full"
            />
          </div>

          <AccommodationInfo accommodation={data} />
        </>
      );
    } else if ("mealthumbnail" in data) {
      return (
        <>
          {data.mealactivity === "" && (
            <>
              <div className="w-[250px] h-[170px] rounded-lg overflow-hidden">
                <Image
                  src={data.mealthumbnail}
                  alt={data.mealname}
                  height={500}
                  width={500}
                  className="object-cover object-center w-full h-full"
                />
              </div>

              <MealInfo meal={data} />
            </>
          )}
          {data.mealactivity !== "" && <MealInclude meal={data.mealactivity} />}
        </>
      );
    } else if ("placethumbnail" in data) {
      return (
        <>
          <div className="w-[250px] h-[170px] rounded-lg overflow-hidden">
            {" "}
            <Image
              src={data.placethumbnail}
              alt={data.placename}
              height={500}
              width={500}
              className="object-cover object-center w-full h-full"
            />
          </div>

          <PlaceInfo place={data} />
        </>
      );
    } else if ("transferthumbnail" in data) {
      return (
        <>
          <div className="w-[250px] h-[170px] rounded-lg overflow-hidden">
            {" "}
            <Image
              src={data.transferthumbnail}
              alt={data.transfername}
              height={500}
              width={500}
              className="object-cover object-center w-full h-full"
            />
          </div>

          <TransferInfo transfer={data} />
        </>
      );
    }
    return null; 
  };

  return <div className="flex gap-5 mx-5">{renderContent()}</div>;
};

export default CardItinerary;
