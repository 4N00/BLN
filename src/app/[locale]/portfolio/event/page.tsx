"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePageTransition, transitionEase } from "@/context/PageTransitionContext";
import { useTranslations } from "next-intl";

const eventImages = [
  {
    id: 1,
    src: "/images/PORTFOLIO/Event/EVENT 1.jpg",
    alt: "Evenement fotografie door Loes Nooitgedagt",
    caption: "Capturing the atmosphere",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 2,
    src: "/images/PORTFOLIO/Event/EVENT 2.jpg",
    alt: "Zakelijk evenement vastgelegd",
    caption: "Authentic connections",
    year: "2024",
    size: "small",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 3,
    src: "/images/PORTFOLIO/Event/EVENT 3.jpg",
    alt: "Feestelijke sfeer vastgelegd",
    caption: "Energy and emotion",
    year: "2024",
    size: "medium",
    position: "left",
    aspectRatio: "3/4",
  },
  {
    id: 4,
    src: "/images/PORTFOLIO/Event/EVENT 4.jpg",
    alt: "Evenement details fotografie",
    caption: "Details that matter",
    year: "2024",
    size: "small",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 5,
    src: "/images/PORTFOLIO/Event/EVENT 5.jpg",
    alt: "Evenement sfeerbeeld",
    caption: "Memorable moments",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 6,
    src: "/images/PORTFOLIO/Event/EVENT 6.jpg",
    alt: "Gasten op een evenement",
    caption: "People in their element",
    year: "2024",
    size: "medium",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 7,
    src: "/images/PORTFOLIO/Event/EVENT 7.jpg",
    alt: "Evenement hoogtepunten",
    caption: "The highlight reel",
    year: "2024",
    size: "small",
    position: "left",
    aspectRatio: "3/4",
  },
  {
    id: 8,
    src: "/images/PORTFOLIO/Event/EVENT 8.jpg",
    alt: "Locatie sfeer evenement",
    caption: "Setting the scene",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 9,
    src: "/images/PORTFOLIO/Event/EVENT 10.jpg",
    alt: "Candid moment evenement",
    caption: "Unposed and unforgettable",
    year: "2024",
    size: "small",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 10,
    src: "/images/PORTFOLIO/Event/EVENT 11.jpg",
    alt: "Groepsfoto evenement",
    caption: "Together we celebrate",
    year: "2024",
    size: "medium",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 11,
    src: "/images/PORTFOLIO/Event/EVENT 12.jpg",
    alt: "Emotioneel moment op evenement",
    caption: "Emotion in every frame",
    year: "2024",
    size: "medium",
    position: "left",
    aspectRatio: "3/4",
  },
  {
    id: 12,
    src: "/images/PORTFOLIO/Event/EVENT 13.jpg",
    alt: "Evenement decoratie en styling",
    caption: "Style speaks",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 13,
    src: "/images/PORTFOLIO/Event/EVENT 14.jpg",
    alt: "Intiem moment op feest",
    caption: "Quiet moments, loud memories",
    year: "2024",
    size: "small",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 14,
    src: "/images/PORTFOLIO/Event/EVENT 15.jpg",
    alt: "Feestelijke avond fotografie",
    caption: "Under the lights",
    year: "2024",
    size: "medium",
    position: "left",
    aspectRatio: "3/2",
  },
  {
    id: 15,
    src: "/images/PORTFOLIO/Event/EVENT 16.jpg",
    alt: "Portret op evenement",
    caption: "Faces of the night",
    year: "2024",
    size: "small",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 16,
    src: "/images/PORTFOLIO/Event/EVENT 17.jpg",
    alt: "Spontaan moment evenement",
    caption: "In the moment",
    year: "2024",
    size: "medium",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 17,
    src: "/images/PORTFOLIO/Event/EVENT 18.jpg",
    alt: "Evenement overzicht",
    caption: "The bigger picture",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 18,
    src: "/images/PORTFOLIO/Event/EVENT 19.jpg",
    alt: "Viering vastgelegd",
    caption: "Joy overflows",
    year: "2024",
    size: "small",
    position: "left",
    aspectRatio: "3/2",
  },
  {
    id: 19,
    src: "/images/PORTFOLIO/Event/EVENT 20.jpg",
    alt: "Evenement portretfotografie",
    caption: "Character captured",
    year: "2024",
    size: "medium",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 20,
    src: "/images/PORTFOLIO/Event/EVENT 21.jpg",
    alt: "Afsluitend moment evenement",
    caption: "The perfect ending",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/4",
  },
];

function getLayoutClasses(size: string, position: string) {
  const sizeClasses = {
    small: "md:w-[30%]",
    medium: "md:w-[45%]",
    large: "md:w-[60%]",
  };

  const positionClasses = {
    left: "md:ml-0 md:mr-auto",
    right: "md:ml-auto md:mr-0",
    center: "md:mx-auto",
  };

  const width = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.medium;
  const align = positionClasses[position as keyof typeof positionClasses] || positionClasses.left;

  return `w-full ${width} ${align}`;
}

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

function CinematicLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  images: typeof eventImages;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setDirection(1);
        onNavigate((currentIndex + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNavigate, currentIndex, images.length]);

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-black"
        >
          <motion.button
            className="absolute top-8 right-8 z-20 text-white/40 hover:text-white transition-colors"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
          >
            <span className="text-xs uppercase tracking-[0.3em]">Close</span>
          </motion.button>

          <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-16">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-[80vw] max-h-[70vh]"
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={1200}
                  height={1600}
                  className="max-h-[70vh] w-auto object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="absolute bottom-24 left-0 right-0 text-center z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-serif text-white text-2xl sm:text-4xl italic">
              {currentImage.caption}
            </h3>
          </motion.div>

          <motion.button
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 group"
            onClick={() => {
              setDirection(-1);
              onNavigate((currentIndex - 1 + images.length) % images.length);
            }}
            whileHover={{ x: -5 }}
          >
            <span className="text-white/20 group-hover:text-white/60 transition-colors font-serif text-6xl">
              ←
            </span>
          </motion.button>

          <motion.button
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 group"
            onClick={() => {
              setDirection(1);
              onNavigate((currentIndex + 1) % images.length);
            }}
            whileHover={{ x: 5 }}
          >
            <span className="text-white/20 group-hover:text-white/60 transition-colors font-serif text-6xl">
              →
            </span>
          </motion.button>

          <div className="absolute top-8 left-8 z-20">
            <span className="text-white/30 text-xs tracking-[0.3em] font-mono">
              {(currentIndex + 1).toString().padStart(2, "0")} —{" "}
              {images.length.toString().padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function EventPortfolioPage() {
  const t = useTranslations("Portfolio.event");
  const tCommon = useTranslations("Common");
  const [isMounted, setIsMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const { isExiting } = usePageTransition();

  // Get translated images
  const translatedImages = t.raw("images") as Array<{
    id: number;
    caption: string;
    year: string;
    alt: string;
  }>;

  // Merge with original images (keeping layout and src)
  const localizedImages = eventImages.map((img) => {
    const translated = translatedImages.find(ti => ti.id === img.id);
    return {
      ...img,
      caption: translated?.caption || img.caption,
      year: translated?.year || img.year,
      alt: translated?.alt || img.alt
    };
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openLightbox = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <motion.div
      className="bg-white min-h-screen"
      animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: transitionEase }}
    >
      <section className="pt-32 pb-16 sm:pb-24 px-6 sm:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 lg:col-span-6">
            <motion.span
              className="text-xs uppercase tracking-[0.4em] text-gray-700 mb-6 block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
              transition={{ duration: 0.8 }}
            >
              {t("label")}
            </motion.span>

            <h1 className="font-serif text-[14vw] sm:text-[10vw] md:text-[8vw] leading-[0.85] tracking-tighter mb-8">
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
                  transition={{
                    duration: 1.2,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {t("titleItalic")}
                </motion.span>
              </span>
            </h1>
          </div>

          <div className="col-span-12 md:col-span-4 lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
            <motion.p
              className="text-gray-500 text-sm sm:text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t("description")}
            </motion.p>

            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isMounted ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="w-12 h-[1px] bg-gray-300" />
              <span className="text-xs uppercase tracking-[0.2em] text-gray-700">
                {t("worksCount", { count: localizedImages.length })}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-12 max-w-[1800px] mx-auto">
        <div className="flex flex-col">
          {localizedImages.map((image, index) => {
            const speedMap: { [key: string]: number } = {
              small: 0.12,
              medium: 0.06,
              large: 0.03,
            };
            const direction = index % 2 === 0 ? 1 : -1;
            const scrollSpeed = speedMap[image.size] * direction;
            const marginTop = index === 0 ? "" : "-mt-12 md:-mt-24";

            return (
              <ParallaxContainer
                key={image.id}
                scrollSpeed={scrollSpeed}
                className={`${getLayoutClasses(image.size, image.position)} ${marginTop}`}
              >
                <div
                  onClick={() => openLightbox(index)}
                  className="md:cursor-pointer"
                >
                  <motion.div
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.7,
                      delay: Math.min(index * 0.05, 0.3),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div
                      className="relative overflow-hidden mb-6 bg-gray-100 w-full md:w-auto md:min-w-[450px]"
                      style={{ aspectRatio: image.aspectRatio, maxHeight: "90vh" }}
                      onMouseEnter={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <motion.div
                        className="absolute inset-0 w-full h-full"
                        animate={{ scale: isHovered === index ? 1.05 : 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </div>

                    <div className="flex flex-col items-start">
                      <h3 className="font-serif text-2xl sm:text-3xl italic group-hover:text-gray-600 transition-colors duration-300">
                        {image.caption}
                      </h3>
                    </div>
                  </motion.div>
                </div>
              </ParallaxContainer>
            );
          })}
        </div>
      </section>

      <section className="py-24 sm:py-32 px-6 sm:px-12 border-t border-gray-100">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <motion.div
              className="col-span-12 md:col-span-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-4 block">
                {t("cta.label")}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1] mb-6">
                {t("cta.title")} <span className="italic">{t("cta.titleItalic")}</span>
              </h2>
              <a
                href={`mailto:${tCommon("email")}`}
                className="inline-block text-sm uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
              >
                {t("cta.button")}
              </a>
            </motion.div>

            <motion.div
              className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col justify-end"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-gray-500 text-sm leading-relaxed">
                {t("cta.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CinematicLightbox
        images={localizedImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
      />
    </motion.div>
  );
}
