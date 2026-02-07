"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { usePageTransition, transitionEase } from "@/context/PageTransitionContext";
import { useTranslations } from "next-intl";

// Animated text that reveals character by character
function AnimatedText({
  children,
  className = "",
  delay = 0
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span className={className}>
      {children.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.02,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Simple image with clean zoom effect like home page
function SimpleImage({
  src,
  alt,
  className = "",
  aspectRatio = "3/4",
}: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

// Parallax section wrapper
function ParallaxSection({
  children,
  className = "",
  speed = 0.5
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const ySpring = useSpring(y, { damping: 30, stiffness: 100 });

  return (
    <motion.div ref={ref} className={className} style={{ y: ySpring }}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { isExiting } = usePageTransition();
  const t = useTranslations("About");

  const stats = t.raw("stats") as Array<{ number: string; label: string }>;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Only start fading at 60% scroll, complete at 100%
  const heroOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0.5, 1], [1, 0.98]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="bg-white"
      animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: transitionEase }}
    >
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center px-6 sm:px-12 pt-32 pb-20 max-w-[1800px] mx-auto relative"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Title */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isMounted ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-6 block">
                {t("label")}
              </span>
            </motion.div>

            <h1 className="font-serif text-[12vw] sm:text-[8vw] lg:text-[6vw] leading-[0.9] tracking-tighter mb-8">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: isMounted ? 0 : "100%" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t("hero.title1")}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block italic"
                  initial={{ y: "100%" }}
                  animate={{ y: isMounted ? 0 : "100%" }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t("hero.title2")}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: isMounted ? 0 : "100%" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t("hero.title3")}{" "}
                  <span className="italic text-gray-700">{t("hero.title3Italic")}</span>
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Side Image */}
          <motion.div
            className="lg:col-span-5 lg:row-span-2"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 60 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <SimpleImage
              src="/images/over-mij/over-mij-fotografie-1.jpg"
              alt="Loes Nooitgedagt - Professionele fotografe gespecialiseerd in lifestyle, bruiloft en portretfotografie"
              aspectRatio="3/4"
            />
          </motion.div>

          {/* Intro Text */}
          <motion.div
            className="lg:col-span-5 lg:col-start-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
              {t("intro1")}
            </p>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {t("intro2")}
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border border-gray-300 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div className="w-1 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Philosophy Section */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <ParallaxSection className="lg:col-span-5" speed={0.3}>
            <SimpleImage
              src="/images/over-mij/over-mij-fotografie-2.jpg"
              alt="Fotografie filosofie en werkwijze van Loes Nooitgedagt - Authentieke momenten vastleggen"
              aspectRatio="4/5"
            />
          </ParallaxSection>

          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
            <motion.span
              className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-6 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {t("philosophy.label")}
            </motion.span>

            <motion.h2
              className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {t("philosophy.title")}
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("philosophy.text1")}
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("philosophy.text2")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="px-6 sm:px-12 max-w-[1800px] mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-gray-900">
              CAPTURING LIFE | LOVE | STYLE | YOU
            </h2>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 sm:py-48 px-6 sm:px-12 border-t border-gray-200">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div>
              <motion.span
                className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-6 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Get in Touch
              </motion.span>

              <motion.h2
                className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {t("cta.title")} <br />
                <span className="italic">{t("cta.titleItalic")}</span>
              </motion.h2>
            </div>

            <motion.div
              className="flex flex-col items-start lg:items-end gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="mailto:hello@loesnooitgedagt.com"
                className="font-serif text-3xl sm:text-4xl hover:italic transition-all duration-300 group"
              >
                hello@loesnooitgedagt.com
                <span className="block h-[1px] w-0 group-hover:w-full bg-black transition-all duration-500" />
              </a>

              <div className="flex gap-8 mt-4">
                <a
                  href="https://www.instagram.com/byloesnooitgedagt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest hover:text-gray-500 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/in/loes-nooitgedagt-72006314b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest hover:text-gray-500 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
