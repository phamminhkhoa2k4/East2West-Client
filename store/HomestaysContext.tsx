"use client"
import { createContext, ReactNode, useContext, useState } from "react";

type HomestaysContextType = {
  homestaysContext: Homestay[] | null;
  setHomestaysContext: (value: Homestay[] | null) => void;
  is:boolean;
  setIs: (value : boolean) => void;
};

const HomestaysContext = createContext<HomestaysContextType | undefined>(
  undefined
);

export const HomestaysProvider = ({ children }: { children: ReactNode }) => {
  const [homestaysContext, setHomestaysContext] = useState<Homestay[] | null>([]);
  const [is,setIs] = useState<boolean>(false);
  return (
    <HomestaysContext.Provider
      value={{ homestaysContext, setHomestaysContext, is,setIs }}
    >
      {children}
    </HomestaysContext.Provider>
  );
};


export const useHomestaysContext = () => {
    const context = useContext(HomestaysContext);
    if(!context){
        throw new Error(
          "useHomestaysContext must be used within a HomestaysProvider"
        );
    }

    return context;
}