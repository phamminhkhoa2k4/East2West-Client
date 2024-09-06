import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type StructureType = {
  structureid: number;
  structurename: string;
};

type StructureProps = {
  structures: StructureType[];
  setStructuresId : (value : number) => void;
  structuresId : number | undefined;
};

export function CarouselType({ structures, setStructuresId , structuresId }: StructureProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full "
    >
      <CarouselContent>
        {structures?.map((structure) => (
          <CarouselItem
            key={structure.structureid}
            className="md:basis-1/6 lg:basis-1/12"
            onClick={() => setStructuresId(structure.structureid)}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col gap-2 items-center justify-center p-2">
                  <span className="text-sm font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </span>
                  <span className={`text-sm font-semibold ${structuresId === structure.structureid ? "text-blue-500" :""}`}>
                    {structure.structurename}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}