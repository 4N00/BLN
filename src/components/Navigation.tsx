"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import TransitionLink from "./TransitionLink";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const portfolioCategories = [
    { href: "/portfolio/lifestyle", label: t("portfolioCategories.lifestyle") },
    { href: "/portfolio/wedding", label: t("portfolioCategories.wedding") },
    { href: "/portfolio/brand", label: t("portfolioCategories.brand") },
    { href: "/portfolio/portrait", label: t("portfolioCategories.portrait") },
    { href: "/portfolio/event", label: t("portfolioCategories.event") },
  ];

  const links = [
    { href: "/", label: t("index") },
    { href: "/investment", label: t("investment") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

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

    document.addEventListener("mousedown", handleClickOutside as any);
    return () => document.removeEventListener("mousedown", handleClickOutside as any);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setPortfolioOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none" aria-label="Main navigation">
        {/* Logo */}
        <TransitionLink href="/" className="pointer-events-auto group relative" aria-label="Loes Nooitgedagt - Home">
          <motion.span
            className="font-playfair text-xl md:text-2xl tracking-tight block"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Loes Nooitgedagt
          </motion.span>
          <motion.div
            className="absolute -bottom-1 left-0 h-[1px] bg-white origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%" }}
          />
        </TransitionLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 pointer-events-auto items-center">
          {/* Index link */}
          <li className="relative">
            <TransitionLink
              href="/"
              className={cn(
                "nav-link uppercase text-[11px] tracking-[0.2em] font-light py-2 block transition-opacity duration-500 relative",
                isActive("/") ? "opacity-100" : "opacity-50 hover:opacity-100"
              )}
            >
              Index
              {isActive("/") && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </TransitionLink>
          </li>

          {/* Portfolio dropdown */}
          <li
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setPortfolioOpen(true)}
            onMouseLeave={() => setPortfolioOpen(false)}
          >
            <button
              className={cn(
                "nav-link uppercase text-[11px] tracking-[0.2em] font-light flex items-center gap-2 py-2 transition-opacity duration-500 relative",
                isPortfolioActive ? "opacity-100" : "opacity-50 hover:opacity-100"
              )}
              aria-expanded={portfolioOpen}
              aria-haspopup="true"
              aria-label="Portfolio menu"
            >
              Portfolio
              <motion.svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                animate={{ rotate: portfolioOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </motion.svg>
              {isPortfolioActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>

            <AnimatePresence>
              {portfolioOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full left-0 pt-2"
                >
                  <div className="py-3 min-w-[140px]">
                    {portfolioCategories.map((category, index) => (
                      <motion.div
                        key={category.href}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * index, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <TransitionLink
                          href={category.href}
                          className={cn(
                            "nav-link block py-2 text-[11px] uppercase tracking-[0.15em] transition-opacity duration-500",
                            pathname === category.href
                              ? "opacity-100"
                              : "opacity-40 hover:opacity-100"
                          )}
                        >
                          {category.label}
                        </TransitionLink>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Other links */}
          {links.slice(1).map((link) => (
            <li key={link.href} className="relative">
              <TransitionLink
                href={link.href}
                className={cn(
                  "nav-link uppercase text-[11px] tracking-[0.2em] font-light py-2 block transition-opacity duration-500 relative",
                  isActive(link.href) ? "opacity-100" : "opacity-50 hover:opacity-100"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </TransitionLink>
            </li>
          ))}

          {/* Language Switcher */}
          <li>
            <LanguageSwitcher />
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden pointer-events-auto relative w-8 h-8 flex items-center justify-center"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="relative w-6 h-4 flex flex-col justify-between">
            <motion.span
              className="block h-[1px] bg-white origin-center"
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 7.5 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="block h-[1px] bg-white"
              animate={{
                opacity: mobileMenuOpen ? 0 : 1,
                scaleX: mobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1px] bg-white origin-center"
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -7.5 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[99] bg-black"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col justify-center px-8">
              {/* Main Links */}
              <nav className="space-y-2">
                {/* Index */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TransitionLink
                    href="/"
                    onClick={closeMobileMenu}
                    className="group flex items-center gap-4"
                  >
                    <span className={cn(
                      "text-[11px] tracking-[0.3em] uppercase transition-colors duration-300",
                      isActive("/") ? "text-white" : "text-white/40"
                    )}>
                      01
                    </span>
                    <span className={cn(
                      "font-playfair text-5xl md:text-6xl transition-all duration-500 group-hover:translate-x-4",
                      isActive("/") ? "text-white" : "text-white/70 group-hover:text-white"
                    )}>
                      Index
                    </span>
                    <motion.div
                      className="h-[1px] bg-white/30 flex-1 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </TransitionLink>
                </motion.div>

                {/* Portfolio with sub-items */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "text-[11px] tracking-[0.3em] uppercase transition-colors duration-300",
                      isPortfolioActive ? "text-white" : "text-white/40"
                    )}>
                      02
                    </span>
                    <span className={cn(
                      "font-playfair text-5xl md:text-6xl",
                      isPortfolioActive ? "text-white" : "text-white/70"
                    )}>
                      Portfolio
                    </span>
                    <motion.div
                      className="h-[1px] bg-white/30 flex-1 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.35 }}
                    />
                  </div>

                  {/* Portfolio Sub-links */}
                  <div className="pl-12 space-y-2">
                    {portfolioCategories.map((category, index) => (
                      <motion.div
                        key={category.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                      >
                        <TransitionLink
                          href={category.href}
                          onClick={closeMobileMenu}
                          className={cn(
                            "group flex items-center gap-3 py-1 transition-all duration-300",
                            pathname === category.href ? "text-white" : "text-white/50 hover:text-white"
                          )}
                        >
                          <motion.span
                            className="w-4 h-[1px] bg-current transition-all duration-300 group-hover:w-8"
                          />
                          <span className="text-lg tracking-wide">{category.label}</span>
                        </TransitionLink>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Investment */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TransitionLink
                    href="/investment"
                    onClick={closeMobileMenu}
                    className="group flex items-center gap-4"
                  >
                    <span className={cn(
                      "text-[11px] tracking-[0.3em] uppercase transition-colors duration-300",
                      isActive("/investment") ? "text-white" : "text-white/40"
                    )}>
                      03
                    </span>
                    <span className={cn(
                      "font-playfair text-5xl md:text-6xl transition-all duration-500 group-hover:translate-x-4",
                      isActive("/investment") ? "text-white" : "text-white/70 group-hover:text-white"
                    )}>
                      Investment
                    </span>
                    <motion.div
                      className="h-[1px] bg-white/30 flex-1 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                  </TransitionLink>
                </motion.div>

                {/* About */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TransitionLink
                    href="/about"
                    onClick={closeMobileMenu}
                    className="group flex items-center gap-4"
                  >
                    <span className={cn(
                      "text-[11px] tracking-[0.3em] uppercase transition-colors duration-300",
                      isActive("/about") ? "text-white" : "text-white/40"
                    )}>
                      04
                    </span>
                    <span className={cn(
                      "font-playfair text-5xl md:text-6xl transition-all duration-500 group-hover:translate-x-4",
                      isActive("/about") ? "text-white" : "text-white/70 group-hover:text-white"
                    )}>
                      About
                    </span>
                    <motion.div
                      className="h-[1px] bg-white/30 flex-1 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.45 }}
                    />
                  </TransitionLink>
                </motion.div>

                {/* Contact */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TransitionLink
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="group flex items-center gap-4"
                  >
                    <span className={cn(
                      "text-[11px] tracking-[0.3em] uppercase transition-colors duration-300",
                      isActive("/contact") ? "text-white" : "text-white/40"
                    )}>
                      05
                    </span>
                    <span className={cn(
                      "font-playfair text-5xl md:text-6xl transition-all duration-500 group-hover:translate-x-4",
                      isActive("/contact") ? "text-white" : "text-white/70 group-hover:text-white"
                    )}>
                      Contact
                    </span>
                    <motion.div
                      className="h-[1px] bg-white/30 flex-1 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </TransitionLink>
                </motion.div>
              </nav>

              {/* Language Switcher for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-32 left-8"
              >
                <LanguageSwitcher />
              </motion.div>

              {/* Bottom Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-10 left-8 right-8 flex justify-between items-end"
              >
                <div className="space-y-2">
                  <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">Get in touch</p>
                  <a
                    href="mailto:hello@loesnooitgedagt.com"
                    className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                  >
                    hello@loesnooitgedagt.com
                  </a>
                </div>

                <div className="flex gap-6">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
