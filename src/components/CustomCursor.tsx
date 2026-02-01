"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isGalleryImage, setIsGalleryImage] = useState(false);
  const [isNavLink, setIsNavLink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smoother spring config - lower stiffness and higher damping for less jitter
  const springConfig = { damping: 35, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Spring for scale animation
  const scale = useMotionValue(1);
  const scaleSpring = useSpring(scale, { damping: 20, stiffness: 300 });

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");

      // Check if hovering over a gallery image
      const galleryImage = target.closest("[data-gallery-image]");
      setIsGalleryImage(!!galleryImage);

      // Check if hovering over a nav link
      const navLink = target.closest(".nav-link");
      setIsNavLink(!!navLink);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY]);

  // Update scale based on state
  useEffect(() => {
    if (isGalleryImage) {
      scale.set(5);
    } else if (isNavLink) {
      scale.set(3.5);
    } else if (isPointer) {
      scale.set(2.5);
    } else {
      scale.set(1);
    }
  }, [isGalleryImage, isNavLink, isPointer, scale]);

  // Cursor size
  const size = 16;

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        "fixed left-0 top-0 rounded-full border pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center",
        isGalleryImage ? "bg-white border-transparent" : "bg-white border-white",
        isPointer && !isGalleryImage && "bg-opacity-20 border-opacity-0"
      )}
      style={{
        width: size,
        height: size,
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.span
        className="text-black font-light leading-none"
        style={{ fontSize: "8px" }}
        animate={{ opacity: isGalleryImage ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        +
      </motion.span>
    </motion.div>
  );
}
