"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import SearchMap from "@/components/homestay/SearchMap";
import { getData, updateData } from "@/utils/axios";
import { toast, useToast } from "@/components/ui/use-toast";
import MapMove from "@/components/homestay/MapMove";
import { IoLocationOutline } from "react-icons/io5";
const Map = dynamic(() => import("@/components/homestay/Map"), {
  ssr: false,
});

const APIKEY = process.env.NEXT_PUBLIC_HERE_API_KEY;
interface HereMapProps {
  lat: number | undefined;
  lng: number | undefined;
  apiKey: string | undefined;
  zoom: number;
}

const HereMap: React.FC<HereMapProps> = ({ lat, lng, apiKey, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    if (!apiKey) {
      console.error("API key is missing");
      return;
    }

    const loadMap = async () => {
      if (!window.H) {
        const script = document.createElement("script");
        script.src = `https://js.api.here.com/v3/3.1/mapsjs-core.js`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          const script2 = document.createElement("script");
          script2.src = `https://js.api.here.com/v3/3.1/mapsjs-service.js`;
          script2.async = true;
          document.body.appendChild(script2);

          script2.onload = () => {
            const script3 = document.createElement("script");
            script3.src = `https://js.api.here.com/v3/3.1/mapsjs-mapevents.js`;
            script3.async = true;
            document.body.appendChild(script3);

            script3.onload = () => {
              initMap();
            };
          };
        };
      } else {
        initMap();
      }
    };

    const initMap = () => {
      if (!mapRef.current || map) return;

      const platform = new window.H.service.Platform({ apikey: apiKey });
      const layers = platform.createDefaultLayers();
      const newMap = new window.H.Map(
        mapRef.current,
        layers.vector.normal.map,
        {
          center: { lat, lng },
          zoom: zoomRef.current,
        }
      );

      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(newMap));

      const marker = new window.H.map.Marker({ lat, lng });
      newMap.addObject(marker);

      setMap(newMap);
    };

    loadMap();

    return () => {
      if (map) {
        map.dispose();
        setMap(null);
      }
    };
  }, [apiKey, lat, lng, zoom]);

  useEffect(() => {
    console.log("zoka", zoomRef.current);
    if (map) {
      if (lat !== map.getCenter().lat || lng !== map.getCenter().lng) {
        map.setCenter({ lat, lng });
      }
      if (zoom !== zoomRef.current) {
        zoomRef.current = zoom;
        map.setZoom(zoom);
      }
    }
  }, [lat, lng, zoom, map]);

  return <div ref={mapRef} className="w-full h-full" />;
};

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
  county: string | null | undefined;
  city: string | null | undefined;
  district: string | null | undefined;
  street: string | null | undefined;
  postalCode: string | null;
  houseNumber: string | null;
};

type LocationType = {
  homestay: Homestay;
  setReload: (value: boolean) => void;
  position: Coordinates | null;
  setPosition: (value: Coordinates | null ) => void;
};
const Location = ({ homestay, position, setPosition , setReload }: LocationType) => {
  
  const [isLocation, setIsLocation] = useState<boolean>(false);
  const [isSearchLocation, setIsSearchLocation] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | null>();

  const [country, setCountry] = useState("Viet Nam");
  const [district, setDistrict] = useState(homestay?.wardName ?? "");
  const [county, setCounty] = useState(homestay?.cityProvinceName ?? "");
  const [city, setCity] = useState(homestay?.districtName ?? "");
  const [street, setStreet] = useState(homestay?.address ?? "");
  const [isValidateLocation, setIsValidateLocation] = useState<boolean>(false);
  const [confirmLocationInfo, setConfirmLocationInfo] = useState<string | null>(
    null
  );
  const [positionConfirm, setPositionConfirm] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { toast } = useToast();

  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const handleSelect = (lat: number, lng: number) => {
    setPosition({lat,lng});
  };

  useEffect(() => {
    if (position && location) {
      setDistrict(location?.district!);
      setCity(location?.city!);
      setCounty(location?.county!);
      setStreet(location?.street!);
      setIsSearchLocation(false);
    }
  }, [position, location]);

  useEffect(() => {
    if (positionConfirm != null) {
      setPosition(positionConfirm!);
    }
  }, [positionConfirm]);
  useEffect(() => {
    if (error) {
      console.log("error",error);
      
      toast({
        title: error.title,
        description: error.description,
        status: "error"
      });
      setError(null);
    }
  }, [error, toast]);
  const formatLocation = (location: Location | null, country? : string , district? : string, county?: string , city? : string,street?:string): string => {
    let parts;
    if (location){
      const { houseNumber, street, district, city, county, countryName } =
      location;
      parts = [houseNumber, street, district, city, county, countryName];
    }else{
      parts = [street, district, city, county, country];
    }
    return parts.filter((part) => part).join(", ");
  };

  const getBestMatch = (items: Item[], locationString: string): Item | null => {
    const getMatchScore = (item: Item): number => {
      let score = 0;
      const addressString = [
        item.address.houseNumber,
        item.address.street,
        item.address.district,
        item.address.city,
        item.address.county,
        item.address.countryName,
      ]
        .filter(Boolean)
        .join(", ");

      const addressParts = addressString.split(", ");
      const locationParts = locationString.split(", ");

      addressParts.forEach((part) => {
        if (locationParts.includes(part)) {
          score += 1;
        }
      });

      return score;
    };

    const bestMatch = items.reduce((prev, curr) => {
      return getMatchScore(curr) > getMatchScore(prev) ? curr : prev;
    }, items[0]);

    return bestMatch;
  };

  const locationString = useMemo(
    () => formatLocation(location!, country, district, county, city, street),
    [location, country, district, county, city, street]
  );
  console.log("",locationString);

  const handleConfirmLocation = async () => {
    if (
      location?.city != "" &&
      location?.countryName != "" &&
      location?.district != "" &&
      location?.street != "" &&
      location?.county != ""
    ) {
      try {
        const response: Response = await getData({
          endpoint: `https://geocode.search.hereapi.com/v1/geocode?q=${locationString}&apiKey=${APIKEY}`,
        });


        if (response && response.items.length > 0) {
          const bestMatch = getBestMatch(response.items, locationString);
          if (bestMatch) {
            const bestMatchString = formatLocation(bestMatch.address);
            setConfirmLocationInfo(bestMatchString);
            setPositionConfirm({
              lat: bestMatch.position.lat,
              lng: bestMatch.position.lng,
            });
            setIsValidateLocation(true);
          } else {
            setIsValidateLocation(false);
          }
        } else {
          setError({
            title: "Address Invalid or Not found",
            description: " please enter address valid !!!",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSaveLocation = async () => {
      try {
        const res = await updateData({
          id: homestay.homestayid!,
          endpoint: "homestays/host",
          payload: {
            ...homestay,
            wardName: district,
            cityProvinceName: county,
            districtName: city,
            address: street,
            latitude: position?.lat,
            longitude: position?.lng
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setReload(true);
      }
  }
  
  return (
    <>
      <div className="my-auto">
        {!isLocation && (
          <>
            <div className="text-3xl font-bold mt-13 mb-10">Location</div>
            <div className="  overflow-hidden h-[400px] flex items-center justify-center rounded-xl">
              {position?.lat != undefined && position?.lng != undefined && (
                <HereMap
                  lat={position?.lat!}
                  lng={position?.lng!}
                  apiKey={APIKEY}
                  zoom={10}
                />
              )}
            </div>
            <div
              className="flex items-center justify-between px-6 py-4 mt-5 hover:bg-slate-50 rounded-xl border "
              onClick={() => setIsLocation(true)}
            >
              <div>
                <div className="text-lg font-medium">Address</div>
                <div className="text-sm text-[#666]">
                  {homestay?.address ? homestay?.address : ""}{" "}
                  {homestay?.wardName ? `, ${homestay?.wardName}` : ""}
                  {homestay?.districtName ? `, ${homestay?.districtName}` : ""}
                  {homestay?.cityProvinceName
                    ? `, ${homestay?.cityProvinceName}`
                    : ""}
                </div>
              </div>
              <div>
                <MdKeyboardArrowRight className="h-6 w-6" />
              </div>
            </div>
          </>
        )}
        {isLocation && !isSearchLocation && !isValidateLocation && (
          <>
            <div className="mt-13 mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center  ">
                <div
                  className="text-3xl font-bold hover:underline   "
                  onClick={() => setIsLocation(false)}
                >
                  Location
                </div>
                <span>
                  <IoIosArrowForward className="h-8 text-[#666] w-8" />
                </span>
                <div className="text-3xl font-bold">Address</div>
              </div>
              <div
                className="font-medium px-5 py-2 border rounded-xl"
                onClick={() => setIsSearchLocation(true)}
              >
                Edit New
              </div>
            </div>
            <div className="w-auto mb-2">
              <InputGroup
                label="Country"
                type="text"
                placeholder="Please Enter Country !"
                customClasses="w-full "
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              />
              <InputGroup
                label="Street Address"
                type="text"
                placeholder="Please Enter Street Address !"
                customClasses="w-full mb-4 mt-2"
                onChange={(e) => setStreet(e.target.value)}
                value={street}
              />
              <InputGroup
                label="Ward/Commune/Town"
                type="text"
                placeholder="Please Enter Ward/Commune/Town !"
                customClasses="w-full mb-4 mt-2"
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
              />
              <InputGroup
                label="District/Town/City/County"
                type="text"
                placeholder="Please Enter District/Town/City/County !"
                customClasses="w-full mb-4 mt-2"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              <InputGroup
                label="Province/Municipality"
                type="text"
                placeholder="Please Enter Province/Municipality !"
                customClasses="w-full mb-4"
                onChange={(e) => setCounty(e.target.value)}
                value={county}
              />
            </div>
            <div className="flex justify-between items-center mt-7">
              {district == homestay?.wardName &&
              county == homestay?.cityProvinceName &&
              city == homestay?.districtName &&
              street == homestay?.address ? (
                <button
                  className="px-6 py-2 rounded-lg text-lg text-black font-semibold"
                  onClick={() => setIsLocation(false)}
                >
                  Back
                </button>
              ) : (
                <button
                  className="px-6 py-2 rounded-lg text-lg text-black font-semibold"
                  onClick={() => {
                    setIsLocation(false);
                    setLocation(null);
                    setDistrict(homestay?.wardName!);
                    setCounty(homestay?.cityProvinceName!);
                    setCity(homestay?.districtName!);
                    setStreet(homestay?.address!);
                    setPosition({
                      lat: homestay?.latitude!,
                      lng: homestay?.longitude!,
                    });
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                className={`px-6 py-2 rounded-lg text-lg text-white font-semibold bg-blue-500 ${
                  district == homestay?.wardName &&
                  county == homestay?.cityProvinceName &&
                  city == homestay?.districtName &&
                  street == homestay?.address ? "opacity-30" : ""
                }`}
                onClick={handleConfirmLocation}
                disabled={
                  district == homestay?.wardName &&
                  county == homestay?.cityProvinceName &&
                  city == homestay?.districtName &&
                  street == homestay?.address
                }
              >
                Confirm
              </button>
            </div>
          </>
        )}
        {isSearchLocation && (
          <div>
            <div className="mt-13 mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center relative ">
                <div
                  className="  w-12 h-12 flex p-2  items-center justify-center bg-[#f7f7f7] hover:bg-[#ebebeb] rounded-full border absolute -left-20"
                  onClick={() => {
                    setIsLocation(true);
                    setIsSearchLocation(false);
                  }}
                >
                  <MdOutlineKeyboardArrowLeft className="h-12 w-12" />
                </div>

                <div
                  className="text-3xl font-bold hover:underline"
                  onClick={() => {
                    setIsLocation(false);
                    setIsSearchLocation(false);
                  }}
                >
                  Location
                </div>
                <span>
                  <IoIosArrowForward className="h-8 text-[#666] w-8" />
                </span>
                <div
                  className="text-3xl font-bold hover:underline"
                  onClick={() => {
                    setIsLocation(true);
                    setIsSearchLocation(false);
                  }}
                >
                  Address
                </div>
                <span>
                  <IoIosArrowForward className="h-8 text-[#666] w-8" />
                </span>
                <div className="text-3xl font-bold">Edit New</div>
              </div>
            </div>
            <div className="w-auto relative h-[500px] mt-15">
              {!position && (
                <div className="rounded-3xl bg-[url('/boat.png')] w-full h-full"></div>
              )}
              {position && <Map lat={position.lat!} lng={position.lng!} />}
              <SearchMap onSelect={handleSelect} setLocation={setLocation} />
            </div>
          </div>
        )}

        {isValidateLocation && (
          <>
            <div className="mt-13 mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center  ">
                <div
                  className="text-3xl font-bold hover:underline"
                  onClick={() => {
                    setIsLocation(false);
                    setIsValidateLocation(false);
                  }}
                >
                  Location
                </div>
                <span>
                  <IoIosArrowForward className="h-8 text-[#666] w-8" />
                </span>
                <div
                  className="text-3xl font-bold hover:underline"
                  onClick={() => {
                    setIsValidateLocation(false);
                  }}
                >
                  Address
                </div>
                <span>
                  <IoIosArrowForward className="h-8 text-[#666] w-8" />
                </span>
                <div className="text-3xl font-bold">Exact Location</div>
              </div>
            </div>
            <div className="w-auto relative h-[450px] mt-10">
              {position && (
                <MapMove
                  position={positionConfirm}
                  setPosition={setPositionConfirm}
                />
              )}
              <div className="absolute left-0 right-0 top-5 flex items-center justify-center">
                <div className={`w-[566px]`}>
                  <div className="relative">
                    <div
                      className={`w-full h-full relative flex items-center bg-white rounded-3xl `}
                    >
                      <IoLocationOutline className="ml-4 w-8 h-8" />
                      <div className={`w-full h-full  p-4  `}>
                        {confirmLocationInfo}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-7">
              <button
                className="px-6 py-2 rounded-lg text-lg text-black font-semibold"
                onClick={() => {
                  setIsValidateLocation(false);
                }}
              >
                Back
              </button>
              <button
                className="px-6 py-2 rounded-lg text-lg text-white font-semibold bg-blue-500"
                onClick={handleSaveLocation}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Location;
