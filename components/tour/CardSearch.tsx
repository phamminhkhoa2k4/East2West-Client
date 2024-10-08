import Image from "next/image";
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
interface TourPackage {
  packageId: number;
  title: string;
  price: number;
  groupsize: string;
  deposit: string;
  bookinghold: string;
  bookingchange: string;
  categoryTourId: number[];
  themeTourId: number[];
  suitableTourId: number[];
  thumbnail: string[];
  itineraries: ItineraryDataType[];
}

interface ItineraryDataType {
  day: number;
  accommodations: Accommodation[];
  meals: Meal[];
  transfers: Transfer[];
  places: Place[];
}

const CardSearch = ({ tourPackage } : any) => {
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="w-full h-50">
        <Image
          src={`/${tourPackage.thumbnail}`}
          alt={tourPackage.title}
          height={300}
          width={300}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div>
        <div className="p-4 ">
          <div className="border-b">
            <div className="flex items-center justify-between ">
              <div className="text-base font-extrabold">
                {tourPackage.title}
              </div>
              <div className="border rounded-md border-blue-600 text-blue-600 px-[5px] py-[3px] text-xs">
                {tourPackage.groupsize} People
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 mb-2">
              <span className="text-sm">{tourPackage.bookinghold} Hold</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                  />
                </svg>
              </span>
              <span className="text-sm">{tourPackage.bookingchange} Change</span>
            </div>
          </div>
          <ul className="grid grid-cols-2 list-disc p-4 ">
            {tourPackage.itineraries.map((itinerary : any, index : number) => (
              <li key={index} className="text-gray-6">
                {itinerary.accommodations[0].accommodationname}
              </li>
            ))}
          </ul>
          <div className="flex border border-[#e5e5e5] items-center justify-between p-4 bg-[#f9f9f9] rounded-lg">
            <div className="flex items-center">
              <span className="text-black font-bold text-lg">${tourPackage.price}</span>
              <p>/Person</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSearch;