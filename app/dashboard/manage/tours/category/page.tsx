"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

// Define columns for CustomTable
const columns = [
  { key: "categoryTourId", label: "ID" },
  { key: "categoryTourName", label: "Category Name" },
];

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/api/tours/category")
      .then(response => response.json())
      .then(data => {
        console.log("Data fetched:", data); // Log the data to verify
        setData(data); // Set data to state
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Category"
        createUrl="/dashboard/manage/tours/category/add"
      />
    </DefaultLayout>
  );
};

export default Category;
