"use client"; // Ensure this code runs on the client side

import React, { useState, useEffect } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getData, updateData } from "@/utils/axios";

const Editcategory = ({ params }: { params: { id: string } }) => {
  const [categoryTourName, setcategoryTourName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchcategory = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getData({ endpoint: `/tours/category/${params.id}` });
        if (!data) throw new Error("Failed to fetch Model.");
        setcategoryTourName(data.categoryTourName);
      } catch (err) {
        console.error(err);
        setError("Failed to load category option.");
      } finally {
        setLoading(false); // End loading
      }
    };

    if (params.id) fetchcategory();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await updateData({
        id: Number(params.id),
        endpoint: "tours/category",
        payload: { categoryTourName: categoryTourName },
      });

      if (response.ok) {
        alert("category option updated successfully!");
        setError(""); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update category option.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  if (loading) return <div>Loading...</div>; // Loading state

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Edit category
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="category Name"
                type="text"
                placeholder="Please Enter category Name!"
                customClasses="w-full mb-4.5"
                value={categoryTourName}
                onChange={(e) => setcategoryTourName(e.target.value)}
                name=""
              />

              {error && <div className="mb-4 text-red-500">{error}</div>}

              <div className="mb-6"></div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Editcategory;
