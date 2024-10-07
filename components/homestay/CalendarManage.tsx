import React, { useState, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HomestayAvailability {
  homestayavailabilityid: number;
  date: string;
  pricepernight: number;
  status: string;
}

type CalendarProps = {
  availability: HomestayAvailability[];
};

const CalendarManage = ({ availability }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const availabilityMap = useMemo(() => {
    const map = new Map<string, HomestayAvailability>();
    availability.forEach((item) => {
      // Convert UTC date to local date string
      const localDate = new Date(item.date);
      const dateString = localDate.toISOString().split("T")[0];
      map.set(dateString, item);
    });
    return map;
  }, [availability]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
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

 const renderDays = () => {
   const days = [];
   const year = currentDate.getFullYear();
   const month = currentDate.getMonth();
   const totalDays = getDaysInMonth(year, month);
   const firstDay = getFirstDayOfMonth(year, month);

   const prevMonthDays = getDaysInMonth(year, month - 1);

   const today = new Date();
   const todayString = formatDate(today);

   // Previous month days
   for (let i = firstDay - 1; i >= 0; i--) {
     const date = new Date(year, month - 1, prevMonthDays - i);
     days.push(
       <td
         key={`prev-${i}`}
         className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 bg-gray-200 md:h-25 md:p-6 xl:h-31"
       >
         <span className="font-medium text-gray-500">{prevMonthDays - i}</span>
       </td>
     );
   }

   // Current month days
   for (let day = 1; day <= totalDays; day++) {
     const date = new Date(year, month, day);
     const dateString = formatDate(date);
     const availabilityInfo = availabilityMap.get(dateString);

     const isPastDate = date < today;
     let statusClass = isPastDate ? "bg-[#ebebeb]" : "bg-[#ebebeb]";
     let statusText = "";
     let priceText = "";
     let classDay = ""

     if (availabilityInfo) {
       switch (availabilityInfo.status) {
         case "Available":
           statusClass = isPastDate ? "bg-[#ebebeb]" : "";
          //  statusText =  "Available";
           priceText = `$${availabilityInfo.pricepernight}`;
           break;
         case "Booked":
           statusClass = isPastDate ? "bg-[#ebebeb]" : "";
           classDay = "line-through";
          //  statusText =  "Booked";
           priceText = `$${availabilityInfo.pricepernight}`;
           break;
       }
     }

     days.push(
       <td
         key={day}
         className={`ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 md:h-25 md:p-6 xl:h-31 ${statusClass}`}
       >
         <div className="flex flex-col h-full justify-between">
           <span
             className={`font-medium ${classDay} ${
               dateString === todayString
                 ? "text-white flex items-center justify-center bg-blue-500 p-1 w-7 rounded-full"
                 : "text-dark"
             }`}
           >
             {day}
           </span>
           <div className="text-xs mt-1">
             <div>{statusText}</div>
             {priceText && <div className="font-semibold">{priceText}</div>}
           </div>
         </div>
       </td>
     );
   }

   // Next month days
   const lastDay = new Date(year, month + 1, 0).getDay();
   for (let i = 1; i < 7 - lastDay; i++) {
     days.push(
       <td
         key={`next-${i}`}
         className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 bg-gray-200 md:h-25 md:p-6 xl:h-31"
       >
         <span className="font-medium text-gray-500">{i}</span>
       </td>
     );
   }

   return days;
 };


  return (
    <div className="w-full max-w-full rounded-[10px] bg-white shadow-1">
      <div className="flex items-center justify-between p-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={goToPreviousYear}
                className="p-2 border-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                onClick={goToPreviousMonth}
                className="p-2 border-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                onClick={goToNextMonth}
                className="p-2 border-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                onClick={goToNextYear}
                className="p-2 border-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <th
                  key={index}
                  className="flex h-15 items-center justify-center p-1 text-xs font-medium sm:text-sm xl:p-5"
                >
                  {day}
                </th>
              )
            )}
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

export default CalendarManage;
