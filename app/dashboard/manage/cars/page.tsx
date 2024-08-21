
"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
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
  imageUrl?: string;
}

interface CarTableData {
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
}

const Cars = () => {
  const [data, setData] = useState<CarTableData[]>([]); // Use the new type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars");
        const result: Car[] = await response.json();

        const formattedData = result.map((car) => ({
          thumbnail: car.imageUrl || "/car_thumbnail.png",
          carName: car.carName,
          make: car.make?.makeName || "Unknown",
          model: car.model?.modelName || "Unknown",
          type: car.type?.typeName || "Unknown",
          locationType: car.locationtype?.locationtypename || "Not Specified",
          year: car.year,
          seatingCapacity: car.seatCapacity,
          airConditioned: car.airConditioned ? "Yes" : "No",
          pricePerDay: car.pricePerDay,
          gearbox: car.cargearbox || "Unknown",
          status: car.status,
          mileages: car.miles || "Unknown",
          fuelTankCapacity: car.fueltankcapacity || "Unknown",
          fuel: car.fuel || "Unknown",
          location: car.location || "Not Specified",
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
      />
    </DefaultLayout>
  );
};

export default Cars;
