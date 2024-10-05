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

interface PlanDayProps {
  itineraries?: ItineraryType;
}

const PlanDay = ({ itineraries }: PlanDayProps) => {


  return (
    <>
      <div>
        <div className="border border-x-0">
          <div className="flex items-center gap-3 mx-4  py-4">
            <div className="px-3 py-1 bg-orange-300 text-white text-base font-semibold rounded-3xl">
              Day {itineraries?.day}
            </div>
            {/* <div className="text-lg font-bold">Krabi</div> */}
            <div className="text-base font-medium">Include:</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 ">
                <FaCar />
                <span>{itineraries?.transfers.length} Transfer</span>
              </div>
              <div className="flex items-center gap-1">
                <BsBuildingsFill />
                <span>{itineraries?.accommodations.length} Accommodation</span>
              </div>
              <div className="flex items-center gap-1">
                <BsPersonWalking />
                <span>{itineraries?.places.length} Places</span>
              </div>
              <div className="flex items-center gap-1">
                <GiForkKnifeSpoon />
                <span>{itineraries?.meals.length} Meals</span>
              </div>
            </div>
          </div>
        </div>
        {itineraries?.transfers?.map((item, index) => (
          <Accordion
            type="multiple"
            defaultValue={["item-1"]}
            className="w-full "
            key={index}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-5 items-center mx-5">
                  <BsBuildingsFill />
                  <div className="flex items-center gap-2">
                    {" "}
                    <div className="text-md font-bold uppercase">Transfer</div>
                    {/* <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    3 Nights
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    In Hanoi
                  </div> */}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardItinerary data={item} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        {itineraries?.places?.map((item, index) => (
          <Accordion
            type="multiple"
            defaultValue={["item-1"]}
            className="w-full "
            key={index}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-5 items-center mx-5">
                  <BsBuildingsFill />
                  <div className="flex items-center gap-2">
                    {" "}
                    <div className="text-md font-bold uppercase">Place</div>
                    {/* <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    3 Nights
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    In Hanoi
                  </div> */}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardItinerary data={item} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        {itineraries?.accommodations?.map((item, index) => (
          <Accordion
            type="multiple"
            defaultValue={["item-1"]}
            className="w-full "
            key={index}
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
                    {/* <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    3 Nights
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    In Hanoi
                  </div> */}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardItinerary data={item} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

        {itineraries?.meals?.map((item, index) => (
          <Accordion
            type="multiple"
            defaultValue={["item-1"]}
            className="w-full "
            key={index}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex gap-5 items-center mx-5">
                  <BsBuildingsFill />
                  <div className="flex items-center gap-2">
                    {" "}
                    <div className="text-md font-bold uppercase">Meal</div>
                    {/* <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    3 Nights
                  </div>
                  <GoDotFill className="mt-[2px]" />
                  <div className="text-sm font-medium text-[#494848]">
                    In Hanoi
                  </div> */}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CardItinerary data={item} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
};
export default PlanDay;