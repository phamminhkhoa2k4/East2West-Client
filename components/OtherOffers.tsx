"use client";

import Image from "next/image";
import React from "react";

const OTHER_BOOKS = [
  {
    img: `/image/tours/RectangleBig1.svg`,
    category: "Frank Herbert",
    title: "Dune",
    desc: "A classic epic that explores political intrigue and power struggles on a desert planet.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig7.svg`,
    category: "William Gibson",
    title: "Neuromancer",
    desc: "A pioneering cyberpunk novel filled with futuristic technology and hackers.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig1.svg`,
    category: "J.R.R. Tolkien",
    title: "The Hobbit",
    desc: "A timeless adventure through Middle-earth, featuring Bilbo Baggins and his quest.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig1.svg`,
    category: "Frank Herbert",
    title: "Dune",
    desc: "A classic epic that explores political intrigue and power struggles on a desert planet.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig7.svg`,
    category: "William Gibson",
    title: "Neuromancer",
    desc: "A pioneering cyberpunk novel filled with futuristic technology and hackers.",
    price: "$99",
    offPrice: "$79",
  },
  {
    img: `/image/tours/RectangleBig1.svg`,
    category: "J.R.R. Tolkien",
    title: "The Hobbit",
    desc: "A timeless adventure through Middle-earth, featuring Bilbo Baggins and his quest.",
    price: "$99",
    offPrice: "$79",
  },
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

export function OtherOffers() {
  return (
    <section className="px-8 pt-28">
      <div className="container mx-auto mb-10">
        <h2 className="mb-2 text-4xl font-bold text-gray-800">
          Other Book Offers - 20% OFF
        </h2>
        <p className="w-full max-w-lg text-lg text-gray-500">
          Escape into captivating stories, vibrant characters, and enchanting
          worlds with our extensive fiction collection.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {OTHER_BOOKS.map((props, key) => (
          <Card key={key} {...props} />
        ))}
      </div>
    </section>
  );
}

export default OtherOffers;
