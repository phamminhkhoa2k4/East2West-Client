
"use client"; 
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { useMessage } from "@/store/MessageCotext";
import { getData } from "@/utils/axios";
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
        // Use getData to fetch data from the API
        const result: Make[] = await getData({ endpoint: "/cars/make" });
    
        // Transform result to match the desired format
        const formattedData = result.map((make: Make) => ({
          makeId: make.makeId,
          makeName: make.makeName,
        }));
    
        setData(formattedData); // Update state with formatted data
      } catch (error) {
        console.error("Error fetching makes:", error); // Log any errors
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
