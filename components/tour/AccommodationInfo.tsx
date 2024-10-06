import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string;
  roomtype: string;
}
type AccommodationInfoType = {
  accommodation: Accommodation;
};

const AccommodationInfo = ({ accommodation }: AccommodationInfoType) => {
  const convertToTimeUnit = (value: number): string => {
    const minutesInHour = 60;
    const minutesInDay = 60 * 24;

    if (value >= minutesInDay) {
      const days = Math.floor(value / minutesInDay);
      const remainingMinutes = value % minutesInDay;
      const hours = Math.floor(remainingMinutes / minutesInHour);
      return `${days} Nights ${hours > 0 ? hours + " Hours" : ""}`;
    } else if (value >= minutesInHour) {
      const hours = Math.floor(value / minutesInHour);
      const minutes = value % minutesInHour;
      return `${hours} Hours ${minutes > 0 ? minutes + " Minutes" : ""}`;
    } else {
      return `${value} Minutes`;
    }
  };
  return (
    <>
      <div className="w-2/3">
        <div className="flex flex-col gap-2 border-b-2 pb-3 border-dashed">
          <div className="flex items-center gap-3">
            <div className="font-bold text-lg">
              {accommodation.accommodationtype} -{" "}
              {accommodation.accommodationname}
            </div>
            <div className="flex gap-1 items-center ">
              <FaStar />
              <FaStarHalfAlt />
              <FaRegStar />
            </div>
          </div>

          <div className="flex gap-1 items-center ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </span>
            <p>
              {convertToTimeUnit(Number(accommodation.durationaccommodation))}
            </p>
          </div>
          <div className="flex gap-1 items-center ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <p>22 September - 25 September</p>
          </div>
        </div>
        <div className=" flex flex-col gap-1 mt-1">
          <div className="text-base font-bold">{accommodation.roomtype}</div>
          {accommodation.isbreadkfast && (
            <div className="flex gap-1 items-center">
              <GiForkKnifeSpoon />
              <span className="text-xs font-bold text-[#797979]">
                Breakfast is included
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccommodationInfo;
