"use client";
import { useState } from "react";

interface Meal {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}
type MealInfoType = {
  meal : Meal;
}

const MealInfo = ({meal}: MealInfoType) => {
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
        <div className="font-bold text-lg">{meal.mealname}</div>
        <div className="w-125">
          {/* <p
            className={`overflow-hidden text-ellipsis ${
              isExpanded ? "whitespace-normal" : "line-clamp-4"
            }`}
          >
            Timings - 1230 hrs - 1930 hrs. Aptly crafted for couples on
            honeymoon, or family who wish to have leisure holiday, but
            don&apos;t want to rush for early morning tours. This is perfect
            tour to start your vacation, enjoy your breakfast, no need to rush
            for it to catch a pick up early in the morning The tour pick up is
            later in the noon so you get peaceful wake up and breakfast at your
            hotel.
          </p> */}
          {/* <button
            onClick={toggleExpansion}
            className="text-blue-500 mt-2 focus:outline-none"
          >
            {isExpanded ? "See less" : "See more"}
          </button> */}
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
          <p>Duration : {convertToTimeUnit(Number(meal.mealduration))}</p>
        </div>
      </div>
    </div>
  );
};

export default MealInfo;
