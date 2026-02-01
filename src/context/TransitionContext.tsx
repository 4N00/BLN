"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface ImageRect {
  top: number;
  left: number;
  width: number;
  height: number;
  scrollY: number;
}

interface TransitionData {
  slug: string;
  image: string;
  rect: ImageRect;
}

interface TransitionContextType {
  transitionData: TransitionData | null;
  setTransitionData: (data: TransitionData | null) => void;
  clearTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [transitionData, setTransitionData] = useState<TransitionData | null>(null);

  const clearTransition = useCallback(() => {
    setTransitionData(null);
  }, []);

  return (
    <TransitionContext.Provider value={{ transitionData, setTransitionData, clearTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
