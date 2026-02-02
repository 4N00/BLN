"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  fetchPriority?: "high" | "low" | "auto";
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className = "",
  sizes = "100vw",
  quality = 85,
  objectFit = "cover",
  fetchPriority = "auto",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority); // If priority, load immediately
  const imgRef = useRef<HTMLDivElement>(null);

  // Enhanced Intersection Observer for better lazy loading control
  useEffect(() => {
    if (priority || typeof window === 'undefined') {
      return; // Skip observer for priority images
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Stop observing once visible
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      <AnimatePresence>
        {isLoading && isInView && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-100 animate-pulse"
          />
        )}
      </AnimatePresence>

      {!hasError && isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          quality={quality}
          className={`${fill ? "" : "w-full h-full"} object-${objectFit} transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          loading={priority ? "eager" : "lazy"}
          // @ts-ignore - fetchPriority is valid but TypeScript may not recognize it yet
          fetchPriority={fetchPriority}
        />
      ) : hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-700 text-sm">Failed to load image</span>
        </div>
      ) : null}
    </div>
  );
}
