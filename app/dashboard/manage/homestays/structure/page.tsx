"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";
import { useMessage } from "@/store/MessageCotext";

const columns = [
  { key: "structureid", label: "ID" },
  { key: "structurename", label: "Structure  Name" },
  { key: "action", label: "Action" },
];

interface Structure extends DataRow {
  structureid: number;
  structurename: string;
}

const Structure = () => {
  const [data, setData] = useState<Structure[]>([]);
  const {message} = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({
          endpoint: "/homestays/host/structure",
        });
        const result: Structure[] = response;

        const formattedData = result.map((structure: Structure) => ({
          structureid: structure.structureid,
          structurename: structure.structurename,
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
        title="Structures"
        createUrl="/dashboard/manage/homestays/structure/add"
        editUrl="/dashboard/manage/homestays/structure/edit"
        deleteUrl="homestays/host/structure"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Structure;
