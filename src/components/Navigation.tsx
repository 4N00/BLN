"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Index" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
      <Link href="/" className="pointer-events-auto group">
        <span className="font-playfair text-xl tracking-tighter">
          Loes Nooitgedagt
        </span>
      </Link>

      <ul className="flex gap-6 pointer-events-auto">
        {links.map((link) => (
          <li key={link.href} className="relative overflow-hidden">
            <Link
              href={link.href}
              className={cn(
                "uppercase text-xs tracking-widest hover:text-gray-300 transition-colors duration-300",
                pathname === link.href && "text-gray-400",
              )}
            >
              {link.label}
              {pathname === link.href && (
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
