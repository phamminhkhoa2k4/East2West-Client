"use client";
import React, { useState } from 'react';
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Create = () => {
  const [makeName, setMakeName] = useState("");
  const [error, setError] = useState("");

  const checkMakeExists = async (makeName) => {
    try {
      const response = await fetch('http://localhost:8080/api/cars/make');
      if (!response.ok) throw new Error('Failed to fetch makes.');
      
      const makes = await response.json();
      return makes.some(make => make.makeName === makeName);
    } catch (err) {
      console.error(err);
      setError('Failed to check if make exists.');
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if make already exists
    const exists = await checkMakeExists(makeName);
    if (exists) {
      setError('Make already exists.');
      return;
    }

    // Proceed with creating a new make
    try {
      const response = await fetch('http://localhost:8080/api/cars/make', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ makeName }),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert('Make created successfully!');
        setError(''); // Clear any previous errors
      } else {
        // Handle error (e.g., show an error message)
        setError('Failed to create make.');
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
              Create Makes
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Make Name"
                type="text"
                placeholder="Please Enter Make Name !"
                customClasses="w-full mb-4.5"
                value={makeName}
                onChange={(e) => setMakeName(e.target.value)}
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
