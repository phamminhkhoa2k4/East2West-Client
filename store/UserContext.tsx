"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  userId: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  address?: string;
  phone?: string;
  roles: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (value: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
