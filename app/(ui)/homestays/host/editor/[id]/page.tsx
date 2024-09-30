"use client";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaReact } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Photos from "./Photos";
import Amenities from "./Amenities";
import ExtraInfo from "./ExtraInfo";
import Bed from "./Bed";
import Price from "./Price";
import Room from "./Room";

import Title from "./Title";
import Location from "./Location";
import Instant from "./Instant";
import Structure from "./Structure";
import Description from "./Description";
import Bathroom from "./Bathroom";
import Guests from "./Guests";
import { useParams } from "next/navigation";
import Type from "./Type";
import { api, getData } from "@/utils/axios";
import { useUser } from "@/store/UserContext";
import { format } from "date-fns";
import Cleaning from "./Cleaning";

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

type StructureType = {
  structureid: number;
  structurename: string;
};

type AmenitiesType = {
  amenitiesid: number;
  amenitiesname: string;
};

const Editor = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("manage");
  const [editorSpecify, setEditorSpecify] = useState<number>(0);
  const [amenities, setAmenities] = useState<AmenitiesType[]>([]);
  const { user } = useUser();
  const [homestay, setHomestay] = useState<Homestay>();
  const [structure, setStructure] = useState<StructureType>();
  const [position, setPosition] = useState<Coordinates | null>();
  const [reload,setReload] = useState<boolean>(false);

  useEffect(() => {
    const fetchEditor = async () => {
      try {
        const homestay: Homestay = await getData({
          endpoint: `/homestays/${id}`,
        });
        setReload(true);
        setHomestay(homestay);
        setPosition({ lat: homestay?.latitude!, lng: homestay?.longitude! });
      } catch (error) {
        console.log(error);
      } finally {
        setReload(false);
      }
    };

    fetchEditor();
  }, [reload, id]);



  useEffect(() => {
    const fetchStructure = async () => {
      const structure = await getData({ endpoint: `/homestays/host/structure/${homestay?.structureId}` });
      setStructure(structure);
    };
    fetchStructure();
  }, [homestay]);

  useEffect(() => {
    if (homestay) {
      setPosition({ lat: homestay.latitude, lng: homestay.longitude });
    }
  }, [homestay]);

  const currentDate = format(new Date(), "yyyy-MM-dd");
  const todayAvailability = homestay?.availability.find((avail) => {
    return avail.date.startsWith(currentDate);
  });
  

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const amenities = await api.get("/homestays/host/amenitiess", {
          params: { ids: homestay?.perkIds },
          paramsSerializer: (params) => {
            return Object.keys(params)
              .map((key) => `${key}=${params[key].join(",")}`)
              .join("&");
          },
        });
        setAmenities(amenities.data);
      } catch (error) {
        console.log(error);      
      }
    };
    fetchAmenities();
  }, [homestay]);
  return (
    <>
      <div className="h-screen">
        <div className="flex items-center justify-center border-b ">
          <div className="flex justify-between items-center gap-5">
            <div
              className={`text-base   ${
                tab === "today"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTab("today")}
            >
              Today
            </div>
            <div
              className={`text-base   ${
                tab === "manage"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTab("manage")}
            >
              Manage Homestay
            </div>
            <div
              className={`text-base   ${
                tab === "calendar"
                  ? "font-bold py-5 text-blue-500 border-b-4 border-blue-500"
                  : "font-medium text-[#666] py-5"
              }  `}
              onClick={() => setTab("calendar")}
            >
              Calendar
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-2/5 h-screen border-r border">
            <div className="  ">
              <div className="mx-20 py-10 flex gap-5 items-center ">
                <Link
                  href={"/homestays/multicalendar"}
                  className=" w-12 h-12 flex p-4 items-center justify-center rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb]"
                >
                  <FaArrowLeft className="w-12 h-12" />
                </Link>
                <div className="text-3xl font-semibold">
                  Trình chỉnh sửa mục cho thuê
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 ml-40  w-[372px] mr-20 overflow-y-scroll h-[620px] scroll-transparent">
              <div
                className={`border-2  ${
                  editorSpecify == 0 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(0)}
              >
                <div className="text-base font-bold">Photo Album</div>
                <div className="flex items-center gap-1 py-2">
                  <span>{homestay?.room} Room</span>
                  <GoDotFill className="h-1 w-1" />
                  <span>{homestay?.beds} Beds</span>
                  <GoDotFill className="h-1 w-1" />
                  <span>{homestay?.bathroom} Bathrooms</span>
                  <GoDotFill className="h-1 w-1" />
                  <span>{homestay?.maxGuest} Guests</span>
                </div>
                <div className="py-5 relative h-60">
                  <span className="text-sm absolute bg-white top-12 px-3 py-1 rounded-full z-10 left-22 ">
                    {homestay?.photos.length} ảnh
                  </span>
                  <Image
                    src={homestay?.photos[1]!}
                    alt=""
                    height={400}
                    width={400}
                    className="object-center object-cover absolute  w-40 h-40 rounded-xl z-8 left-1 top-13 rotate-[-10deg]"
                  />
                  <Image
                    src={homestay?.photos[0]!}
                    alt=""
                    height={400}
                    width={400}
                    className="object-center object-cover absolute w-45 h-45 rounded-xl top-10 left-18 z-9"
                  />
                  <Image
                    src={homestay?.photos[2]!}
                    alt=""
                    height={400}
                    width={400}
                    className="object-center object-cover absolute  w-40 h-40 rounded-xl z-8 right-1 top-13 rotate-[10deg]"
                  />
                </div>
              </div>
              <div className="border rounded-xl p-6 shadow-md">
                <div className="text-base font-bold">Host</div>
                <div className="flex items-center justify-center mt-5">
                  <div className="flex items-center justify-center h-24 w-24 rounded-full bg-black text-2xl text-white font-extrabold">
                    {homestay?.userId == user?.userId
                      ? user?.username.slice(0, 1).toUpperCase()
                      : ""}
                  </div>
                </div>
                <div className="text-2xl text-center my-5 font-extrabold">
                  {homestay?.userId == user?.userId ? user?.username : ""}
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 1 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(1)}
              >
                <div className="text-base font-bold">Title</div>
                <div className="mt-3 mb-2 text-xl text-[#666] font-medium">
                  {homestay?.title}
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 6 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(6)}
              >
                <div className="text-base font-bold">Structure</div>
                <div className="my-5 text-lg text-[#666] font-medium">
                  {structure?.structurename}
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 11 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(11)}
              >
                <div className="text-base font-bold">Amenities</div>
                <div className="flex flex-col mt-4 ">
                  {amenities?.map((amenity) => (
                    <div key={amenity.amenitiesid} className="flex items-center gap-5">
                    <FaReact className="h-5 w-5" />
                    <div className="my-1 text-lg text-[#807f7f] font-medium">
                      {amenity.amenitiesname}
                    </div>
                  </div>
                  ))}
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 2 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(2)}
              >
                <div className="text-base font-bold">Type</div>
                <div className="my-5 text-lg text-[#666] font-medium">
                  {homestay?.type}
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 3 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(3)}
              >
                <div className="text-base font-bold">Room</div>
                <div className="my-5 text-lg text-[#666] font-medium">
                  {homestay?.room} Room
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 8 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(8)}
              >
                <div className="text-base font-bold text-nowrap">
                  Number of guests
                </div>
                <div className="my-5 text-lg text-[#807f7f] font-medium">
                  {homestay?.maxGuest} Guests
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 4 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(4)}
              >
                <div className="text-base font-bold">Bathroom</div>
                <div className="my-5 text-lg text-[#666] font-medium">
                  {homestay?.bathroom} Bathroom
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 5 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(5)}
              >
                <div className="text-base font-bold">Bed</div>
                <div className="my-5 text-lg text-[#666] font-medium">
                  {homestay?.beds} Bed
                </div>
              </div>

              <div
                className={`border-2  ${
                  editorSpecify == 7 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(7)}
              >
                <div className="text-base font-bold">Price Per Night</div>
                <div className="my-5 text-lg text-[#807f7f] font-medium">
                  ${todayAvailability?.pricepernight}/Night
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 14 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(14)}
              >
                <div className="text-base font-bold ">Cleaning Fee</div>
                <div className="my-5 text-lg text-[#807f7f] font-medium">
                  ${homestay?.cleaningFee}
                </div>
              </div>

              <div
                className={`border-2  ${
                  editorSpecify == 9 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(9)}
              >
                <div className="text-base font-bold">Description</div>
                <div className="my-5 text-lg text-[#807f7f] font-medium">
                  {homestay?.description}
                </div>
              </div>
              <div
                className={`border-2  ${
                  editorSpecify == 10 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(10)}
              >
                <div className="text-base font-bold">Extra Information</div>
                <div className="my-5 text-lg text-[#807f7f] font-medium">
                  {homestay?.extraInfo}
                </div>
              </div>

              <div
                className={`border-2  ${
                  editorSpecify == 12 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(12)}
              >
                <div className="text-base font-bold">Location</div>
                <div className="overflow-hidden h-[150px] my-5 rounded-xl">
                  {position?.lat !== undefined &&
                    position?.lng !== undefined && (
                      <HereMap
                        lat={position.lat!}
                        lng={position.lng!}
                        apiKey={APIKEY}
                        zoom={15}
                      />
                    )}
                </div>
                <div className="text-lg text-[#807f7f] font-medium">
                  {homestay?.address ? homestay?.address : ""}{" "}
                  {homestay?.wardName ? `, ${homestay?.wardName}` : ""}
                  {homestay?.districtName ? `, ${homestay?.districtName}` : ""}
                  {homestay?.cityProvinceName
                    ? `, ${homestay?.cityProvinceName}`
                    : ""}
                </div>
              </div>

              <div
                className={`border-2  ${
                  editorSpecify == 13 ? "border-black" : ""
                } rounded-xl p-6 shadow-md`}
                onClick={() => setEditorSpecify(13)}
              >
                <div className="text-base font-bold">Instant</div>
                <div className="my-5 text-lg text-[#807f7f] font-medium">
                  {homestay?.instant! == true
                    ? "Guests can book rooms automatically with the Instant Book feature."
                    : "Guests need to be approved before booking."}
                </div>
              </div>
              <div className="pb-25"></div>
            </div>
          </div>
          <div className="w-3/5">
            <div className="mx-40 flex flex-col justify-center">
              {editorSpecify == 0 && (
                <Photos homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 11 && (
                <Amenities homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 10 && (
                <ExtraInfo homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 5 && (
                <Bed homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 7 && (
                <Price homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 3 && (
                <Room homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 4 && (
                <Bathroom homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 8 && (
                <Guests homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 2 && (
                <Type homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 1 && (
                <Title homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 12 && (
                <Location homestay={homestay!} setReload={setReload} setPosition={setPosition} position={position!}/>
              )}
              {editorSpecify == 13 && (
                <Instant homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 6 && (
                <Structure homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 9 && (
                <Description homestay={homestay!} setReload={setReload} />
              )}
              {editorSpecify == 14 && (
                <Cleaning homestay={homestay!} setReload={setReload} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
