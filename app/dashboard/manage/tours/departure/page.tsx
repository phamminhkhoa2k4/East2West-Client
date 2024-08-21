"use client";
import { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "departuredateid", label: "ID", isNumeric: true },
  { key: "departuredate", label: "Departure Date" },
];


const Departure = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8080/api/tours/departuredate")
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
          title="Departure Date"
          createUrl="/dashboard/manage/tours/departuredate/add"
        />
      </DefaultLayout>
    </>
  );
};

export default Departure;
