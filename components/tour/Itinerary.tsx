import PlanDay from "./PlanDay";

interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
  isbreadkfast: boolean;
  accommodationthumbnail: string;
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
interface ItineraryType {
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
  itineraries: ItineraryType[];
  categoryTours: CategoryTour[];
  themeTours: ThemeTour[];
  departureDates: DepartureDate[];
  suitableTours: SuitableTour[];
}


type ItineraryProps = {
  packageData: PackageData;
};
const Itinerary = ({ packageData } : ItineraryProps) => {
  return (
    <>
      <div className="border shadow-md rounded-lg overflow-hidden">
        <div className="flex bg-blue-50">
          <div className="w-1/6 flex justify-center py-3">
            <div className="py-2  px-3 text-sm bg-white text-blue-500 font-medium border border-blue-500 rounded-full">
              {packageData?.itineraries.length!} DAY PLAN
            </div>
          </div>
          <div className="flex justify-around w-5/6 py-3">
            <div className="py-2  px-3 text-sm  font-medium ">
              {packageData?.itineraries.map((itin) => itin.transfers.length)}{" "}
              TRANSFER
            </div>
            <div className="py-2  px-3 text-sm  font-medium ">
              {packageData?.itineraries.map((itin) => itin.places.length)}{" "}
              PLACES
            </div>
            <div className="py-2  px-3 text-sm  font-medium ">
              {packageData?.itineraries.map(
                (itin) => itin.accommodations.length
              )}{" "}
              ACCOMMODATIONS
            </div>
            <div className="py-2  px-3 text-sm  font-medium ">
              {packageData?.itineraries.map((itin) => itin.meals.length)} MEALS
            </div>
          </div>
        </div>
        <div className="flex bg-white">
          <div className="w-1/6 border-r-2 ">
            <div className="mt-5">
              <div className="text-lg font-semibold mx-5">Day Plan</div>
              <div className="mx-5 mt-3">
                <ol className=" relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                  {packageData?.itineraries.map((itin) => (
                    <>
                      <li className="mb-4 ms-6 flex items-center justify-center bg-slate-600 p-1 rounded-md ">
                        <span className="absolute flex items-center justify-center w-4 h-4 bg-green-200 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                          <svg
                            className="w-2 h-2 text-green-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5.917 5.724 10.5 15 1.5"
                            />
                          </svg>
                        </span>
                        <h3 className="font-medium text-xs leading-tight text-white">
                          {itin.day}
                        </h3>
                      </li>
                      {packageData?.itineraries.length ===
                        Number(itin.day) - 1 && (
                        <li className="ms-6">
                          <span className="absolute flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg
                              className="w-2 h-2 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                            </svg>
                          </span>
                          <h3 className="font-medium text-xs leading-tight">
                            25 Sep, Wed
                          </h3>
                        </li>
                      )}
                    </>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="w-5/6">
            {packageData?.itineraries.map((itin, index) => (
              <div key={index}>
                <PlanDay itineraries={itin} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Itinerary;



// const Itinerary = () => {
  // if (!itineraries || itineraries.length === 0) {
  //   return <div>No itineraries available</div>;
  // }

  // const totalTransfers = itineraries.reduce((acc, day) => acc + (day.transfers ? day.transfers.length : 0), 0);
  // const totalPlaces = itineraries.reduce((acc, day) => acc + (day.places ? day.places.length : 0), 0);
  // const totalAccommodations = itineraries.reduce((acc, day) => acc + (day.accommodations ? day.accommodations.length : 0), 0);
  // const totalMeals = itineraries.reduce((acc, day) => acc + (day.meals ? day.meals.length : 0), 0);

//   return (
//     <>
//       <div className="border shadow-md rounded-lg overflow-hidden">
//         <div className="flex bg-blue-50">
//           <div className="w-1/6 flex justify-center py-3">
//             <div className="py-2  px-3 text-sm bg-white text-blue-500 font-medium border border-blue-500 rounded-full">
//               7 DAY PLAN
//             </div>
//           </div>
//           <div className="flex justify-around w-5/6 py-3">
//             <div className="py-2  px-3 text-sm  font-medium ">6 TRANSFER</div>
//             <div className="py-2  px-3 text-sm  font-medium ">6 PLACES</div>
//             <div className="py-2  px-3 text-sm  font-medium ">
//               2 ACCOMMODATIONS
//             </div>
//             <div className="py-2  px-3 text-sm  font-medium ">9 MEALS</div>
//           </div>
//         </div>
//         <div className="flex bg-white">
//           <div className="w-1/6 border-r-2 ">
//             <div className="mt-5">
//               <div className="text-lg font-semibold mx-5">Day Plan</div>

//               <div className="mx-5 mt-3">
//                 <ol className=" relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
//                   <li className="mb-4 ms-6 flex items-center justify-center bg-slate-600 p-1 rounded-md ">
//                     <span className="absolute flex items-center justify-center w-4 h-4 bg-green-200 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
//                       <svg
//                         className="w-2 h-2 text-green-500"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 16 12"
//                       >
//                         <path
//                           stroke="currentColor"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           stroke-width="2"
//                           d="M1 5.917 5.724 10.5 15 1.5"
//                         />
//                       </svg>
//                     </span>
//                     <h3 className="font-medium text-xs leading-tight text-white">
//                       25 Sep, Wed
//                     </h3>
//                   </li>
//                   <li className="mb-4 ms-6 flex items-center">
//                     <span className="absolute flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
//                       <svg
//                         className="w-2 h-2 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 20 16"
//                       >
//                         <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
//                       </svg>
//                     </span>
//                     <h3 className="font-medium text-xs leading-tight">
//                       25 Sep, Wed
//                     </h3>
//                   </li>
//                   <li className="mb-4 ms-6 flex items-center">
//                     <span className="absolute flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
//                       <svg
//                         className="w-2 h-2 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 18 20"
//                       >
//                         <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
//                       </svg>
//                     </span>
//                     <h3 className="font-medium text-xs leading-tight">
//                       25 Sep, Wed
//                     </h3>
//                   </li>
//                   <li className="ms-6">
//                     <span className="absolute flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full -start-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
//                       <svg
//                         className="w-2 h-2 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="currentColor"
//                         viewBox="0 0 18 20"
//                       >
//                         <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
//                       </svg>
//                     </span>
//                     <h3 className="font-medium text-xs leading-tight">
//                       25 Sep, Wed
//                     </h3>
//                   </li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//           <div className="w-5/6">
//             <PlanDay />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

