"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Định nghĩa kiểu Homestay
export type Homestay = {
  wardId: number | null;
  structureId: number | null;
  userId: number | null;
  longitude: number;
  latitude: number;
  type: string;
  title: string;
  address: string;
  geom: string;
  photos: string[];
  description: string;
  exactInfo: string;
  cleaningFee: number;
  isApproved: boolean;
  maxGuest: number;
  perkIds: number[];
  cityProvinceName: string;
  districtName: string;
  wardName: string;
  pricePerNight: number;
};

// Định nghĩa HostContextType
interface HostContextType {
  state: { data: Homestay } | null;
  setState: (state: { data: Homestay } | null) => void;
}

// Tạo HostContext
const HostContext = createContext<HostContextType | undefined>(undefined);

// Provider để bao bọc các component con
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

// Hook để sử dụng HostContext
export function useHostContext() {
  const context = useContext(HostContext);
  if (!context) {
    throw new Error("useHostContext must be used within a HostProvider");
  }
  return context;
}
