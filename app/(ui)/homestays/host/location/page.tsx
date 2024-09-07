"use client";
import Image from "next/image";
import LocationSearch from "./LocationSearch";
import LocationForm from "./LocationForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getData } from "@/utils/axios";
import LocationDetail from "./LocationDetail";
import { useHostContext } from "@/store/Hostcontext";
import { useToast } from "@/components/ui/use-toast";

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

const Location = () => {
  const { state, setState } = useHostContext();
  const [position, setPosition] = useState<{
    lat: number | undefined;
    lng: number | undefined;
  } | null>({ lat: state?.data.latitude, lng: state?.data.longitude });
  const [positionConfirm, setPositionConfirm] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [location, setLocation] = useState<Location | null>({
    street: state?.data.address,
    district: state?.data.wardName,
    city: state?.data.districtName,
    county: state?.data.cityProvinceName,
    countryCode: null,
    countryName: null,
    houseNumber: null,
    label: null,
    postalCode: null,
  });
  const [confirmLocationInfo, setConfirmLocationInfo] = useState<string | null>(
    null
  );
  const [isValidateLocation, setIsValidateLocation] = useState<boolean>(false);
  const [error, setError] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  console.log(location);
  const APIKEY = process.env.NEXT_PUBLIC_HERE_API_KEY;
  const formatLocation = (location: Location | null): string => {
    if (!location) return "";

    const { houseNumber, street, district, city, county, countryName } =
      location;

    const parts = [houseNumber, street, district, city, county, countryName];

    return parts.filter((part) => part).join(", ");
  };

  useEffect(() => {
    setPosition(positionConfirm ?? null);
  }, [positionConfirm]);
  useEffect(() => {
    if (error) {
      toast({
        title: error.title,
        description: error.description,
      });
      setError(null);
    }
  }, [error, toast]);

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

  const locationString = useMemo(() => formatLocation(location), [location]);
  console.log(locationString);

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

  const handleClick = () => {
    setState({
      data: {
        ...state?.data!,
        latitude: position?.lat as number,
        longitude: position?.lng as number,
        address: location?.street as string,
        wardName: location?.district as string,
        districtName: location?.city as string,
        cityProvinceName: location?.county as string,
      },
    });

    if (isValidateLocation) router.push("/homestays/host/floor");
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <div>
      <div className="bg-white fixed right-0 left-0 top-0  px-15 pt-5 pb-5 z-999 border-b">
        <div className="flex items-center justify-between">
          <div className="w-20 h-20">
            <Image
              src={"/Logo.png"}
              alt=""
              height={300}
              width={300}
              className="object-center object-cover w-full h-full"
            />
          </div>
          <div>
            <Link href={"/"} className="border px-4 py-2 rounded-full">
              Exit
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-36 mb-30">
        {!position && (
          <LocationSearch
            position={position}
            setPosition={setPosition}
            setLocation={setLocation}
          />
        )}
        {position && !isValidateLocation && (
          <LocationForm
            location={location}
            setLocation={setLocation}
            position={position}
            setPosition={setPosition}
          />
        )}
        {isValidateLocation && (
          <LocationDetail
            location={confirmLocationInfo}
            position={positionConfirm}
            setPosition={setPositionConfirm}
          />
        )}
      </div>
      <div className=" bg-white border-t-4 flex fixed left-0 right-0 bottom-0 items-center justify-between">
        <button
          onClick={handleBack}
          className="px-5 py-3 my-5 ml-5 rounded-xl text-lg font-bold text-white bg-slate-400"
        >
          Back
        </button>
        {isValidateLocation && (
          <button
            onClick={handleClick}
            className={`px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500 ${
              location?.city != "" &&
              location?.countryName != "" &&
              location?.district != "" &&
              location?.street != ""
                ? "opacity-100"
                : "opacity-30"
            }`}
          >
            Continue
          </button>
        )}
        {!isValidateLocation && (
          <button
            onClick={handleConfirmLocation}
            className={`px-5 py-3 my-5 mr-5 rounded-xl text-lg font-bold text-white bg-blue-500 ${
              location?.city != "" &&
              location?.countryName != "" &&
              location?.district != "" &&
              location?.street != ""
                ? "opacity-100"
                : "opacity-30"
            }`}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Location;
