// declare global {
//   interface Window {
//     H: {
//       service: {
//         Platform: new (options: { apikey: string }) => {
//           createDefaultLayers: () => any;
//           getSearchService: () => {
//             autosuggest: (
//               params: { q: string; at: string },
//               success: (result: { items: any[] }) => void,
//               error: (error: Error) => void
//             ) => void;
//           };
//         };
//       };
//       Map: any;
//       ui: {
//         UI: {
//           createDefault: (map: any, layers: any) => any;
//         };
//       };
//       mapevents: {
//         MapEvents: any;
//         Behavior: any;
//       };
//     };
//   }
// }


// declare namespace H {
//   export interface Map {
//     setCenter(center: H.geo.Point): void;
//     addObject(object: H.map.Object): void;
//     removeObject(object: H.map.Object): void;
//   }

//   export namespace mapevents {
//     export class MapEvents {
//       constructor(map: H.Map);
//     }
//     export class Behavior {
//       constructor(events: MapEvents);
//     }
//   }

//   export namespace service {
//     export class Platform {
//       constructor(options: { apikey: string });
//       createDefaultLayers(): {
//         vector: {
//           normal: {
//             map: any;
//           };
//         };
//       };
//     }
//   }

//   export namespace map {
//     export class Marker {
//       constructor(position: H.geo.Point);
//     }
//   }

//   export namespace geo {
//     export interface Point {
//       lat: number;
//       lng: number;
//     }
//   }

//   export namespace map {
//     export class Object {}
//   }
// }


  

// declare const H: any;

// declare module "here-maps" {
//   export { H };
// }


// types/here_maps.d.ts

// types/here_maps.d.ts

// declare namespace H {
//   namespace service {
//     class Platform {
//       constructor(options: { apikey: string });
//       createDefaultLayers(): any;
//     }
//   }

//   namespace map {
//     class Map {
//       constructor(
//         container: HTMLElement,
//         layers: any,
//         options: { zoom: number; center: { lat: number; lng: number } }
//       );
//       addObject(object: any): void;
//       removeObject(object: any): void;
//       screenToGeo(x: number, y: number): { lat: number; lng: number };
//       addEventListener(event: string, handler: (event: any) => void): void;
//     }

//     class Marker {
//       constructor(geometry: { lat: number; lng: number });
//       setGeometry(geometry: { lat: number; lng: number }): void;
//       getGeometry(): { lat: number; lng: number };
//     }
//   }

//   namespace mapevents {
//     class Behavior {
//       constructor(mapEvents: any);
//     }
//     class MapEvents {
//       constructor(map: any);
//     }
//     interface Event {
//       currentPointer: { viewportX: number; viewportY: number };
//     }
//   }

//   namespace ui {
//     class UI {
//       static createDefault(map: any, layers: any): UI;
//     }
//   }
// }




declare namespace H {
  export class Map {
    constructor(
      element: HTMLElement,
      baseLayer: H.map.layer.Layer,
      options?: H.Map.Options
    );
    setCenter(center: H.geo.Point): void;
    setZoom(zoom: number): void;
    addObject(object: H.map.Object): void;
    removeObject(object: H.map.Object): void;
    getCenter(): H.geo.Point;
    getZoom(): number;
    getObjects(): H.map.Object[];
    removeObjects(objects: H.map.Object[]): void;
    dispose(): void;
    getUI(): H.ui.UI; // Bổ sung phương thức getUI để lấy UI
  }

  export namespace Map {
    export interface Options {
      center?: H.geo.Point;
      zoom?: number;
      layers?: H.map.layer.Layer[];
      pixelRatio?: number;
    }
  }

  export namespace mapevents {
    export class MapEvents {
      constructor(map: H.Map);
    }
    export class Behavior {
      constructor(events: MapEvents);
    }
  }

  export namespace service {
    export class Platform {
      constructor(options: { apikey: string });
      createDefaultLayers(): {
        raster: {
          normal: {
            map: H.map.layer.TileLayer;
          };
        };
        vector: {
          normal: {
            map: H.map.layer.Layer;
          };
        };
      };
    }
  }

  export namespace map {
    export class Marker extends H.map.Object {
      constructor(position: H.geo.Point, options?: H.map.Marker.Options);
      setData(data: any): void;
      getData(): any;
      getGeometry(): H.geo.Point;
    }

    export namespace Marker {
      export interface Options {
        icon?: H.map.Icon;
        min?: number;
        max?: number;
        zIndex?: number;
      }
    }

    export class Object extends H.util.EventTarget {
      getGeometry?(): H.geo.Point | H.geo.LineString | H.geo.Polygon | null;
      getData?(): any;
    }

    export namespace layer {
      export class Layer {}
      export class TileLayer extends Layer {}
    }

    export class Icon {
      constructor(svgMarkup: string, options?: H.map.Icon.Options);
    }

    export namespace Icon {
      export interface Options {
        size?: H.math.Size;
        anchor?: H.math.Point;
      }
    }
  }

  export namespace geo {
    export interface Point {
      lat: number;
      lng: number;
    }
  }

  export namespace math {
    export class Size {
      constructor(width: number, height: number);
      width: number;
      height: number;
    }

    export class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
    }
  }

  export namespace ui {
    export class UI {
      static createDefault(map: H.Map, layers: any): H.ui.UI;
      addBubble(bubble: H.ui.InfoBubble): void;
    }

    export class InfoBubble extends H.map.Object {
      constructor(position: H.geo.Point, options: { content: string });
      setPosition(position: H.geo.Point): void;
    }
  }

  export namespace util {
    export class EventTarget {
      addEventListener(
        type: string,
        callback: (evt: Event) => void,
        opt_capture?: boolean
      ): void;
      removeEventListener(
        type: string,
        callback: (evt: Event) => void,
        opt_capture?: boolean
      ): void;
      dispatchEvent(evt: Event | string): void;
    }
  }
}

