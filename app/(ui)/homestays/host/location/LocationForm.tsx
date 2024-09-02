"use client"
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import { decodeWKB } from "@/utils/decodeWKB";
import { Point } from "geojson";
import { useEffect, useRef, useState } from "react";

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

type Coordinates = {
  lat: number | undefined;
  lng: number | undefined ;
};

type LocationFormProps = {
  location: Location | null;
  setLocation: (value: Location | null) => void;
  position: Coordinates;
  setPosition : (value: Coordinates) => void;
};

const LocationForm = ({
  location,
  setLocation,
  position,
  setPosition,
}: LocationFormProps) => {
  const  [country,setCountry] = useState(location?.countryName);
  const [district, setDistrict] = useState(location?.district ?? "");
  const [county, setCounty] = useState(location?.county ?? "");
  const [city, setCity] = useState(location?.city ?? "");
  const [street, setStreet] = useState(location?.street ?? "");
  const [label, setLabel] = useState(location?.label ?? "");
  const [isZoomed, setIsZoomed] = useState(false);
  const wkbArray = [
    "0101000020110F0000C250E51332715A40B1649ABA490D2440",
    "0101000020110F0000A155F0A909715A40111ACF6F0D0D2440",
  ];


  useEffect(() => {
     setLocation({
       label,
       countryCode: location?.countryCode ?? "",
       countryName: country ?? "",
       county,
       city,
       district,
       street,
       postalCode: location?.postalCode ?? "",
       houseNumber: location?.houseNumber ?? "",
     });
  }, [country, district, county, city, street]);
  const coordinates = wkbArray.map((wkbString) => {
    const geoJSON: Point = decodeWKB(wkbString);
    return geoJSON.coordinates as [number, number];
  });
  return (
    <>
      <div className="text-[32px] font-medium w-[640px]">
        Xác nhận địa chỉ của bạn
      </div>
      <div className="text-lg text-[#6a6a6a] tracking-tight  w-[640px]">
        Địa chỉ của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành
        công.
      </div>

      <div className="w-[640px] mt-5 pb-5 border-b-2">
        <SelectGroupTwo
          label="Quoc Gia"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <InputGroup
          label="Địa Chỉ Đường/Phố"
          type="text"
          placeholder="Please Enter Title !"
          customClasses="w-full mb-4.5 mt-5"
          onChange={(e) => setStreet(e.target.value)}
          value={street}
        />
        <InputGroup
          label="Phường/Xã/Thị Trấn"
          type="text"
          placeholder="Please Enter Title !"
          customClasses="w-full mb-4.5"
          onChange={(e) => setDistrict(e.target.value)}
          value={district}
        />
        <InputGroup
          label="Quận/Thị Xã/Thành Phố/Huyện"
          type="text"
          placeholder="Please Enter Title !"
          customClasses="w-full mb-4.5"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <InputGroup
          label="Tỉnh/Đô Thị"
          type="text"
          placeholder="Please Enter Title !"
          customClasses="w-full mb-4.5"
          onChange={(e) => setCounty(e.target.value)}
          value={county}
        />
      </div>
      <div className="flex items-center justify-between w-[640px] py-5">
        <div>
          <div className="text-base font-medium">
            Hiển thị vị trí chính xác của bạn
          </div>
          <div className="text-sm font-medium text-[#666]">
            Chỉ rõ cho khách vị trí chỗ ở của bạn. Chúng tôi sẽ chỉ chia sẻ địa
            chỉ của bạn sau khi khách đặt phòng thành công
          </div>
        </div>
        <div>
          <label className="inline-flex items-start  cursor-pointer">
            <input
              type="checkbox"
              checked={isZoomed}
              className="sr-only peer"
              onChange={(e) => setIsZoomed(e.target.checked)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </div>
      <div className="w-[640px] overflow-hidden h-[400px] flex items-center justify-center  rounded-2xl mb-90">
        {position && (
          <HereMap
            lat={position.lat}
            lng={position.lng}
            apiKey={APIKEY}
            zoom={isZoomed ? 15 : 10}
          />
        )}
      </div>
    </>
  );
};

export default LocationForm;
