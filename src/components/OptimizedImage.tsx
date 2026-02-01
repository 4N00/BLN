"use client";

import Image from "next/image";
import { useState } from "react";
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
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-100 animate-pulse"
          />
        )}
      </AnimatePresence>

      {!hasError ? (
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
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-700 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
