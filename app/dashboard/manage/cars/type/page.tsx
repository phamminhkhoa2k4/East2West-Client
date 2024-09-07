"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";

const columns = [
  { key: "typeId", label: "ID" },
  { key: "typeName", label: "Type Name" },
];

interface Type extends DataRow {
  typeId: number;
  typeName: string;
}

const Types = () => {
  const [data, setData] = useState<Type[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars/type");
        const result: Type[] = await response.json();

        // Map the API response to the data format expected by the table
        const formattedData = result.map((type: Type) => ({
          typeId: type.typeId,
          typeName: type.typeName,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Types"
        createUrl="/dashboard/manage/cars/type/add"
        deleteUrl="api database delete"
        editUrl="link vao trang edit"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Types;
