"use client"

import { useState } from "react";

type GuestProps = {
  countAdult: number;
  setCountAdult: (value: number) => void;
  countChildren: number;
  setCountChildren: (value: number) => void;
  countInfant: number;
  setCountInfant: (value: number) => void;
};

export default function Guest({
  countAdult,
  setCountAdult,
  countChildren,
  setCountChildren,
  countInfant,
  setCountInfant,
}: GuestProps) {
  
  return (
    <>
      <div className="bg-white py-4 px-10 rounded-2xl shadow-md">
        <div className="flex items-center w-100 justify-between py-6 border-b-2">
          <div>
            <h3 className="font-bold text-lg">Adult</h3>
            <span>From 13 age than</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border rounded-full p-2"
              onClick={() =>
                setCountAdult(countAdult > 0 ? countAdult - 1 : countAdult)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span>{countAdult}</span>
            <button
              className="border rounded-full p-2"
              onClick={() => setCountAdult(countAdult + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center w-100 justify-between py-6 border-b-2">
          <div>
            <h3 className="font-bold text-lg">Children</h3>
            <span>From 2 to 12 age</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border rounded-full p-2"
              onClick={() => {
                setCountChildren(
                  countChildren > 0 ? countChildren - 1 : countChildren
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span>{countChildren}</span>
            <button
              className="border rounded-full p-2"
              onClick={() => {
                setCountChildren(countChildren + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center w-100 justify-between py-6 ">
          <div>
            <h3 className="font-bold text-lg">Infant</h3>
            <span>Under 2 age</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border rounded-full p-2"
              onClick={() => {
                setCountInfant(countInfant > 0 ? countInfant - 1 : countInfant);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span>{countInfant}</span>
            <button
              className="border rounded-full p-2"
              onClick={() => {
                setCountInfant(countInfant + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}