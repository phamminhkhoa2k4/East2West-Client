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
    const fetchData = async () => {
      try {
        setLoading(true);
        const [makeResponse, modelResponse, typeResponse, locationTypeResponse] = await Promise.all([
          fetch('http://localhost:8080/api/cars/make'),
          fetch('http://localhost:8080/api/cars/model'),
          fetch('http://localhost:8080/api/cars/type'),
          fetch('http://localhost:8080/api/cars/locationtypes')
        ]);

        const [makeData, modelData, typeData, locationTypeData] = await Promise.all([
          makeResponse.json(),
          modelResponse.json(),
          typeResponse.json(),
          locationTypeResponse.json()
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

  const handleUpload = async () => {
    if (files.length === 0) {
      console.error("No files selected");
      return;
    }

    setLoading(true);

    // Filter out the files that are already in imageUrls
    const filesToUpload = files.filter(file => !imageUrls.includes(file.preview));

    if (filesToUpload.length === 0) {
      setLoading(false);
      return;
    }

    const uploadPromises = filesToUpload.map(async (file) => {
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
    setImageUrls(prev => [...prev, ...newImageUrls]);
    setCarData(prev => ({ ...prev, thumbnail: [...prev.thumbnail, ...newImageUrls] }));

    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setCarData(prev => ({ ...prev, [name]: checked }));
    } else {
      setCarData(prev => ({ ...prev, [name]: value }));
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map((file) => {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview });
      });

      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImageUrls(prev => prev.filter((_, idx) => idx !== index));
    setCarData(prev => ({
      ...prev,
      thumbnail: prev.thumbnail.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure that images are uploaded
      await handleUpload();

      // Now submit the form data along with the uploaded image URLs
      const response = await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          thumbnail: carData.thumbnail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create car');
      }

      alert('Car created successfully');
    } catch (error) {
      console.error('Error creating car:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">Create Rental Car</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Car Name"
                type="text"
                placeholder="Please Enter Car Name !"
                customClasses="w-full mb-4.5"
                value={carData.carName ?? ''}
                onChange={handleChange}
                name="carName"
              />
              <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row xl:items-end xl:gap-6.5">
                <SelectGroupOne
                  title="Make"
                  options={makeOptions}
                  selectedValue={carData.make?.id ?? ''}
                  onChange={(value) => handleSelectChange('make', value)}
                />
                <SelectGroupOne
                  title="Model"
                  options={modelOptions}
                  selectedValue={carData.model?.id ?? ''}
                  onChange={(value) => handleSelectChange('model', value)}
                />
                <SelectGroupOne
                  title="Type"
                  options={typeOptions}
                  selectedValue={carData.type?.id ?? ''}
                  onChange={(value) => handleSelectChange('type', value)}
                />
                <SelectGroupOne
                  title="Location Type"
                  options={locationTypeOptions}
                  selectedValue={carData.locationType?.id ?? ''}
                  onChange={(value) => handleSelectChange('locationType', value)}
                />
              </div>
              <InputGroup
                label="Price Per Day"
                type="number"
                placeholder="Please Enter Price Per Day !"
                customClasses="w-full mb-4.5"
                value={carData.pricePerDay ?? ''}
                onChange={handleChange}
                name="pricePerDay"
              />
              <InputGroup
                label="Year"
                type="number"
                placeholder="Please Enter Year !"
                customClasses="w-full mb-4.5"
                value={carData.year ?? ''}
                onChange={handleChange}
                name="year"
              />
              <InputGroup
                label="Seat Capacity"
                type="number"
                placeholder="Please Enter Seat Capacity !"
                customClasses="w-full mb-4.5"
                value={carData.seatCapacity ?? ''}
                onChange={handleChange}
                name="seatCapacity"
              />
              <InputGroup
                label="Location"
                type="text"
                placeholder="Please Enter Location !"
                customClasses="w-full mb-4.5"
                value={carData.location ?? ''}
                onChange={handleChange}
                name="location"
              />
              <InputGroup
                label="status"
                type="text"
                placeholder="Please Enter Status !"
                customClasses="w-full mb-4.5"
                value={carData.status ?? ''}
                onChange={handleChange}
                name="status"
              />
              <div className="mb-4.5 flex flex-col gap-4 xl:flex-row xl:items-end xl:gap-6.5">
                <InputGroup
                  label="Fuel Tank Capacity"
                  type="text"
                  placeholder="Please Enter Fuel Tank Capacity !"
                  customClasses="w-full mb-4.5"
                  value={carData.fueltankcapacity ?? ''}
                  onChange={handleChange}
                  name="fueltankcapacity"
                />
                <InputGroup
                  label="Miles"
                  type="text"
                  placeholder="Please Enter Miles !"
                  customClasses="w-full mb-4.5"
                  value={carData.miles ?? ''}
                  onChange={handleChange}
                  name="miles"
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-4 xl:flex-row xl:items-end xl:gap-6.5">
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
              <CheckboxTwo
                label="Air Conditioned"
                checked={carData.airConditioned}
                onChange={handleChange}
                name="airConditioned"
              />


              {imageUrls.length > 0 && (
                <div className="my-4">
                  <h4 className="text-lg font-semibold">Uploaded Images:</h4>
                  <div className="flex flex-wrap gap-2">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={url}
                          alt={`Uploaded Image ${idx}`}
                          className="w-24 h-24 object-cover rounded-md border"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(idx)}
                          className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="text-red-500 mb-4">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                />
                <button
                  type="button"
                  onClick={handleUpload}
                  className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Upload Images
                </button>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Car"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateCar;
