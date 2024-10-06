"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SearchForm from "@/components/Header/SearchForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StaffTable from "@/components/Tables/StaffTable";
import { DataRow } from "@/types/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  fuelTankCapacity: string;
  fuel: string;
  airConditioned: string;
  action: string;
}
const Staff = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<CarTableData[]>([]);

  const fetchData = async (query = "") => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cars${query ? `/search/name?name=${query}` : ""}`
      );
      const result = await response.json();
      const formattedData = result.map((car: Car) => ({
        thumbnail: car.thumbnail[0],
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
        action: (
          <button
            className="bg-primary text-white py-1 px-3 rounded"
            onClick={() =>
              router.push(`/dashboard/staff/cars/rental/${car.carId}`)
            } // Navigate to RentalStaff with tour id
          >
            Book
          </button>
        ),
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchData(query);
  };

  useEffect(() => {
    fetchData(); // Fetch all data when the page loads
  }, []);
  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="Staff" />
          <StaffTable
            columns={columns}
            data={data}
            title="Cars"
            handleSearch={handleSearch}
          />
          <div></div>
        </div>
      </DefaultLayout>
      ;
    </>
  );
};

export default Staff;
