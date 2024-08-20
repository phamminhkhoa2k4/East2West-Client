  "use client"
import Image from "next/image";
import Carousel from "@/components/tour/Carousel";
import { useEffect, useState } from "react";

const Recently  = () => {
  const [curve, setCurve] = useState<number>(0);
  const [slides, setSlides] = useState<string[]>([
    "/boat.png",
    "/boat.png",
    "/boat.png",
    "/boat.png",
  ]);



   const prev = () => {
     if(curve > 0){
        setCurve((curve) => (curve === 0 ? slides.length - 1 : curve - 1)); 
     }  
    }

   const next = () =>
     setCurve((curve) => (curve === slides.length - 1 ? 0 : curve + 1));

  //  useEffect(() => {
  //    if (!autoSlide) return;
  //    const slideInterval = setInterval(next, autoSlideInterval);
  //    return () => clearInterval(slideInterval);
  //  }, []);

  return (
    <>
      <div className="flex flex-col rounded-lg shadow-md p-8 mb-4">
        <h1 className="text-3xl font-bold my-1 mb-4">
          Recently Viewed Packages
        </h1>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="flex border p-3 rounded-lg gap-1">
              <p className="font-semibold text-md">All</p>
              <p className="tracking-wide">(1)</p>
            </div>
            <div className="flex border p-3 rounded-lg gap-1">
              <p className="font-semibold text-md">Vietnam</p>
              <p className="tracking-wide">(1)</p>
            </div>
          </div>
          <div className={`${slides.length < 3 ? "hidden" : ""} border flex items-center px-2 rounded-xl bg-slate-400`}>
            <button className={`text-white ${curve == 0 ? "opacity-10" : ""}`} onClick={prev}>
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
        <div className="mt-5 w-[69.5rem]  overflow-hidden">
          <Carousel
            slides={slides}
            autoSlide={false}
            autoSlideInterval={3000}
            curve={curve}
          />
        </div>
      </div>
    </>
  );
}


export default Recently;