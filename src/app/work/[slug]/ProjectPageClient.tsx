"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import WebGLImage from "@/components/WebGLImage";
import { useTransition } from "@/context/TransitionContext";

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
  const { transitionData, clearTransition } = useTransition();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Check if we have valid transition data for this project
  const hasTransitionData = transitionData && transitionData.slug === project.slug;

  // Disable scrolling and set initial state
  useLayoutEffect(() => {
    if (hasTransitionData) {
      // Scroll to top instantly so the hero target position is correct
      window.scrollTo({ top: 0, behavior: "instant" });

      // Disable Lenis during animation
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.stop();
      }

      // Also prevent native scroll
      document.body.style.overflow = "hidden";

      // Get target rect after scroll
      if (heroRef.current) {
        setTargetRect(heroRef.current.getBoundingClientRect());
      }
    }
  }, [hasTransitionData]);

  // Handle animation complete
  useEffect(() => {
    if (!hasTransitionData) {
      // No transition data - show everything immediately
      setAnimationComplete(true);
      setShowContent(true);
    }
  }, [hasTransitionData]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);

    // Re-enable scrolling
    document.body.style.overflow = "";
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.start();
    }

    // Show content with a slight delay
    setTimeout(() => {
      setShowContent(true);
      clearTransition();
    }, 50);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const initialPos = hasTransitionData && transitionData?.rect ? transitionData.rect : null;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Image Container - this is the target position */}
      <div
        ref={heroRef}
        className="w-full h-[60vh] relative overflow-hidden bg-gray-100"
        style={{
          visibility: animationComplete ? "visible" : "hidden",
        }}
      >
        <div className="absolute inset-0 w-full h-full">
          <WebGLImage
            src={project.image}
            alt={project.title}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Animating Image - starts at clicked position, animates to hero */}
      {hasTransitionData && initialPos && targetRect && !animationComplete && (
        <motion.div
          initial={{
            top: initialPos.top,
            left: initialPos.left,
            width: initialPos.width,
            height: initialPos.height,
          }}
          animate={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
          }}
          transition={{
            duration: 0.85,
            ease: [0.32, 0.72, 0, 1],
          }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed overflow-hidden bg-gray-100"
          style={{
            zIndex: 100,
          }}
        >
          {/* Use Next Image for transition - loads instantly since it's already cached */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </motion.div>
      )}

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 40,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 sm:px-12 max-w-[1800px] mx-auto pt-12"
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

      {/* Project Images Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="px-6 sm:px-12 max-w-[1200px] mx-auto space-y-24 sm:space-y-32 pt-20"
      >
        {project.images?.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: showContent ? 1 : 0,
              y: showContent ? 0 : 30,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25 + idx * 0.1,
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-40 px-6 sm:px-12 pt-20 border-t border-gray-100 max-w-[1800px] mx-auto flex justify-between items-center pb-20"
      >
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
      </motion.div>
    </div>
  );
}
