import PlanDay from "./PlanDay";

interface ItineraryDay {
  day: string | null;
  accommodations: Accommodation[];
  meals: Meal[];
  places: Place[];
  transfers: Transfer[];
}
interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
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
interface ItineraryProps {
  itineraries: ItineraryDay[];
}

const Itinerary = ({ itineraries }: ItineraryProps) => {
  if (!itineraries || itineraries.length === 0) {
    return <div>No itineraries available</div>;
  }

  const totalTransfers = itineraries.reduce((acc, day) => acc + (day.transfers ? day.transfers.length : 0), 0);
  const totalPlaces = itineraries.reduce((acc, day) => acc + (day.places ? day.places.length : 0), 0);
  const totalAccommodations = itineraries.reduce((acc, day) => acc + (day.accommodations ? day.accommodations.length : 0), 0);
  const totalMeals = itineraries.reduce((acc, day) => acc + (day.meals ? day.meals.length : 0), 0);

  return (
    <div className="border shadow-md rounded-lg overflow-hidden">
      <div className="flex bg-blue-50">
        <div className="w-1/6 flex justify-center py-3">
          <div className="py-2 px-3 text-sm bg-white text-blue-500 font-medium border border-blue-500 rounded-full">
            {itineraries.length} DAY PLAN
          </div>
        </div>
        <div className="flex justify-around w-5/6 py-3">
          <div className="py-2 px-3 text-sm font-medium">{totalTransfers} TRANSFERS</div>
          <div className="py-2 px-3 text-sm font-medium">{totalPlaces} PLACES</div>
          <div className="py-2 px-3 text-sm font-medium">{totalAccommodations} ACCOMMODATIONS</div>
          <div className="py-2 px-3 text-sm font-medium">{totalMeals} MEALS</div>
        </div>
      </div>
      <div className="flex bg-white">
        <div className="w-1/6 border-r-2">
          <div className="mt-5">
            <div className="text-lg font-semibold mx-5">Day Plan</div>
            <div className="mx-5 mt-3">
              <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {itineraries.map((day, index) => (
                  <li
                    key={index}
                    className={`mb-4 ms-6 flex items-center ${index === 0 ? 'justify-center bg-slate-600 p-1 rounded-md text-white' : ''}`}
                  >
                    <span className={`absolute flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 ${index === 0 ? 'border-slate-600' : 'border-gray-300'} dark:border-gray-700 dark:bg-gray-900 dark:ring-8 dark:ring-gray-900`}>
                      <span className="text-xs font-medium">{index + 1}</span>
                    </span>
                    <span className="text-sm font-medium">{day.day}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="w-5/6 border-r-2">
          {itineraries.map((day, index) => (
            <div key={index} className="bg-slate-50">
              <PlanDay day={day} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;