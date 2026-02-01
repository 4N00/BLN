"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import WebGLImage from "@/components/WebGLImage";
import ProjectModal from "@/components/ProjectModal";
import { useEffect, useRef, useState } from "react";

// Services data
const services = [
  {
    title: "Lifestyle Photography",
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_LIZZY_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg"
  },
  {
    title: "Wedding Photography",
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg"
  },
  {
    title: "Brand Photography",
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/FS_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg"
  },
  {
    title: "Portrait Photography",
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/PORTRAIT_SYL_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg"
  },
  {
    title: "Event Photography",
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_06_BYLOESNOOITGEDAGTPHOTOGRAPHY.jpg"
  },
];

// Service item component with hover effect
function ServiceItem({
  title,
  index,
  image
}: {
  title: string;
  index: number;
  image: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative border-b border-gray-200 py-6 sm:py-8 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-4 sm:gap-8">
          <span className="text-xs text-gray-400 font-mono">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <motion.h3
            className="font-serif text-2xl sm:text-4xl md:text-5xl"
            animate={{ x: isHovered ? 20 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.div
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.2 : 1,
            backgroundColor: isHovered ? "#000" : "transparent"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="text-lg"
            animate={{ color: isHovered ? "#fff" : "#000" }}
          >
            +
          </motion.span>
        </motion.div>
      </div>

      {/* Floating image on hover */}
      <motion.div
        className="fixed pointer-events-none z-50 w-64 h-80 overflow-hidden"
        style={{
          top: "50%",
          right: "10%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          rotate: isHovered ? 0 : -5
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

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
  const [isClosing, setIsClosing] = useState(false);
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
      setIsClosing(false);
    }
  };

  const handleClosingStart = () => {
    // Modal is starting to close - begin fading home content back in
    setIsClosing(true);
  };

  const handleCloseModal = (animationComplete?: boolean) => {
    if (animationComplete) {
      // Called when modal animation is fully complete
      setIsModalOpen(false);
      setIsClosing(false);
      setSelectedProject(null);
      setSelectedImageRect(null);
    }
    // If called without animationComplete, do nothing - modal handles animation
  };

  return (
    <>
      {/* Main content */}
      <motion.div
        animate={{
          opacity: isModalOpen && !isClosing ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-20 px-6 sm:px-12 max-w-[1800px] mx-auto"
      >
        {/* Intro Section */}
        <section className="mb-32">
          <h1 className="font-serif text-[12vw] leading-[0.85] tracking-tighter">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: isMounted ? 0 : "100%" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                LOES
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: isMounted ? 0 : "100%" }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                NOOITGEDAGT
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-4">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: isMounted ? 0 : "100%" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[3vw] sm:text-[2vw] tracking-wider text-gray-400"
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
                        data-project-slug={project.slug}
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

        {/* Services Section */}
        <section className="mb-32 sm:mb-48">
          <div className="mb-16 sm:mb-24">
            <motion.span
              className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Services
            </motion.span>

            <motion.h2
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              What I <span className="italic">offer</span>
            </motion.h2>
          </div>

          <div className="border-t border-gray-200">
            {services.map((service, index) => (
              <ServiceItem
                key={service.title}
                title={service.title}
                index={index}
                image={service.image}
              />
            ))}
          </div>
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
        onClosingStart={handleClosingStart}
        allProjects={projects}
      />
    </>
  );
}
