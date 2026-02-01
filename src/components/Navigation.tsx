"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

const portfolioCategories = [
  { href: "/portfolio/lifestyle", label: "Lifestyle" },
  { href: "/portfolio/wedding", label: "Wedding" },
  { href: "/portfolio/brand", label: "Brand" },
  { href: "/portfolio/portrait", label: "Portrait" },
  { href: "/portfolio/event", label: "Event" },
];

const links = [
  { href: "/", label: "Index" },
  { href: "/investment", label: "Investment" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  const isPortfolioActive = pathname.startsWith("/portfolio");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPortfolioOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setPortfolioOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
      <Link href="/" className="pointer-events-auto group">
        <span className="font-playfair text-xl tracking-tighter">
          Loes Nooitgedagt
        </span>
      </Link>

      <ul className="flex gap-6 pointer-events-auto items-center">
        {/* Index link */}
        <li className="relative overflow-hidden">
          <Link
            href="/"
            className={cn(
              "uppercase text-xs tracking-widest hover:text-gray-300 transition-colors duration-300",
              isActive("/") && "text-gray-400",
            )}
          >
            Index
            {isActive("/") && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 w-full h-[1px] bg-white"
              />
            )}
          </Link>
        </li>

        {/* Portfolio dropdown */}
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setPortfolioOpen(!portfolioOpen)}
            className={cn(
              "uppercase text-xs tracking-widest hover:text-gray-300 transition-colors duration-300 flex items-center gap-2",
              isPortfolioActive && "text-gray-400",
            )}
          >
            Portfolio
            <motion.span
              animate={{ rotate: portfolioOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px]"
            >
              ▼
            </motion.span>
            {isPortfolioActive && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 w-full h-[1px] bg-white"
              />
            )}
          </button>

          <AnimatePresence>
            {portfolioOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full right-0 mt-4 overflow-hidden"
              >
                <motion.div
                  className="bg-black/80 backdrop-blur-md border border-white/10 py-3 px-1 min-w-[160px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {portfolioCategories.map((category, index) => (
                    <motion.div
                      key={category.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index + 0.1 }}
                    >
                      <Link
                        href={category.href}
                        className={cn(
                          "block px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white/10 hover:pl-6",
                          pathname === category.href ? "text-white bg-white/5" : "text-white/70"
                        )}
                      >
                        {category.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>

        {/* Other links (Investment, About, Contact) */}
        {links.slice(1).map((link) => (
          <li key={link.href} className="relative overflow-hidden">
            <Link
              href={link.href}
              className={cn(
                "uppercase text-xs tracking-widest hover:text-gray-300 transition-colors duration-300",
                isActive(link.href) && "text-gray-400",
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 w-full h-[1px] bg-white"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
