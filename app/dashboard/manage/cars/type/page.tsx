"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { useMessage } from "@/store/MessageCotext";
import { getData } from "@/utils/axios";
const columns = [
  { key: "typeId", label: "ID" },
  { key: "typeName", label: "Type Name" },
   { key: "action", label: "Action"}
];

interface Type extends DataRow {
  typeId: number;
  typeName: string;
}

const Types = () => {
  const [data, setData] = useState<Type[]>([]);
  const {message} = useMessage();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Type[] = await getData({ endpoint: "/cars/type" });
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
  }, [message]);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Types"
        createUrl="/dashboard/manage/cars/type/add"
        deleteUrl="cars/types"
        editUrl="/dashboard/manage/cars/type/edit"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Types;
