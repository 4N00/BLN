"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useSplitTransition } from "@/context/SplitTransitionContext";
import { createPortal } from "react-dom";

export default function SplitTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const { transitionData, setPhase, clearTransition } = useSplitTransition();
  const hasNavigated = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ vh: 800, vw: 1200 });

  useEffect(() => {
    setMounted(true);
    setDimensions({
      vh: window.innerHeight,
      vw: window.innerWidth,
    });

    const handleResize = () => {
      setDimensions({
        vh: window.innerHeight,
        vw: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll and hide nav when transition starts
  useEffect(() => {
    if (transitionData?.phase === "covering") {
      const lenis = (window as any).lenis;
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";

      // Hide the navigation during transition
      const nav = document.querySelector("nav");
      if (nav) {
        (nav as HTMLElement).style.transition = "opacity 0.2s ease";
        (nav as HTMLElement).style.opacity = "0";
      }
    }
  }, [transitionData?.phase]);

  // Orchestrate the transition
  useEffect(() => {
    if (!transitionData || transitionData.phase !== "covering") return;

    const forceScrollToTop = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const main = document.querySelector("main");
      if (main) main.scrollTop = 0;
    };

    const orchestrate = async () => {
      // Wait for cover animation to complete (screen is now fully white)
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Navigate while screen is covered
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        router.push(transitionData.targetRoute);
      }

      // Keep forcing scroll to top
      const scrollInterval = setInterval(forceScrollToTop, 30);
      forceScrollToTop();

      // Wait for new page to load (2 seconds total from click)
      await new Promise((resolve) => setTimeout(resolve, 1600));

      // Now split the cover open to reveal the new page
      setPhase("splitting");
      forceScrollToTop();

      // Wait for split animation (1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Done
      setPhase("complete");

      // Stop forcing scroll
      clearInterval(scrollInterval);
      forceScrollToTop();

      // Cleanup
      await new Promise((resolve) => setTimeout(resolve, 100));
      clearTransition();
      hasNavigated.current = false;

      // Restore navigation
      const nav = document.querySelector("nav");
      if (nav) {
        (nav as HTMLElement).style.opacity = "1";
      }

      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    };

    orchestrate();
  }, [transitionData?.phase, transitionData?.targetRoute, setPhase, clearTransition, router]);

  // Reset on route change
  useEffect(() => {
    hasNavigated.current = false;
  }, [pathname]);

  if (!mounted) return null;

  const isActive = transitionData && transitionData.phase !== "idle" && transitionData.phase !== "complete";
  const splitY = transitionData?.splitY ?? dimensions.vh / 2;
  const { vh } = dimensions;

  const isCovering = transitionData?.phase === "covering";
  const isSplitting = transitionData?.phase === "splitting";

  // Render to body using portal for highest z-index control
  return createPortal(
    <AnimatePresence>
      {isActive && (
        <>
          {/* Top panel */}
          <motion.div
            key="top-panel"
            className="fixed left-0 right-0 z-[9998] bg-white"
            style={{
              top: 0,
              height: splitY,
            }}
            initial={{ y: -splitY }}
            animate={{
              y: isCovering ? 0 : isSplitting ? -splitY - 50 : -splitY,
            }}
            exit={{ y: -splitY - 50 }}
            transition={{
              duration: isCovering ? 0.4 : 1,
              ease: isCovering ? [0.4, 0, 0.2, 1] : [0.76, 0, 0.24, 1],
            }}
          />

          {/* Bottom panel */}
          <motion.div
            key="bottom-panel"
            className="fixed left-0 right-0 z-[9998] bg-white"
            style={{
              top: splitY,
              height: vh - splitY + 50,
            }}
            initial={{ y: vh - splitY + 50 }}
            animate={{
              y: isCovering ? 0 : isSplitting ? vh - splitY + 50 : vh - splitY + 50,
            }}
            exit={{ y: vh - splitY + 50 }}
            transition={{
              duration: isCovering ? 0.4 : 1,
              ease: isCovering ? [0.4, 0, 0.2, 1] : [0.76, 0, 0.24, 1],
            }}
          />

          {/* Split line - appears when panels meet */}
          <motion.div
            key="split-line"
            className="fixed left-0 right-0 z-[9999] pointer-events-none h-[1px] bg-black/10"
            style={{ top: splitY }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: isCovering ? 1 : 0,
              scaleX: isCovering ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: isCovering ? 0.3 : 0,
            }}
          />
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
