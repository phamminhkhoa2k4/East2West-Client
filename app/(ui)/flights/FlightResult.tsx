import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { FaRegDotCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoWarning } from "react-icons/io5";
import FlightDetail from "./FlightDetails";

type FlightResultType = {
  flights: FlightSearchResponse;
  isDetail: boolean;
  setIsDetail: (value : boolean) => void;
};


const FlightResult = ({ flights, isDetail, setIsDetail }: FlightResultType) => {
  const [airplane, setAirplane] = useState<FlightDetails | null>(null);
  console.log(flights);
  
  const convertDate = (dateStr: string): string => {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };
  function formatTime(dateStr: string): string {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleTimeString("en-US", options);
  }
  function formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours} hr ${remainingMinutes} min`;
  }

  useEffect(() => {
    setIsDetail(false);
  }, []);

  const handleDetail = (airplane: FlightDetails) => {
    if (flights) {
      setAirplane(airplane);
      setIsDetail(true);
    }
  };

  return (
    <>
      {isDetail && <FlightDetail airplane={airplane!} />}
      {!isDetail && flights?.best_flights?.[0].type === "One way" && (
        <div className="mt-20 mx-40">
          <div className="text-xl font-semibold my-5">
            Best Departing Flights
          </div>
          <div className="flex flex-col gap-5">
            {flights?.best_flights?.map((flight, index) => (
              <div key={index} className="border rounded-xl">
                <div className="border-b p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-20">
                    <div className="h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={flight.airline_logo!}
                        alt=""
                        height={400}
                        width={400}
                        className="object-center object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">Departure</div>
                      <GoDotFill />
                      <div className="text-lg font-semibold">
                        {convertDate(
                          flight.flights?.[0].departure_airport?.time!
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-15">
                    {flight.flights?.[0].airline != "Vietravel Airlines" && (
                      <div className="flex  flex-col gap-1 ">
                        <div className="text-lg font-medium">
                          {flight.carbon_emissions?.this_flight! / 1000} kg{" "}
                          <span className="text-xl">
                            Co<sub>2</sub>
                          </span>
                        </div>
                        {Number(flight.carbon_emissions?.difference_percent) >
                        0 ? (
                          <div className="text-[#666]">
                            {`${
                              flight.carbon_emissions?.difference_percent !=
                              undefined
                                ? flight.carbon_emissions?.difference_percent
                                : 0
                            }`}
                            % emissions
                          </div>
                        ) : (
                          <div className="text-green-500">
                            {`${
                              flight.carbon_emissions?.difference_percent !=
                              undefined
                                ? flight.carbon_emissions?.difference_percent
                                : 0
                            }`}
                            % emissions
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => handleDetail(flight)}
                      className="border rounded-xl px-5 py-2 bg-blue-500 text-lg font-bold text-white"
                    >
                      Select flight
                    </button>
                    <div className="flex-col flex gap-1">
                      <div className="text-lg font-bold">${flight.price}</div>
                      <div className="text-[#666]">{flight.type}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-6 p-6">
                  <div className=" flex flex-col">
                    <div className="flex items-center gap-20">
                      <div className="h-20 w-20 rounded-lg overflow-hidden">
                        <Image
                          src={flight.flights?.[0].airline_logo!}
                          alt=""
                          height={300}
                          width={300}
                          className="object-center object-cover w-full h-full"
                        />
                      </div>
                      <div className=" ">
                        <ol className="relative  border-dashed border-s-2 border-gray-200 pt-2">
                          <li className="mb-5 ms-6  flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="pl-5 font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].departure_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].departure_airport?.name} (
                                {flight.flights?.[0].departure_airport?.id!})
                              </div>
                            </div>
                          </li>
                          <li className="mb-5 ms-6">
                            <p className="pl-5 text-sm text-[#666]">
                              Travel Time:{" "}
                              {formatMinutes(
                                Number(flight.flights?.[0].duration!)
                              )}{" "}
                            </p>
                          </li>
                          <li className="pl-5 mb-5 ms-6 flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].arrival_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].arrival_airport?.name} (
                                {flight.flights?.[0].arrival_airport?.id!})
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="flex pl-12 items-center gap-20">
                      <div className="w-20"></div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].travel_class!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airplane}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline}
                          </div>
                        </div>
                        {flight.flights?.[0].often_delayed_by_over_30_min! && (
                          <div className="text-red-500 text-sm ">
                            Often delay by 30+ min
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col mt-3 gap-3">
                      {flight.flights?.[0].extensions?.map(
                        (extension, index) => (
                          <div key={index} className="text-sm text-[#666]">
                            {extension}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xl font-semibold my-5">
            Other Departing Flights
          </div>
          <div className="flex flex-col gap-5">
            {flights?.other_flights?.map((flight, index) => (
              <div key={index} className="border rounded-xl">
                <div className="border-b p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-20">
                    <div className="h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={flight.airline_logo!}
                        alt=""
                        height={400}
                        width={400}
                        className="object-center object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">Departure</div>
                      <GoDotFill />
                      <div className="text-lg font-semibold">
                        {convertDate(
                          flight.flights?.[0].departure_airport?.time!
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-15">
                    {flight.flights?.[0].airline != "Vietravel Airlines" && (
                      <div className="flex  flex-col gap-1 ">
                        <div className="text-lg font-medium">
                          {flight.carbon_emissions?.this_flight! / 1000} kg{" "}
                          <span className="text-xl">
                            Co<sub>2</sub>
                          </span>
                        </div>
                        {Number(flight.carbon_emissions?.difference_percent) >
                        0 ? (
                          <div className="text-[#666]">
                            {`${
                              flight.carbon_emissions?.difference_percent !=
                              undefined
                                ? flight.carbon_emissions?.difference_percent
                                : 0
                            }`}
                            % emissions
                          </div>
                        ) : (
                          <div className="text-green-500">
                            {`${
                              flight.carbon_emissions?.difference_percent !=
                              undefined
                                ? flight.carbon_emissions?.difference_percent
                                : 0
                            }`}
                            % emissions
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => handleDetail(flight)}
                      className="border rounded-xl px-5 py-2 bg-blue-500 text-lg font-bold text-white"
                    >
                      Select flight
                    </button>
                    <div className="flex-col flex gap-1">
                      <div className="text-lg font-bold">${flight.price}</div>
                      <div className="text-[#666]">{flight.type}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-6 p-6">
                  <div className=" flex flex-col">
                    <div className="flex items-center gap-20">
                      <div className="h-20 w-20 rounded-lg overflow-hidden">
                        <Image
                          src={flight.flights?.[0].airline_logo!}
                          alt=""
                          height={300}
                          width={300}
                          className="object-center object-cover w-full h-full"
                        />
                      </div>
                      <div className=" ">
                        <ol className="relative  border-dashed border-s-2 border-gray-200 pt-2">
                          <li className="mb-5 ms-6  flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="pl-5 font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].departure_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].departure_airport?.name} (
                                {flight.flights?.[0].departure_airport?.id!})
                              </div>
                            </div>
                          </li>
                          <li className="mb-5 ms-6">
                            <p className="pl-5 text-sm text-[#666]">
                              Travel Time:{" "}
                              {formatMinutes(
                                Number(flight.flights?.[0].duration!)
                              )}{" "}
                            </p>
                          </li>
                          <li className="pl-5 mb-5 ms-6 flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].arrival_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].arrival_airport?.name} (
                                {flight.flights?.[0].arrival_airport?.id!})
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="flex pl-12 items-center gap-20">
                      <div className="w-20"></div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].travel_class!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airplane}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline}
                          </div>
                        </div>
                        {flight.flights?.[0].often_delayed_by_over_30_min! && (
                          <div className="text-red-500 text-sm ">
                            Often delay by 30+ min
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col mt-3 gap-3">
                      {flight.flights?.[0].extensions?.map(
                        (extension, index) => (
                          <div key={index} className="text-sm text-[#666]">
                            {extension}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isDetail && flights?.best_flights?.[0].type === "Round trip" && (
        <div className="mt-20 mx-40">
          <div className="text-xl font-semibold my-5">
            Best Departing Flights
          </div>
          <div className="flex flex-col gap-5">
            {flights?.best_flights?.map((flight, index) => (
              <div key={index} className="border rounded-xl">
                <div className="border-b p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-20">
                    <div className="h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={flight.airline_logo!}
                        alt=""
                        height={400}
                        width={400}
                        className="object-center object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">Departure</div>
                      <GoDotFill />
                      <div className="text-lg font-semibold">
                        {convertDate(
                          flight.flights?.[0].departure_airport?.time!
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-15">
                    {flight.flights?.[0].airline != "Vietravel Airlines" && (
                      <div className="flex  flex-col gap-1 ">
                        <div className="text-lg font-medium">
                          {flight.carbon_emissions?.this_flight! / 1000} kg{" "}
                          <span className="text-xl">
                            Co<sub>2</sub>
                          </span>
                        </div>
                        {Number(flight.carbon_emissions?.difference_percent) >
                        0 ? (
                          <div className="text-[#666]">
                            {`${
                              flight.carbon_emissions?.difference_percent !=
                              undefined
                                ? flight.carbon_emissions?.difference_percent
                                : 0
                            }`}
                            % emissions
                          </div>
                        ) : (
                          <div className="text-green-500">
                            {`${
                              flight.carbon_emissions?.difference_percent !=
                              undefined
                                ? flight.carbon_emissions?.difference_percent
                                : 0
                            }`}
                            % emissions
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => handleDetail(flight)}
                      className="border rounded-xl px-5 py-2 bg-blue-500 text-lg font-bold text-white"
                    >
                      Select flight
                    </button>
                    <div className="flex-col flex gap-1">
                      <div className="text-lg font-bold">${flight.price}</div>
                      <div className="text-[#666]">{flight.type}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-6 p-6">
                  <div className=" flex flex-col">
                    <div className="flex items-center gap-20">
                      <div className="h-20 w-20 rounded-lg overflow-hidden">
                        <Image
                          src={flight.flights?.[0].airline_logo!}
                          alt=""
                          height={300}
                          width={300}
                          className="object-center object-cover w-full h-full"
                        />
                      </div>
                      <div className=" ">
                        <ol className="relative  border-dashed border-s-2 border-gray-200 pt-2">
                          <li className="mb-5 ms-6  flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="pl-5 font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].departure_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].departure_airport?.name} (
                                {flight.flights?.[0].departure_airport?.id!})
                              </div>
                            </div>
                          </li>
                          <li className="mb-5 ms-6">
                            <p className="pl-5 text-sm text-[#666]">
                              Travel Time:{" "}
                              {formatMinutes(
                                Number(flight.flights?.[0].duration!)
                              )}{" "}
                            </p>
                          </li>
                          <li className="pl-5 mb-5 ms-6 flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].arrival_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].arrival_airport?.name} (
                                {flight.flights?.[0].arrival_airport?.id!})
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="flex pl-12 items-center gap-20">
                      <div className="w-20"></div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].travel_class!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airplane}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline}
                          </div>
                        </div>
                        {flight.flights?.[0].often_delayed_by_over_30_min! && (
                          <div className="text-red-500 text-sm ">
                            Often delay by 30+ min
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col mt-3 gap-3">
                      {flight.flights?.[0].extensions?.map(
                        (extension, index) => (
                          <div key={index} className="text-sm text-[#666]">
                            {extension}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xl font-semibold my-5">
            Other Departing Flights
          </div>
          <div className="flex flex-col gap-5">
            {flights?.other_flights?.map((flight, index) => (
              <div key={index} className="border rounded-xl">
                <div className="border-b p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-20">
                    <div className="h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={flight.airline_logo!}
                        alt=""
                        height={400}
                        width={400}
                        className="object-center object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">Departure</div>
                      <GoDotFill />
                      <div className="text-lg font-semibold">
                        {convertDate(
                          flight.flights?.[0].departure_airport?.time!
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-15">
                    {flight.flights?.[0].airline != "Vietravel Airlines" && (
                      <div className="flex  flex-col gap-1 ">
                        <div className="text-lg font-medium">
                          {flight.carbon_emissions?.this_flight! / 1000} kg{" "}
                          <span className="text-xl">
                            Co<sub>2</sub>
                          </span>
                        </div>
                        {Number(flight.carbon_emissions?.difference_percent) >
                        0 ? (
                          <div className="text-[#666]">
                            {`${
                              flight.carbon_emissions?.difference_percent !=
                              undefined
                                ? flight.carbon_emissions?.difference_percent
                                : 0
                            }`}
                            % emissions
                          </div>
                        ) : (
                          <div className="text-green-500">
                            {`${
                              flight.carbon_emissions?.difference_percent !=
                              undefined
                                ? flight.carbon_emissions?.difference_percent
                                : 0
                            }`}
                            % emissions
                          </div>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => handleDetail(flight)}
                      className="border rounded-xl px-5 py-2 bg-blue-500 text-lg font-bold text-white"
                    >
                      Select flight
                    </button>
                    <div className="flex-col flex gap-1">
                      <div className="text-lg font-bold">${flight.price}</div>
                      <div className="text-[#666]">{flight.type}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-6 p-6">
                  <div className=" flex flex-col">
                    <div className="flex items-center gap-20">
                      <div className="h-20 w-20 rounded-lg overflow-hidden">
                        <Image
                          src={flight.flights?.[0].airline_logo!}
                          alt=""
                          height={300}
                          width={300}
                          className="object-center object-cover w-full h-full"
                        />
                      </div>
                      <div className=" ">
                        <ol className="relative  border-dashed border-s-2 border-gray-200 pt-2">
                          <li className="mb-5 ms-6  flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="pl-5 font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].departure_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].departure_airport?.name} (
                                {flight.flights?.[0].departure_airport?.id!})
                              </div>
                            </div>
                          </li>
                          <li className="mb-5 ms-6">
                            <p className="pl-5 text-sm text-[#666]">
                              Travel Time:{" "}
                              {formatMinutes(
                                Number(flight.flights?.[0].duration!)
                              )}{" "}
                            </p>
                          </li>
                          <li className="pl-5 mb-5 ms-6 flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].arrival_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].arrival_airport?.name} (
                                {flight.flights?.[0].arrival_airport?.id!})
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="flex pl-12 items-center gap-20">
                      <div className="w-20"></div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].travel_class!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airplane}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline}
                          </div>
                        </div>
                        {flight.flights?.[0].often_delayed_by_over_30_min! && (
                          <div className="text-red-500 text-sm ">
                            Often delay by 30+ min
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col mt-3 gap-3">
                      {flight.flights?.[0].extensions?.map(
                        (extension, index) => (
                          <div key={index} className="text-sm text-[#666]">
                            {extension}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isDetail && flights?.best_flights?.[0].type === "Multi-city" && (
        <div className="mt-20 mx-40">
          <div className="text-xl font-semibold my-5">
            Best Departing Flights
          </div>
          <div className="flex flex-col gap-5">
            {flights?.best_flights?.map((flight, index) => (
              <div key={index} className="border rounded-xl">
                <div className="border-b p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-20">
                    <div className="h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={flight.airline_logo!}
                        alt=""
                        height={400}
                        width={400}
                        className="object-center object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">Departure</div>
                      <GoDotFill />
                      <div className="text-lg font-semibold">
                        {convertDate(
                          flight.flights?.[0].departure_airport?.time!
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-15">
                    <div className="flex  flex-col gap-1 ">
                      <div className="text-lg font-medium">
                        {flight.carbon_emissions?.this_flight! / 1000} kg{" "}
                        <span className="text-xl">
                          Co<sub>2</sub>
                        </span>
                      </div>
                      <div className="text-[#666]">
                        {`+${flight.carbon_emissions?.difference_percent}`}%
                        emissions
                      </div>
                    </div>
                    <button
                      onClick={() => handleDetail(flight)}
                      className="border rounded-xl px-5 py-2 bg-blue-500 text-lg font-bold text-white"
                    >
                      Select flight
                    </button>
                    <div className="flex-col flex gap-1">
                      <div className="text-lg font-bold">${flight.price}</div>
                      <div className="text-[#666]">{flight.type}</div>
                    </div>
                  </div>
                </div>
                <div>
                  {flight.flights?.map((aircraft, index) => (
                    <div key={index}>
                      <div className="flex justify-between px-6 p-6">
                        <div className=" flex flex-col">
                          <div className="flex items-center gap-20">
                            <div className="h-20 w-20 rounded-lg overflow-hidden">
                              <Image
                                src={aircraft.airline_logo!}
                                alt=""
                                height={300}
                                width={300}
                                className="object-center object-cover w-full h-full"
                              />
                            </div>
                            <div className=" ">
                              <ol className="relative  border-dashed border-s-2 border-gray-200 pt-2">
                                <li className="mb-5 ms-6  flex items-center">
                                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                                    <FaRegDotCircle />
                                  </span>
                                  <div className="pl-5 font-bold flex items-center gap-3">
                                    <div>
                                      {formatTime(
                                        aircraft.departure_airport?.time!
                                      )}
                                    </div>
                                    <GoDotFill />
                                    <div>
                                      {aircraft.departure_airport?.name} (
                                      {aircraft.departure_airport?.id!})
                                    </div>
                                  </div>
                                </li>
                                <li className="mb-5 ms-6">
                                  <div className="flex items-center gap-5">
                                    <p className="pl-5 text-sm text-[#666]">
                                      Travel Time:{" "}
                                      {formatMinutes(
                                        Number(aircraft.duration!)
                                      )}{" "}
                                    </p>
                                    {aircraft.overnight && (
                                      <>
                                        <GoDotFill className="h-2 w-2" />
                                        <div className="flex items-center gap-2">
                                          <p className=" font-medium text-sm text-red-500">
                                            Overnight
                                          </p>
                                          <IoWarning className="w-5 h-5 text-red-500" />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </li>
                                <li className="pl-5 mb-5 ms-6 flex items-center">
                                  <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                                    <FaRegDotCircle />
                                  </span>
                                  <div className="font-bold flex items-center gap-3">
                                    <div>
                                      {formatTime(
                                        aircraft?.arrival_airport?.time!
                                      )}
                                    </div>
                                    <GoDotFill />
                                    <div>
                                      {aircraft?.arrival_airport?.name} (
                                      {aircraft?.arrival_airport?.id!})
                                    </div>
                                  </div>
                                </li>
                              </ol>
                            </div>
                          </div>
                          <div className="flex pl-12 items-center gap-20">
                            <div className="w-20"></div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <div className="text-sm text-[#666]">
                                  {aircraft?.airline!}
                                </div>
                                <GoDotFill className="h-2 w-2" />
                                <div className="text-sm text-[#666]">
                                  {aircraft?.travel_class!}
                                </div>
                                <GoDotFill className="h-2 w-2" />
                                <div className="text-sm text-[#666]">
                                  {aircraft?.airplane}
                                </div>
                                <GoDotFill className="h-2 w-2" />
                                <div className="text-sm text-[#666]">
                                  {aircraft?.airline}
                                </div>
                              </div>
                              {aircraft?.often_delayed_by_over_30_min! && (
                                <div className="text-red-500 text-sm ">
                                  Often delay by 30+ min
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-col mt-3 gap-3">
                            {aircraft?.extensions?.map((extension, index) => (
                              <div key={index} className="text-sm text-[#666]">
                                {extension}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {flight?.layovers?.length! - 1 === index && (
                        <div className="justify-between flex items-center gap-20 ">
                          <div className="w-20"></div>
                          <div className="ml-5 flex items-center gap-2 w-full border-y py-3">
                            <div className="text-sm text-[#666]">
                              {`${formatMinutes(
                                Number(flight?.layovers?.[index]?.duration!)
                              )} layover`}
                            </div>
                            <GoDotFill className="h-2 w-2" />
                            <div className="text-sm text-[#666]">
                              {flight.layovers?.[index]?.name!} (
                              {flight.layovers?.[index]?.id!})
                            </div>
                            {flight.layovers?.[index]?.overnight! && (
                              <>
                                <GoDotFill className="h-2 w-2" />
                                <div className="flex items-center gap-2">
                                  <p className=" font-medium text-sm text-red-500">
                                    Overnight layover
                                  </p>
                                  <IoWarning className="w-5 h-5 text-red-500" />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="justify-between flex items-center gap-20 ">
                    <div className="w-20"></div>
                    <div className="flex items-center gap-2 w-full border-t py-3">
                      <div className="justify-between flex items-center gap-20 ">
                        <div className="w-20"></div>
                        <div className="flex items-center gap-2 w-full  py-3">
                          <div className="flex items-center gap-3">
                            {flight.extensions?.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div className="text-sm text-[#666]">
                                  {item}
                                </div>
                                {flight?.extensions?.length! > index + 1 && (
                                  <GoDotFill className="h-2 w-2" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {flight.layovers?.[index]?.overnight! && (
                        <>
                          <GoDotFill className="h-2 w-2" />
                          <div className="flex items-center gap-2">
                            <p className=" font-medium text-sm text-red-500">
                              Overnight layover
                            </p>
                            <IoWarning className="w-5 h-5 text-red-500" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xl font-semibold my-5">
            Other Departing Flights
          </div>
          <div className="flex flex-col gap-5">
            {flights?.other_flights?.map((flight, index) => (
              <div key={index} className="border rounded-xl">
                <div className="border-b p-4 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-20">
                    <div className="h-20 w-20 rounded-lg overflow-hidden">
                      <Image
                        src={flight.airline_logo!}
                        alt=""
                        height={400}
                        width={400}
                        className="object-center object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">Departure</div>
                      <GoDotFill />
                      <div className="text-lg font-semibold">
                        {convertDate(
                          flight.flights?.[0].departure_airport?.time!
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-15">
                    <div className="flex  flex-col gap-1 ">
                      <div className="text-lg font-medium">
                        {flight.carbon_emissions?.this_flight! / 1000} kg{" "}
                        <span className="text-xl">
                          Co<sub>2</sub>
                        </span>
                      </div>
                      <div className="text-[#666]">
                        {`+${flight.carbon_emissions?.difference_percent}`}%
                        emissions
                      </div>
                    </div>
                    <button
                      onClick={() => handleDetail(flight)}
                      className="border rounded-xl px-5 py-2 bg-blue-500 text-lg font-bold text-white"
                    >
                      Select flight
                    </button>
                    <div className="flex-col flex gap-1">
                      <div className="text-lg font-bold">${flight.price}</div>
                      <div className="text-[#666]">{flight.type}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between px-6 p-6">
                  <div className=" flex flex-col">
                    <div className="flex items-center gap-20">
                      <div className="h-20 w-20 rounded-lg overflow-hidden">
                        <Image
                          src={flight.flights?.[0].airline_logo!}
                          alt=""
                          height={300}
                          width={300}
                          className="object-center object-cover w-full h-full"
                        />
                      </div>
                      <div className=" ">
                        <ol className="relative  border-dashed border-s-2 border-gray-200 pt-2">
                          <li className="mb-5 ms-6  flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="pl-5 font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].departure_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].departure_airport?.name} (
                                {flight.flights?.[0].departure_airport?.id!})
                              </div>
                            </div>
                          </li>
                          <li className="mb-5 ms-6">
                            <p className="pl-5 text-sm text-[#666]">
                              Travel Time:{" "}
                              {formatMinutes(
                                Number(flight.flights?.[0].duration!)
                              )}{" "}
                            </p>
                          </li>
                          <li className="pl-5 mb-5 ms-6 flex items-center">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full -start-4 ring-4 ring-white ">
                              <FaRegDotCircle />
                            </span>
                            <div className="font-bold flex items-center gap-3">
                              <div>
                                {formatTime(
                                  flight.flights?.[0].arrival_airport?.time!
                                )}
                              </div>
                              <GoDotFill />
                              <div>
                                {flight.flights?.[0].arrival_airport?.name} (
                                {flight.flights?.[0].arrival_airport?.id!})
                              </div>
                            </div>
                          </li>
                        </ol>
                      </div>
                    </div>
                    <div className="flex pl-12 items-center gap-20">
                      <div className="w-20"></div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].travel_class!}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airplane}
                          </div>
                          <GoDotFill className="h-2 w-2" />
                          <div className="text-sm text-[#666]">
                            {flight.flights?.[0].airline}
                          </div>
                        </div>
                        {flight.flights?.[0].often_delayed_by_over_30_min! && (
                          <div className="text-red-500 text-sm ">
                            Often delay by 30+ min
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col mt-3 gap-3">
                      {flight.flights?.[0].extensions?.map(
                        (extension, index) => (
                          <div key={index} className="text-sm text-[#666]">
                            {extension}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FlightResult;