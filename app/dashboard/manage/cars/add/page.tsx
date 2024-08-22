"use client";
import { useState, useEffect } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { createData } from "../../../../../utils/axios";
type Option = {
  id: number;
  name: string;
};
const Create = () => {
  const [carName, setCarName] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [year, setYear] = useState("");
  const [seatCapacity, setSeatCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [makeOptions, setMakeOptions] = useState<Option[]>([]);
  const [selectedMake, setSelectedMake] = useState<number | null>(null);
  const [modelOptions, setModelOptions] = useState<Option[]>([]);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [typeOptions, setTypeOptions] = useState<Option[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [locationTypeOptions, setLocationTypeOptions] = useState<Option[]>([]);
  const [selectedLocationType, setSelectedLocationType] = useState<number | null>(null);
  const [gearbox, setGearbox] = useState("");
  const [fuel, setFuel] = useState("");
  const [fuelTankCapacity, setFuelTankCapacity] = useState("");
  const [miles, setMiles] = useState("");
  const [airConditioned, setAirConditioned] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const makeResponse = await fetch('http://localhost:8080/api/cars/make');
        const modelResponse = await fetch('http://localhost:8080/api/cars/model');
        const typeResponse = await fetch('http://localhost:8080/api/cars/type');
        const locationTypeResponse = await fetch('http://localhost:8080/api/cars/locationtypes');

        if (!makeResponse.ok || !modelResponse.ok || !typeResponse.ok || !locationTypeResponse.ok) {
          throw new Error('Error fetching data');
        }

        const makes = await makeResponse.json();
        const models = await modelResponse.json();
        const types = await typeResponse.json();
        const locationTypes = await locationTypeResponse.json();

        setMakeOptions(makes.map((item: any) => ({ id: item.makeId, name: item.makeName })));
        setModelOptions(models.map((item: any) => ({ id: item.modelId, name: item.modelName })));
        setTypeOptions(types.map((item: any) => ({ id: item.typeId, name: item.typeName })));
        setLocationTypeOptions(locationTypes.map((item: any) => ({ id: item.locationTypeId, name: item.locationTypeName })));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);
  const handleMakeChange = (value: number) => {
    setSelectedMake(value);
  };
  
  const handleModelChange = (value: number) => {
    setSelectedModel(value);
  };
  
  const handleTypeChange = (value: number) => {
    setSelectedType(value);
  };
  
  const handleLocationTypeChange = (value: number) => {
    setSelectedLocationType(value);
  };
  
  const handleGearboxChange = (value: number) => {
    setGearbox(value.toString());
  };
  
  const handleFuelChange = (value: number) => {
    setFuel(value.toString());
  };
  const handleChange = (value: number | "") => {
    if (value === "") return; // Handle case when no selection is made
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const carDTO = {
      carId: null,
      carName,
      modelId: selectedModel,
      makeId: selectedMake,
      typeId: selectedType,
      year: parseInt(year),
      seatCapacity: parseInt(seatCapacity),
      airConditioned,
      pricePerDay: parseFloat(pricePerDay),
      status: "Available",
      locationTypeId: selectedLocationType,
      cargearbox: gearbox,
      miles,
      fueltankcapacity: fuelTankCapacity,
      fuel,
      location,
    };
  
    try {
      const response = await createData({
        endpoint: "/cars",
        payload: carDTO,
      });
      console.log("Car created:", response);
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };
  return (<>
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Create Rental Cars
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Car Name"
                type="text"
                placeholder="Please Enter Car Name !"
                customClasses="w-full mb-4.5"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                name=""
              />
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Price Per Day"
                  type="text"
                  placeholder="Enter your Price Per Day"
                  customClasses="w-full xl:w-1/2"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  name=""
                />
                <InputGroup
                  label="Year"
                  type="text"
                  placeholder="Enter your Car Year"
                  customClasses="w-full xl:w-1/2"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  name=""
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Seating Capacity"
                  type="text"
                  placeholder="Enter your Seating Capacity"
                  customClasses="mb-4.5 xl:w-1/2"
                  required
                  value={seatCapacity}
                  onChange={(e) => setSeatCapacity(e.target.value)}
                  name=""
                />
                <InputGroup
                  label="Location"
                  type="text"
                  placeholder="Enter your Location"
                  customClasses="mb-4.5 xl:w-1/2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  name=""
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <SelectGroupOne
  label="Make Name"
  placeholder="Please select Make Name"
  data={makeOptions}
  onChange={(value) => handleMakeChange(value)}
/>
<SelectGroupOne
  label="Model Name"
  placeholder="Please select Model Name"
  data={modelOptions}
  onChange={(value) => handleModelChange(value)}
/>
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <SelectGroupOne
  label="Type Name"
  placeholder="Please select Type Name"
  data={typeOptions}
  onChange={(value) => handleTypeChange(value)}
/>
<SelectGroupOne
  label="Location Type Name"
  placeholder="Please select Location Type Name"
  data={locationTypeOptions}
  onChange={(value) => handleLocationTypeChange(value)}
/>
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <SelectGroupOne
  label="Gearbox"
  placeholder="Please select Gearbox"
  data={[{ id: 1, name: "Manual" }, { id: 2, name: "Automatic" }]} // Example options
  onChange={(value) => handleGearboxChange(value)}
/>
<SelectGroupOne
  label="Fuel"
  placeholder="Please select Fuel"
  data={[{ id: 1, name: "Petrol" }, { id: 2, name: "Diesel" }]} // Example options
  onChange={(value) => handleFuelChange(value)}
/>
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Fuel Tank Capacity"
                  type="text"
                  placeholder="Enter your Fuel Tank Capacity"
                  customClasses="mb-4.5 xl:w-1/2"
                  required
                  value={fuelTankCapacity}
                  onChange={(e) => setFuelTankCapacity(e.target.value)}
                  name=""
                />
                <InputGroup
                  label="Miles"
                  type="text"
                  placeholder="Enter your Miles"
                  customClasses="mb-4.5 xl:w-1/2"
                  value={miles}
                  onChange={(e) => setMiles(e.target.value)}
                  name=""
                />
              </div>
              <CheckboxTwo
                checked={airConditioned}
                onChange={(e) => setAirConditioned(e.target.checked)}
              />
            </div>
            <div className="my-5">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Thumbnail 1
              </label>
              <input
                type="file"
                className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
            <div className="my-5">
              <button className="w-full rounded-md bg-primary py-2.5 text-center text-base font-medium text-white shadow-md transition hover:bg-opacity-80">
                Save
              </button>
            </div>
            </form>
        </div>
      </div>
    </DefaultLayout>
  </>
  );
}


export default Create;
