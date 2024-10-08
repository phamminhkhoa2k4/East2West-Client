"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { useMessage } from "@/store/MessageCotext";
import { getData } from "@/utils/axios";
// Define columns for CustomTable
const columns = [
  { key: "categoryTourId", label: "ID" },
  { key: "categoryTourName", label: "Category Name" },
  { key: "action", label: "Action" },
];

const Category = () => {
  const [data, setData] = useState([]);
  const {message} = useMessage();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({ endpoint: "/tours/category" });
        console.log("Data fetched:", response); 
        setData(response); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [message]);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Category"
        createUrl="/dashboard/manage/tours/category/add"
        deleteUrl="tours/admin/category"
        editUrl="/dashboard/manage/tours/category/edit"
      />
    </DefaultLayout>
  );
};

export default Category;
