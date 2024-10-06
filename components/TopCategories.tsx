"use client";

import React from "react";
import Image from "next/image";
import {
  GlobeEuropeAfricaIcon,
  MicrophoneIcon,
  PuzzlePieceIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const CATEGORIES = [
  {
    img: "/image/service/blog-10.jpeg",
    icon: HeartIcon,
    title: "Service Rent Cars",
    link: "/cars",
  },
  {
    img: "/image/service/flight.jpg",
    icon: PuzzlePieceIcon,
    title: "Service Search Flights",
    link: "/Flights",
  },
  {
    img: "/image/service/blog-3.png",
    icon: GlobeEuropeAfricaIcon,
    title: "Service Booking Homestays",
    link: "/homestays",
  },
  {
    img: "/image/service/blog-13.png",
    icon: MicrophoneIcon,
    title: "Service Search Hotels",
    link: "/hotels",
  },
];

interface CategoryCardProps {
  img: string;
  title: string;
  icon: React.ElementType;
  link: string;
}

function CategoryCard({ img, title, icon: Icon,link }: CategoryCardProps) {
  return (
    <Link href={link}>
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
          </div>
        </div>
      </div>
    </Link>
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
          Explore our diverse categories and start your journey to find a
          homestay, rent a car or book a tour that suits your interests,
          passions or curiosities.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative grid h-full w-full place-items-center overflow-hidden text-center bg-gray-700 text-white p-8 rounded-lg">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75"></div>
          <div className="relative w-full">
            <h4 className="text-2xl font-bold mt-9">Tours Package</h4>
            <p className="mt-4 mb-14 font-normal opacity-50">
              Explore many places you have never been to and experience new
              things, visit famous places, etc.
            </p>
            <Link href={"/tours"} className="px-4 py-2 bg-white text-gray-700 font-bold rounded">
              Discovery now
            </Link>
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
