"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePageTransition, transitionEase } from "@/context/PageTransitionContext";
import TransitionLink from "@/components/TransitionLink";
import { useTranslations } from "next-intl";

// Investment packages data
const packages = [
  {
    id: 1,
    title: "Lifestyle",
    subtitle: "I capture the beauty in real life",
    price: "375",
    prefix: "Vanaf",
    description: "Perfect for personal portraits, family moments, and lifestyle content that tells your unique story.",
    features: ["2-hour session", "20+ edited images", "Online gallery", "Print rights included"],
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    href: "/portfolio/lifestyle",
  },
  {
    id: 2,
    title: "Wedding",
    subtitle: "Your love story, captured",
    price: "1995",
    prefix: "Vanaf",
    description: "From intimate ceremonies to grand celebrations, every precious moment documented with artistry and heart.",
    features: ["Full day coverage", "300+ edited images", "Engagement session", "Premium album"],
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    href: "/portfolio/wedding",
  },
  {
    id: 3,
    title: "Brand",
    subtitle: "Building your visual story together",
    price: "595",
    prefix: "Vanaf",
    description: "Elevate your brand with professional imagery that captures your essence and connects with your audience.",
    features: ["Half-day session", "40+ edited images", "Brand consultation", "Commercial license"],
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    href: "/portfolio/brand",
  },
  {
    id: 4,
    title: "Portrait",
    subtitle: "The art of you",
    price: null,
    prefix: "On request",
    description: "Bespoke portrait sessions tailored to your vision. Fine art, editorial, or personal—crafted just for you.",
    features: ["Custom session length", "Artistic direction", "Retouching included", "Fine art prints"],
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    href: "/portfolio/portrait",
  },
  {
    id: 5,
    title: "Event",
    subtitle: "Moments that matter",
    price: null,
    prefix: "On request",
    description: "Corporate events, celebrations, and gatherings captured with discretion and an eye for authentic moments.",
    features: ["Flexible duration", "Quick turnaround", "Multiple photographers", "Event coverage"],
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    href: "/portfolio/event",
  },
];

// Floating image component with parallax
function FloatingImage({
  src,
  alt,
  className,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const offset = (viewportCenter - elementCenter) * 0.05;
    y.set(offset);
  }, [scrollY, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ y: springY }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
}

// Package card component
function PackageCard({
  pkg,
  index,
  isHovered,
  onHover,
  ctaText,
  onRequestText,
}: {
  pkg: typeof packages[0];
  index: number;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  ctaText: string;
  onRequestText: string;
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(pkg.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Card */}
      <div className="relative border border-gray-200 p-8 sm:p-10 h-full transition-colors duration-500 group-hover:border-gray-400 group-hover:bg-gray-50/50">
        {/* Number */}
        <span className="absolute top-6 right-6 text-xs text-gray-300 font-mono">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        {/* Title */}
        <div className="mb-8">
          <h3 className="font-serif text-4xl sm:text-5xl mb-2 tracking-tight">
            {pkg.title}
          </h3>
          <span className="text-sm text-gray-700 tracking-wide">
            {pkg.subtitle}
          </span>
        </div>

        {/* Price */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-700 block mb-1">
            {pkg.prefix}
          </span>
          {pkg.price ? (
            <span className="font-serif text-5xl sm:text-6xl tracking-tight">
              €{pkg.price}
              <span className="text-2xl text-gray-700">,-</span>
            </span>
          ) : (
            <span className="font-serif text-3xl sm:text-4xl italic text-gray-500">
              {onRequestText}
            </span>
          )}
        </div>


        {/* CTA */}
        <TransitionLink
          href="/contact"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] group/link"
        >
          <span className="relative">
            {ctaText}
            <motion.span
              className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </span>
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        </TransitionLink>

        {/* Hover image preview */}
        <motion.div
          className="absolute -right-4 -bottom-4 w-32 h-40 pointer-events-none z-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
          animate={{
            scale: isHovered ? 1 : 0.9,
            rotate: isHovered ? 3 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function InvestmentPage() {
  const t = useTranslations("Investment");
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);
  const { isExiting } = usePageTransition();

  // Get translated packages
  const translatedPackages = t.raw("packages.items") as Array<{
    id: number;
    title: string;
    subtitle: string;
    price: string | null;
    prefix: string;
    description: string;
    features: string[];
    cta: string;
  }>;

  // Merge with images and href
  const localizedPackages = packages.map((pkg) => {
    const translated = translatedPackages.find(p => p.id === pkg.id);
    return {
      ...pkg,
      title: translated?.title || pkg.title,
      subtitle: translated?.subtitle || pkg.subtitle,
      prefix: translated?.prefix || pkg.prefix,
      description: translated?.description || pkg.description,
      features: translated?.features || pkg.features
    };
  });

  // Get stats
  const stats = t.raw("stats") as Array<{ number: string; label: string }>;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      className="bg-white min-h-screen"
      animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: transitionEase }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6 sm:px-12 overflow-hidden">
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="grid grid-cols-12 gap-6 items-center">
            {/* Text content */}
            <div className="col-span-12 lg:col-span-6 relative z-10">
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
              <h1 className="font-serif text-[12vw] lg:text-[8vw] leading-[0.85] tracking-tighter mb-8">
                <span className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "100%" }}
                    animate={{ y: isMounted ? 0 : "100%" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {t("hero.title")}
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span
                    className="block italic text-gray-700"
                    initial={{ y: "100%" }}
                    animate={{ y: isMounted ? 0 : "100%" }}
                    transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {t("hero.titleItalic")}
                  </motion.span>
                </span>
              </h1>

              {/* Description */}
              <motion.p
                className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-md mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("hero.description")}
              </motion.p>

              {/* Stats */}
              <motion.div
                className="flex gap-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {stats.map((stat, index) => (
                  <div key={index}>
                    <span className="font-serif text-4xl sm:text-5xl block mb-1">{stat.number}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-700">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero images */}
            <div className="col-span-12 lg:col-span-6 relative h-[60vh] lg:h-[80vh] hidden lg:block">
              <FloatingImage
                src="https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg"
                alt="Maternity photography"
                className="absolute right-0 top-[10%] w-[55%] h-[65%]"
                delay={0.3}
              />
              <FloatingImage
                src="https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_WATER_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg"
                alt="Portrait photography"
                className="absolute left-[5%] bottom-[5%] w-[40%] h-[45%]"
                delay={0.5}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="w-[1px] h-16 bg-gray-300 mx-auto mb-2"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ transformOrigin: "top" }}
          />
          <span className="text-xs uppercase tracking-[0.2em] text-gray-700">Scroll</span>
        </motion.div>
      </section>

      {/* Divider */}
      <motion.div
        className="mx-6 sm:mx-12 h-[1px] bg-gray-200"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />

      {/* Packages Section */}
      <section className="py-24 sm:py-32 px-6 sm:px-12">
        <div className="max-w-[1800px] mx-auto">
          {/* Section header */}
          <div className="grid grid-cols-12 gap-6 mb-16 sm:mb-24">
            <div className="col-span-12 md:col-span-6">
              <motion.span
                className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-4 block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {t("packages.label")}
              </motion.span>
              <motion.h2
                className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {t("packages.title")} <span className="italic">{t("packages.titleItalic")}</span>
              </motion.h2>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end">
              <motion.p
                className="text-gray-500 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t("packages.description")}
              </motion.p>
            </div>
          </div>

          {/* Package cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {localizedPackages.slice(0, 3).map((pkg, index) => {
              const translated = translatedPackages.find(p => p.id === pkg.id);
              return (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  index={index}
                  isHovered={hoveredPackage === pkg.id}
                  onHover={setHoveredPackage}
                  ctaText={translated?.cta || "More info"}
                  onRequestText={translated?.prefix || "on request"}
                />
              );
            })}
          </div>

          {/* Additional packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8 max-w-4xl mx-auto">
            {localizedPackages.slice(3).map((pkg, index) => {
              const translated = translatedPackages.find(p => p.id === pkg.id);
              return (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  index={index + 3}
                  isHovered={hoveredPackage === pkg.id}
                  onHover={setHoveredPackage}
                  ctaText={translated?.cta || "More info"}
                  onRequestText={translated?.prefix || "on request"}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 border-t border-gray-100">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <motion.div
              className="col-span-12 md:col-span-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-4 block">
                {t("faq.label")}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl mb-6">
                {t("faq.title")} <span className="italic">{t("faq.titleItalic")}</span>
              </h3>
              {t("faq.description") && (
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {t("faq.description")}
                </p>
              )}
              <TransitionLink
                href="/contact"
                className="text-sm uppercase tracking-[0.15em] border-b border-black pb-1 hover:border-gray-400 transition-colors"
              >
                {t("finalCta")}
              </TransitionLink>
            </motion.div>

            <div className="col-span-12 md:col-span-6 md:col-start-7">
              {(t.raw("faq.items") as Array<{ q: string; a: string }>).map((faq, index) => (
                <motion.div
                  key={index}
                  className="border-b border-gray-200 py-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h4 className="font-serif text-xl mb-2">{faq.q}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
