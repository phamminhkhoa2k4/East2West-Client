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
  type: "Accommodation" | "Meal" | "Place" | "Transfer";
  title: string;
  details: string;
  content: string;
  thumbnail?: string; // Optional property
};

// Define props for PlanDay component
interface PlanDayProps {
  day: ItineraryDay;
}

const PlanDay = () => {
  // Fallback to empty arrays if necessary
  // const accommodations = Array.isArray(day.accommodations) ? day.accommodations : [];
  // const meals = Array.isArray(day.meals) ? day.meals : [];
  // const places = Array.isArray(day.places) ? day.places : [];
  // const transfers = Array.isArray(day.transfers) ? day.transfers : [];

  // Use memo to avoid unnecessary recalculations
  // const accordionItems = useMemo<AccordionItemType[]>(() => {
  //   return [
  //     ...accommodations.map(item => ({
  //       id: item.accommodationid,
  //       type: 'Accommodation',
  //       title: item.accommodationname,
  //       details: item.accommodationtype,
  //       content: `Duration: ${item.durationaccommodation}`
  //     })),
  //     ...meals.map(item => ({
  //       id: item.mealid,
  //       type: 'Meal',
  //       title: item.mealname,
  //       details: item.mealactivity,
  //       content: `Duration: ${item.mealduration}`,
  //       thumbnail: item.mealthumbnail
  //     })),
  //     ...places.map(item => ({
  //       id: item.placeid,
  //       type: 'Place',
  //       title: item.placename,
  //       details: item.description,
  //       content: `Duration: ${item.placeduration}`,
  //       thumbnail: item.placethumbnail
  //     })),
  //     ...transfers.map(item => ({
  //       id: item.transferid,
  //       type: 'Transfer',
  //       title: item.transfername,
  //       details: item.description,
  //       content: `Duration: ${item.transferduration}`,
  //       thumbnail: item.transferthumbnail
  //     }))
  //   ];
  // }, [accommodations, meals, places, transfers]);

  return (
    <>
      <div>
        <div className="border border-x-0">
          <div className="flex items-center gap-3 mx-4  py-4">
            <div className="px-3 py-1 bg-orange-300 text-white text-base font-semibold rounded-3xl">
              Day 1
            </div>
            <div className="text-lg font-bold">Krabi</div>
            <div className="text-base font-medium">Include:</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 ">
                <FaCar />
                <span>1 Transfer</span>
              </div>
              <div className="flex items-center gap-1">
                <BsBuildingsFill />
                <span>1 Hotel</span>
              </div>
              <div className="flex items-center gap-1">
                <BsPersonWalking />
                <span>1 Places</span>
              </div>
              <div className="flex items-center gap-1">
                <GiForkKnifeSpoon />
                <span>1 Meals</span>
              </div>
            </div>
          </div>
        </div>

        <Accordion
          type="multiple"
          defaultValue={["item-1", "item-2", "item-3", "item-4"]}
          className="w-full "
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex gap-5 items-center mx-5">
                <BsBuildingsFill />
                <div className="flex items-center gap-2">
                  {" "}
                  <div className="text-md font-bold uppercase">
                    Accommodation
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    3 Nights
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    In Hanoi
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardItinerary />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex gap-5 items-center mx-5">
                <BsBuildingsFill />
                <div className="flex items-center gap-2">
                  {" "}
                  <div className="text-md font-bold uppercase">Places</div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    3 Nights
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    In Hanoi
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardItinerary />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex gap-5 items-center mx-5">
                <BsBuildingsFill />
                <div className="flex items-center gap-2">
                  {" "}
                  <div className="text-md font-bold uppercase">Places</div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    3 Nights
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    In Hanoi
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <MealInclude />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex gap-5 items-center mx-5">
                <BsBuildingsFill />
                <div className="flex items-center gap-2">
                  {" "}
                  <div className="text-md font-bold uppercase">Transfer</div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    3 Nights
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    In Hanoi
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CardItinerary />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default PlanDay;
