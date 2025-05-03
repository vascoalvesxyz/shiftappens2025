"use client";

import { createContext, useContext, useState } from "react";

interface ModelSelectorContextType {
  showModelSelector: boolean;
  toggleModelSelector: () => void;
}

const ModelSelectorContext = createContext<
  ModelSelectorContextType | undefined
>(undefined);

export function ModelSelectorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModelSelector, setShowModelSelector] = useState(false);

  const toggleModelSelector = () => {
    setShowModelSelector((prev) => !prev);
  };

  return (
    <ModelSelectorContext.Provider
      value={{ showModelSelector, toggleModelSelector }}
    >
      {children}
    </ModelSelectorContext.Provider>
  );
}

export function useModelSelector() {
  const context = useContext(ModelSelectorContext);
  if (context === undefined) {
    throw new Error(
      "useModelSelector must be used within a ModelSelectorProvider",
    );
  }
  return context;
}
