"use client";

import React, { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Create = () => {
  const [suitableName, setSuitableName] = useState("");
  const [error, setError] = useState("");

  const checkSuitableExists = async (suitableName: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/tours/suitable");
      if (!response.ok) throw new Error("Failed to fetch suitable options.");
      const suitableList = await response.json();
      return suitableList.some((suitable: { suitableName: string }) => suitable.suitableName === suitableName);
    } catch (err) {
      console.error(err);
      setError("Failed to check if suitable option exists.");
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if suitable option already exists
    const exists = await checkSuitableExists(suitableName);
    if (exists) {
      setError("Suitable option already exists.");
      return;
    }

    // Proceed with creating a new suitable option
    try {
      const response = await fetch("http://localhost:8080/api/tours/suitable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ suitableName: suitableName }),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert("Suitable option created successfully!");
        setError(""); // Clear any previous errors
        setSuitableName(""); // Reset the input field
      } else {
        // Handle error (e.g., show an error message)
        setError("Failed to create suitable option.");
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
              Create Suitable
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
