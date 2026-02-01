"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl leading-none mb-6">
            Oops!
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-light">
            Something went wrong
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            We encountered an unexpected error. Please try again or return to the homepage.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-block text-sm uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              Try Again
            </button>
            <TransitionLink
              href="/"
              className="inline-block text-sm uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              Return Home
            </TransitionLink>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
