"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { getData } from "@/utils/axios";
import { Column, DataRow } from "@/types/table";

const columns: Column[] = [
  { key: "locationTypeId", label: "ID" },
  { key: "locationTypeName", label: "Location Type Name" },
];

interface LocationType {
  locationTypeId: number;
  locationTypeName: string;
}

const LocationTypes = () => {
  const [data, setData] = useState<DataRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({ endpoint: "/cars/locationtypes" });

        // Transform LocationType[] to DataRow[]
        const transformedData: DataRow[] = response.map(
          (item: LocationType) => ({
            locationTypeId: item.locationTypeId,
            locationTypeName: item.locationTypeName,
          })
        );

        setData(transformedData);
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
