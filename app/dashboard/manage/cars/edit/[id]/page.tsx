"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import CheckboxTwo from "@/components/FormElements/Checkboxes/CheckboxTwo";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UploadFiles from "./UploadFiles";
import { createData, getData } from "@/utils/axios";
import { FaRegTrashCan } from "react-icons/fa6";
import Image from "next/image";

type Option = {
  id: number;
  name: string;
};
interface FileWithPreview extends File {
  preview: string;
}

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
  thumbnail: string[];
}

const EditCar = ({ params }: { params: { id: string } }) => {
  const [carData, setCarData] = useState<Car | null>(null);
  const [makeOptions, setMakeOptions] = useState<Option[]>([]);
  const [modelOptions, setModelOptions] = useState<Option[]>([]);
  const [typeOptions, setTypeOptions] = useState<Option[]>([]);
  const [locationTypeOptions, setLocationTypeOptions] = useState<Option[]>([]);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [makeData, modelData, typeData, locationTypeData, carData] =
          await Promise.all([
            getData({ endpoint: "/cars/make" }),
            getData({ endpoint: "/cars/model" }),
            getData({ endpoint: "/cars/type" }),
            getData({ endpoint: "/cars/locationtypes" }),
            getData({ endpoint: `/cars/${params.id}` }),
          ]);

        setMakeOptions(
          makeData.map((item: any) => ({
            id: item.makeId,
            name: item.makeName,
          }))
        );
        setModelOptions(
          modelData.map((item: any) => ({
            id: item.modelId,
            name: item.modelName,
          }))
        );
        setTypeOptions(
          typeData.map((item: any) => ({
            id: item.typeId,
            name: item.typeName,
          }))
        );
        setLocationTypeOptions(
          locationTypeData.map((item: any) => ({
            id: item.locationtypeid,
            name: item.locationtypename,
          }))
        );

        setCarData({
          ...carData,
          make: carData.make
            ? { id: carData.make.makeId, name: carData.make.makeName }
            : null,
          model: carData.model
            ? { id: carData.model.modelId, name: carData.model.modelName }
            : null,
          type: carData.type
            ? { id: carData.type.typeId, name: carData.type.typeName }
            : null,
          locationType: carData.locationtype
            ? {
                id: carData.locationtype.locationtypeid,
                name: carData.locationtype.locationtypename,
              }
            : null,
          thumbnail: carData.thumbnail || [],
        });
        setImageUrls(carData.thumbnail || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

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
    const newImageUrls = uploadedUrls.filter((url) => url !== null) as string[];
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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarData((prev) => {
      if (!prev) return prev; // If prev is null, return null

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
          const selectedOption = options?.find(
            (option) => option.name === value
          );
          newValue = selectedOption || null;
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };



  const handleSubmit = async () => {
    await handleUpload().then(async (data) => {
      if (data) {
        const carsData = {
          carId: carData?.carId,
          carName: carData?.carName,
          modelId: carData?.model?.id,
          makeId: carData?.make?.id,
          typeId: carData?.type?.id,
          year: carData?.year,
          seatCapacity: carData?.seatCapacity,
          airConditioned: carData?.airConditioned,
          pricePerDay: carData?.pricePerDay,
          status: carData?.status,
          locationTypeId: carData?.locationType?.id,
          cargearbox: carData?.cargearbox,
          miles: carData?.miles,
          fueltankcapacity: carData?.fueltankcapacity,
          fuel: carData?.fuel,
          location: carData?.location,
          thumbnail: [...data, ...imageUrls],
        };
        await createData({ endpoint: `/cars`, payload: carsData });
      }
    });
  };


   const handleDeleteImage = (index: number) => {
     setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
   };

    return (
      <DefaultLayout>
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Edit Rental Car
              </h3>
            </div>

            <div className="p-6.5">
              <InputGroup
                label="Car Name"
                type="text"
                placeholder="Please Enter Car Name !"
                customClasses="w-full mb-4.5"
                value={carData?.carName ?? ""}
                onChange={handleChange}
                name="carName"
              />
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Price Per Day"
                  type="number"
                  placeholder="Enter your Price Per Day"
                  customClasses="w-full xl:w-1/2"
                  value={carData?.pricePerDay}
                  onChange={handleChange}
                  name="pricePerDay"
                />
                <InputGroup
                  label="Year"
                  type="number"
                  placeholder="Enter your Car Year"
                  customClasses="w-full xl:w-1/2"
                  value={carData?.year}
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
                  value={carData?.seatCapacity}
                  onChange={handleChange}
                  name="seatCapacity"
                />
                <InputGroup
                  label="Location"
                  type="text"
                  placeholder="Enter your Location"
                  customClasses="mb-4.5 xl:w-1/2"
                  value={carData?.location}
                  onChange={handleChange}
                  name="location"
                />
                <InputGroup
                  label="Status"
                  type="text"
                  placeholder="Enter your Status"
                  customClasses="mb-4.5 xl:w-1/2"
                  value={carData?.status}
                  onChange={handleChange}
                  name="status"
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <SelectGroupOne
                  label="Make Name"
                  placeholder="Please select Make Name"
                  options={makeOptions.map((make) => String(make.id))}
                  value={String(carData?.make?.id)}
                  onChange={handleSelectChange}
                  name="make"
                />
                <SelectGroupOne
                  label="Model Name"
                  placeholder="Please select Model Name"
                  options={modelOptions.map((model) => String(model.id))}
                  value={String(carData?.model?.id)}
                  onChange={handleSelectChange}
                  name="model"
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <SelectGroupOne
                  label="Type Name"
                  placeholder="Please select Type Name"
                  options={typeOptions.map((type) => String(type.id))}
                  value={String(carData?.type?.id)}
                  onChange={handleSelectChange}
                  name="type"
                />

                <SelectGroupOne
                  label="Location Type Name"
                  placeholder="Please select Location Type Name"
                  options={locationTypeOptions.map((locationType) =>
                    String(locationType.id)
                  )}
                  value={String(carData?.locationType?.id)}
                  onChange={handleSelectChange}
                  name="locationType"
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <SelectGroupOne
                  label="Gearbox"
                  placeholder="Please select Gearbox"
                  options={["Manual", "Automatic"]}
                  value={
                    carData?.cargearbox === "Manual" ? String(1) : String(2)
                  }
                  onChange={handleSelectChange}
                  name="cargearbox"
                />
                <SelectGroupOne
                  label="Fuel"
                  placeholder="Please select Fuel"
                  options={["Petrol", "Diesel"]}
                  value={carData?.fuel === "Petrol" ? String(1) : String(2)}
                  onChange={handleSelectChange}
                  name="fuel"
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                <InputGroup
                  label="Fuel Tank Capacity"
                  type="text"
                  placeholder="Enter your Fuel Tank Capacity"
                  customClasses="mb-4.5 xl:w-1/2"
                  required
                  value={carData?.fueltankcapacity || ""}
                  onChange={handleChange}
                  name="fueltankcapacity"
                />
                <InputGroup
                  label="Miles"
                  type="text"
                  placeholder="Enter your Miles"
                  customClasses="mb-4.5 xl:w-1/2"
                  required
                  value={carData?.miles || ""}
                  onChange={handleChange}
                  name="miles"
                />
              </div>
              <CheckboxTwo
                label="Air Conditioned"
                checked={carData?.airConditioned || false}
                onChange={(e) =>
                  handleChange(e as React.ChangeEvent<HTMLInputElement>)
                }
              />
              <div className="mt-6">
                <div className="flex items-center gap-5 my-5 ">
                  {imageUrls?.map((url, index) => (
                    <div
                      key={index}
                      className="h-50 w-50 rounded-lg overflow-hidden relative"
                    >
                      <Image
                        src={url}
                        height={400}
                        alt=""
                        width={400}
                        className="object-cover object-center w-full h-full"
                      />
                      <div className="absolute top-2 right-2 bg-slate-300 p-2 rounded-lg">
                        <FaRegTrashCan
                          className="h-5 w-5"
                          onClick={() => handleDeleteImage(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <UploadFiles
                  files={files}
                  setFiles={setFiles}
                  handleUpload={handleUpload}
                  imageUrls={imageUrls}
                  setIsOpen={() => {}}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 border-t border-stroke py-4.5 px-6.5 dark:border-dark-3">
              <button
                type="submit"
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                onClick={handleSubmit}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );

};

export default EditCar;
