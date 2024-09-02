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


declare namespace H {
  export interface Map {
    setCenter(center: H.geo.Point): void;
    addObject(object: H.map.Object): void;
    removeObject(object: H.map.Object): void;
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
        vector: {
          normal: {
            map: any;
          };
        };
      };
    }
  }

  export namespace map {
    export class Marker {
      constructor(position: H.geo.Point);
    }
  }

  export namespace geo {
    export interface Point {
      lat: number;
      lng: number;
    }
  }

  export namespace map {
    export class Object {}
  }
}


  

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

