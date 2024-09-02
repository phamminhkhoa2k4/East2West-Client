"use client";
import { useEffect, useState } from "react";
import CarouselPackages from "./CarouselPackages";
import { api } from "@/utils/axios";

const Packages = () => {
  const [curve, setCurve] = useState<number>(0);
  const [slides, setSlides] = useState<any[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/tours/top10');
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const prev = () => {
    if (curve > 0) {
      setCurve((curve) => (curve === 0 ? slides.length - 1 : curve - 1));
    }
  };

  const next = () =>
    setCurve((curve) => (curve === slides.length - 1 ? 0 : curve + 1));

  return (
    <>
      <div className="flex flex-col rounded-lg shadow-md p-8 mb-4">
        <h1 className="text-3xl font-bold my-1 mb-4">
          Jackpot Deals on Top Selling Packages
        </h1>
        <div className="flex justify-between">
          <p>Save extra with our exclusive deals!</p>
          <div
            className={`${
              slides.length < 3 ? "hidden" : ""
            } border flex items-center py-3 px-2 rounded-xl bg-slate-400`}
          >
            <button
              className={`text-white ${curve == 0 ? "opacity-10" : ""}`}
              onClick={prev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button className="text-white" onClick={next}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-5 w-[69.5rem] overflow-hidden">
          <CarouselPackages slides={slides} curve={curve} />
        </div>
      </div>
    </>
  );
};

export default Packages;
