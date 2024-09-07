"use client";
import React, { createContext, useContext, useState, ReactNode, Children } from "react";


type HomestaySearch = {
  longitude: number | undefined;
  latitude: number | undefined;
  radius: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  guests: number;
};

type HomestaySearchContext = {
    searchHomestay: HomestaySearch | null;
    setSearchHomestay : (value : HomestaySearch | null) => void;
}

const SearchHomestayContext = createContext<HomestaySearchContext|undefined>(undefined);

export const SearchHomestayProvider = ({children} : {children : ReactNode}) => {
    const [searchHomestay ,setSearchHomestay]= useState<HomestaySearch | null>(null);

    return (
      <>
        <SearchHomestayContext.Provider value={{ searchHomestay , setSearchHomestay}}>
          {children}
        </SearchHomestayContext.Provider>
      </>
    );
}

export const useSearchHomestayContext = () => {
    const context  = useContext(SearchHomestayContext);
    if(!context){
        throw new Error(
          "useSearchHomestayContext must be used within a SearchHomestayProvider"
        );
    }
    return context;
}