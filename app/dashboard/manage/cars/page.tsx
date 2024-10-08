"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";

const columns = [
  { key: "carId", label: "Id" },
  { key: "thumbnail", label: "Thumbnail" },
  { key: "carName", label: "Name" },
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "type", label: "Type" },
  { key: "locationType", label: "Location Type" },
  { key: "year", label: "Year", isNumeric: true },
  { key: "seatingCapacity", label: "Seating Capacity", isNumeric: true },
  { key: "airConditioned", label: "Air Conditioned" },
  { key: "pricePerDay", label: "Price Per Day" },
  { key: "gearbox", label: "Gearbox" },
  { key: "status", label: "Status" },
  { key: "mileages", label: "Mileages" },
  { key: "fuelTankCapacity", label: "Fuel Tank Capacity" },
  { key: "fuel", label: "Fuel" },
  { key: "location", label: "Location" },
  { key: "action", label: "Action" },
];

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
  status: string | null;
  locationtype: {
    locationtypeid: number;
    locationtypename: string;
  };
  cargearbox: string | null;
  miles: string | null;
  fueltankcapacity: string | null;
  fuel: string | null;
  location: string | null;
  thumbnail: string[];
}
interface CarTableData extends DataRow {
  thumbnail: string;
  carName: string;
  make: string;
  model: string;
  type: string;
  locationType: string;
  location: string;
  year: number;
  seatingCapacity: number;
  gearbox: string;
  pricePerDay: number;
  status: string;
  mileages: string;
  fueltankcapacity: string;
  fuel: string;
  airConditioned: string;
  [key: string]: string | number; // Updated index signature
}
const Cars = () => {
  const [rawData, setRawData] = useState<Car[]>([]);
  const [formattedData, setFormattedData] = useState<CarTableData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({ endpoint: "/cars" });
        console.log("API response:", response); // Log the response for debugging
        
        if (Array.isArray(response)) { // Directly check if response is an array
          const result: Car[] = response;
          setRawData(result);
  
          const formatted = result.map((car) => ({
            carId: car.carId,
            thumbnail: car.thumbnail?.[0] ?? 'https://via.placeholder.com/150', // Fallback image
            carName: car.carName,
            make: car.make?.makeName ?? '',
            model: car.model?.modelName ?? '',
            type: car.type?.typeName ?? '',
            locationType: car.locationtype?.locationtypename ?? '',
            year: car.year,
            seatingCapacity: car.seatCapacity,
            airConditioned: car.airConditioned ? "Yes" : "No",
            pricePerDay: car.pricePerDay,
            gearbox: car.cargearbox ?? 'N/A',
            status: car.status ?? 'N/A',
            mileages: car.miles ?? 'N/A',
            fueltankcapacity: car.fueltankcapacity ?? 'N/A',
            fuel: car.fuel ?? 'N/A',
            location: car.location ?? 'N/A',
          }));
  
          setFormattedData(formatted);
        } else {
          console.error("Unexpected API response format:", response);
        }
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={formattedData}
        title="Cars"
        createUrl="/dashboard/manage/cars/add"
        deleteUrl="/cars/"
        editUrl="/dashboard/manage/cars/edit"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Cars;
