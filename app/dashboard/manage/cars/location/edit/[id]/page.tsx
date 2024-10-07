"use client"; // Đảm bảo mã này chạy ở phía client

import React, { useState, useEffect } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Editlocationtype = ({ params }: { params: { id: string } }) => {
  const [locationtypename, setlocationtypename] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data từ API để lấy thông tin của locationtype dựa trên ID
    const fetchlocationtype = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cars/locationtype/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch locationtype.");

        const locationtype = await response.json();
        setlocationtypename(locationtype.locationtypename); // Đặt giá trị của input
      } catch (err) {
        console.error(err);
        setError("Failed to load locationtype.");
      }
    };

    if (params.id) fetchlocationtype();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Update locationtype
    try {
      const response = await fetch(`http://localhost:8080/api/cars/locationtype/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locationtypename: locationtypename }),
      });

      if (response.ok) {
        alert("locationtype updated successfully!");
        setError(""); // Clear any previous errors
      } else {
        setError("Failed to update locationtype.");
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
            <h3 className="font-semibold text-dark dark:text-white">Edit locationtype</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <InputGroup
                label="locationtype Name"
                type="text"
                placeholder="Please Enter locationtype Name!"
                customClasses="w-full mb-4.5"
                value={locationtypename}
                onChange={(e) => setlocationtypename(e.target.value)}
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

export default Editlocationtype;
