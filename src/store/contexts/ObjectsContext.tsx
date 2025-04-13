"use client";

import React, { createContext, useContext, useState } from "react";
import { focus } from "@/store/data/inFocus";

// Loo kontekst
const ObjectsContext = createContext<{
  _o: typeof focus,
  setObjects: React.Dispatch<React.SetStateAction<typeof focus>>;
} | null>(null);

// Konteksti pakkuja komponent
export const ObjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [_o, setObjects] = useState<typeof focus>(focus);

  return (
    <ObjectsContext.Provider value={{ _o, setObjects }}>
      {children}
    </ObjectsContext.Provider>
  );
};


// Kohandatud hook konteksti kasutamiseks
export const useObjects = () => {
  const context = useContext(ObjectsContext);
  if (!context) {
    throw new Error("useObjects must be used within an ObjectsProvider");
  }
  return context;
};