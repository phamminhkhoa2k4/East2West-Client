"use client";
import React, { useState } from 'react';
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Create = () => {
  const [locationTypeName, setLocationTypeName] = useState("");
  const [error, setError] = useState("");

  // Function to check if a location type already exists
  const checkLocationTypeExists = async (name: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/cars/locationtypes');
      if (!response.ok) throw new Error('Failed to fetch location types.');

      const locationTypes = await response.json();
      return locationTypes.some((type: { locationtypename: string }) => type.locationtypename === name);
    } catch (err) {
      console.error(err);
      setError('Failed to check if location type exists.');
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if location type already exists
    const exists = await checkLocationTypeExists(locationTypeName);
    if (exists) {
      setError('Location Type already exists.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/cars/locationtypes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({locationtypename: locationTypeName }),
      });

      if (response.ok) {
        alert('Location Type created successfully!');
        setLocationTypeName(''); 
        setError(''); 
      } else {
        setError('Failed to create location type.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Create Location Type
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Location Type Name"
                type="text"
                placeholder="Please Enter Location Type Name !"
                customClasses="w-full mb-4.5"
                value={locationTypeName}
                onChange={(e) => setLocationTypeName(e.target.value)}
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
