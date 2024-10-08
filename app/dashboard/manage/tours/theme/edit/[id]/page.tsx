"use client"; // Ensure this code runs on the client side

import React, { useState, useEffect } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getData, updateData } from "@/utils/axios";

const Edittheme = ({ params }: { params: { id: string } }) => {
  const [themeTourName, setthemeTourName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchtheme = async () => {
      setLoading(true); // Start loading

      try {
        const data = await getData({ endpoint: `/tours/theme/${params.id}` });
        if (!data) throw new Error("Failed to fetch Model.");
        setthemeTourName(data.themeTourName);
      }  catch (err) {
        console.error(err);
        setError("Failed to load theme option.");
      } finally {
        setLoading(false); // End loading
      }
    };

    if (params.id) fetchtheme();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await updateData({
        id: Number(params.id),
        endpoint: "tours/theme",
        payload:{ themeTourName: themeTourName },
      });
      if (response.ok) {
        alert("theme option updated successfully!");
        setError(""); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update theme option.");
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
              Edit theme
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="theme Name"
                type="text"
                placeholder="Please Enter theme Name!"
                customClasses="w-full mb-4.5"
                value={themeTourName}
                onChange={(e) => setthemeTourName(e.target.value)}
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

export default Edittheme;
