"use client";

import { useEffect, useState } from "react";
import CardSearch from "./CardSearch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  getData } from "@/utils/axios";
interface Car {
  carId: number;
  carName: string;
  model: {
    modelId: number;
    modelName: string;
  };
  make: {
    makeId: number;
    makeName: string;
  };
  type: {
    typeId: number;
    typeName: string;
  };
  year: number;
  seatCapacity: number;
  airConditioned: boolean;
  pricePerDay: number;
  status: string;
  cargearbox: string;
  miles: string;
  fueltankcapacity: string;
  fuel: string;
  location: string;
  imageUrl?: string;
}

const CarSearchResult = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedValue, setSelectedValue] = useState("apple");
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getData({ endpoint: "/cars" });
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);
  return (
    <>
      <div className="border rounded-3xl shadow-lg mb-6">
        <div className="flex border-b ">
          <div className="p-5 w-1/4 border-r font-semibold">FILTERS</div>
          <div className="p-5 w-3/4 font-semibold">ALL PACKAGES</div>
        </div>
        <div className="flex">
          <div className="p-5 w-1/4 border-r ">
            <div className="">
              <Accordion
                type="multiple"
                defaultValue={[
                  "item-1",
                  "item-2",
                  "item-3",
                  "item-4",
                  "item-5",
                  "item-6",
                ]}
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">Location</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="link-checkbox"
                            className="flex items-center ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-[10px]"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                              />
                            </svg>
                            <span>3N</span>
                          </label>
                        </div>
                        <div>(19)</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">Car specs</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="link-checkbox"
                            className="flex items-center ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-[10px]"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                              />
                            </svg>
                            <span>$4000.0</span>
                          </label>
                        </div>
                        <div>(19)</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">Mileage</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          className="border p-2 w-full rounded-lg"
                        />
                        <span className="absolute top-2 right-2">
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
                              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="link-checkbox"
                            className="flex items-center ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-[10px]"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                              />
                            </svg>
                            <span>$4000.0</span>
                          </label>
                        </div>
                        <div>(19)</div>
                      </div>
                      <div className="text-sm font-bold text-blue-600">
                        Show More
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">Car category</div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="link-checkbox"
                            className="flex items-center ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-[10px]"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                              />
                            </svg>
                            <span>$4000.0</span>
                          </label>
                        </div>
                        <div>(19)</div>
                      </div>
                      <div className="text-sm font-bold text-blue-600">
                        Show More
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    <div className="text-lg font-bold my-2">
                      Deposit required at pick-up
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="link-checkbox"
                            className="flex items-center ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="size-[10px]"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                              />
                            </svg>
                            <span>$4000.0</span>
                          </label>
                        </div>
                        <div>(19)</div>
                      </div>
                      <div className="text-sm font-bold text-blue-600">
                        Show More
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="p-5 w-3/4 h-[1032px] overflow-y-scroll scroll-transparent">
            <div className="flex items-center justify-between ml-5 mb-5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 py-1 px-2 bg-blue-200 border-blue rounded-lg">
                  Customizable{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="font-bold text-blue">Clear All</div>
              </div>
              <div>
                <Select
                  value={selectedValue}
                  onValueChange={(value) => setSelectedValue(value)}
                >
                  <SelectTrigger className="w-[180px] border outline-none">
                    <SelectValue>
                      {selectedValue
                        ? `Sort By : ${
                            selectedValue.charAt(0).toUpperCase() +
                            selectedValue.slice(1)
                          }`
                        : "Sort By :"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="ml-5 flex flex-col gap-5 ">
              {cars.map((car, index) => (
                <CardSearch
                  key={index}
                  car={car} // Pass the entire car object to CardSearch
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarSearchResult;
