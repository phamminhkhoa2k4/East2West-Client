"use client"; 
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { useMessage } from "@/store/MessageCotext";
const columns = [
  { key: "modelId", label: "ID" },
  { key: "modelName", label: "Model Name" },
  { key: "action", label: "Action"}
];

interface Model {
  modelId: number;
  modelName: string;
}

interface DataRow {
  [key: string]: any;
}

const Models = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const {message} = useMessage();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cars/model");
        const result: Model[] = await response.json();

        const formattedData = result.map((model: Model) => ({
          modelId: model.modelId,
          modelName: model.modelName,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchData();
  }, [message]);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Models"
        createUrl="/dashboard/manage/cars/model/add"
        deleteUrl="cars/models"
        editUrl="/dashboard/manage/cars/model/edit"
      />
    </DefaultLayout>
  );
};

export default Models;
