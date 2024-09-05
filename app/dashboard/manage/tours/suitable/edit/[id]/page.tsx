"use client"; // Ensure this code runs on the client side

import React, { useState, useEffect } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const EditSuitable = ({ params }: { params: { id: string } }) => {
  const [suitableName, setSuitableName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuitable = async () => {
      setLoading(true); // Start loading

      try {
        const response = await fetch(`http://localhost:8080/api/tours/suitable/${params.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch suitable option. Status: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
          setSuitableName(data.suitableName); // Update according to API response structure
        } else {
          throw new Error("No data received from API.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load suitable option.");
      } finally {
        setLoading(false); // End loading
      }
    };

    if (params.id) fetchSuitable();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/tours/suitable/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ suitableName: suitableName }),
      });

      if (response.ok) {
        alert("Suitable option updated successfully!");
        setError(""); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update suitable option.");
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
              Edit Suitable
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Suitable Name"
                type="text"
                placeholder="Please Enter Suitable Name!"
                customClasses="w-full mb-4.5"
                value={suitableName}
                onChange={(e) => setSuitableName(e.target.value)}
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

export default EditSuitable;
