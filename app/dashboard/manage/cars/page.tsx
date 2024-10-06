"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";

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
  status: string;
  locationtype: {
    locationtypeid: number;
    locationtypename: string;
  };
  cargearbox?: string | null;
  miles?: string | null;
  fueltankcapacity?: string | null;
  fuel?: string | null;
  location?: string | null;
  thumbnail?: string[];
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
  fuelTankCapacity: string;
  fuel: string;
  airConditioned: string;
  [key: string]: string | number; // Updated index signature
}
const Cars = () => {
  const [data, setData] = useState<CarTableData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Quan trọng để gửi cookie
        });
        const result: Car[] = await response.json();
        const formattedData = result.map((car) => ({
           carId: car?.carId!,
          thumbnail: car?.thumbnail?.[0]! ,
          carName: car.carName,
          make: car.make?.makeName!,
          model: car.model?.modelName!,
          type: car.type?.typeName!,
          locationType: car.locationtype?.locationtypename!,
          year: car?.year!,
          seatingCapacity: car.seatCapacity,
          airConditioned: car.airConditioned ? "Yes" : "No",
          pricePerDay: car.pricePerDay,
          gearbox: car.cargearbox!,
          status: car.status!,
          mileages: car.miles!,
          fuelTankCapacity: car.fueltankcapacity!,
          fuel: car.fuel!,
          location: car.location!,
        }));

        setData(formattedData);
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
        data={data}
        title="Cars"
        createUrl="/dashboard/manage/cars/add"
<<<<<<< HEAD
        deleteUrl="api database delete"
=======
        deleteUrl="/cars/{id}"
>>>>>>> 7ec56dd (add delete fetch)
        editUrl="/dashboard/manage/cars/edit"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Cars;
