"use client";

import React from "react";
import Image from "next/image";
const BOOKS = [
  {
    img: `/image/tours/RectangleBig1.svg`,
    category: "Natasha Wing",
    title: "The Night Before Kindergarten",
    desc: "A heartwarming and humorous picture book that eases the jitters of starting kindergarten.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig6.svg`,
    category: "James Patterson",
    title: "Middle School: The Worst Years of My Life",
    desc: "A funny and relatable novel about the challenges of navigating middle school.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig2.svg`,
    category: "Helen W. Colby",
    title: "College Student: A Comprehensive Checklist",
    desc: "A practical guidebook that helps college students prepare for the transition to university.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig3.svg`,
    category: "Walter Pauk",
    title: "How to Study in College",
    desc: "A valuable resource for high school seniors and college freshmen, offering effective study strategies.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig4.svg`,
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book on grammar and writing skills, essential for high school and college students.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig5.svg`,
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book on grammar and writing skills, essential for high school and college students.",
    price: "$99",
    offPrice: "$79",
  },
];

const BOOKS_TABS = [
  "history",
  "law",
  "math",
  "economy",
  "business",
  "communication",
];

interface BookCardProps {
  img: string;
  title: string;
  desc: string;
  category: string;
  price: string;
  offPrice?: string;
}

function Card({
  img,
  category,
  title,
  desc,
  price,
  offPrice,
}: BookCardProps) {
  return (
    <div className="bg-transparent shadow-none">
      <div className="bg-gray-700 rounded-lg overflow-hidden mb-6">
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full scale-[1.1] object-cover object-center"
        />
      </div>
      <div className="p-0">
        <p className="text-blue-500 mb-2 text-xs font-semibold">{category}</p>
        <a href="#">
          <h5 className="text-blue-gray-800 mb-3 text-xl font-bold normal-case xl:w-64">
            {title}
          </h5>
        </a>
        <p className="text-gray-500 mb-4 font-normal">{desc}</p>
        <div className="flex gap-2">
          <p className={`text-xl ${offPrice ? "line-through" : ""}`}>{price}</p>
          <p className="text-xl text-red-500">{offPrice}</p>
        </div>
      </div>
    </div>
  );
}

export function Categories() {
  const [activeTab, setActiveTab] = React.useState("history");

  return (
    <section className="px-8 pt-20 pb-10">
      <div className="container mx-auto mb-20 text-center">
        <p className="mb-3 font-bold uppercase text-blue-gray-800">
          up to 40% OFF
        </p>
        <h1 className="mb-2 text-4xl font-bold text-blue-gray-800">
          Tours Package Popular
        </h1>
        <p className="mx-auto w-full px-4 text-lg text-gray-500 lg:w-9/12">
          Explore many places you have never been to and experience new things,
          visit famous places, etc.
        </p>
        <div className="mt-20 flex items-center justify-center">
          <div className="w-full lg:w-8/12">
            <div className="flex justify-between bg-transparent h-12">
              {BOOKS_TABS.map((book) => (
                <button
                  key={book}
                  onClick={() => setActiveTab(book)}
                  className={`capitalize transition-all duration-300 font-medium ${
                    activeTab === book
                      ? "text-white bg-gray-900 rounded-lg"
                      : "text-gray-800"
                  } px-4 py-2`}
                >
                  {book}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {BOOKS.map((props, key) => (
          <Card key={key} {...props} />
        ))}
      </div>
      <div className="grid place-items-center">
        <button className="mt-32 px-4 py-2 border border-gray-800 text-gray-800 rounded">
          Show more
        </button>
      </div>
    </section>
  );
}

export default Categories;
