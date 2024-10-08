"use client";
import React, { useState } from 'react';
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { createData, getData } from '@/utils/axios';

const Create = () => {
  const [modelName, setModelName] = useState("");
  const [error, setError] = useState("");

  // Function to check if a model already exists
  const checkModelExists = async (modelName: string): Promise<boolean> => {
    try {
      // Use getData to fetch models from the API
      const models = await getData({ endpoint: "/cars/model" });
      return models.some((model: { modelName: string }) => model.modelName === modelName);
    } catch (err) {
      console.error(err);
      setError("Failed to check if model exists.");
      return false;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if model already exists
    const exists = await checkModelExists(modelName);
    if (exists) {
      setError("Model already exists.");
      return;
    }

    // Proceed with creating a new model
    try {
      const response = await createData({
        endpoint: "/cars/model",
        payload: { modelName }, // Set the payload
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert("Model created successfully!");
        setError(""); // Clear any previous errors
        setModelName(""); // Reset the input field
      } else {
        // Handle error (e.g., show an error message)
        setError("Failed to create model.");
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
              Create Models
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Model Name"
                type="text"
                placeholder="Please Enter Model Name !"
                customClasses="w-full mb-4.5"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
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
