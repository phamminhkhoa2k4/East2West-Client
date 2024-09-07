import { FaLocationDot } from "react-icons/fa6";


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



type ResultSearchPlace = {
  suggestions: Item[];
  handleClickItem:(value : Item) => void;
};
const ResultSearchPlace = ({
  suggestions,
  handleClickItem,
}: ResultSearchPlace) => {
  return (
    <>
      {suggestions.length > 0 && (
        <>
          <div className="flex flex-col gap-1 p-6 rounded-3xl bg-white w-[400px] border shadow-md">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex gap-5 items-center hover:bg-slate-300 p-2 rounded-xl"
                onClick={() => handleClickItem(suggestion)}
              >
                <FaLocationDot className="h-12 w-12 bg-[#666] p-3 rounded-xl" />
                <div className="font-medium">{suggestion.title}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ResultSearchPlace;
