"use client";

import { usePathname } from "next/navigation";
import { usePageTransition } from "@/context/PageTransitionContext";
import { ReactNode, MouseEvent } from "react";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({
  href,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const pathname = usePathname();
  const { navigateTo, isExiting } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Don't navigate if already on this page
    if (pathname === href) return;

    // Don't navigate if already exiting
    if (isExiting) return;

    // Call optional onClick handler (e.g., to close mobile menu)
    if (onClick) onClick();

    // Trigger transition
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
