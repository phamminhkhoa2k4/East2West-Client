"use client"
import { useState } from "react";

const TransferInfo =  () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <>
        <div>
          <div className="flex flex-col gap-2">
            <div className="font-bold text-lg">
              Spectacular Krabi and Phuket Getaway
            </div>
            <div className="w-125">
              <p
                className={`overflow-hidden text-ellipsis ${
                  isExpanded ? "whitespace-normal" : "line-clamp-4"
                }`}
              >
                Timings - 1230 hrs - 1930 hrs. Aptly crafted for couples on
                honeymoon, or family who wish to have leisure holiday, but
                don&apos;t want to rush for early morning tours. This is perfect
                tour to start your vacation, enjoy your breakfast, no need to
                rush for it to catch a pick up early in the morning The tour
                pick up is later in the noon so you get peaceful wake up and
                breakfast at your hotel.
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
              <p>Duration : 10h</p>
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
      </>
    );
}

export default TransferInfo;