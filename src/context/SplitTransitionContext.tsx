"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface SplitTransitionData {
  splitY: number;
  targetRoute: string;
  targetCategory: string;
  scrollPosition: number;
  phase: "idle" | "covering" | "splitting" | "complete";
  direction: "forward" | "backward";
}

interface SplitTransitionContextType {
  transitionData: SplitTransitionData | null;
  startSplitTransition: (data: Omit<SplitTransitionData, "phase">) => void;
  setPhase: (phase: SplitTransitionData["phase"]) => void;
  clearTransition: () => void;
  isTransitioning: boolean;
}

const SplitTransitionContext = createContext<SplitTransitionContextType | null>(null);

export function SplitTransitionProvider({ children }: { children: ReactNode }) {
  const [transitionData, setTransitionData] = useState<SplitTransitionData | null>(null);

  const startSplitTransition = useCallback(
    (data: Omit<SplitTransitionData, "phase">) => {
      setTransitionData({
        ...data,
        phase: "covering", // Start with covering phase
      });
    },
    []
  );

  const setPhase = useCallback((phase: SplitTransitionData["phase"]) => {
    setTransitionData((prev) => (prev ? { ...prev, phase } : null));
  }, []);

  const clearTransition = useCallback(() => {
    setTransitionData(null);
  }, []);

  const isTransitioning = transitionData !== null && transitionData.phase !== "idle";

  return (
    <SplitTransitionContext.Provider
      value={{
        transitionData,
        startSplitTransition,
        setPhase,
        clearTransition,
        isTransitioning,
      }}
    >
      {children}
    </SplitTransitionContext.Provider>
  );
}

export function useSplitTransition() {
  const context = useContext(SplitTransitionContext);
  if (!context) {
    throw new Error("useSplitTransition must be used within a SplitTransitionProvider");
  }
  return context;
}
