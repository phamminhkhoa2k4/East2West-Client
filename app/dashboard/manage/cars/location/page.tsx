"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { getData } from "@/utils/axios";
import { Column  } from "@/types/table";

const columns: Column[] = [
  { key: "locationtypeid", label: "ID" },
  { key: "locationtypename", label: "Location Type Name" },
  { key: "action", label: "Action"}
];

interface LocationType {
  locationtypeid: number;
  locationtypename: string;
}
interface DataRow {
  [key: string]: string | number; 
}
const LocationTypes = () => {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars/locationtypes");
        const result: LocationType[] = await response.json();
    
        // Transform result to match DataRow structure
        const formattedData: DataRow[] = result.map((location: LocationType) => ({
          locationtypeid: location.locationtypeid,
          locationtypename: location.locationtypename,
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
        deleteUrl="/cars/locationtypes/"
      />
    </DefaultLayout>
  );
};

export default LocationTypes;
