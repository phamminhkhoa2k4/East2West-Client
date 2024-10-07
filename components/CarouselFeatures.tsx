"use client";

import { useState } from "react";
import Image from "next/image";

export function CarouselFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const length = 2;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  return (
    <div className="pt-5 pb-20">
      <section className="container mx-auto rounded-lg bg-[url('/image/Background.png')] bg-center py-10 lg:px-16">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-1000"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {new Array(length).fill("").map((_, i) => (
              <div
                key={i}
                className="flex-none w-full flex flex-col-reverse gap-6 px-10 py-14 md:flex-row md:gap-14 md:py-20"
              >
                <div className="flex flex-col items-start justify-center md:w-3/5">
                  <p className="mb-5 text-xl font-normal text-white">
                    Easy Booking, Easy Payment <br />
                    We offer comprehensive car rental and tour booking services,
                    making it easy for customers to explore their favorite
                    destinations. Additionally, our homestay brokerage platform
                    connects travelers with local hosts, providing unique,
                    comfortable, and affordable accommodation experiences. With
                    a fast, secure, and transparent booking system, we are
                    always ready to accompany you on every journey.
                  </p>
                  <div className="flex items-center gap-2">
                    🚚
                    <p className="font-medium uppercase text-white">
                      Quick serve
                    </p>
                  </div>
                </div>
                <div className="flex w-full justify-center md:w-2/5 md:justify-end">
                  <Image
                    width={768}
                    height={768}
                    src="/Logo.png"
                    alt="testimonial image"
                    className="h-full w-2/4 object-contain md:w-2/3"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute left-16 bottom-0 z-50 flex h-5 w-20 -translate-x-2/4 gap-2 md:left-2/4">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 w-10 cursor-pointer transition-all ${
                  activeIndex === i ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CarouselFeatures;
