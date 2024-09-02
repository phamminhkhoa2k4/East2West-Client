import React, { useEffect, useRef, useCallback } from "react";
import Head from "next/head";

const Map: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<H.Map | null>(null);
  const markerInstance = useRef<H.map.Marker | null>(null);
  const KEYSECRET = process.env.NEXT_PUBLIC_HERE_API_KEY;

  const initializeMap = useCallback(() => {
    if (mapRef.current && (window as any).H) {
      const H = (window as any).H;

      const platform = new H.service.Platform({
        apikey: KEYSECRET,
      });
      const defaultLayers = platform.createDefaultLayers();

      if (!mapInstance.current) {
        mapInstance.current = new H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            zoom: 12,
            center: { lat, lng },
          }
        );

        new H.mapevents.Behavior(
          new H.mapevents.MapEvents(mapInstance.current)
        );
      } else {
        mapInstance.current.setCenter({ lat, lng });
      }

      if (mapInstance.current) {
        if (markerInstance.current) {
          mapInstance.current.removeObject(markerInstance.current);
          markerInstance.current = null;
        }

        const newMarker = new H.map.Marker({ lat, lng });
        if (mapInstance.current && newMarker) {
          mapInstance.current.addObject(newMarker);
          markerInstance.current = newMarker;
        }
      }
    }
  }, [lat, lng, KEYSECRET]);

  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
      });
    };

    const loadHereMaps = async () => {
      try {
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

        initializeMap();
      } catch (error) {
        console.error("Failed to load HERE Maps scripts:", error);
      }
    };

    loadHereMaps();

    return () => {
      const scripts = document.querySelectorAll(
        'script[src*="js.api.here.com"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, [initializeMap]);

  useEffect(() => {
    if (mapInstance.current) {
      initializeMap();
    }
  }, [lat, lng, initializeMap]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://js.api.here.com/v3/3.1/mapsjs-ui.css"
        />
      </Head>
      <div
        ref={mapRef}
        className="overflow-hidden rounded-3xl  w-full h-full"
      ></div>
    </>
  );
};

export default Map;
