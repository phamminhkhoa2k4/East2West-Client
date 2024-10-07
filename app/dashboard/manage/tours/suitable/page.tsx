"use client";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";


const columns = [
  { key: "suitableTourId", label: "ID", isNumeric: true },
  { key: "suitableName", label: "Suitable Name" },
  { key: "action", label: "Action" },
];

const Suitable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/api/tours/suitable")
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
          title="Suitable"
          createUrl="/dashboard/manage/tours/suitable/add"
          deleteUrl=""
          editUrl="/dashboard/manage/tours/suitable/edit"
        />
      </DefaultLayout>
    </>
  );
};

export default Suitable;
