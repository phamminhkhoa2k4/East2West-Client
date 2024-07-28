import React from 'react';
import Image from 'next/image';
import Button from './Button';

const Hero = () => {
  return (
    <section className=" max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image
          src="/camp.svg"
          width={50}
          height={50}
          alt="camp"
          className="absolute left-[5px] top-[-30px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-52 lg:bold-88">East2West Tours and Travel </h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          We want to be on each of your journeys seeking the satisfaction of
          seeing the incorruptible beauty of nature. We can help you on an
          adventure around the world in just one app
        </p>

        <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  key={index}
                  src="/star.svg"
                  width={24}
                  height={24}
                  alt="star"
                />
              ))}
          </div>

          <p className="bold-16 lg:bold-20 text-blue-70">
            <span className="regular-16 lg:regular-20 ml-1">
              Excellent Reviews
            </span>
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Button type="button" title="Download App" variant="btn_green" />
        </div>
      </div>
      <div className=" relative top-36 right-36 mt-40 w-[33rem] grid gap-6 lg:mt-0">
        <div className="grid grid-cols-4 gap-6">
          <Image
            width={768}
            height={768}
            src="/image/tours/Rectangle8.svg"
            className="rounded-lg shadow-md"
            alt="flowers"
          />
          <Image
            width={768}
            height={768}
            src="/image/tours/Rectangle9.svg"
            className="-mt-28 rounded-lg shadow-md"
            alt="flowers"
          />
          <Image
            width={768}
            height={768}
            src="/image/tours/Rectangle10.svg"
            className="-mt-20 rounded-lg shadow-md"
            alt="flowers"
          />
          <Image
            width={768}
            height={768}
            src="/image/tours/Rectangle11.svg"
            className="-mt-20 rounded-lg shadow-md"
            alt="flowers"
          />
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div></div>
          <Image
            width={768}
            height={768}
            src="/image/tours/Rectangle12.svg"
            className="-mt-28 rounded-lg shadow-md"
            alt="flowers"
          />
          <Image
            width={768}
            height={768}
            src="/image/tours/Rectangle13.svg"
            className="-mt-10 rounded-lg shadow-md"
            alt="flowers"
          />
          <Image
            width={768}
            height={768}
            src="/image/tours/Rectangle14.svg"
            className="-mt-20 rounded-lg shadow-md"
            alt="flowers"
          />
        </div>
      </div>
      {/* <div className='relative flex flex-1 items-start'>
        <div className='relative z-20 w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8'>
          <div className='flex flex-col'>
            <div className='flexBetween'>
              <p className='regular-16 text-gray-20'>Location</p>
              <Image src='/close.svg' width={24} height={24} alt='close' />
            </div>
            <p className='text-white bold-20'>Aguas Calientes</p>

            <div className='flex flex-row gap-6 mt-8'>
              <div className='flex flex-col'>
                <p className='regular-16 text-gray-20'>Distance</p>
                <p className='text-white bold-20'>173.28 mi</p>
              </div>
              <div className='flex flex-col'>
                <p className='regular-16 text-gray-20'>Elevation</p>
                <p className='text-white bold-20'>2.040 km</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
