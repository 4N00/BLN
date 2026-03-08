"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePageTransition, transitionEase } from "@/context/PageTransitionContext";
import { useTranslations } from "next-intl";

const weddingImages = [
  {
    id: 1,
    src: "/images/PORTFOLIO/WeddingNew/wedding1.jpg",
    alt: "Bruiloftsfotografie - Romantisch moment vastgelegd door Loes Nooitgedagt",
    caption: "Where two hearts become one",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 2,
    src: "/images/PORTFOLIO/WeddingNew/wedding2.jpg",
    alt: "Bruiloft momenten - Emotionele hoogtepunten van de trouwdag",
    caption: "The promise of forever",
    year: "2024",
    size: "small",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 3,
    src: "/images/PORTFOLIO/WeddingNew/wedding3.jpg",
    alt: "Intieme huwelijksceremonie fotografie - Loes Nooitgedagt",
    caption: "Love in its purest form",
    year: "2024",
    size: "medium",
    position: "left",
    aspectRatio: "3/4",
  },
  {
    id: 4,
    src: "/images/PORTFOLIO/WeddingNew/wedding4.jpg",
    alt: "Bruidsfotografie portret - Elegante trouwfoto",
    caption: "Elegance personified",
    year: "2024",
    size: "small",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 5,
    src: "/images/PORTFOLIO/WeddingNew/wedding5.jpg",
    alt: "Bruiloft details fotografie - Sfeervolle trouwdag",
    caption: "Nature's blessing",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 6,
    src: "/images/PORTFOLIO/WeddingNew/wedding6.jpg",
    alt: "Trouwceremonie vastgelegd met natuurlijk licht",
    caption: "Sealed with a kiss",
    year: "2024",
    size: "medium",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 7,
    src: "/images/PORTFOLIO/WeddingNew/wedding7.jpg",
    alt: "Bruiloftsgasten delen een emotioneel moment",
    caption: "Joy shared is joy doubled",
    year: "2024",
    size: "small",
    position: "left",
    aspectRatio: "3/2",
  },
  {
    id: 8,
    src: "/images/PORTFOLIO/WeddingNew/wedding8.jpg",
    alt: "Bruidsportret in zachte tinten",
    caption: "A vision in white",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 9,
    src: "/images/PORTFOLIO/WeddingNew/wedding9.jpg",
    alt: "Intiem moment tussen bruidspaar",
    caption: "Whispers of forever",
    year: "2024",
    size: "small",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 10,
    src: "/images/PORTFOLIO/WeddingNew/wedding10.jpg",
    alt: "Trouwlocatie sfeerbeeld door Loes Nooitgedagt",
    caption: "Where dreams unfold",
    year: "2024",
    size: "medium",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 11,
    src: "/images/PORTFOLIO/WeddingNew/wedding11.jpg",
    alt: "Emotionele trouwfotografie - eerste dans",
    caption: "Dancing into forever",
    year: "2024",
    size: "medium",
    position: "left",
    aspectRatio: "3/4",
  },
  {
    id: 12,
    src: "/images/PORTFOLIO/WeddingNew/wedding12.jpg",
    alt: "Bruiloft details - ringen en bloemen",
    caption: "It's all in the details",
    year: "2024",
    size: "small",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 13,
    src: "/images/PORTFOLIO/WeddingNew/wedding13.jpg",
    alt: "Bruidspaar wandeling door de natuur",
    caption: "Walking into our story",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 14,
    src: "/images/PORTFOLIO/WeddingNew/wedding14.jpg",
    alt: "Trouwfotografie - gouden uur portret",
    caption: "Golden hour, golden love",
    year: "2024",
    size: "medium",
    position: "right",
    aspectRatio: "3/2",
  },
  {
    id: 15,
    src: "/images/PORTFOLIO/WeddingNew/wedding15.jpg",
    alt: "Bruidsboeket vastgelegd met oog voor detail",
    caption: "Blooming with love",
    year: "2024",
    size: "small",
    position: "left",
    aspectRatio: "3/4",
  },
  {
    id: 16,
    src: "/images/PORTFOLIO/WeddingNew/wedding16.jpg",
    alt: "Huwelijksceremonie - emotioneel moment",
    caption: "The moment that changed everything",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 17,
    src: "/images/PORTFOLIO/WeddingNew/wedding17.jpg",
    alt: "Bruiloft gasten lachen tijdens receptie",
    caption: "Laughter fills the air",
    year: "2024",
    size: "small",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 18,
    src: "/images/PORTFOLIO/WeddingNew/wedding18.jpg",
    alt: "Sfeervolle avondfotografie op de bruiloft",
    caption: "Under the evening glow",
    year: "2024",
    size: "medium",
    position: "left",
    aspectRatio: "3/2",
  },
  {
    id: 19,
    src: "/images/PORTFOLIO/WeddingNew/wedding19.jpg",
    alt: "Bruidspaar portret - tijdloze elegantie",
    caption: "Timeless elegance",
    year: "2024",
    size: "small",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 20,
    src: "/images/PORTFOLIO/WeddingNew/wedding20.jpg",
    alt: "Trouwdag hoogtepunten vastgelegd",
    caption: "Every second matters",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 21,
    src: "/images/PORTFOLIO/WeddingNew/wedding21.jpg",
    alt: "Bruidsportret met sluier in natuurlijk licht",
    caption: "Grace unveiled",
    year: "2024",
    size: "medium",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 22,
    src: "/images/PORTFOLIO/WeddingNew/wedding22.jpg",
    alt: "Trouwlocatie decoratie en bloemen",
    caption: "A setting for love",
    year: "2024",
    size: "small",
    position: "left",
    aspectRatio: "3/2",
  },
  {
    id: 23,
    src: "/images/PORTFOLIO/WeddingNew/wedding23.jpg",
    alt: "Emotioneel moment tijdens de geloften",
    caption: "Words from the heart",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 24,
    src: "/images/PORTFOLIO/WeddingNew/wedding24.jpg",
    alt: "Bruiloft viering - taart snijden",
    caption: "Sweet celebrations",
    year: "2024",
    size: "medium",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 25,
    src: "/images/PORTFOLIO/WeddingNew/wedding25.jpg",
    alt: "Bruidspaar in romantisch landschap",
    caption: "Love in every landscape",
    year: "2024",
    size: "small",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 26,
    src: "/images/PORTFOLIO/WeddingNew/wedding26.jpg",
    alt: "Bruidsmeisjes samen lachend",
    caption: "Bonds that sparkle",
    year: "2024",
    size: "medium",
    position: "left",
    aspectRatio: "3/4",
  },
  {
    id: 27,
    src: "/images/PORTFOLIO/WeddingNew/wedding27.jpg",
    alt: "Trouwfotografie - candid moment op de dansvloer",
    caption: "Rhythm of the night",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/2",
  },
  {
    id: 28,
    src: "/images/PORTFOLIO/WeddingNew/wedding28.jpg",
    alt: "Bruidsportret in schemering",
    caption: "Twilight tenderness",
    year: "2024",
    size: "small",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 29,
    src: "/images/PORTFOLIO/WeddingNew/wedding29.jpg",
    alt: "Bruiloft voorbereidingen - getting ready",
    caption: "The calm before the joy",
    year: "2024",
    size: "medium",
    position: "right",
    aspectRatio: "3/4",
  },
  {
    id: 30,
    src: "/images/PORTFOLIO/WeddingNew/wedding30.jpg",
    alt: "Trouwring details macro fotografie",
    caption: "Circles of commitment",
    year: "2024",
    size: "small",
    position: "left",
    aspectRatio: "3/2",
  },
  {
    id: 31,
    src: "/images/PORTFOLIO/WeddingNew/wedding31.jpg",
    alt: "Bruidspaar wandelen bij zonsondergang",
    caption: "Into the golden light",
    year: "2024",
    size: "large",
    position: "center",
    aspectRatio: "3/4",
  },
  {
    id: 32,
    src: "/images/PORTFOLIO/WeddingNew/wedding32.jpg",
    alt: "Laatste dans op de bruiloft - emotioneel afsluiting",
    caption: "The last dance, the first forever",
    year: "2024",
    size: "medium",
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

// Parallax container - disabled on mobile for better performance
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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  useEffect(() => {
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

function CinematicLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  images: typeof weddingImages;
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
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase block mb-2">
              {currentImage.year}
            </span>
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

export default function WeddingPortfolioPage() {
  const t = useTranslations("Portfolio.wedding");
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
  const localizedImages = weddingImages.map((img) => {
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
            const marginTop = index === 0 ? "" : "mt-8 md:-mt-24";

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
                      <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                        {(index + 1).toString().padStart(2, "0")} / {image.year}
                      </span>
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
