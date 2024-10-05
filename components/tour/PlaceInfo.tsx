"use client"
import { useState } from "react";
interface Place {
  placeid: number;
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}

type PlaceInfoType = {
  place : Place
}

const PlaceInfo = ({place}: PlaceInfoType) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
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
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <div className="flex flex-col">
        <div className="font-bold text-lg">{place.placename}</div>
        <div className="w-125">
          <p
            className={`overflow-hidden text-ellipsis ${
              isExpanded ? "whitespace-normal" : "line-clamp-4"
            }`}
          >
            {place.description}
          </p>
          <button
            onClick={toggleExpansion}
            className="text-blue-500 mt-2 focus:outline-none"
          >
            {isExpanded ? "See less" : "See more"}
          </button>
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
          <p>Duration :{convertToTimeUnit(Number(place.placeduration))} </p>
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </span>
          <p>Ninh Kieu, Can Tho</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfo;