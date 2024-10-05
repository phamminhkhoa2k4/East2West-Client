"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UploadFiles from './UploadFiles';
import { createData, getData } from '@/utils/axios';

type Option = {
  id: number;
  name: string;
};
interface FileWithPreview extends File {
  preview: string;
}
interface Car {
  carId?: number;
  carName: string;
  pricePerDay: number;
  status: string;
  year: number;
  seatCapacity: number;
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
  thumbnail: string[];
}

const CreateCar = () => {
  const [carData, setCarData] = useState<Partial<Car>>({
    make: null,
    model: null,
    type: null,
    locationType: null,
    airConditioned: false,
    thumbnail: [],
  });
  
  const [makeOptions, setMakeOptions] = useState<Option[]>([]);
  const [modelOptions, setModelOptions] = useState<Option[]>([]);
  const [typeOptions, setTypeOptions] = useState<Option[]>([]);
  const [locationTypeOptions, setLocationTypeOptions] = useState<Option[]>([]);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrls.length > 0) {
      setFiles([]);
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const [makeData, modelData, typeData, locationTypeData] = await Promise.all([
          getData({endpoint:"/cars/make"}),
          getData({endpoint:"/cars/model"}),
          getData({endpoint:"/cars/type"}),
          getData({endpoint:"/cars/locationtypes"})
        ]);

        

        setMakeOptions(makeData.map((item: any) => ({ id: item.makeId, name: item.makeName })));
        setModelOptions(modelData.map((item: any) => ({ id: item.modelId, name: item.modelName })));
        setTypeOptions(typeData.map((item: any) => ({ id: item.typeId, name: item.typeName })));
        setLocationTypeOptions(locationTypeData.map((item: any) => ({ id: item.locationtypeid, name: item.locationtypename })));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, []);


   const handleUpload = async (): Promise<string[]> => {
     if (files.length === 0) {
       console.error("No files selected");
       return [];
     }

     const uploadPromises = files.map(async (file) => {
       const formData = new FormData();
       formData.append("file", file);
       formData.append("upload_preset", "homestays");

       try {
         const response = await fetch(
           `https://api.cloudinary.com/v1_1/djddnvjpi/image/upload`,
           {
             method: "POST",
             body: formData,
           }
         );

         const result = await response.json();
         return result.secure_url;
       } catch (error) {
         console.error("Upload failed:", error);
         return null;
       }
     });

     const uploadedUrls = await Promise.all(uploadPromises);
     const newImageUrls = uploadedUrls.filter(
       (url) => url !== null
     ) as string[];
     return newImageUrls;
   };

  




   const handleChange = (
     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
   ) => {
     const { name, value, type } = e.target;
     if (type === "checkbox") {
       const checked = (e.target as HTMLInputElement).checked;
       setCarData((prev) => ({
         ...prev!,
         [name]: checked,
       }));
     } else {
       setCarData((prev) => ({
         ...prev!,
         [name]: value,
       }));
     }
   };

  // const handleSelectChange = (name: keyof Car, value: number) => {

  //   setCarData((prev) => {
  //     const currentState = prev || {}; 

  //     let newValue: any;

  //     switch (name) {
  //       case "cargearbox":
  //         newValue = value === 1 ? "Manual" : "Automatic";
  //         break;
  //       case "fuel":
  //         newValue = value === 1 ? "Petrol" : "Diesel";
  //         break;
  //       default:
  //         const optionsMap: { [key in keyof Car]?: Option[] } = {
  //           make: makeOptions,
  //           model: modelOptions,
  //           type: typeOptions,
  //           locationType: locationTypeOptions,
  //         };

  //         const options = optionsMap[name];
  //         const selectedOption = options?.find((option) => option.id === value);
  //         newValue = selectedOption || null;
  //     }

  //     return {
  //       ...currentState,
  //       [name]: newValue,
  //     };
  //   });
  // };


const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = e.target;
  setCarData((prev) => {
    if (!prev) return {};

    let newValue: any;

    switch (name) {
      case "cargearbox":
        newValue = value === "Manual" ? "Manual" : "Automatic";
        break;
      case "fuel":
        newValue = value === "Petrol" ? "Petrol" : "Diesel";
        break;
      default:
        const optionsMap: { [key: string]: Option[] } = {
          make: makeOptions,
          model: modelOptions,
          type: typeOptions,
          locationType: locationTypeOptions,
        };

        const options = optionsMap[name as keyof typeof optionsMap];
        const selectedOption = options?.find((option) => option.name === value);
        newValue = selectedOption || null;
    }

    return {
      ...prev,
      [name]: newValue,
    };
  });
};




  const handleSubmit = async () => {


  
      await handleUpload().then(async(data) => {
          if(data){
            const carsData = {
              carName: carData.carName,
              modelId: carData.model?.id,
              makeId: carData.make?.id,
              typeId: carData.type?.id,
              year: Number(carData.year),
              seatCapacity: Number(carData.seatCapacity),
              airConditioned: carData.airConditioned,
              pricePerDay: Number(carData.pricePerDay),
              status: carData.status,
              locationTypeId: carData.locationType?.id,
              cargearbox: carData.cargearbox,
              miles: carData.miles,
              fueltankcapacity: carData.fueltankcapacity,
              fuel: carData.fuel,
              location: carData.location,
              thumbnail: data, // Đảm bảo thumbnail được gửi
            };
            await createData({endpoint: "/cars",payload: carsData })
          }
      })
  
      
  
   
  };
  
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Create Rental Car
            </h3>
          </div>

          <div className="p-6.5">
            <InputGroup
              label="Car Name"
              type="text"
              placeholder="Please Enter Car Name !"
              customClasses="w-full mb-4.5"
              value={carData.carName ?? ""}
              onChange={handleChange}
              name="carName"
            />
            <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row xl:items-end xl:gap-6.5">
              <SelectGroupOne
                label="Make"
                options={makeOptions.map((option) => option.name)}
                value={carData.make?.name || ""}
                onChange={handleSelectChange}
                name="make"
                placeholder="Please select Make"
              />
              <SelectGroupOne
                label="Model"
                options={modelOptions.map((option) => option.name)}
                value={carData.model?.name || ""}
                onChange={handleSelectChange}
                name="model"
                placeholder="Please select Model"
              />
              <SelectGroupOne
                label="Type"
                options={typeOptions.map((option) => option.name)}
                value={carData.type?.name || ""}
                onChange={handleSelectChange}
                name="type"
                placeholder="Please select Type"
              />
              <SelectGroupOne
                label="Location Type"
                options={locationTypeOptions.map((option) => option.name)}
                value={carData.locationType?.name || ""}
                onChange={handleSelectChange}
                name="locationType"
                placeholder="Please select Location Type"
              />
            </div>
            <InputGroup
              label="Price Per Day"
              type="number"
              placeholder="Please Enter Price Per Day !"
              customClasses="w-full mb-4.5"
              value={String(carData?.pricePerDay!) ?? ""}
              onChange={handleChange}
              name="pricePerDay"
            />
            <SelectGroupOne
              label="Gearbox"
              options={["Manual", "Automatic"]}
              value={carData.cargearbox || ""}
              onChange={handleSelectChange}
              name="cargearbox"
              placeholder="Please select Gearbox"
            />
            <SelectGroupOne
              label="Fuel"
              options={["Petrol", "Diesel"]}
              value={carData.fuel || ""}
              onChange={handleSelectChange}
              name="fuel"
              placeholder="Please select Fuel"
            />
            <InputGroup
              label="Location"
              type="text"
              placeholder="Please Enter Location !"
              customClasses="w-full mb-4.5"
              value={carData.location ?? ""}
              onChange={handleChange}
              name="location"
            />
            <InputGroup
              label="status"
              type="text"
              placeholder="Please Enter Status !"
              customClasses="w-full mb-4.5"
              value={carData.status ?? ""}
              onChange={handleChange}
              name="status"
            />
            <div className="mb-4.5 flex flex-col gap-4 xl:flex-row xl:items-end xl:gap-6.5">
              <InputGroup
                label="Seat Capacity"
                type="number"
                placeholder="Please Enter Seat Capacity !"
                customClasses="w-full mb-4.5"
                value={String(carData.seatCapacity!) ?? 0}
                onChange={handleChange}
                name="seatCapacity"
              />
              <InputGroup
                label="Year"
                type="text"
                placeholder="Please Enter Year !"
                customClasses="w-full mb-4.5"
                value={String(carData.year!) ?? 0}
                onChange={handleChange}
                name="year"
              />
            </div>
            <div className="mb-4.5 flex flex-col gap-4 xl:flex-row xl:items-end xl:gap-6.5">
              <InputGroup
                label="Fuel Tank Capacity"
                type="text"
                placeholder="Please Enter Fuel Tank Capacity !"
                customClasses="w-full mb-4.5"
                value={carData.fueltankcapacity ?? ""}
                onChange={handleChange}
                name="fueltankcapacity"
              />
              <InputGroup
                label="Miles"
                type="text"
                placeholder="Please Enter Miles !"
                customClasses="w-full mb-4.5"
                value={carData.miles ?? ""}
                onChange={handleChange}
                name="miles"
              />
            </div>
            <div className="mb-4.5 flex flex-col gap-4 xl:flex-row xl:items-end xl:gap-6.5">
              <SelectGroupOne
                label="Gearbox"
                options={["Manual", "Automatic"]}
                value={carData.cargearbox || ""}
                onChange={handleSelectChange}
                name="cargearbox"
                placeholder="Please select Gearbox"
              />
              <SelectGroupOne
                label="Fuel"
                options={["Petrol", "Diesel"]}
                value={carData.fuel || ""}
                onChange={handleSelectChange}
                name="fuel"
                placeholder="Please select Fuel"
              />
            </div>
            <CheckboxTwo
              label="Air Conditioned"
              checked={carData.airConditioned!}
              onChange={handleChange}
              name="airConditioned"
            />

            <UploadFiles
              files={files}
              setFiles={setFiles}
              handleUpload={handleUpload}
              imageUrls={imageUrls}
              setIsOpen={function (value: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />

            <button
              type="submit"
              className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Car"}
            </button>
           
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateCar;
