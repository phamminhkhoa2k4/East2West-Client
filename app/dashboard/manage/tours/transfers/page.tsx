"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";
import { useMessage } from "@/store/MessageCotext";

const columns = [
  { key: "transferid", label: "ID" },
  { key: "transferthumbnail", label: "Thumbnail" },
  { key: "transfername", label: "Name" },
  { key: "transferduration", label: "Duration" },
  { key: "description", label: "Description" },
  { key: "action", label: "Action" },
];

interface Transfer extends DataRow {
  transferid: number;
  transfername: string;
  transferthumbnail: string;
  description: string;
  transferduration: string;
}
const Transfer = () => {
  const [data, setData] = useState<Transfer[]>([]);
  const { message } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({
          endpoint: "/itineraries/transfers",
        });
        const result: Transfer[] = response;

        const formattedData = result.map((transfer: Transfer) => ({
          transferid: transfer.transferid,
          transfername: transfer.transfername,
          transferthumbnail: transfer.transferthumbnail,
          description: transfer.description,
          transferduration: transfer.transferduration,
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
        title="Transfers"
        createUrl="/dashboard/manage/tours/transfers/add"
        editUrl="/dashboard/manage/tours/transfers/edit"
        deleteUrl="itineraries/transfers"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Transfer;
