"use client";
import React, { useState } from "react";

const FAQS = [
  {
    title: "When does the start and end?",
    desc: "Our  typically begins in late summer, around July or August, and continues through September. Be sure to check our website and promotional materials for specific dates each year.",
  },
  {
    title: "When does the start and end?",
    desc: "Our  typically begins in late summer, around July or August, and continues through September. Be sure to check our website and promotional materials for specific dates each year.",
  },
  {
    title: "When does the start and end?",
    desc: "Our  typically begins in late summer, around July or August, and continues through September. Be sure to check our website and promotional materials for specific dates each year.",
  },
  {
    title: "When does the start and end?",
    desc: "Our  typically begins in late summer, around July or August, and continues through September. Be sure to check our website and promotional materials for specific dates each year.",
  },
  {
    title: "When does the start and end?",
    desc: "Our  typically begins in late summer, around July or August, and continues through September. Be sure to check our website and promotional materials for specific dates each year.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-8 py-40">
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mb-24 w-full max-w-2xl text-gray-500">
            The  is a special promotion designed to make
            your as smooth as possible.
          </p>
        </div>
        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {FAQS.map(({ title, desc }, index) => (
            <div key={index} className="mb-4 border-b">
              <button
                className="w-full text-left py-3 px-4 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleToggle(index)}
              >
                {title}
              </button>
              {openIndex === index && (
                <div className="px-4 py-2">
                  <p className="text-gray-500">{desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
