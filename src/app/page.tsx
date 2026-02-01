"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import WebGLImage from "@/components/WebGLImage";
import ProjectModal from "@/components/ProjectModal";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "Ethereal Gaze",
    category: "Portrait",
    slug: "ethereal-gaze",
    description:
      "A deep dive into the human soul through the eyes of the beholder. This series explores the vulnerability and strength found in silence.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_04_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
    colSpan: "md:col-span-5",
    colStart: "md:col-start-1",
    aspectRatio: "3/4",
    width: "w-full md:w-[85%]",
  },
  {
    id: 2,
    title: "Urban Solitude",
    category: "Editorial",
    slug: "urban-solitude",
    description:
      "Finding peace in the chaos of the city. A study of shadows, light, and the lonely figures that inhabit the concrete jungle.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
    colSpan: "md:col-span-4",
    colStart: "md:col-start-6",
    aspectRatio: "4/5",
    width: "w-full md:w-[90%] md:ml-auto",
  },
  {
    id: 3,
    title: "Liquid Dreams",
    category: "Abstract",
    slug: "liquid-dreams",
    description:
      "Forms that flow and change, representing the ever-shifting nature of our dreams and subconsciously.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_WATER_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
    colSpan: "md:col-span-3",
    colStart: "md:col-start-8",
    aspectRatio: "3/4",
    width: "w-full",
  },
  {
    id: 4,
    title: "Silent Forms",
    category: "Still Life",
    slug: "silent-forms",
    description:
      "Inanimate objects telling a living story. The beauty of stillness.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    ],
    colSpan: "md:col-span-4",
    colStart: "md:col-start-2",
    aspectRatio: "4/3",
    width: "w-full md:w-[80%]",
  },
  {
    id: 5,
    title: "Portrait Study",
    category: "Portrait",
    slug: "portrait-study",
    description:
      "A study of human expression and emotion captured in intimate moments.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_04_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
    colSpan: "md:col-span-3",
    colStart: "md:col-start-7",
    aspectRatio: "3/4",
    width: "w-full md:w-[75%] md:ml-auto",
  },
  {
    id: 6,
    title: "Natural Light",
    category: "Portrait",
    slug: "natural-light",
    description:
      "Exploring the interplay between natural light and human form.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    ],
    colSpan: "md:col-span-5",
    colStart: "md:col-start-1",
    aspectRatio: "5/6",
    width: "w-full md:w-[82%]",
  },
  {
    id: 7,
    title: "Editorial Story",
    category: "Editorial",
    slug: "editorial-story",
    description: "Editorial photography that tells compelling visual stories.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FLOWERS_FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
    colSpan: "md:col-span-4",
    colStart: "md:col-start-6",
    aspectRatio: "3/4",
    width: "w-full md:w-[88%] md:ml-auto",
  },
  {
    id: 8,
    title: "Wedding Moments",
    category: "Wedding",
    slug: "wedding-moments",
    description: "Capturing the most precious moments of love and celebration.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    ],
    colSpan: "md:col-span-3",
    colStart: "md:col-start-4",
    aspectRatio: "4/5",
    width: "w-full md:w-[70%] md:mx-auto",
  },
  {
    id: 9,
    title: "Maternity Portrait",
    category: "Portrait",
    slug: "maternity-portrait",
    description: "Celebrating the beauty and strength of motherhood.",
    image:
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_04_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg",
    images: [
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/MATERNITY_KIKI_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
      "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_WATER_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg",
    ],
    colSpan: "md:col-span-4",
    colStart: "md:col-start-8",
    aspectRatio: "3/4",
    width: "w-full",
  },
];

// Parallax container component
function ParallaxContainer({
  children,
  className,
  scrollSpeed = 0,
}: {
  children: React.ReactNode;
  className?: string;
  scrollSpeed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 50 });
  const springY = useSpring(y, { stiffness: 120, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const updateParallax = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = mousePos.x - centerX;
      const deltaY = mousePos.y - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = 800;

      let strength = 0;
      if (distance < maxDistance) {
        strength = (1 - distance / maxDistance) * 5;
      }

      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const mouseDeltaX = mousePos.x - viewportCenterX;
      const mouseDeltaY = mousePos.y - viewportCenterY;
      const mouseDistance = Math.sqrt(
        mouseDeltaX * mouseDeltaX + mouseDeltaY * mouseDeltaY
      );

      const dirX = mouseDistance > 0 ? mouseDeltaX / mouseDistance : 0;
      const dirY = mouseDistance > 0 ? mouseDeltaY / mouseDistance : 0;

      const moveX = dirX * strength;
      let moveY = dirY * strength;

      if (scrollSpeed !== 0 && ref.current) {
        const viewportHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = scrollY + viewportHeight / 2;
        const parallaxOffset = (viewportCenter - elementCenter) * scrollSpeed;
        moveY += parallaxOffset;
      }

      x.set(moveX);
      y.set(moveY);
    };

    updateParallax();
  }, [mousePos, scrollY, x, y, scrollSpeed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [selectedImageRect, setSelectedImageRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure animations trigger after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleProjectClick = (project: typeof projects[0]) => {
    const imageContainer = imageRefs.current.get(project.slug);
    if (imageContainer) {
      const rect = imageContainer.getBoundingClientRect();
      setSelectedImageRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset state immediately - modal handles its own animation
    setSelectedProject(null);
    setSelectedImageRect(null);
  };

  return (
    <>
      {/* Main content */}
      <motion.div
        animate={{
          opacity: isModalOpen ? 0 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="pt-32 pb-20 px-6 sm:px-12 max-w-[1800px] mx-auto"
      >
        {/* Intro Section */}
        <section className="mb-32">
          <h1 className="font-serif text-[12vw] leading-[0.85] tracking-tighter">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: isMounted ? 0 : "100%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                LOES NOOITGEDAGT
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-2">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: isMounted ? 0 : "100%" }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[3vw] sm:text-[2vw] tracking-wider"
              >
                CAPTURING LIFE | LOVE | STYLE | YOU
              </motion.span>
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex justify-end"
          >
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-gray-600">
              A curated collection of visual narratives capturing the unseen and
              the unspoken. Loes Nooitgedagt explores the boundary between reality
              and imagination.
            </p>
          </motion.div>
        </section>

        {/* Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-32 gap-x-6 mb-48 md:mb-64">
          {projects.map((project, index) => {
            const scrollSpeed =
              index % 3 === 0 ? 0.08 : index % 3 === 1 ? -0.05 : 0.1;

            return (
              <div
                key={project.id}
                className={`${project.colSpan} ${project.colStart}`}
              >
                <ParallaxContainer scrollSpeed={scrollSpeed}>
                  <div
                    onClick={() => handleProjectClick(project)}
                    className="cursor-pointer"
                  >
                    <motion.div
                      className="group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        ref={(el) => {
                          if (el) imageRefs.current.set(project.slug, el);
                        }}
                        data-gallery-image
                        className={`relative overflow-hidden mb-6 bg-gray-100 ${project.width}`}
                        style={{
                          aspectRatio: project.aspectRatio,
                          visibility:
                            isModalOpen && selectedProject?.slug === project.slug
                              ? "hidden"
                              : "visible",
                        }}
                      >
                        <div className="absolute inset-0 w-full h-full">
                          <WebGLImage
                            key={project.id}
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full"
                          />
                        </div>
                      </div>

                      <div
                        className={`flex flex-col items-start ${project.width}`}
                      >
                        <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                          {(index + 1).toString().padStart(2, "0")} /{" "}
                          {project.category}
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl italic group-hover:text-gray-600 transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                </ParallaxContainer>
              </div>
            );
          })}
        </section>

        {/* Footer */}
        <section className="border-t border-gray-200 pt-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
          <div>
            <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
              Contact
            </span>
            <a
              href="mailto:hello@loesnooitgedagt.com"
              className="font-serif text-2xl sm:text-3xl hover:underline"
            >
              hello@loesnooitgedagt.com
            </a>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs uppercase tracking-widest hover:text-gray-500"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-xs uppercase tracking-widest hover:text-gray-500"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        imageRect={selectedImageRect}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        allProjects={projects}
      />
    </>
  );
}
