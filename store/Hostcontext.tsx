"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";


export type Homestay = {
  homestayid: number | null;
  wardName: string; //
  districtName: string; //
  cityProvinceName: string; //
  longitude: number; //
  latitude: number; //
  geom: string | null;
  structureId: number | null; //
  userId: number | null; //
  type: string; //
  title: string; //
  address: string; //
  photos: string[]; //
  description: string; //
  extraInfo: string; //
  cleaningFee: number; //
  isApproved: boolean;
  maxGuest: number; //
  perkIds: number[]; //
  pricePerNight: number; //
  instant: boolean;
  beds:number;
  bathroom:number;
  room: number | null;
  availability: any ;
};


interface HostContextType {
  state: { data: Homestay } | null;
  setState: (state: { data: Homestay } | null) => void;
}


const HostContext = createContext<HostContextType | undefined>(undefined);


export function HostProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ data: Homestay } | null>(null);


  useEffect(() => {
    const storedState = localStorage.getItem("hostState");
    if (storedState) {
      setState(JSON.parse(storedState));
    }
  }, []);


  useEffect(() => {
    if (state) {
      localStorage.setItem("hostState", JSON.stringify(state));
    } else {
      localStorage.removeItem("hostState");
    }
  }, [state]);

  return (
    <HostContext.Provider value={{ state, setState }}>
      {children}
    </HostContext.Provider>
  );
}


export function useHostContext() {
  const context = useContext(HostContext);
  if (!context) {
    throw new Error("useHostContext must be used within a HostProvider");
  }
  return context;
}
