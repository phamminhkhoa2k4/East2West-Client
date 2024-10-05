import Image from "next/image";
interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string[];
  roomtype: string;
}
interface Transfer {
  transferid: number;
  transfername: string;
  transferthumbnail: string;
  description: string;
  transferduration: string;
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
interface Itinerary {
  itineraryId: number;
  accommodations: Accommodation[];
  meals: Meal[];
  places: Place[];
  transfers: Transfer[];
  day: string | null;
}
interface CategoryTour {
  categoryTourId: number;
  categoryTourName: string;
}
interface ThemeTour {
  themeTourId: number;
  themeTourName: string;
}
interface DepartureDate {
  departuredateid: number;
  departuredate: string;
}
interface SuitableTour {
  suitableTourId: number;
  suitableName: string;
}
interface PackageData {
  packageid: number;
  title: string;
  thumbnail: string;
  price: number;
  groupsize: string;
  deposit: string;
  bookinghold: string;
  bookingchange: string;
  itineraries: Itinerary[];
  categoryTours: CategoryTour[];
  themeTours: ThemeTour[];
  departureDates: DepartureDate[];
  suitableTours: SuitableTour[];
}
type GalleryType = {
  packageData: PackageData;
};

const Gallery = ({packageData}: GalleryType) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-5 grid-rows-5 gap-5">
          <div className="relative  col-span-3 row-span-5 rounded-3xl overflow-hidden shadow-md">
            <Image
              src={packageData?.thumbnail[0]}
              alt=""
              height={1000}
              width={1000}
              className="object-cover object-center w-full h-full"
            />
            {/* <button className="absolute bottom-5 hover:scale-105 right-5 rounded-xl border p-2 bg-slate-500 text-white flex items-center gap-1 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </span>
              <p className="text-base font-medium">View Gallery</p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
            </button> */}
          </div>
          <div className="relative col-span-2 row-span-3 rounded-3xl overflow-hidden shadow-md">
            <Image
              src={packageData?.thumbnail[1]}
              alt=""
              height={1000}
              width={1000}
              className="object-cover object-center w-full h-full"
            />
            {/* <p className="absolute bottom-4 left-5 text-lg font-medium text-white">
              Places
            </p> */}
          </div>
          <div className="relative col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-md">
            <Image
              src={packageData?.thumbnail[2]}
              alt=""
              height={1000}
              width={1000}
              className="object-cover object-center w-full h-full"
            />
            {/* <p className="absolute bottom-4 left-5 text-lg font-medium text-white">
              Property Photos
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;