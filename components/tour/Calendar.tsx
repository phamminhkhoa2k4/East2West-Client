"use client";

import React, { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Event {
  name: string;
  time: string;
}

interface Events {
  [key: string]: Event[];
}

const Calendar: React.FC = () => {
  const initialEvents: Events = {
    "2024-12-01": [{ name: "Redesign Website", time: "1 Dec - 3 Dec" }],
    "2024-12-25": [{ name: "App Design", time: "25 Dec - 27 Dec" }],
  };

  const [events, setEvents] = useState<Events>(initialEvents);

  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const goToPreviousYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() - 1, currentDate.getMonth())
    );
  };

  const goToNextYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + 1, currentDate.getMonth())
    );
  };

  const renderEvents = (date: string) => {
    if (events[date]) {
      return events[date].map((event, index) => (
        <div
          key={index}
          className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-r-[5px] border-l-[3px] border-primary bg-gray-2 px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100  md:visible md:w-[190%] md:opacity-100"
        >
          <span className="event-name font-medium text-dark">{event.name}</span>
          <span className="time text-sm">{event.time}</span>
        </div>
      ));
    }
    return null;
  };

  const renderDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonthDays = getDaysInMonth(year, month - 1);

    for (let i = firstDay - 1; i >= 0; i--) {
      const dateString = `${year}-${month.toString().padStart(2, "0")}-${(
        prevMonthDays - i
      )
        .toString()
        .padStart(2, "0")}`;
      days.push(
        <td
          key={`prev-${i}`}
          className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 bg-gray-200  md:h-25 md:p-6 xl:h-31"
        >
          <span className="font-medium text-gray-500 ">
            {prevMonthDays - i}
          </span>
          {renderEvents(dateString)}
        </td>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateString = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      days.push(
        <td
          key={day}
          className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray-2  md:h-25 md:p-6 xl:h-31"
        >
          <span className="font-medium text-dark ">{day}</span>
          <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
            <span className="group-hover:text-primary md:hidden">More</span>
            {renderEvents(dateString)}
          </div>
        </td>
      );
    }

    const lastDay = new Date(year, month + 1, 0).getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      const dateString = `${year}-${(month + 2).toString().padStart(2, "0")}-${i
        .toString()
        .padStart(2, "0")}`;
      days.push(
        <td
          key={`next-${i}`}
          className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 bg-gray-200  md:h-25 md:p-6 xl:h-31"
        >
          <span className="font-medium text-gray-500 ">{i}</span>
          {renderEvents(dateString)}
        </td>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-full rounded-[10px] bg-white shadow-1 ">
      <div className="flex items-center justify-between p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToPreviousMonth}
                className="p-2 border-none rounded"
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
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous Year</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToPreviousYear}
                className="p-2 border-none  rounded"
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
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Previous Month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <h2 className="text-lg font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToNextYear}
                className="p-2  border-none rounded"
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next Month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToNextMonth}
                className="p-2 border-none rounded"
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
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next Year</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 rounded-t-[10px] bg-primary text-white">
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day, index) => (
              <th
                key={index}
                className={`flex h-15 items-center justify-center ${
                  index === 0 ? "rounded-tl-[10px]" : ""
                } ${
                  index === 6 ? "rounded-tr-[10px]" : ""
                } p-1 text-body-xs font-medium sm:text-base xl:p-5`}
              >
                <span className="hidden lg:block">{day}</span>
                <span className="block lg:hidden">{day.slice(0, 3)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(() => {
            const days = renderDays();
            const rows = [];
            for (let i = 0; i < days.length; i += 7) {
              rows.push(
                <tr key={i} className="grid grid-cols-7">
                  {days.slice(i, i + 7)}
                </tr>
              );
            }
            return rows;
          })()}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
