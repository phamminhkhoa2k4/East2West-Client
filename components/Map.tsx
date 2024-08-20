"use client";
import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point as OlPoint } from "ol/geom";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import {
  Style,
  Icon,
  Text,
  Fill,
  Stroke,
  Circle as CircleStyle,
} from "ol/style";
import { Extent, getCenter } from "ol/extent";
import { getDistance } from "ol/sphere";
interface OpenLayersMapProps {
  coordinates: [number, number][];
}

const OpenLayersMap: React.FC<OpenLayersMapProps> = ({ coordinates }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState<number | null>(null);

  useEffect(() => {
    const features = coordinates.map(
      ([longitude, latitude]) =>
        new Feature({
          geometry: new OlPoint(fromLonLat([longitude, latitude])),
          name: (1).toString(),
        })
    );

    const vectorSource = new VectorSource({
      features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      //   style: new Style({
      //     image: new Icon({
      //       src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
      //       scale: 2,
      //     }),
      //   }),
      style: (feature) => {
        const text = feature.get("name");
        return [
          new Style({
            image: new CircleStyle({
              radius: 20, // Adjust radius to fit the text background
              fill: new Fill({ color: "#fff" }), // Background fill color
              stroke: new Stroke({ color: "#aaa", width: 1 }), // Border stroke color
            }),
          }),
          new Style({
            text: new Text({
              text: text,
              offsetY: 0,
              font: "bold 12px Arial",
              fill: new Fill({ color: "#000" }), // Text fill color
              backgroundFill: new Fill({ color: "transparent" }), // Transparent background for the text
              padding: [5, 8, 5, 8], // Top, right, bottom, left padding
              overflow: true, // Ensure the text overflows to fit the background
            }),
          }),
        ];
      },
    });

    const map = new Map({
      target: mapRef.current!,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(coordinates[0]),
        zoom: 13,
      }),
    });

    // if (coordinates.length > 1) {
    //   const extent: Extent = vectorSource.getExtent();
    //   const center = getCenter(extent);
    //   map.getView().setCenter(center);
    //   map.getView().fit(extent, { padding: [50, 50, 50, 50] }); // Adjust padding as needed
    // }

     const calculateRadius = () => {
       const view = map.getView();
       const center = view.getCenter();
       if (center) {
         const lonLatCenter = toLonLat(center);
         const resolution = view.getResolution();
         const extent = view.calculateExtent();
         const bottomLeft = toLonLat([extent[0], extent[1]]);
         const distance = getDistance(lonLatCenter, bottomLeft);
         setRadius(distance);
         console.log(distance);
       }
     };


    map.on("moveend", calculateRadius);
    calculateRadius(); // Initial calculation
    // Clean up on component unmount
    return () => {
      map.setTarget();
      map.un("moveend", calculateRadius);
    };
  }, [coordinates]);

  return (
    <>
      <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
      <div>{radius}</div>
    </>
  );
};

export default OpenLayersMap;
