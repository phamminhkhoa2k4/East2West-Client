"use client"
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

type GalleryProps = {
  slides: string[];
};
const Gallery = ({ slides}: GalleryProps) => {
  const [curve, setCurve] = useState<number>(0);
  const prev = () => {
    if (curve > 0) {
      setCurve((curve) => (curve === 0 ? slides.length - 1 : curve - 1));
    }
  };

  const next = () =>
    setCurve((curve) => (curve === slides.length - 1 ? 0 : curve + 1));

  const specify = (index : number) => {
    setCurve(index);
  }
  return (
    <>
      <div className="grid grid-cols-6 grid-rows-5 gap-7">
        <div className="col-span-6 relative row-span-4 rounded-xl overflow-hidden">
          <div className="w-[600%]   overflow-hidden">
            <div
              className="flex w-full transition-transform ease-out duration-500"
              style={{ transform: `translateX(-${curve * 16.6666}%)` }}
            >
              {slides.map((s) => (
                <div key={s} className="flex w-full border-white">
                  <Image
                    src={s}
                    alt=""
                    height={3000}
                    width={4000}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between px-5 absolute top-54 w-full">
            <button onClick={prev} className="rounded-full bg-white">
              <IoIosArrowDropleft className="w-15 h-15" />
            </button>
            <button onClick={next} className="rounded-full bg-white">
              <IoIosArrowDropright className="w-15 h-15" />
            </button>
          </div>
        </div>
        {slides.map((s, index) => (
          <div
            onClick={() => specify(index)}
            key={index}
            className="col-span-1 row-span-1 rounded-xl overflow-hidden"
          >
            <Image
              src={s}
              alt=""
              height={3000}
              width={4000}
              className={`${
                curve === index ? "scale-110 border-blue-500 border-4" : ""
              } object-cover object-center w-full h-full`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;