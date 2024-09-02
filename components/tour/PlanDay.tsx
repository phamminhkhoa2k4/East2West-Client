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
const PlanDay = () => {
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
          defaultValue={["item-1", "item-2", "item-3","item-4"]}
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
              <CardItinerary/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default PlanDay;
