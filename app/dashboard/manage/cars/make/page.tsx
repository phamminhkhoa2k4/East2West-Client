
"use client"; 
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";

const columns = [
  { key: "makeId", label: "ID" },
  { key: "makeName", label: "Make Name" },
];

interface Make {
  makeId: number;
  makeName: string;
}

const Makes = () => {
  const [data, setData] = useState<Make[]>([]);

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
  }, []);

  return (
    <DefaultLayout>
      <CustomTable
        columns={columns}
        data={data}
        title="Makes"
        createUrl="/dashboard/manage/cars/make/add"
      />
    </DefaultLayout>
  );
};

export default Makes;
