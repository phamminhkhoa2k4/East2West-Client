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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
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
        setLocationTypeOptions(locationTypes.map((item: any) => ({ id: item.locationtypeid, name: item.locationtypename })));
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

  const handleGearboxChange = (value: string) => {
    setGearbox(value);
  };

  const handleFuelChange = (value: string) => {
    setFuel(value);
  };

  const handleChange = (value: number | null) => {
    // Handle case when no selection is made
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate input fields on client-side
    if (!carName.trim() || !pricePerDay.trim() || !year.trim() || !seatCapacity.trim() || !location.trim()) {
        alert("Please fill in all required fields.");
        return;
    }

    // Check for duplicate car name
    try {
        const nameCheckResponse = await fetch(`http://localhost:8080/api/cars/exists?carName=${encodeURIComponent(carName)}`);
        const nameExists = await nameCheckResponse.json();

        if (nameExists) {
            alert("Car name already exists. Please choose a different name.");
            return;
        }
    } catch (error) {
        console.error("Error checking car name existence:", error);
        alert("An error occurred while checking car name.");
        return;
    }

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
        const response = await fetch('http://localhost:8080/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carDTO),
        });

        if (!response.ok) {
            const errorData = await response.json();
            let errorMessage = "Validation failed:\n";
            for (const [field, message] of Object.entries(errorData)) {
                errorMessage += `${field}: ${message}\n`;
            }
            alert(errorMessage);
        } else {
            alert("Car created successfully.");
        }
    } catch (error) {
        console.error("Error creating car:", error);
        alert("An error occurred while creating the car.");
    }
};



  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">Create Rental Cars</h3>
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
                // error={errors.carName}
              />
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Price Per Day"
                  type="text"
                  placeholder="Enter your Price Per Day"
                  customClasses="w-full xl:w-1/2"
                  value={pricePerDay}
                  onChange={(e) => setPricePerDay(e.target.value)}
                  // error={errors.pricePerDay}
                />
                <InputGroup
                  label="Year"
                  type="text"
                  placeholder="Enter your Car Year"
                  customClasses="w-full xl:w-1/2"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  // error={errors.year}
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Seating Capacity"
                  type="text"
                  placeholder="Enter your Car Seating Capacity"
                  customClasses="w-full xl:w-1/2"
                  value={seatCapacity}
                  onChange={(e) => setSeatCapacity(e.target.value)}
                  // error={errors.seatCapacity}
                />
                <InputGroup
                  label="Location"
                  type="text"
                  placeholder="Enter your Location"
                  customClasses="w-full xl:w-1/2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  // error={errors.location}
                />
              </div>
              <SelectGroupOne
                data={makeOptions}
                label="Make"
                onChange={handleMakeChange}
                selected={selectedMake}
                placeholder="Select Make"
                error={errors.make}
              />
              <SelectGroupOne
                data={modelOptions}
                label="Model"
                onChange={handleModelChange}
                selected={selectedModel}
                placeholder="Select Model"
                error={errors.model}
              />
              <SelectGroupOne
                data={typeOptions}
                label="Type"
                onChange={handleTypeChange}
                selected={selectedType}
                placeholder="Select Type"
                error={errors.type}
              />
              <SelectGroupOne
                data={locationTypeOptions}
                label="Location Type"
                onChange={handleLocationTypeChange}
                selected={selectedLocationType}
                placeholder="Select Location Type"
                error={errors.locationType}
              />
              <InputGroup
                label="Gearbox"
                type="text"
                placeholder="Enter your Gearbox Type"
                customClasses="w-full mb-4.5"
                value={gearbox}
                onChange={(e) => setGearbox(e.target.value)}
                // error={errors.gearbox}
              />
              <InputGroup
                label="Fuel"
                type="text"
                placeholder="Enter Fuel Type"
                customClasses="w-full mb-4.5"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                // error={errors.fuel}
              />
              <InputGroup
                label="Fuel Tank Capacity"
                type="text"
                placeholder="Enter Fuel Tank Capacity"
                customClasses="w-full mb-4.5"
                value={fuelTankCapacity}
                onChange={(e) => setFuelTankCapacity(e.target.value)}
                // error={errors.fuelTankCapacity}
              />
              <InputGroup
                label="Miles"
                type="text"
                placeholder="Enter Miles"
                customClasses="w-full mb-4.5"
                value={miles}
                onChange={(e) => setMiles(e.target.value)}
                // error={errors.miles}
              />
              <CheckboxTwo
                label="Air Conditioned"
                onChange={() => setAirConditioned(!airConditioned)}
                checked={airConditioned}
              />
              <div className="flex justify-end pt-6">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Create;
