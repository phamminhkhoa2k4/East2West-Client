"use client";

import React, { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { createData, getData } from "@/utils/axios";
interface Category {
  categoryTourId: number;
  categoryTourName: string;
}
const Create = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const checkCategoryExists = async (categoryName: string) => {
    try {
      const categories:Category[] = await  getData({ endpoint: '/tours/category' });
      return categories.some((category: { categoryTourName: string }) => category.categoryTourName === categoryName);
    } catch (err) {
      console.error(err);
      setError("Failed to check if category exists.");
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if category already exists
    const exists = await checkCategoryExists(categoryName);
    if (exists) {
      setError("Category already exists.");
      return;
    }

    // Proceed with creating a new category
    try {
      const response =await createData({
        endpoint:'/tours/category',
        payload: { categoryTourName: categoryName },
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert("Category created successfully!");
        setError(""); // Clear any previous errors
        setCategoryName(""); // Reset the input field
      } else {
        // Handle error (e.g., show an error message)
        setError("Failed to create category.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Create Category
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Category Name"
                type="text"
                placeholder="Please Enter Category Name!"
                customClasses="w-full mb-4.5"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />

              {error && <div className="mb-4 text-red-500">{error}</div>}

              <div className="mb-6"></div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Create;
