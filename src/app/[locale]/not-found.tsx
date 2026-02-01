"use client";

import { motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Common");

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-[20vw] sm:text-[15vw] md:text-[12vw] leading-none mb-6">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-light">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <TransitionLink
            href="/"
            className="inline-block text-sm uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            Return Home
          </TransitionLink>
        </motion.div>
      </div>
    </div>
  );
}
