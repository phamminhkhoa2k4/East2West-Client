"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";

const columns = [
  { key: "amenitiesid", label: "ID" },
  { key: "amenitiesname", label: "Structure  Name" },
];

interface Amenities extends DataRow {
  amenitiesid: number;
  amenitiesname: string;
}
const Amenities = () => {
  const [data, setData] = useState<Amenities[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({endpoint : "/homestays/host/amenities"})
        const result: Amenities[] = response;

        const formattedData = result.map((amenities: Amenities) => ({
          amenitiesid: amenities.amenitiesid,
          amenitiesname: amenities.amenitiesname,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title=" "
        createUrl="/dashboard/manage/cars/make/add"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Amenities;
