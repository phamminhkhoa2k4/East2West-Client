"use client";

import React from "react";
import Image from "next/image";
import {
  GlobeEuropeAfricaIcon,
  MicrophoneIcon,
  PuzzlePieceIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const CATEGORIES = [
  {
    img: "/image/service/blog-3.png",
    icon: HeartIcon,
    title: "Service Rent Cars",
    desc: "up to 40% OFF",
  },
  {
    img: "/image/service/blog-12.jpeg",
    icon: PuzzlePieceIcon,
    title: "Service Booking Flights",
    desc: "up to 40% OFF",
  },
  {
    img: "/image/service/blog-10.jpeg",
    icon: GlobeEuropeAfricaIcon,
    title: "Service Booking Home Stay",
    desc: "up to 40% OFF",
  },
  {
    img: "/image/service/blog-13.png",
    icon: MicrophoneIcon,
    title: "Service Booking Hotels",
    desc: "up to 40% OFF",
  },
];

interface CategoryCardProps {
  img: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

function CategoryCard({ img, title, desc, icon: Icon }: CategoryCardProps) {
  return (
    <div className="relative grid min-h-[12rem] w-full overflow-hidden rounded-lg shadow-lg">
      <Image
        width={768}
        height={768}
        src={img}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 h-full w-full bg-black/70"></div>
      <div className="relative flex flex-col justify-between p-4 text-white">
        <Icon className="h-8 w-8" />
        <div>
          <h5 className="text-lg font-bold mb-1">{title}</h5>
          <p className="text-xs font-bold opacity-50">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export function TopCategories() {
  return (
    <section className="container mx-auto px-8 pb-20 pt-20 lg:pt-0">
      <div className="mb-20 grid place-items-center text-center">
        <h2 className="text-4xl font-bold text-gray-800 my-3">
          Top Service Categories
        </h2>
        <p className="text-lg text-gray-500 lg:w-6/12">
          Explore our diverse range of categories and embark on a reading
          journey that suits your mood, passion, or curiosity.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative grid h-full w-full place-items-center overflow-hidden text-center bg-gray-700 text-white p-8 rounded-lg">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75"></div>
          <div className="relative w-full">
            <p className="text-xs font-bold opacity-50">up to 40% OFF</p>
            <h4 className="text-2xl font-bold mt-9">Tours Package</h4>
            <p className="mt-4 mb-14 font-normal opacity-50">
              Explore many places you have never been to and experience new
              things, visit famous places, etc.
            </p>
            <button className="px-4 py-2 bg-white text-gray-700 font-bold rounded">
              Read More
            </button>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(0, 2).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(2, 4).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopCategories;
