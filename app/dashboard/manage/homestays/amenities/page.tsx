"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";
import { useMessage } from "@/store/MessageCotext";

const columns = [
  { key: "amenitiesid", label: "ID" },
  { key: "amenitiesname", label: "Amenities  Name" },
  { key: "action", label: "Action" },
];

interface Amenities extends DataRow {
  amenitiesid: number;
  amenitiesname: string;
}
const Amenities = () => {
  const [data, setData] = useState<Amenities[]>([]);
   const { message } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({
          endpoint: "/homestays/host/amenities",
        });
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
  }, [message]);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Amenities"
        createUrl="/dashboard/manage/homestays/amenities/add"
        deleteUrl="homestays/host/amenities"
        editUrl="/dashboard/manage/homestays/amenities/edit"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Amenities;
