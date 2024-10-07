"use client";

import { useEffect, useState } from "react";
import CardSearch from "./CardSearch";
import { api } from "../../utils/axios";
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

// import Slider from "@/components/ui/Slider";
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
  locationtype: {
    locationtypeid: number;
    locationtypename: string;
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
  thumbnail: string[];
}

interface CarSearchFilters {
  carName?: string;
  modelId?: number;
  makeId?: number;
  typeId?: number;
  airConditioned?: boolean;
  minPrice?: number;
  maxPrice?: number;
  locationtypeId?: number;
  minMiles?: number;
  maxMiles?: number;
}

const CarSearchResult = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedValue, setSelectedValue] = useState("apple");
  const [filters, setFilters] = useState<CarSearchFilters>({
    carName: '',
    modelId: undefined,
    makeId: undefined,
    typeId: undefined,
    airConditioned: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    locationtypeId: undefined,
    minMiles: undefined,
    maxMiles: undefined,
  });

  const [models, setModels] = useState<{ modelId: number; modelName: string }[]>([]);
  const [makes, setMakes] = useState<{ makeId: number; makeName: string }[]>([]);
  const [types, setTypes] = useState<{ typeId: number; typeName: string }[]>([]);
  const [locationtypes, setLocationtypes] = useState<{ locationtypeid: number; locationtypename: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carResponse, modelResponse, makeResponse, typeResponse, locationResponse] = await Promise.all([
          api.get("/cars"),
          api.get("/cars/model"),
          api.get("/cars/make"),
          api.get("/cars/type"),
          api.get("/cars/locationtypes")
        ]);

        console.log("Cars:", carResponse.data);
        console.log("Models:", modelResponse.data);
        console.log("Makes:", makeResponse.data);
        console.log("Types:", typeResponse.data);
        console.log("Locations:", locationResponse.data);

        setCars(carResponse.data);
        setModels(modelResponse.data);
        setMakes(makeResponse.data);
        setTypes(typeResponse.data);
        setLocationtypes(locationResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleSearch = async () => {
    const queryParams = new URLSearchParams();

    if (filters.carName) queryParams.append('carName', filters.carName);
    if (filters.modelId !== undefined) queryParams.append('modelId', filters.modelId.toString());
    if (filters.makeId !== undefined) queryParams.append('makeId', filters.makeId.toString());
    if (filters.typeId !== undefined) queryParams.append('typeId', filters.typeId.toString());
    if (filters.airConditioned !== undefined) queryParams.append('airConditioned', filters.airConditioned.toString());
    if (filters.minPrice !== undefined) queryParams.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) queryParams.append('maxPrice', filters.maxPrice.toString());
    if (filters.locationtypeId !== undefined) queryParams.append('locationtypeId', filters.locationtypeId.toString());
    if (filters.minMiles !== undefined) queryParams.append('minMiles', filters.minMiles.toString());
    if (filters.maxMiles !== undefined) queryParams.append('maxMiles', filters.maxMiles.toString());

    const response = await fetch(`http://localhost:8080/api/cars/search?${queryParams.toString()}`);
    const data = await response.json();
    setCars(data);
    console.log(data);
  };
  const resetFilters = () => {
    setFilters({
      carName: '',
      modelId: undefined,
      makeId: undefined,
      typeId: undefined,
      airConditioned: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      locationtypeId: undefined,
      minMiles: undefined,
      maxMiles: undefined,
    });
    setSelectedValue("apple"); // Reset the selected sort value if needed
  };
  return (
    <>
      <div className="border rounded-3xl shadow-lg mb-6">
        <div className="flex border-b ">
          <div className="p-5 w-1/4 border-r font-semibold">FILTERS</div>
          <div className="p-5 w-3/4 font-semibold">ALL PACKAGES</div>
        </div>
        <div className="flex">
          <div className="p-5 w-1/4 border-r ">
            <label>Search   </label>
            <input
              type="text"
              className="border py-1 px-2 rounded-xl"
              placeholder="Car Name"
              value={filters.carName}
              onChange={(e) =>
                setFilters({ ...filters, carName: e.target.value })
              }
            />
            <div className="mt-5 flex flex-col gap-5">
              <Select
                value={filters.modelId?.toString()}
                onValueChange={(value) =>
                  setFilters({ ...filters, modelId: parseInt(value) })
                }
              >
                <SelectTrigger className="w-full border outline-none">
                  <SelectValue>
                    {filters.modelId
                      ? `Model : ${
                          models.find(
                            (model) => model.modelId === filters.modelId
                          )?.modelName
                        }`
                      : "Select Model"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem
                      key={model.modelId}
                      value={model.modelId.toString()}
                    >
                      {model.modelName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.makeId?.toString()}
                onValueChange={(value) =>
                  setFilters({ ...filters, makeId: parseInt(value) })
                }
              >
                <SelectTrigger className="w-full border outline-none">
                  <SelectValue>
                    {filters.makeId
                      ? `Make : ${
                          makes.find((make) => make.makeId === filters.makeId)
                            ?.makeName
                        }`
                      : "Select Make"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {makes.map((make) => (
                    <SelectItem
                      key={make.makeId}
                      value={make.makeId.toString()}
                    >
                      {make.makeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.typeId?.toString()}
                onValueChange={(value) =>
                  setFilters({ ...filters, typeId: parseInt(value) })
                }
              >
                <SelectTrigger className="w-full border outline-none">
                  <SelectValue>
                    {filters.typeId
                      ? `Type : ${
                          types.find((type) => type.typeId === filters.typeId)
                            ?.typeName
                        }`
                      : "Select Type"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem
                      key={type.typeId}
                      value={type.typeId.toString()}
                    >
                      {type.typeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.locationtypeId?.toString()}
                onValueChange={(value) =>
                  setFilters({ ...filters, locationtypeId: parseInt(value) })
                }
              >
                <SelectTrigger className="w-full border outline-none">
                  <SelectValue>
                    {filters.locationtypeId
                      ? `Location Type : ${
                          locationtypes.find(
                            (locationtypes) =>
                              locationtypes.locationtypeid ===
                              filters.locationtypeId
                          )?.locationtypename
                        }`
                      : "Select Type"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {locationtypes.map((locationtypes) => (
                    <SelectItem
                      key={locationtypes.locationtypeid}
                      value={locationtypes.locationtypeid.toString()}
                    >
                      {locationtypes.locationtypename}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <label>
                Air Conditioned:
                <input
                  type="checkbox"
                  checked={filters.airConditioned ?? false}
                  onChange={(e) =>
                    setFilters({ ...filters, airConditioned: e.target.checked })
                  }
                />
              </label>

              {/* <div>
                <div>Price Range:</div>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[filters.minPrice ?? 0, filters.maxPrice ?? 1000]}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      minPrice: value[0],
                      maxPrice: value[1],
                    })
                  }
                />
                <div>
                  Min: ${filters.minPrice ?? 0}, Max: $
                  {filters.maxPrice ?? 1000}
                </div>
              </div> */}

              {/* <div>
                <div>Miles Range:</div>
                <Slider
                  min={0}
                  max={200000}
                  step={1000}
                  value={[filters.minMiles ?? 0, filters.maxMiles ?? 200000]}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      minMiles: value[0],
                      maxMiles: value[1],
                    })
                  }
                />
                <div>
                  Min: {filters.minMiles ?? 0}, Max:{" "}
                  {filters.maxMiles ?? 200000}
                </div>
              </div> */}
              <button onClick={resetFilters} className="bg-blue-500 rounded-lg text-white font-bold py-3">Clear All</button>
              <button onClick={handleSearch} className="bg-blue-500 rounded-lg text-white font-bold py-3">Search</button>
            </div>
          </div>
          <div className="p-5 w-3/4 h-[1032px] overflow-y-scroll scroll-transparent">
            <div className="flex items-center justify-between ml-5 mb-5">
              <div className="flex items-center gap-4">
                {/* <div className="flex items-center gap-1 py-1 px-2 bg-blue-200 border-blue rounded-lg">
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
                </div> */}
                {/* <div className="font-bold text-blue">Clear All</div> */}
              </div>
              <div>
                {/* <Select
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
                </Select> */}
              </div>
            </div>
            <div className="ml-5 flex flex-col gap-5 ">
              {cars.map((car, index) => (
                <CardSearch car={car} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarSearchResult;