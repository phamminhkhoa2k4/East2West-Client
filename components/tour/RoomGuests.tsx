"use client";

import { useState } from "react";

export default function Guest() {
  const [countAdult, setCountAdult] = useState<number>(0);
  const [countChildren, SetCountChildren] = useState<number>(0);
  const [countBaby, SetCountBaby] = useState<number>(0);
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
                setCountAdult((prev) => (prev > 0 ? prev - 1 : prev))
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
              onClick={() => setCountAdult((prev) => prev + 1)}
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
            <span>From 13 age than</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border rounded-full p-2"
              onClick={() => {
                SetCountChildren((prev) => (prev > 0 ? prev - 1 : prev));
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
                SetCountChildren((prev) => prev + 1);
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
            <h3 className="font-bold text-lg">Baby</h3>
            <span>From 13 age than</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border rounded-full p-2"
              onClick={() => {
                SetCountBaby((prev) => (prev > 0 ? prev - 1 : prev));
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
            <span>{countBaby}</span>
            <button
              className="border rounded-full p-2"
              onClick={() => {
                SetCountBaby((prev) => prev + 1);
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
