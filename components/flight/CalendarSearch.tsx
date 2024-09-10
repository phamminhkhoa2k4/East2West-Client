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

type CalendarProps = {
  setDateStart: (value: string | null) => void;
  setDateReturn: (value: string | null) => void;
  dateStart: string | null;
  dateReturn: string | null;
};

const CalendarSearch = ({
  setDateStart,
  setDateReturn,
  dateStart,
  dateReturn,
}: CalendarProps) => {
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

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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

  const handleDayClick = (date: string) => {
    const [day, month, year] = date.split("/").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();

    if (selectedDate.getTime() < today.setHours(0, 0, 0, 0)) {
      return;
    }

    if (!dateStart) {
      setDateStart(date);
    } else if (!dateReturn && date > dateStart) {
      setDateReturn(date);
    } else {
      setDateStart(date);
      setDateReturn(null);
    }
  };

  const renderEvents = (date: string) => {
    if (events[date]) {
      return events[date].map((event, index) => (
        <div
          key={index}
          className="event invisible absolute left-1 z-99 mb-0.5 flex w-full flex-col rounded-r-[2.5px] border-l-[1.5px] border-primary bg-gray-2 px-1.5 py-0.5 text-left opacity-0 group-hover:visible group-hover:opacity-100  md:visible md:w-full md:opacity-100"
        >
          <span className="event-name font-medium text-dark text-xs">
            {event.name}
          </span>
          <span className="time text-[10px]">{event.time}</span>
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

    const today = new Date();
    const todayString = formatDate(today);

    for (let i = firstDay - 1; i >= 0; i--) {
      const dateString = formatDate(
        new Date(year, month - 1, prevMonthDays - i)
      );
      days.push(
        <td
          key={`prev-${i}`}
          className="ease relative h-10 cursor-pointer border border-stroke p-1 transition duration-500 bg-gray-200 md:h-12 xl:h-15"
          onClick={() => handleDayClick(dateString)}
        >
          <span className="font-medium text-gray-500 text-xs">
            {prevMonthDays - i}
          </span>
          {renderEvents(dateString)}
        </td>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateString = formatDate(new Date(year, month, day));
      days.push(
        <td
          key={day}
          className={`ease relative h-10 cursor-pointer border border-stroke p-1 transition duration-500 ${
            (dateStart && dateStart === dateString) ||
            (dateReturn &&
              dateStart &&
              dateString >= dateStart &&
              dateString <= dateReturn)
              ? "bg-blue-200"
              : "hover:bg-gray-2"
          } md:h-12 xl:h-15`}
          onClick={() => handleDayClick(dateString)}
        >
          <span
            className={`font-medium text-xs ${
              (dateStart && dateStart === dateString) ||
              (dateReturn && dateReturn === dateString)
                ? "text-blue-500 "
                : dateString === todayString
                ? "text-white bg-blue-500 p-2 rounded-full"
                : "text-dark"
            }`}
          >
            {day}
          </span>
          <div className="group h-8 w-full flex-grow cursor-pointer py-0.5 md:h-15">
            <span className="group-hover:text-primary md:hidden text-xs">
              More
            </span>
            {renderEvents(dateString)}
          </div>
        </td>
      );
    }

    const lastDay = new Date(year, month + 1, 0).getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      const dateString = formatDate(new Date(year, month + 1, i));
      days.push(
        <td
          key={`next-${i}`}
          className="ease relative h-10 cursor-pointer border border-stroke p-1 transition duration-500 bg-gray-200 md:h-12 xl:h-15"
          onClick={() => handleDayClick(dateString)}
        >
          <span className="font-medium text-gray-500 text-xs">{i}</span>
          {renderEvents(dateString)}
        </td>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-full rounded-[5px] bg-white shadow-1 transform scale-70">
      <div className="flex items-center justify-between p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToPreviousMonth}
                className="p-1 border-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-3"
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
              <p className="text-xs">Previous Year</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToPreviousYear}
                className="p-1 border-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-3"
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
              <p className="text-xs">Previous Month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <h2 className="text-sm font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToNextYear}
                className="p-1 border-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-3"
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
              <p className="text-xs">Next Month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToNextMonth}
                className="p-1 border-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-3"
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
              <p className="text-xs">Next Year</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 rounded-t-[5px] bg-primary text-white">
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
                className={`flex h-7.5 items-center justify-center ${
                  index === 0 ? "rounded-tl-[5px]" : ""
                } ${
                  index === 6 ? "rounded-tr-[5px]" : ""
                } p-0.5 text-[10px] font-medium sm:text-xs xl:p-2.5`}
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

export default CalendarSearch;
