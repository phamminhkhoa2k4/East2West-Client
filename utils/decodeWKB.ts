
import wkx from "wkx";
import { Point } from "geojson";

export function decodeWKB(wkb: string): Point {
  const buffer = Buffer.from(wkb, "hex");
  const geometry = wkx.Geometry.parse(buffer);
  return geometry.toGeoJSON() as Point;
}
