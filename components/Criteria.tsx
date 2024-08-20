"use client";

import React from "react";
import {
  TruckIcon,
  BanknotesIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/solid";

const FEATURES = [
  {
    icon: BanknotesIcon,
    title: "We Support Educators",
    description:
      "Explore our educator resources, bulk ordering options, and special teacher discounts.",
  },
  {
    icon: LifebuoyIcon,
    title: "Support 24/7",
    description:
      "Our dedicated customer support team is available to assist you 24 hours a day, 7 days a week.",
  },
  {
    icon: LifebuoyIcon,
    title: "Support 24/7",
    description:
      "Our dedicated customer support team is available to assist you 24 hours a day, 7 days a week.",
  },
  {
    icon: LifebuoyIcon,
    title: "Support 24/7",
    description:
      "Our dedicated customer support team is available to assist you 24 hours a day, 7 days a week.",
  },
  {
    icon: LifebuoyIcon,
    title: "Support 24/7",
    description:
      "Our dedicated customer support team is available to assist you 24 hours a day, 7 days a week.",
  },
  {
    icon: LifebuoyIcon,
    title: "Support 24/7",
    description:
      "Our dedicated customer support team is available to assist you 24 hours a day, 7 days a week.",
  },
  // {
  //   icon: TruckIcon,
  //   title: "Easy Shopping, Quick Delivery",
  //   description:
  //     "We offer fast and reliable shipping, so you can focus on what matters most - your education",
  // },
];

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
};

const FeatureCard = ({ icon: Icon, title, children }: FeatureCardProps) => (
  <div className="flex border  flex-col items-center p-6 bg-white shadow-lg rounded-lg">
    <Icon className="h-12 w-12 text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-500 text-center">{children}</p>
  </div>
);

export function Criteria() {
  return (
    <section className="px-8">
      <div className="container mx-auto mb-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Get your from us!
        </h2>
        <p className="mx-auto w-full px-4 text-gray-500 lg:w-5/12">
          Start your literary adventure today by exploring these captivating
          worlds of words.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon, title, description }) => (
          <FeatureCard key={title} icon={icon} title={title}>
            {description}
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}

export default Criteria;
