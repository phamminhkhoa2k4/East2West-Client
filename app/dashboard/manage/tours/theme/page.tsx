"use client";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import axios from 'axios';
import { useMessage } from "@/store/MessageCotext";
const columns = [
  { key: "themeTourId", label: "ID" },
  { key: "themeTourName", label: "Theme Name" },
  { key: "action", label: "Action" },
];
const Theme = () => {
  const [data, setData] = useState([]);
  const {message} = useMessage();
  useEffect(() => {
    fetch("http://localhost:8080/api/tours/theme")
      .then(response => response.json())
      .then(data => {
        console.log("Data fetched:", data); 
        setData(data); 
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [message]);
  return (
    <>
      <DefaultLayout>
        <CustomTable
          columns={columns}
          data={data}
          title="Theme"
          createUrl="/dashboard/manage/tours/theme/add"
          deleteUrl="tours/admin/theme"
          editUrl="/dashboard/manage/tours/theme/edit"
        />
      </DefaultLayout>
    </>
  );
};

export default Theme;
