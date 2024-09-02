  import React, { useEffect, useRef, useState } from "react";

  declare global {
    interface Window {
      H: any;
    }
  }

  const HereMap: React.FC = () => {
    const KEYSECRET = process.env.NEXT_PUBLIC_HERE_API_KEY;
    const mapRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [map, setMap] = useState<any>(null);
    const [marker, setMarker] = useState<any>(null);

    useEffect(() => {
      if (typeof window !== "undefined" && !window.H) {
        loadMapScript();
      } else if (window.H) {
        initMap();
      }
    }, []);
    
    const BehaviorMap = () => {
      if (window.H && window.H.mapevents) {
        new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      } else {
        console.error("mapevents is not available in window.H");
      }
    };
    useEffect(() => {
      if (map) {
        BehaviorMap();
      }
    }, [map]);

    const loadMapScript = () => {
      const scripts = [
        "https://js.api.here.com/v3/3.1/mapsjs-core.js",
        "https://js.api.here.com/v3/3.1/mapsjs-service.js",
        "https://js.api.here.com/v3/3.1/mapsjs-ui.js",
        "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js",
      ];

      const loadScript = (index: number) => {
        if (index < scripts.length) {
          const script = document.createElement("script");
          script.src = scripts[index];
          script.async = true;
          script.onload = () => loadScript(index + 1);
          script.onerror = (e) => console.error(`Failed to load script: ${scripts[index]}`, e);
          document.body.appendChild(script);
        } else {
          initMap();
        }
      };

      loadScript(0);
    };

    const initMap = () => {
      if (mapRef.current && !mapLoaded && window.H) {
        const platform = new window.H.service.Platform({
          apikey: KEYSECRET,
        });

        const defaultLayers = platform.createDefaultLayers();

        const newMap = new window.H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            center: { lat: 21.0285, lng: 105.8542 },
            zoom: 10,
            pixelRatio: window.devicePixelRatio || 1,
          }
        );

        const ui = window.H.ui.UI.createDefault(newMap, defaultLayers);
        // new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(newMap));

        setMap(newMap);
        setMapLoaded(true);

        window.addEventListener("resize", () => newMap.getViewPort().resize());

        // Thêm marker mặc định
        const defaultMarker = new window.H.map.Marker({
          lat: 21.0285,
          lng: 105.8542,
        });
        newMap.addObject(defaultMarker);

        console.log("Map and default marker initialized:", newMap, defaultMarker);
      }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);

      if (query.length >= 3 && window.H) {
        const platform = new window.H.service.Platform({
          apikey: KEYSECRET,
        });
        const service = platform.getSearchService();
        service.autosuggest(
          {
            q: query,
            at: "0,0",
          },
          (result: { items: any[] }) => {
            setSuggestions(result.items);
          },
          (error: Error) => {
            console.error("Error while searching:", error);
          }
        );
      } else {
        setSuggestions([]);
      }
    };

    const createMarker = (lat: number, lng: number) => {
      return new window.H.map.Marker({ lat, lng });
    };

    const clearMarkers = () => {
      if (map) {
        const objects = map.getObjects();
        objects.forEach((obj: any) => {
          if (obj instanceof window.H.map.Marker) {
            map.removeObject(obj);
          }
        });
      }
    };

    const handleSelectLocation = (item: any) => {
      if (!mapLoaded || !map) {
        console.error("Map has not been initialized yet.");
        return;
      }

      let lat: number, lng: number, title: string;

      if (item.position && item.position.lat && item.position.lng) {
        lat = item.position.lat;
        lng = item.position.lng;
        title = item.title;
      } else if (Array.isArray(item.position) && item.position.length >= 2) {
        [lat, lng] = item.position;
        title = item.title;
      } else if (item.mapView && item.mapView.center) {
        lat = item.mapView.center.latitude;
        lng = item.mapView.center.longitude;
        title = item.title;
      } else {
        console.error("Unable to determine location from returned data:", item);
        return;
      }

      console.log("Selected location:", lat, lng, title);

      // Update the search query with the selected location's title
      setSearchQuery(title);

      // Clear existing markers
      clearMarkers();

      // Create and add new marker
      const newMarker = createMarker(lat, lng);
      console.log("Creating new marker with position:", { lat, lng });
      map.addObject(newMarker);

      // new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

      // Verify marker added to map
      const markers = map.getObjects();
      console.log("Markers on map:", markers);

      // Update state with new marker
      setMarker(newMarker);

      // Center the map on the selected location and zoom in
      map.setCenter({ lat, lng });
      map.setZoom(15);

      // Force map to redraw
      map.getViewPort().resize();
    };

    return (
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a location"
        />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((item, index) => (
              <li onClick={() => handleSelectLocation(item)} key={index}>
                {item.title}
              </li>
            ))}
          </ul>
        )}
        <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>
      </div>
    );
  };

  export default HereMap;
