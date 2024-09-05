import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { BsPersonWalking } from "react-icons/bs";
import { BsBuildingsFill } from "react-icons/bs";
import { GiForkKnifeSpoon } from "react-icons/gi";
import CardItinerary from "./CardItinerary";
import MealInclude from "./MealInclude";
import { FaBed, FaUtensils, FaMapMarkerAlt, FaBus } from "react-icons/fa";
import { useMemo } from "react";

// Define types for the props of PlanDay
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

interface ItineraryDay {
  accommodations: Accommodation[];
  meals: Meal[];
  places: Place[];
  transfers: Transfer[];
}

// Define an extended type for accordion items with optional thumbnail
type AccordionItemType = {
  id: number;
  type: 'Accommodation' | 'Meal' | 'Place' | 'Transfer';
  title: string;
  details: string;
  content: string;
  thumbnail?: string; // Optional property
}

// Define props for PlanDay component
interface PlanDayProps {
  day: ItineraryDay;
}

const PlanDay = ({ day }: PlanDayProps) => {
  // Fallback to empty arrays if necessary
  const accommodations = Array.isArray(day.accommodations) ? day.accommodations : [];
  const meals = Array.isArray(day.meals) ? day.meals : [];
  const places = Array.isArray(day.places) ? day.places : [];
  const transfers = Array.isArray(day.transfers) ? day.transfers : [];

  // Use memo to avoid unnecessary recalculations
  const accordionItems = useMemo<AccordionItemType[]>(() => {
    return [
      ...accommodations.map(item => ({
        id: item.accommodationid,
        type: 'Accommodation',
        title: item.accommodationname,
        details: item.accommodationtype,
        content: `Duration: ${item.durationaccommodation}`
      })),
      ...meals.map(item => ({
        id: item.mealid,
        type: 'Meal',
        title: item.mealname,
        details: item.mealactivity,
        content: `Duration: ${item.mealduration}`,
        thumbnail: item.mealthumbnail
      })),
      ...places.map(item => ({
        id: item.placeid,
        type: 'Place',
        title: item.placename,
        details: item.description,
        content: `Duration: ${item.placeduration}`,
        thumbnail: item.placethumbnail
      })),
      ...transfers.map(item => ({
        id: item.transferid,
        type: 'Transfer',
        title: item.transfername,
        details: item.description,
        content: `Duration: ${item.transferduration}`,
        thumbnail: item.transferthumbnail
      }))
    ];
  }, [accommodations, meals, places, transfers]);

  return (
    <div>
      <div className="border border-x-0">
        <div className="flex items-center gap-3 mx-4 py-4">
          <div className="text-base font-medium">Location:</div>
          <div className="text-base font-medium">Include:</div>
          <div className="flex items-center gap-2">
            {accommodations.length > 0 ? (
              accommodations.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-blue-600">
                  <FaBed />
                  <span>{item.accommodationname}</span>
                </div>
              ))
            ) : (
              <span>No accommodations included</span>
            )}
            {meals.length > 0 ? (
              meals.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-green-600">
                  <FaUtensils />
                  <span>{item.mealname}</span>
                </div>
              ))
            ) : (
              <span>No meals included</span>
            )}
            {places.length > 0 ? (
              places.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-red-600">
                  <FaMapMarkerAlt />
                  <span>{item.placename}</span>
                </div>
              ))
            ) : (
              <span>No places included</span>
            )}
            {transfers.length > 0 ? (
              transfers.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-purple-600">
                  <FaBus />
                  <span>{item.transfername}</span>
                </div>
              ))
            ) : (
              <span>No transfers included</span>
            )}
          </div>
        </div>
      </div>

      <Accordion
        type="multiple"
        defaultValue={accordionItems.map(item => item.id.toString())}
        className="w-full"
      >
        {accordionItems.map(item => (
          <AccordionItem key={item.id} value={item.id.toString()}>
            <AccordionTrigger>
              <div className="flex gap-5 items-center mx-5">
                {item.type === 'Accommodation' && <FaBed className="text-blue-600" />}
                {item.type === 'Meal' && <FaUtensils className="text-green-600" />}
                {item.type === 'Place' && <FaMapMarkerAlt className="text-red-600" />}
                {item.type === 'Transfer' && <FaBus className="text-purple-600" />}
                <div className="flex items-center gap-2">
                  {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />}
                  <div>
                    <div className="text-md font-bold uppercase">{item.title}</div>
                    <GoDotFill className="mt-[2px]" />
                    <div className="text-sm font-medium text-[#494848]">{item.details}</div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-4">{item.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
export default PlanDay;