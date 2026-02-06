"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import WebGLImage from "./WebGLImage";
import { usePageTransition, transitionEase } from "@/context/PageTransitionContext";

interface Project {
  id: number;
  title: string;
  category: string;
  description?: string;
  slug: string;
  image: string;
  images?: string[];
}

interface ImageRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ProjectModalProps {
  project: Project | null;
  imageRect: ImageRect | null;
  isOpen: boolean;
  onClose: (animationComplete?: boolean) => void;
  onClosingStart?: () => void;
  allProjects: Project[];
}

export default function ProjectModal({
  project,
  imageRect,
  isOpen,
  onClose,
  onClosingStart,
  allProjects,
}: ProjectModalProps) {
  const [animationPhase, setAnimationPhase] = useState<
    "closed" | "expanding" | "open" | "closing"
  >("closed");
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const savedImageRect = useRef<ImageRect | null>(null);
  const closeTargetRect = useRef<ImageRect | null>(null);

  // Get page transition state for exit animations when navigating away
  const { isExiting: isPageExiting } = usePageTransition();

  // Mount check for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Save the image rect when opening so we can use it for closing
  useEffect(() => {
    if (isOpen && imageRect) {
      savedImageRect.current = imageRect;
    }
  }, [isOpen, imageRect]);

  // Handle open
  useEffect(() => {
    if (isOpen && project && imageRect && animationPhase === "closed") {
      setAnimationPhase("expanding");
      document.body.style.overflow = "hidden";
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.stop();
      }
    }
  }, [isOpen, project, imageRect, animationPhase]);

  // Handle animation phase transitions
  const handleExpandComplete = useCallback(() => {
    if (animationPhase === "expanding") {
      setAnimationPhase("open");
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setShowContent(true);
      }, 50);
    }
  }, [animationPhase]);

  const handleCloseComplete = useCallback(() => {
    if (animationPhase === "closing") {
      setAnimationPhase("closed");
      setShowContent(false);
      closeTargetRect.current = null;
      document.body.style.overflow = "";
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.start();
      }
      onClose(true); // Signal that animation is complete
    }
  }, [animationPhase, onClose]);

  const handleClose = useCallback(() => {
    if (animationPhase === "open" && project) {
      setShowContent(false);
      // Reset scroll position before closing animation
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }

      // Get the current position of the original image on the home page
      const originalImageContainer = document.querySelector(
        `[data-gallery-image][data-project-slug="${project.slug}"]`
      ) as HTMLElement;

      if (originalImageContainer) {
        // Get the actual img element inside the container
        const imgElement = originalImageContainer.querySelector('img') as HTMLImageElement;
        if (imgElement) {
          const rect = imgElement.getBoundingClientRect();
          closeTargetRect.current = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          };
        } else {
          // Fallback to container rect if img not found
          const rect = originalImageContainer.getBoundingClientRect();
          closeTargetRect.current = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          };
        }
      } else {
        // Fallback to saved rect if element not found
        closeTargetRect.current = savedImageRect.current;
      }

      // Notify parent that closing is starting (so home content can fade in)
      onClosingStart?.();

      // Small delay for content to fade out
      setTimeout(() => {
        setAnimationPhase("closing");
      }, 100);
    }
  }, [animationPhase, project, onClosingStart]);

  // Reset modal scroll position when opening
  useEffect(() => {
    if (animationPhase === "open" && modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [animationPhase]);

  // Smooth scroll state for modal
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Handle wheel events to enable smooth scrolling in modal
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal || animationPhase !== "open") return;

    // Smooth scroll animation loop
    const smoothScroll = () => {
      if (!modal) return;

      const maxScroll = modal.scrollHeight - modal.clientHeight;

      // Clamp target scroll
      targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current, maxScroll));

      // Lerp towards target (0.1 = smooth, higher = faster)
      const diff = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += diff * 0.1;

      // Apply scroll
      modal.scrollTop = currentScrollRef.current;

      // Continue animation if not close enough
      if (Math.abs(diff) > 0.5) {
        rafRef.current = requestAnimationFrame(smoothScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Prevent the event from reaching Lenis
      e.stopPropagation();
      e.preventDefault();

      // Update target scroll position
      targetScrollRef.current += e.deltaY;

      // Sync current scroll with actual scroll position (in case of external changes)
      currentScrollRef.current = modal.scrollTop;

      // Start smooth scroll animation
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(smoothScroll);
    };

    // Initialize scroll positions
    targetScrollRef.current = modal.scrollTop;
    currentScrollRef.current = modal.scrollTop;

    // Use capture phase to intercept before Lenis
    modal.addEventListener("wheel", handleWheel, { passive: false, capture: true });

    return () => {
      modal.removeEventListener("wheel", handleWheel, { capture: true } as EventListenerOptions);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animationPhase]);

  // Get next/prev projects
  const currentIndex = project
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  if (!mounted) return null;
  if (!project || !savedImageRect.current) return null;

  const currentImageRect = savedImageRect.current;
  const isExpanding = animationPhase === "expanding";
  const isClosing = animationPhase === "closing";
  const isOpen_ = animationPhase === "open";
  const shouldShowModal = animationPhase !== "closed";

  const modalContent = (
    <>
      {shouldShowModal && (
        <>
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing || isPageExiting ? 0 : 1 }}
            transition={{ duration: isClosing ? 0.6 : isPageExiting ? 0.5 : 0.4 }}
            className="fixed inset-0 bg-white z-40"
            style={{ pointerEvents: "none" }}
          />

          {/* Animating image container - visible during expand and close */}
          {isExpanding && (
            <motion.div
              key="expanding-image"
              initial={{
                top: currentImageRect.top,
                left: currentImageRect.left,
                width: currentImageRect.width,
                height: currentImageRect.height,
              }}
              animate={{
                top: 0,
                left: 0,
                width: "100vw",
                height: "60vh",
              }}
              transition={{
                duration: 0.85,
                ease: [0.32, 0.72, 0, 1],
              }}
              onAnimationComplete={handleExpandComplete}
              className="fixed overflow-hidden bg-gray-100 z-[60]"
            >
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

          {isClosing && closeTargetRect.current && (
            <motion.div
              key="closing-image"
              initial={{
                top: 0,
                left: 0,
                width: "100vw",
                height: "60vh",
              }}
              animate={{
                top: closeTargetRect.current.top,
                left: closeTargetRect.current.left,
                width: closeTargetRect.current.width,
                height: closeTargetRect.current.height,
              }}
              transition={{
                duration: 0.85,
                ease: [0.32, 0.72, 0, 1],
              }}
              onAnimationComplete={handleCloseComplete}
              className="fixed overflow-hidden bg-gray-100 z-[60]"
            >
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

          {/* Modal content - only visible when fully open */}
          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{
              pointerEvents: isOpen_ && !isPageExiting ? "auto" : "none",
              visibility: isOpen_ ? "visible" : "hidden",
            }}
            animate={isPageExiting ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: transitionEase }}
          >
            <div className="bg-white min-h-screen">
              {/* Hero Image - static, shown when modal is open */}
              <div className="w-full h-[60vh] relative overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

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
                <button
                  onClick={handleClose}
                  className="inline-flex items-center text-xs uppercase tracking-widest text-gray-700 hover:text-black transition-colors mb-8 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Index
                </button>

                <div className="flex flex-col lg:flex-row gap-12 lg:items-end mb-12">
                  <h1 className="font-serif text-[10vw] sm:text-[8vw] leading-[0.85] italic">
                    {project.title}
                  </h1>
                  <div className="lg:mb-4 lg:ml-auto max-w-sm">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {project.description || "A beautiful photography project."}
                    </p>
                    <div className="mt-4 text-xs uppercase tracking-widest text-gray-700">
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
                    key={img}
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
                    <div className="relative overflow-hidden bg-gray-50" style={{ maxHeight: '90vh', maxWidth: '100%', display: 'flex' }}>
                      <Image
                        src={img}
                        alt={`${project.title} detail ${idx + 1}`}
                        width={1200}
                        height={1600}
                        className="object-contain w-auto h-auto max-h-[90vh] max-w-full"
                        unoptimized
                      />
                    </div>
                    <span className="mt-4 text-xs text-gray-700 uppercase tracking-widest">
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
                <button
                  onClick={() => {
                    // TODO: Navigate to prev project
                  }}
                  className="group flex flex-col items-start gap-2"
                >
                  <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-gray-600 transition-colors">
                    Previous Project
                  </span>
                  <span className="font-serif text-2xl italic group-hover:underline">
                    {prevProject?.title}
                  </span>
                </button>
                <button
                  onClick={() => {
                    // TODO: Navigate to next project
                  }}
                  className="group flex flex-col items-end gap-2 text-right"
                >
                  <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-gray-600 transition-colors">
                    Next Project
                  </span>
                  <span className="font-serif text-2xl italic group-hover:underline">
                    {nextProject?.title}
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );

  return createPortal(modalContent, document.body);
}
