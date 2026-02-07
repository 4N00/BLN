"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import WebGLImage from "@/components/WebGLImage";
import ProjectModal from "@/components/ProjectModal";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSplitTransition } from "@/context/SplitTransitionContext";
import { usePageTransition, transitionEase } from "@/context/PageTransitionContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { projects as projectsData, type LocalizedProject } from "@/data/projects";

// Easing curves
const ease = [0.22, 1, 0.36, 1];

// Services data with slugs for portfolio routes
const services = [
  {
    title: "Lifestyle Photography",
    slug: "lifestyle",
    image: "/images/HOME/HOME - DIENSTEN - LIFESTYLE.jpg"
  },
  {
    title: "Wedding Photography",
    slug: "wedding",
    image: "https://loesnooitgedagt.com/wp-content/uploads/2023/10/WEDDING_RA_02_BYLOESNOOITGEDAGTPHOTOGRAPHY-1.jpg"
  },
  {
    title: "Brand Photography",
    slug: "brand",
    image: "/images/HOME/HOME - DIENSTEN - BRAND.jpg"
  },
  {
    title: "Portrait Photography",
    slug: "portrait",
    image: "/images/HOME/HOME - DIENSTEN - PORTRAIT.jpg"
  },
  {
    title: "Event Photography",
    slug: "event",
    image: "/images/HOME/HOME - DIENSTEN - EVENT.jpg"
  },
];

// Service item component with hover effect and exit animation
function ServiceItem({
  title,
  slug,
  index,
  image,
  onServiceClick,
  isExiting,
}: {
  title: string;
  slug: string;
  index: number;
  image: string;
  onServiceClick: (e: React.MouseEvent<HTMLDivElement>, slug: string, title: string) => void;
  isExiting: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onServiceClick(e, slug, title);
  };

  return (
    <motion.div
      className="group relative border-b border-gray-200 py-6 sm:py-8 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      animate={isExiting ? {
        opacity: 0,
        x: -50,
        transition: { duration: 0.4, delay: index * 0.05, ease }
      } : {}}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-4 sm:gap-8">
          <span className="text-xs text-gray-700 font-mono">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <motion.h3
            className="font-serif text-2xl sm:text-4xl md:text-5xl"
            animate={{ x: isHovered && !isExiting ? 20 : 0 }}
            transition={{ duration: 0.3, ease }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.div
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
          animate={{
            scale: isHovered && !isExiting ? 1.2 : 1,
            backgroundColor: isHovered && !isExiting ? "#000" : "transparent"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="text-lg"
            animate={{ color: isHovered && !isExiting ? "#fff" : "#000" }}
          >
            →
          </motion.span>
        </motion.div>
      </div>

      {/* Floating image on hover */}
      <AnimatePresence>
        {isHovered && !isExiting && (
          <motion.div
            className="fixed pointer-events-none z-50 w-64 h-80 overflow-hidden"
            style={{
              top: "50%",
              right: "10%",
              translateY: "-50%",
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
            transition={{ duration: 0.4, ease }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Helper function to get localized project data
function getLocalizedProjects(locale: string): LocalizedProject[] {
  return projectsData.map((project) => ({
    ...project,
    title: typeof project.title === 'object' ? project.title[locale as 'nl' | 'en'] || project.title.en : project.title,
    category: typeof project.category === 'object' ? project.category[locale as 'nl' | 'en'] || project.category.en : project.category,
    description: typeof project.description === 'object' ? project.description[locale as 'nl' | 'en'] || project.description.en : project.description,
  }));
}

// Gallery item component with proper exit animation handling
function GalleryItem({
  project,
  index,
  isExiting,
  onProjectClick,
  imageRefs,
  isModalOpen,
  selectedProject,
}: {
  project: LocalizedProject;
  index: number;
  isExiting: boolean;
  onProjectClick: (project: LocalizedProject) => void;
  imageRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  isModalOpen: boolean;
  selectedProject: LocalizedProject | null;
}) {
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  return (
    <div
      onClick={() => onProjectClick(project)}
      className="cursor-pointer"
    >
      <motion.div
        className="group relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={!isExiting ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 0.1 }}
        onAnimationComplete={() => {
          if (!isExiting) setHasAnimatedIn(true);
        }}
        animate={isExiting ? {
          opacity: 0,
          y: -30,
          transition: { duration: 0.5, delay: Math.min(index * 0.03, 0.15), ease }
        } : undefined}
        transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.3), ease }}
      >
        <div
          ref={(el) => {
            if (el) imageRefs.current.set(project.slug, el);
          }}
          data-gallery-image
          data-project-slug={project.slug}
          className={`relative mb-6 md:mb-8`}
          style={{
            visibility:
              isModalOpen && selectedProject?.slug === project.slug
                ? "hidden"
                : "visible",
          }}
        >
          <Image
            key={project.id}
            src={project.image}
            alt={project.title}
            width={1200}
            height={1600}
            className="w-full md:w-auto h-auto max-h-[90vh] md:max-w-[26vw] md:min-w-[450px]"
            priority={index < 3}
          />
        </div>

        <div className={`flex flex-col items-start ${project.width}`}>
          <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            {(index + 1).toString().padStart(2, "0")} / {project.category}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl italic group-hover:text-gray-600 transition-colors duration-300">
            {project.title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
}

// Parallax container component - disabled on mobile
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
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 50 });
  const springY = useSpring(y, { stiffness: 120, damping: 50 });

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

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
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    // Disable parallax on mobile
    if (isMobile || !ref.current) return;

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
  }, [mousePos, scrollY, x, y, scrollSpeed, isMobile]);

  // On mobile, render without parallax effect
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

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

function HomeContent() {
  const t = useTranslations("Home");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const projects = getLocalizedProjects(locale);
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [selectedProject, setSelectedProject] = useState<LocalizedProject | null>(null);
  const [selectedImageRect, setSelectedImageRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Split transition for services
  const { startSplitTransition, isExiting: isSplitExiting } = useSplitTransition();
  // Page transition for nav links
  const { isExiting: isPageExiting } = usePageTransition();

  // Combined exit state
  const isExiting = isSplitExiting || isPageExiting;

  // Get translated services and projects
  const translatedServices = t.raw("services.items") as Array<{ title: string; slug: string }>;
  const translatedProjects = t.raw("projects") as Array<{
    id: number;
    title: string;
    category: string;
    slug: string;
    description: string;
  }>;

  // Merge translated content with images and layout
  const localizedServices = services.map((service, index) => ({
    ...service,
    title: translatedServices[index]?.title || service.title
  }));

  const localizedProjects = projects.map((project) => {
    const translated = translatedProjects.find(p => p.id === project.id);
    return {
      ...project,
      title: translated?.title || project.title,
      category: translated?.category || project.category,
      description: translated?.description || project.description
    };
  });

  // Ensure animations trigger after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track if we're currently opening the modal (to avoid race conditions with URL sync)
  const isOpeningModal = useRef(false);
  // Track if modal close was triggered by back button
  const closingFromBackButton = useRef(false);

  // Handle browser back button - listen to popstate
  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen && !isClosing) {
        // Close modal when back button is pressed
        closingFromBackButton.current = true;
        setIsClosing(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setIsClosing(false);
          setSelectedProject(null);
          setSelectedImageRect(null);
          closingFromBackButton.current = false;
        }, 500);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isModalOpen, isClosing]);

  // Check URL on mount for direct link to modal
  useEffect(() => {
    const projectSlug = searchParams.get("project");
    if (projectSlug && !isModalOpen && !isOpeningModal.current) {
      const project = localizedProjects.find((p) => p.slug === projectSlug);
      if (project) {
        // Small delay to ensure refs are populated
        setTimeout(() => {
          const imageContainer = imageRefs.current.get(project.slug);
          if (imageContainer) {
            const rect = imageContainer.getBoundingClientRect();
            setSelectedImageRect({
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            });
          }
          setSelectedProject(project);
          setIsModalOpen(true);
          setIsClosing(false);
        }, 100);
      }
    }
  // Only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle service click - triggers split transition with exit animations
  const handleServiceClick = (
    e: React.MouseEvent<HTMLDivElement>,
    slug: string,
    title: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const splitY = rect.top + rect.height / 2;

    startSplitTransition({
      splitY,
      targetRoute: `/portfolio/${slug}`,
      targetCategory: title.replace(" Photography", ""),
      scrollPosition: window.scrollY,
      direction: "forward",
    });
  };

  const handleProjectClick = (project: LocalizedProject) => {
    const imageContainer = imageRefs.current.get(project.slug);
    if (imageContainer) {
      isOpeningModal.current = true;
      // Get the actual img element inside the container for accurate dimensions
      const imgElement = imageContainer.querySelector('img') as HTMLImageElement;
      const rect = imgElement ? imgElement.getBoundingClientRect() : imageContainer.getBoundingClientRect();
      setSelectedImageRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setSelectedProject(project);
      setIsModalOpen(true);
      setIsClosing(false);

      // Update URL with project slug using history API (creates new history entry)
      window.history.pushState({ modal: true, project: project.slug }, "", `/?project=${project.slug}`);

      // Reset flag after a tick
      setTimeout(() => {
        isOpeningModal.current = false;
      }, 0);
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

      // Update URL to remove project param (if not triggered by back button)
      if (!closingFromBackButton.current) {
        window.history.pushState({}, "", "/");
      }
      closingFromBackButton.current = false;
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
                animate={{
                  y: isExiting ? "100%" : isMounted ? 0 : "100%"
                }}
                transition={{
                  duration: isExiting ? 0.5 : 1.2,
                  delay: isExiting ? 0.1 : 0,
                  ease
                }}
                className="block"
              >
                {t("hero.title1")}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{
                  y: isExiting ? "100%" : isMounted ? 0 : "100%"
                }}
                transition={{
                  duration: isExiting ? 0.5 : 1.2,
                  delay: isExiting ? 0.05 : 0.15,
                  ease
                }}
                className="block"
              >
                {t("hero.title2")}
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-4">
              <motion.span
                initial={{ y: "100%" }}
                animate={{
                  y: isExiting ? "100%" : isMounted ? 0 : "100%"
                }}
                transition={{
                  duration: isExiting ? 0.5 : 1.2,
                  delay: isExiting ? 0 : 0.3,
                  ease
                }}
                className="block text-[3vw] sm:text-[2vw] tracking-wider text-gray-700"
              >
                {t("hero.subtitle")}
              </motion.span>
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isExiting ? 0 : isMounted ? 1 : 0,
              y: isExiting ? -20 : isMounted ? 0 : 20
            }}
            transition={{
              duration: isExiting ? 0.4 : 0.8,
              delay: isExiting ? 0 : 0.3,
              ease
            }}
            className="mt-12 flex justify-end"
          >
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-gray-600">
              {t("intro")}
            </p>
          </motion.div>
        </section>

        {/* Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-32 gap-x-6 mb-64 md:mb-96 pb-32 md:pb-48 px-6 md:px-16 lg:px-24">
          {localizedProjects.map((project, index) => {
            const scrollSpeed =
              index % 3 === 0 ? 0.08 : index % 3 === 1 ? -0.05 : 0.1;
            // Middle column should be behind others - apply z-index at grid item level
            const zIndex = index % 3 === 1 ? 'z-0' : 'z-10';

            return (
              <div
                key={project.id}
                className={`${project.colSpan} ${project.colStart} relative ${zIndex}`}
              >
                <ParallaxContainer scrollSpeed={scrollSpeed}>
                  <GalleryItem
                    project={project}
                    index={index}
                    isExiting={isExiting}
                    onProjectClick={handleProjectClick}
                    imageRefs={imageRefs}
                    isModalOpen={isModalOpen}
                    selectedProject={selectedProject}
                  />
                </ParallaxContainer>
              </div>
            );
          })}
        </section>

        {/* Services Section */}
        <section className="mb-32 sm:mb-48">
          <div className="mb-16 sm:mb-24">
            <motion.span
              className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-6 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              animate={isExiting ? { opacity: 0, transition: { duration: 0.3 } } : {}}
            >
              {t("services.label")}
            </motion.span>

            <motion.h2
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              animate={isExiting ? {
                opacity: 0,
                y: -30,
                transition: { duration: 0.4, ease }
              } : {}}
            >
              {t("services.title")} <span className="italic">{t("services.titleItalic")}</span>
            </motion.h2>
          </div>

          <div className="border-t border-gray-200">
            {localizedServices.map((service, index) => (
              <ServiceItem
                key={service.title}
                title={service.title}
                slug={service.slug}
                index={index}
                image={service.image}
                onServiceClick={handleServiceClick}
                isExiting={isExiting}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <motion.section
          className="border-t border-gray-200 pt-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8"
          animate={isExiting ? {
            opacity: 0,
            y: 20,
            transition: { duration: 0.3, delay: 0.2, ease }
          } : {}}
        >
          <div>
            <span className="block text-xs uppercase tracking-widest text-gray-700 mb-2">
              {tCommon("contact")}
            </span>
            <a
              href={`mailto:${tCommon("email")}`}
              className="font-serif text-2xl sm:text-3xl hover:underline"
            >
              {tCommon("email")}
            </a>
          </div>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs uppercase tracking-widest hover:text-gray-500"
            >
              {tCommon("instagram")}
            </a>
            <a
              href="#"
              className="text-xs uppercase tracking-widest hover:text-gray-500"
            >
              {tCommon("linkedin")}
            </a>
          </div>
        </motion.section>
      </motion.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        imageRect={selectedImageRect}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onClosingStart={handleClosingStart}
        allProjects={localizedProjects}
      />
    </>
  );
}

// Wrap with Suspense for useSearchParams
export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
