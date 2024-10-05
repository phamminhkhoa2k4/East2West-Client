"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";
import { useMessage } from "@/store/MessageCotext";

const columns = [
  { key: "accommodationid", label: "ID" },
  { key: "accommodationthumbnail", label: "Thumbnail" },
  { key: "accommodationname", label: "Name" },
  { key: "accommodationtype", label: "Type" },
  { key: "durationaccommodation", label: "Duration" },
  { key: "roomtype", label: "Room Type" },
  { key: "isbreadkfast", label: "Breakfast" },
  { key: "action", label: "Action" },
];

interface Accommodation extends DataRow {
  accommodationid: number;
  accommodationname: string; //
  accommodationthumbnail: string; //
  accommodationtype: string; //
  roomtype: string; //
  durationaccommodation: string;
  isbreadkfast: boolean;
}
const Accommodation = () => {
  const [data, setData] = useState<Accommodation[]>([]);
  const { message } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({
          endpoint: "/itineraries/accommodations",
        });
        const result: Accommodation[] = response;

        const formattedData = result.map((accommodation: Accommodation) => ({
          accommodationid: accommodation.accommodationid,
          accommodationname: accommodation.accommodationname,
          accommodationthumbnail: accommodation.accommodationthumbnail,
          accommodationtype: accommodation.accommodationtype,
          roomtype: accommodation.roomtype,
          durationaccommodation: accommodation.durationaccommodation,
          isbreadkfast: accommodation.isbreadkfast,
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
        title="Accommodation"
        createUrl="/dashboard/manage/tours/accommodation/add"
        editUrl="/dashboard/manage/tours/accommodation/edit"
        deleteUrl="itineraries/accommodations"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Accommodation;
