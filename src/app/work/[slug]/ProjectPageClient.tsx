"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import WebGLImage from "@/components/WebGLImage";
import { usePathname } from "next/navigation";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  slug: string;
  image: string;
  images?: string[];
}

export default function ProjectPageClient({
  project,
  nextProject,
  prevProject,
}: {
  project: Project;
  nextProject: Project;
  prevProject: Project;
}) {
  const [isHero, setIsHero] = useState(true);
  const pathname = usePathname();

  // Scroll to top smoothly when page loads
  useEffect(() => {
    // Use requestAnimationFrame to ensure it happens after render
    requestAnimationFrame(() => {
      // Smooth scroll to top immediately
      window.scrollTo({ top: 0, behavior: "instant" });

      // Then smooth scroll with Lenis if available
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          immediate: false,
        });
      } else {
        // Fallback to native smooth scroll
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }, [pathname]);

  // Move image from hero to bottom half after initial animation
  useEffect(() => {
    // Wait for scroll to top and layout animation to start, then move to bottom
    const timer = setTimeout(() => {
      setIsHero(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen relative">
      {/* Hero Section - Image starts here, then moves to bottom */}
      <div className="px-6 sm:px-12 max-w-[1800px] mx-auto">
        <motion.div
          layoutId={`image-container-${project.slug}`}
          className={`w-full relative overflow-hidden bg-gray-100 ${
            isHero
              ? "aspect-video sm:aspect-[21/9] mb-20 sm:mb-32"
              : "fixed bottom-0 left-0 right-0 z-10 h-[50vh] px-6 sm:px-12"
          }`}
          transition={{
            layout: {
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          style={{
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
          >
            <WebGLImage
              src={project.image}
              alt={project.title}
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Content that animates in from above */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: isHero ? 0 : 1, y: isHero ? -100 : 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Index
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-12">
            <h1 className="font-serif text-[10vw] sm:text-[8vw] leading-[0.85] italic">
              {project.title}
            </h1>
            <div className="lg:mb-4 lg:ml-auto max-w-sm">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 text-xs uppercase tracking-widest text-gray-400">
                Category: {project.category}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content below the image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHero ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="px-6 sm:px-12 max-w-[1200px] mx-auto space-y-24 sm:space-y-32 pt-[50vh]"
      >
        {project.images?.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.4 + idx * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"}`}
          >
            <div className="w-full md:w-[80%] aspect-[4/5] relative overflow-hidden bg-gray-50">
              <Image
                src={img}
                alt={`${project.title} detail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <span className="mt-4 text-xs text-gray-400 uppercase tracking-widest">
              Figure 0{idx + 1}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation */}
      <div className="mt-40 px-6 sm:px-12 pt-20 border-t border-gray-100 max-w-[1800px] mx-auto flex justify-between items-center">
        <Link
          href={`/work/${prevProject.slug}`}
          className="group flex flex-col items-start gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
            Previous Project
          </span>
          <span className="font-serif text-2xl italic group-hover:underline">
            {prevProject.title}
          </span>
        </Link>
        <Link
          href={`/work/${nextProject.slug}`}
          className="group flex flex-col items-end gap-2 text-right"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-600 transition-colors">
            Next Project
          </span>
          <span className="font-serif text-2xl italic group-hover:underline">
            {nextProject.title}
          </span>
        </Link>
      </div>
    </div>
  );
}
