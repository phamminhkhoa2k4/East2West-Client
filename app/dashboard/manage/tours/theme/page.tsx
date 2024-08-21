"use client";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import axios from 'axios';

const columns = [
  { key: "themeTourId", label: "ID" },
  { key: "themeTourName", label: "Theme Name" },
];

const Theme = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/api/tours/theme")
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
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Theme"
          createUrl="/dashboard/manage/tours/theme/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Theme;
