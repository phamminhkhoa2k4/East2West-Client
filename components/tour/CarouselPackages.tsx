import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import CardPackages from './CardPackages';

type CarouselPackagesProps = {
  slides: string[];
  curve : number
};

const CarouselPackages = ({
  slides,
  curve,
}: CarouselPackagesProps) => {
  // useEffect(() => {
  //   if (!autoSlide) return;
  //   const slideInterval = setInterval(next, autoSlideInterval);
  //   return () => clearInterval(slideInterval);
  // }, []);

  return (
    <div className=" w-[96rem] overflow-hidden relative">
      <div
        className="flex  gap-5 transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curve * 11.5}%)` }}
      >
        {[
          ...slides.map((s) => (
            <div key={s} className="flex gap-4 ">
             <CardPackages/>
            </div>
          )),
        ]}
      </div>

      {/* <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`transition-all w-1.5 h-1.5 bg-white rounded-full  ${
                  curr === i ? "p-0.5" : "bg-opacity-50"
                }`}
              />
            ))}
          </div>
        </div> */}
    </div>
  );
};

export default CarouselPackages;
