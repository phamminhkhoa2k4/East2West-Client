"use client";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultList";
import { Hotel } from "@/types/hotel";

type SearchType = {
  setHotel : (value : Hotel) => void;
};

export default function Search({ setHotel }: SearchType) {

  return (
    <>
      <div className="flex justify-center">
        <div className="border-2 p-12 rounded-xl mt-5">
          <SearchBar setHotel={setHotel} />
        </div>
      </div>
    </>
  );
}
