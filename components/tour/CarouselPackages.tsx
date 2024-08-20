import React from 'react';
import CardPackages from './CardPackages';

type CarouselPackagesProps = {
  slides: any[];
  curve: number;
};

const CarouselPackages = ({ slides, curve }: CarouselPackagesProps) => {
  return (
    <div className="w-[96rem] overflow-hidden relative">
      <div
        className="flex gap-5 transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curve * 11.5}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex gap-4">
            <CardPackages
              thumbnail={slide.thumbnail}
              title={slide.title}
              price={slide.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselPackages;
