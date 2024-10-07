
"use client"; 
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { useMessage } from "@/store/MessageCotext";
const columns = [
  { key: "makeId", label: "ID" },
  { key: "makeName", label: "Make Name" },
  { key: "action", label: "Action"}
];
interface DataRow {
  [key: string]: string | number; // Generic structure matching any row data
}
interface Make {
  makeId: number;
  makeName: string;
}

const Makes = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const {message} = useMessage();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars/make");
        const result: Make[] = await response.json();

        const formattedData = result.map((make: Make) => ({
          makeId: make.makeId,
          makeName: make.makeName,
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
        title="Makes"
        createUrl="/dashboard/manage/cars/make/add"
        deleteUrl="cars/makes"
       editUrl="/dashboard/manage/cars/make/edit"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Makes;
