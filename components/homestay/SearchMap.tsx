import React, { useState, useCallback, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";  
import { FaBuilding } from "react-icons/fa";   
import { useToast } from "@/components/ui/use-toast";   
import {getData} from  "@/utils/axios"                           

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


type Location = {
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
const Search: React.FC<{
  onSelect: (lat: number, lng: number) => void;
  setLocation: (value: Location) => void;
}> = ({ onSelect, setLocation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Item[]>([]);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [error, setError] = useState<{
    title: string;
    description: string;
    status: string;
  } | null>(null);
  const selectingRef = useRef(false);
  const { toast } = useToast();
  const APIKEY = process.env.NEXT_PUBLIC_HERE_API_KEY;

  useEffect(() => {
    if (error) {
      console.log("Attempting to show toast for error:", error);
      toast({
        title: error.title,
        description: error.description,
        status: error.status
      });
      setError(null);
    }
  }, [error, toast]);

  const getCurrentPosition = useCallback((): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error("User denied Geolocation"));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error("We could not find your location."));
                break;
              case error.TIMEOUT:
                reject(new Error("The request to get user location timed out"));
                break;
              default:
                reject(new Error("An unknown error occurred"));
                break;
            }
          }
        );
      }
    });
  }, []);

  const handleGetCurrentPosition = useCallback(() => {
    getCurrentPosition()
      .then((position) => {
        console.log("Position obtained:", position);
        // Xử lý vị trí nhận được ở đây
      })
      .catch((error) => {
        console.log("Error caught:", error.message);
        let title, description , status;

        if (error.message === "We could not find your location.") {
          title = error.message;
          description = "Vì vậy, xin vui lòng nhập địa chỉ của bạn.";
          status = "error";
        } else if (
          error.message === "The request to get user location timed out"
        ) {
          title = error.message;
          description = "Vì vậy, xin vui lòng thử lại";
          status = "error";

        } else if (error.message === "User denied Geolocation") {
          title = error.message;
          description =
            "Please enable location access in your browser settings to use this feature.";
          status = "error";

        } else {
          title = "An unknown error occurred";
          description = "Something went wrong, please try again.";
          status = "error";

        }

        setError({ title, description, status });
      });
  }, [getCurrentPosition]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (!query || selectingRef.current) return;

      try {
        const response: Response = await getData({
          endpoint: `https://geocode.search.hereapi.com/v1/geocode?q=${query}&in=countryCode:VNM&apiKey=${APIKEY}`,
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
    setQuery(query);
    selectingRef.current = false;
    fetchSuggestions(query);
  };

  const handleClickItem = (item: Item) => {
    setQuery(item.address.label ?? "");
    const { lat, lng } = item.position;
    const {
      label,
      countryCode,
      countryName,
      county,
      city,
      district,
      street,
      postalCode,
      houseNumber,
    } = item.address;

    setLocation({
      label,
      countryCode,
      countryName,
      county,
      city,
      district,
      street,
      postalCode,
      houseNumber}
    );
    onSelect(lat, lng);
    setSuggestions([]);
    selectingRef.current = true;
  };

  return (
    <div className="absolute left-0 right-0 top-5 flex items-center justify-center">
      <div className={` w-[566px]`} onClick={() => setIsOpenSearch(true)}>
        <div className="relative">
          <div
            className={`w-full h-full relative ${
              suggestions.length > 0 || isOpenSearch
                ? " rounded-t-2xl"
                : "rounded-2xl"
            }`}
          >
            <IoLocationOutline className="absolute top-[14px] left-5 w-6 h-6" />
            <input
              type="search"
              value={query}
              onChange={handleSearch}
              placeholder="Enter Your Address ..."
              className={`w-full h-full border-none outline-none p-4 pl-15 rounded-t-2xl ${
                suggestions.length > 0 || isOpenSearch
                  ? " rounded-t-2xl"
                  : "rounded-2xl"
              }`}
            />
          </div>
          {isOpenSearch && (
            <ul className="absolute top-[51px] left-0 right-0 bg-white p-4 px-10 rounded-b-2xl">
              {suggestions.length > 0 && (
                <>
                  {suggestions.map((suggestion, index) => (
                    <li
                      onClick={() => handleClickItem(suggestion)}
                      key={index}
                      className="py-2 px-1 border-b flex items-center gap-5"
                    >
                      <div className="bg-[#e0dcdc] flex items-center justify-center w-10 h-10 p-3 rounded-full border">
                        <FaBuilding className="h-6 w-6" />
                      </div>
                      {suggestion.address.label}
                    </li>
                  ))}
                </>
              )}
              <li
                className="py-2 px-1  flex items-center gap-5"
                onClick={handleGetCurrentPosition}
              >
                <div className="bg-[#e0dcdc] flex items-center justify-center w-10 h-10 p-3 rounded-full border">
                  <FaLocationArrow className="h-6 w-6" />
                </div>
                <span>Sử dụng vị trí hiện tại của tôi </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
