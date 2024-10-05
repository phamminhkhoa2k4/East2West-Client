"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";
import { useMessage } from "@/store/MessageCotext";

const columns = [
  { key: "placeid", label: "ID" },
  { key: "placethumbnail", label: "Thumbnail" },
  { key: "placename", label: "Name" },
  { key: "placeduration", label: "Duration" },
  { key: "description", label: "Description" },
  { key: "action", label: "Action" },
];

interface Place extends DataRow {
  placeid: number;
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}
const Places = () => {
  const [data, setData] = useState<Place[]>([]);
  const { message } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({
          endpoint: "/itineraries/places",
        });
        const result: Place[] = response;

        const formattedData = result.map((place: Place) => ({
          placeid: place.placeid,
          placename: place.placename,
          placethumbnail: place.placethumbnail,
          description: place.description,
          placeduration: place.placeduration,
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
        title="Places"
        createUrl="/dashboard/manage/tours/places/add"
        editUrl="/dashboard/manage/tours/places/edit"
        deleteUrl="itineraries/places"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Places;
