"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface PageTransitionContextType {
  isExiting: boolean;
  navigateTo: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

// Exit animation duration in ms
const EXIT_DURATION = 600;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);

  // Reset isExiting when the pathname actually changes
  useEffect(() => {
    if (pathname !== previousPathRef.current) {
      // Route has changed, reset exit state
      setIsExiting(false);
      previousPathRef.current = pathname;

      // Re-enable scroll
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
    }
  }, [pathname]);

  const navigateTo = useCallback((href: string) => {
    // Don't navigate if already exiting
    if (isExiting) return;

    // Start exit animation
    setIsExiting(true);

    // Lock scroll during transition
    const lenis = (window as any).lenis;
    if (lenis) lenis.stop();

    // Wait for exit animation, then navigate
    setTimeout(() => {
      router.push(href);
      // isExiting will be reset by the useEffect when pathname changes
    }, EXIT_DURATION);
  }, [isExiting, router]);

  return (
    <PageTransitionContext.Provider value={{ isExiting, navigateTo }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}

// Easing curve for animations
export const transitionEase = [0.22, 1, 0.36, 1];

// Stagger calculator for exit animations
export const getExitDelay = (index: number, baseDelay = 0) => baseDelay + index * 0.03;
