"use client";

import React, { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { createData, getData } from "@/utils/axios";
interface CarMake {
  makeId: number; // You can adjust these properties based on your actual response structure
  makeName: string;
}

const Create = () => {
  const [carMakeName, setCarMakeName] = useState("");
  const [error, setError] = useState("");

  const checkCarMakeExists = async (name: string): Promise<boolean> => {
    try {
      // Use getData to fetch car makes from the API
      const carMakes: CarMake[] = await getData({ endpoint: "/cars/make" });

      // Check if the specified car make name exists in the fetched car makes
      return carMakes.some((make) => make.makeName === name);
    } catch (err) {
      console.error(err); // Log the error
      setError("Failed to check if car make exists."); // Update the error message
      return false; // Return false in case of an error
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if car make already exists
    const exists = await checkCarMakeExists(carMakeName);
    if (exists) {
      setError("Car Make already exists.");
      return;
    }

    // Proceed with creating a new car make
    try {
      const response = await createData({
        endpoint: "/cars/make",
        payload: { makeName: carMakeName }, // Set the payload
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert("Car Make created successfully!");
        setError(""); // Clear any previous errors
        setCarMakeName(""); // Reset the input field
      } else {
        // Handle error (e.g., show an error message)
        setError("Failed to create car make.");
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
              Create make
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="make Name"
                type="text"
                placeholder="Please Enter make Name!"
                customClasses="w-full mb-4.5"
                value={carMakeName}
                onChange={(e) => setCarMakeName(e.target.value)}
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
