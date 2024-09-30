// import React, { useEffect, useRef, useState } from "react";


// const APIKEY = process.env.NEXT_PUBLIC_HERE_API_KEY;


// declare global {
//   interface Window {
//     H: any;
//   }
// }

// type Coordinates = {
//   lat: number;
//   lng: number;
// };

// type MapMoveProps = {
//   position: Coordinates | null;
//   setPosition: (value: Coordinates | null) => void;
// };



// const MapMove: React.FC<MapMoveProps> = ({ position, setPosition }) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [map, setMap] = useState<any>(null);
//   const [platform, setPlatform] = useState<any>(null);
//   const [marker, setMarker] = useState<any>(null);
 

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://js.api.here.com/v3/3.1/mapsjs-core.js";
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       const script2 = document.createElement("script");
//       script2.src = "https://js.api.here.com/v3/3.1/mapsjs-service.js";
//       document.body.appendChild(script2);

//       script2.onload = () => {
//         const script3 = document.createElement("script");
//         script3.src = "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js";
//         document.body.appendChild(script3);

//         script3.onload = initMap;
//       };
//     };

//     return () => {
//       if (map) {
//         map.dispose();
//       }
//     };
//   }, []);

//   const initMap = () => {
//     const platform = new window.H.service.Platform({
//       apikey: APIKEY,
//     });
//     setPlatform(platform);

//     const defaultLayers = platform.createDefaultLayers();
//     const map = new window.H.Map(
//       mapRef.current,
//       defaultLayers.vector.normal.map,
//       {
//         center: position,
//         zoom: 15,
//       }
//     );

//     const behavior = new window.H.mapevents.Behavior(
//       new window.H.mapevents.MapEvents(map)
//     );

//     setMap(map);

//     const marker = new window.H.map.Marker(position, { volatility: true });
//     map.addObject(marker);
//     setMarker(marker);

//     marker.draggable = true;

//     map.addEventListener(
//       "dragstart",
//       (ev: any) => {
//         const target = ev.target;
//         if (target instanceof window.H.map.Marker) {
//           behavior.disable();
//         }
//       },
//       false
//     );

//     map.addEventListener(
//       "dragend",
//       (ev: any) => {
//         const target = ev.target;
//         if (target instanceof window.H.map.Marker) {
//           behavior.enable();
//           const newCoords = map.screenToGeo(
//             ev.currentPointer.viewportX,
//             ev.currentPointer.viewportY
//           );
//           setPosition({ lat: newCoords.lat, lng: newCoords.lng });
//         }
//       },
//       false
//     );

//     map.addEventListener(
//       "drag",
//       (ev: any) => {
//         const target = ev.target;
//         if (target instanceof window.H.map.Marker) {
//           const newCoords = map.screenToGeo(
//             ev.currentPointer.viewportX,
//             ev.currentPointer.viewportY
//           );
//           target.setGeometry(newCoords);
//         }
//       },
//       false
//     );
//   };

//   return (
//     <>
//       {/* <p>Latitude: {position?.lat}</p>
//       <p>Longitude: {position?.lng}</p> */}
//       <div
//         ref={mapRef}
//         className="overflow-hidden rounded-3xl  w-full h-full"
//       ></div>
//     </>
//   );
// };

// export default MapMove;



import React, { useEffect, useRef, useState } from "react";
import { MapIcon, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";

const APIKEY = process.env.NEXT_PUBLIC_HERE_API_KEY;

declare global {
  interface Window {
    H: any;
  }
}

type Coordinates = {
  lat: number;
  lng: number;
};

type MapMoveProps = {
  position: Coordinates | null;
  setPosition: (value: Coordinates | null) => void;
};

const MapMove: React.FC<MapMoveProps> = ({ position, setPosition }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [platform, setPlatform] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [isSatellite, setIsSatellite] = useState<boolean>(false);

  useEffect(() => {
    const loadMapScript = (src: string) => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const initMap = async () => {
      await loadMapScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
      await loadMapScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
      await loadMapScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

      const platform = new window.H.service.Platform({ apikey: APIKEY });
      setPlatform(platform);

      const defaultLayers = platform.createDefaultLayers();
      const map = new window.H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: position,
          zoom: 15,
        }
      );

      const behavior = new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(map)
      );

      setMap(map);

      const marker = new window.H.map.Marker(position, { volatility: true });
      map.addObject(marker);
      setMarker(marker);
      marker.draggable = true;

      map.addEventListener(
        "dragstart",
        (ev: any) => {
          const target = ev.target;
          if (target instanceof window.H.map.Marker) {
            behavior.disable();
          }
        },
        false
      );

      map.addEventListener(
        "dragend",
        (ev: any) => {
          const target = ev.target;
          if (target instanceof window.H.map.Marker) {
            behavior.enable();
            const newCoords = map.screenToGeo(
              ev.currentPointer.viewportX,
              ev.currentPointer.viewportY
            );
            setPosition({ lat: newCoords.lat, lng: newCoords.lng });
          }
        },
        false
      );

      map.addEventListener(
        "drag",
        (ev: any) => {
          const target = ev.target;
          if (target instanceof window.H.map.Marker) {
            const newCoords = map.screenToGeo(
              ev.currentPointer.viewportX,
              ev.currentPointer.viewportY
            );
            target.setGeometry(newCoords);
          }
        },
        false
      );
    };

    initMap();

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, []);

  const toggleMapView = () => {
    if (map && platform) {
      const newIsSatellite = !isSatellite;
      setIsSatellite(newIsSatellite);
      const layers = platform.createDefaultLayers();
      const newLayer = newIsSatellite
        ? layers.raster.satellite.map
        : layers.vector.normal.map;
      map.setBaseLayer(newLayer);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="overflow-hidden rounded-3xl w-full h-full"
      ></div>
      {/* <Button className="absolute top-[27rem] right-4 z-10" onClick={toggleMapView}>
        {isSatellite ? <MapIcon size={20} /> : <Satellite size={20} />}
      </Button> */}
    </div>
  );
};

export default MapMove;