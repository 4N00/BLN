"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePageTransition, transitionEase } from "@/context/PageTransitionContext";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { isExiting } = usePageTransition();
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      className="bg-white min-h-screen flex items-center justify-center px-6 sm:px-12"
      animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: transitionEase }}
    >
      <div className="max-w-[1200px] w-full py-32">
        {/* Main content */}
        <div className="text-center">
          {/* Label */}
          <motion.span
            className="text-xs uppercase tracking-[0.4em] text-gray-700 mb-8 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={{ duration: 0.8 }}
          >
            {t("label")}
          </motion.span>

          {/* Title */}
          <h1 className="font-serif text-[10vw] sm:text-[8vw] md:text-[6vw] leading-[0.9] tracking-tighter mb-12">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "100%" }}
                animate={{ y: isMounted ? 0 : "100%" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {t("title")}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block italic text-gray-700"
                initial={{ y: "100%" }}
                animate={{ y: isMounted ? 0 : "100%" }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {t("titleItalic")}
              </motion.span>
            </span>
          </h1>

          {/* Divider */}
          <motion.div
            className="w-16 h-[1px] bg-gray-300 mx-auto mb-12"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isMounted ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          {/* Email */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-gray-700 block mb-4">
              {t("emailLabel")}
            </span>
            <a
              href={`mailto:${tCommon("email")}`}
              className="font-serif text-3xl sm:text-4xl md:text-5xl hover:text-gray-500 transition-colors duration-300 group"
            >
              {tCommon("email")}
              <span className="block h-[1px] w-0 group-hover:w-full bg-current mx-auto transition-all duration-500 mt-2" />
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-gray-700 block mb-6">
              {t("socialLabel")}
            </span>
            <div className="flex justify-center gap-8 sm:gap-12">
              <a
                href="https://instagram.com/loesnooitgedagt"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="text-sm sm:text-base uppercase tracking-[0.15em] hover:text-gray-500 transition-colors duration-300">
                  {tCommon("instagram")}
                </span>
                <span className="block h-[1px] w-0 group-hover:w-full bg-current transition-all duration-300 mt-1" />
              </a>
              <a
                href="https://linkedin.com/in/loesnooitgedagt"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="text-sm sm:text-base uppercase tracking-[0.15em] hover:text-gray-500 transition-colors duration-300">
                  {tCommon("linkedin")}
                </span>
                <span className="block h-[1px] w-0 group-hover:w-full bg-current transition-all duration-300 mt-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
