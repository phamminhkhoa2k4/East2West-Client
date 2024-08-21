"use client"; 
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "locationTypeId", label: "ID" },
  { key: "locationTypeName", label: "Location Type Name" },
];

interface LocationType {
  locationTypeId: number;
  locationTypeName: string;
}

const LocationTypes = () => {
  const [data, setData] = useState<LocationType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars/locationtypes");
        const result: LocationType[] = await response.json();

        const formattedData = result.map((locationType: LocationType) => ({
          locationTypeId: locationType.locationTypeId,
          locationTypeName: locationType.locationTypeName,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching location types:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Location Types"
        createUrl="/dashboard/manage/cars/location/add"
      />
    </DefaultLayout>
  );
};

export default LocationTypes;
