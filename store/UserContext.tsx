"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User type
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

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: (value: User | null) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the provider component
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

// Create a custom hook to use the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
