"use client";

import React, { useState, useEffect } from 'react';
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

type Option = {
    id: number;
    name: string;
};

interface Car {
    carId: number;
    carName: string;
    pricePerDay: string;
    status: string;
    year: string;
    seatCapacity: string;
    location: string;
    make: Option | null;
    model: Option | null;
    type: Option | null;
    locationType: Option | null;
    cargearbox: string;
    fuel: string;
    fueltankcapacity: string;
    miles: string;
    airConditioned: boolean;
}

const EditCar = ({ params }: { params: { id: string } }) => {
    const [carData, setCarData] = useState<Car | null>(null);
    const [makeOptions, setMakeOptions] = useState<Option[]>([]);
    const [modelOptions, setModelOptions] = useState<Option[]>([]);
    const [typeOptions, setTypeOptions] = useState<Option[]>([]);
    const [locationTypeOptions, setLocationTypeOptions] = useState<Option[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [makeResponse, modelResponse, typeResponse, locationTypeResponse, carResponse] = await Promise.all([
                    fetch('http://localhost:8080/api/cars/make'),
                    fetch('http://localhost:8080/api/cars/model'),
                    fetch('http://localhost:8080/api/cars/type'),
                    fetch('http://localhost:8080/api/cars/locationtypes'),
                    fetch(`http://localhost:8080/api/cars/${params.id}`)
                ]);

                const [makeData, modelData, typeData, locationTypeData, carData] = await Promise.all([
                    makeResponse.json(),
                    modelResponse.json(),
                    typeResponse.json(),
                    locationTypeResponse.json(),
                    carResponse.json()
                ]);

                setMakeOptions(makeData.map((item: any) => ({ id: item.makeId, name: item.makeName })));
                setModelOptions(modelData.map((item: any) => ({ id: item.modelId, name: item.modelName })));
                setTypeOptions(typeData.map((item: any) => ({ id: item.typeId, name: item.typeName })));
                setLocationTypeOptions(locationTypeData.map((item: any) => ({ id: item.locationtypeid, name: item.locationtypename })));

                setCarData({
                    ...carData,
                    make: carData.make ? { id: carData.make.makeId, name: carData.make.makeName } : null,
                    model: carData.model ? { id: carData.model.modelId, name: carData.model.modelName } : null,
                    type: carData.type ? { id: carData.type.typeId, name: carData.type.typeName } : null,
                    locationType: carData.locationtype ? { id: carData.locationtype.locationtypeid, name: carData.locationtype.locationtypename } : null
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [params.id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (carData) {
                const response = await fetch('http://localhost:8080/api/cars', {
                    method: 'POST',  // Use PUT for updates
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        carId: carData.carId,
                        carName: carData.carName,
                        modelId: carData.model?.id,
                        makeId: carData.make?.id,
                        typeId: carData.type?.id,
                        year: carData.year,
                        seatCapacity: carData.seatCapacity,
                        airConditioned: carData.airConditioned,
                        pricePerDay: carData.pricePerDay,
                        status: carData.status,
                        locationTypeId: carData.locationType?.id,
                        cargearbox: carData.cargearbox,
                        miles: carData.miles,
                        fueltankcapacity: carData.fueltankcapacity,
                        fuel: carData.fuel,
                        location: carData.location
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update car');
                }

                alert('Car updated successfully');
            }
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setCarData(prev => prev ? { ...prev, [name]: checked } : null);
        } else {
            setCarData(prev => prev ? { ...prev, [name]: value } : null);
        }
    };



    const handleSelectChange = (name: keyof Car, value: number) => {
        setCarData(prev => {
            if (!prev) return null;
    
            let newValue;
    
            switch (name) {
                case 'cargearbox':
                    newValue = value === 1 ? 'Manual' : 'Automatic';
                    break;
                case 'fuel':
                    newValue = value === 1 ? 'Petrol' : 'Diesel';
                    break;
                default:
                    // For other keys, find the selected option based on the value
                    const optionsMap: { [key in keyof Car]?: Option[] } = {
                        make: makeOptions,
                        model: modelOptions,
                        type: typeOptions,
                        locationType: locationTypeOptions,
                    };
    
                    const options = optionsMap[name];
                    const selectedOption = options?.find(option => option.id === value);
                    newValue = selectedOption || null;
            }
    
            return {
                ...prev,
                [name]: newValue,
            };
        });
    };
    

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-9">
                <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                        <h3 className="font-semibold text-dark dark:text-white">Edit Rental Car</h3>
                    </div>
                    {carData?.make?.id ? (
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <InputGroup
                                    label="Car Name"
                                    type="text"
                                    placeholder="Please Enter Car Name !"
                                    customClasses="w-full mb-4.5"
                                    value={carData?.carName ?? ''}
                                    onChange={handleChange}
                                    name="carName" // Ensure this matches the key in your state
                                />
                                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                                    <InputGroup
                                        label="Price Per Day"
                                        type="number"
                                        placeholder="Enter your Price Per Day"
                                        customClasses="w-full xl:w-1/2"
                                        value={carData.pricePerDay}
                                        onChange={handleChange}
                                        name="pricePerDay"
                                    />
                                    <InputGroup
                                        label="Year"
                                        type="number"
                                        placeholder="Enter your Car Year"
                                        customClasses="w-full xl:w-1/2"
                                        value={carData.year}
                                        onChange={handleChange}
                                        name="year"
                                    />
                                </div>
                                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                                    <InputGroup
                                        label="Seating Capacity"
                                        type="number"
                                        placeholder="Enter your Seating Capacity"
                                        customClasses="mb-4.5 xl:w-1/2"
                                        required
                                        value={carData.seatCapacity}
                                        onChange={handleChange}
                                        name="seatCapacity"
                                    />
                                    <InputGroup
                                        label="Location"
                                        type="text"
                                        placeholder="Enter your Location"
                                        customClasses="mb-4.5 xl:w-1/2"
                                        value={carData.location}
                                        onChange={handleChange}
                                        name="location"
                                    />
                                    <InputGroup
                                        label="Status"
                                        type="text"
                                        placeholder="Enter your Status"
                                        customClasses="mb-4.5 xl:w-1/2"
                                        value={carData.status}
                                        onChange={handleChange}
                                        name="status"
                                    />
                                </div>
                                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                                    <SelectGroupOne
                                        label="Make Name"
                                        placeholder="Please select Make Name"
                                        options={makeOptions}
                                        value={carData?.make?.id}
                                        onChange={(value) => handleSelectChange('make', value)}
                                    />
                                    <SelectGroupOne
                                        label="Model Name"
                                        placeholder="Please select Model Name"
                                        options={modelOptions}
                                        value={carData?.model?.id}
                                        onChange={(value) => handleSelectChange('model', value)}
                                    />
                                </div>
                                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                                    <SelectGroupOne
                                        label="Type Name"
                                        placeholder="Please select Type Name"
                                        options={typeOptions}
                                        value={carData?.type?.id}
                                        onChange={(value) => handleSelectChange('type', value)}
                                    />
                                    <SelectGroupOne
                                        label="Location Type Name"
                                        placeholder="Please select Location Type Name"
                                        options={locationTypeOptions}
                                        value={carData?.locationType?.id}
                                        onChange={(value) => handleSelectChange('locationType', value)}
                                    />
                                </div>
                                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                                    <SelectGroupOne
                                        label="Gearbox"
                                        placeholder="Please select Gearbox"
                                        options={[{ id: 1, name: "Manual" }, { id: 2, name: "Automatic" }]}
                                        value={carData?.cargearbox === 'Manual' ? 1 : 2} // Ensure this is properly set
                                        onChange={(value) => handleSelectChange('cargearbox', value)}
                                    />
                                    <SelectGroupOne
                                        label="Fuel"
                                        placeholder="Please select Fuel"
                                        options={[{ id: 1, name: "Petrol" }, { id: 2, name: "Diesel" }]}
                                        value={carData?.fuel === 'Petrol' ? 1 : 2} // Ensure this is properly set
                                        onChange={(value) => handleSelectChange('fuel', value)}
                                    />
                                </div>
                                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                                    <InputGroup
                                        label="Fuel Tank Capacity"
                                        type="text"
                                        placeholder="Enter your Fuel Tank Capacity"
                                        customClasses="mb-4.5 xl:w-1/2"
                                        required
                                        value={carData?.fueltankcapacity || ''}
                                        onChange={handleChange}
                                        name="fueltankcapacity"
                                    />
                                    <InputGroup
                                        label="Miles"
                                        type="text"
                                        placeholder="Enter your Miles"
                                        customClasses="mb-4.5 xl:w-1/2"
                                        required
                                        value={carData?.miles || ''}
                                        onChange={handleChange}
                                        name="miles"
                                    />
                                </div>
                                <CheckboxTwo
                                    label="Air Conditioned"
                                    checked={carData?.airConditioned || false}
                                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                                />
                            </div>
                            <div className="flex justify-end gap-4 border-t border-stroke py-4.5 px-6.5 dark:border-dark-3">
                                <button
                                    type="submit"
                                    className="inline-flex h-10 items-center justify-center rounded bg-primary px-6 text-base font-medium text-white transition hover:bg-opacity-80"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex h-10 items-center justify-center rounded border border-stroke px-6 text-base font-medium text-dark transition hover:bg-gray-200 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="p-6.5">Loading car data...</div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditCar;

