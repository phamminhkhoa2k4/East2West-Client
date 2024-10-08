import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Area from "./Area";
import Guest from "./Guest";
import Calendar from "./Calendar";
import { useEffect, useRef, useCallback, useState } from "react";
import ResultSearchPlace from "./ResultSearchPlace";
import debounce from "lodash.debounce";
import { getData } from "@/utils/axios";
import { format } from "date-fns";
// import { useSearchHomestayContext } from "@/store/HomestaySearchContext";
import { useHomestaysContext } from "@/store/HomestaysContext";
import { useSearchHomestayContext } from "@/store/HomestaySearchContext";
type SearchProps = {
  isScroll:boolean
}

type Coordinates = {
  lat: number;
  lng: number;
};

type MapView = {
  west: number;
  south: number;
  east: number;
  north: number;
};

type FieldScore = {
  country: number;
};

type Scoring = {
  queryScore: number;
  fieldScore: FieldScore;
};

type Address = {
  label: string | null;
  countryCode: string | null;
  countryName: string | null;
  county: string | null;
  city: string | null;
  district: string | null;
  street: string | null;
  postalCode: string | null;
  houseNumber: string | null;
};

type AdministrativeAreaType = "country" | "state" | "county" | "city";

type Item = {
  title: string;
  id: string;
  resultType: string;
  administrativeAreaType: AdministrativeAreaType;
  address: Address;
  position: Coordinates;
  mapView: MapView;
  scoring: Scoring;
};

type Response = {
  items: Item[];
};



export default function Search({isScroll}: SearchProps) {
  const { searchHomestay, setSearchHomestay } = useSearchHomestayContext();
  const [place, setPlace] = useState<string>("");
  const [isOpenPlace, setIsOpenPlace] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectingRef = useRef(false);
  const APIKEY = process.env.NEXT_PUBLIC_HERE_API_KEY;
  const PlaceRef = useRef<HTMLDivElement>(null);
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Item[]>([]);
  const [countAdult, setCountAdult] = useState<number>(0);
  const [countChildren, setCountChildren] = useState<number>(0);
  const [countInfant, setCountInfant] = useState<number>(0);
  const [position, setPosition] = useState <Coordinates| null>(null);
  const [radius, setRadius] = useState<number>(10000);
  const {setHomestaysContext, setIs} = useHomestaysContext();
  const handlePopoverTriggerClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
    setSearchHomestay({
      checkInDate,
      checkOutDate,
      latitude: position?.lat,
      longitude: position?.lng,
      guests: countAdult + countChildren,
      radius: radius,
    });
  }, [
    checkInDate,
    checkOutDate,
    position,
    countAdult,
    countChildren,
    radius,
    setSearchHomestay,
  ]);

  const parseDateString = (dateString : string) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); 
  };

const handleSubmitSearch = async () => {
  if (
    position != null &&
    radius > 0 &&
    checkInDate != null &&
    checkOutDate != null &&
    countAdult > 0
  ) {
    console.log("kaka");

    try {
      const formattedCheckInDate =
        checkInDate && !isNaN(new Date(parseDateString(checkInDate)).getTime())
          ? format(new Date(parseDateString(checkInDate)), "yyyy-MM-dd") // Định dạng chính xác là yyyy-MM-dd
          : "";
      const formattedCheckOutDate =
        checkOutDate &&
        !isNaN(new Date(parseDateString(checkOutDate)).getTime())
          ? format(new Date(parseDateString(checkOutDate)), "yyyy-MM-dd") // Định dạng chính xác là yyyy-MM-dd
          : "";

      const homestay = await getData({
        endpoint: `/homestays/search?longitude=${position?.lng}&latitude=${
          position?.lat
        }&radius=${radius}&checkin_date=${formattedCheckInDate}&checkout_date=${formattedCheckOutDate}&guests=${
          countAdult + countChildren
        }&status=available`,
      });
      setHomestaysContext(homestay);
      setIs(true);
    } catch (error) {
      console.log(error);
    }
  }
};



  const handleClickOutside = (event: MouseEvent) => {
    if (PlaceRef.current && !PlaceRef.current.contains(event.target as Node)) {
      setIsOpenPlace(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (!query || selectingRef.current) return;

      try {
        const response: Response = await getData({
          endpoint: `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${APIKEY}`,
        });

        const items = response.items || [];
        setSuggestions(items);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 500),
    [setSuggestions]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    selectingRef.current = false;
    setPlace(query);
    fetchSuggestions(query);
  };

  const handleClickItem = (item: Item) => {
    setPlace(item.address.label ?? "");
    const {lat,lng} = item.position;
    setPosition({lat,lng})
    setSuggestions([]);
    selectingRef.current = true;
  };
  return (
    <>
      <div
        className={`   ${
          isScroll ? "w-125 mb-5 h-12" : "w-230 h-18 "
        } transition-all duration-500 ease-in-out  border rounded-full bg-white flex shadow-md `}
      >
        <div className="w-2/6 h-full  rounded-l-full">
          <div
            onClick={() => {
              handlePopoverTriggerClick;
              setIsOpenPlace((is) => !is);
            }}
            className={`flex  flex-col px-8 py-3 relative ${
              isScroll ? "" : "border-red-200 border-r-2"
            }  cursor-pointer`}
          >
            <label htmlFor="place" className="text-left  font-bold text-[14px]">
              {isScroll ? "Any" : ""} Places
            </label>
            <input
              type="text"
              placeholder="Find a destination"
              className={` ${
                isScroll ? "opacity-0 hidden" : "opacity-100"
              } transition-all duration-1000 ease-in-out placeholder-gray-600::placeholder bg-transparent outline-none `}
              value={place}
              onChange={(e) => handleSearch(e)}
              ref={inputRef}
            />
            {suggestions.length > 0 && place.length > 0 && (
              <div className="absolute top-20 left-0">
                <ResultSearchPlace
                  suggestions={suggestions}
                  handleClickItem={handleClickItem}
                />
              </div>
            )}
            {place.length == 0 && isOpenPlace && (
              <div ref={PlaceRef} className="w-[400px] absolute top-20 left-0">
                <Area setPlace={setPlace} setPosition={setPosition} />
              </div>
            )}
          </div>
        </div>

        <Popover>
          <PopoverTrigger>
            <div
              className={`${
                isScroll
                  ? "w-[140px] flex justify-center border-red-200 border-x-2 "
                  : "w-[300px]"
              } transition-all duration-150 ease-in-out flex`}
            >
              <span
                className={`${
                  isScroll ? "visible" : "hidden"
                }  text-left font-bold text-[14px]`}
              >
                Any Week
              </span>
              <div
                className={`${
                  isScroll ? "opacity-0 hidden" : "opacity-100 "
                } w-1/2 h-full`}
              >
                <div className=" flex  flex-col px-8 py-3 border-red-200 border-r-2">
                  <span className="text-left font-bold text-[14px]">
                    Check In
                  </span>
                  <span className="text-left text-gray-600">
                    {checkInDate ? checkInDate : "Add Day"}
                  </span>
                </div>
              </div>
              <div
                className={`${
                  isScroll ? "opacity-0 hidden" : "opacity-100 "
                } w-1/2 h-full  `}
              >
                <div className=" flex  flex-col px-8 py-3 border-red-200 border-r-2">
                  <span className="text-left font-bold text-[14px]">
                    Check Out
                  </span>
                  <span className="text-left text-gray-600">
                    {checkOutDate ? checkOutDate : "Add Day"}
                  </span>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              setCheckOutDate={setCheckOutDate}
              setCheckInDate={setCheckInDate}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <div className="w-2/6 h-full  rounded-r-full">
            <PopoverTrigger>
              <div
                className={`flex gap-1 ${
                  isScroll
                    ? "w-[140px] items-center relative h-[47px]"
                    : "w-[300px] py-3"
                }    pl-8 pr-2`}
              >
                <div
                  className={`flex flex-col   w-4/5 ${
                    isScroll ? "" : "h-full"
                  }  `}
                >
                  <span className="font-bold text-[14px]">
                    {isScroll ? "Add" : ""} Guests
                  </span>
                  <span
                    className={` ${
                      isScroll ? "hidden" : ""
                    } text-gray-600 truncate w-30`}
                  >
                    {countAdult || countChildren || countInfant
                      ? `${
                          countAdult + countChildren > 0
                            ? `${countAdult + countChildren} Guests`
                            : ""
                        } , ${countInfant > 0 ? `${countInfant} Infant` : ""}`
                      : "Add Guest"}
                  </span>
                </div>
                <div
                  className={`flex items-center gap-5 justify-center ${
                    isScroll ? "p-1.5 absolute -right-11" : "w-full"
                  }  bg-slate-400 text-white  rounded-full`}
                >
                  <div>
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
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </div>
                  <span
                    className={`${isScroll ? "hidden" : ""}`}
                    onClick={() =>  {
                      console.log("asddfsdf");
                      
                      handleSubmitSearch();
                    }}
                  >
                    Search
                  </span>
                </div>
              </div>
            </PopoverTrigger>
          </div>
          <PopoverContent>
            <Guest
              countAdult={countAdult}
              countChildren={countChildren}
              countInfant={countInfant}
              setCountAdult={setCountAdult}
              setCountChildren={setCountChildren}
              setCountInfant={setCountInfant}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
