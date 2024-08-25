"use client";

import React, { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Create = () => {
  const [themeName, setThemeName] = useState("");
  const [error, setError] = useState("");

  const checkThemeExists = async (themeName: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/tours/theme");
      if (!response.ok) throw new Error("Failed to fetch themes.");

      const themes = await response.json();
      return themes.some((theme: { themeTourName: string }) => theme.themeTourName === themeName);
    } catch (err) {
      console.error(err);
      setError("Failed to check if theme exists.");
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if theme already exists
    const exists = await checkThemeExists(themeName);
    if (exists) {
      setError("Theme already exists.");
      return;
    }

    // Proceed with creating a new theme
    try {
      const response = await fetch("http://localhost:8080/api/tours/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ themeTourName: themeName }),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        alert("Theme created successfully!");
        setError(""); // Clear any previous errors
        setThemeName(""); // Reset the input field
      } else {
        // Handle error (e.g., show an error message)
        setError("Failed to create theme.");
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
              Create Themes
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="Themes Name"
                type="text"
                placeholder="Please Enter Themes Name!"
                customClasses="w-full mb-4.5"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
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
