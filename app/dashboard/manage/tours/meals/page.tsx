"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomTable from "@/components/Tables/CustomTable";
import { DataRow } from "@/types/table";
import { getData } from "@/utils/axios";
import { useMessage } from "@/store/MessageCotext";

interface Meal {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}
const columns = [
  { key: "mealid", label: "ID" },
  { key: "mealthumbnail", label: "Thumbnail" },
  { key: "mealname", label: "Name" },
  { key: "mealduration", label: "Duration" },
  { key: "mealactivity", label: "Meal Activity" },
  { key: "action", label: "Action" },
];

interface Meal extends DataRow {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}
const Meals = () => {
  const [data, setData] = useState<Meal[]>([]);
  const { message } = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({
          endpoint: "/itineraries/meals",
        });
        const result: Meal[] = response;

        const formattedData = result.map((meal: Meal) => ({
          mealid: meal.mealid,
          mealname: meal.mealname,
          mealthumbnail: meal.mealthumbnail,
          mealduration: meal.mealduration,
          mealactivity: meal.mealactivity,
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
        title="Meals"
        createUrl="/dashboard/manage/tours/meals/add"
        editUrl="/dashboard/manage/tours/meals/edit"
        deleteUrl="itineraries/meals"
      />
      <div></div>
    </DefaultLayout>
  );
};

export default Meals;
