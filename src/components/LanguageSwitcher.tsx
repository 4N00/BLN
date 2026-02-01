"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useTransition } from "react";

const locales = [
  { code: "en", label: "EN" },
  { code: "nl", label: "NL" }
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [hoveredLocale, setHoveredLocale] = useState<string | null>(null);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Set cookie and force full reload to apply new locale
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Force a full page reload to ensure the new locale is applied
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc, index) => (
        <div key={loc.code} className="flex items-center">
          {index > 0 && (
            <span className="text-white/30 mx-2 text-[11px]">|</span>
          )}
          <button
            onClick={() => switchLocale(loc.code)}
            onMouseEnter={() => setHoveredLocale(loc.code)}
            onMouseLeave={() => setHoveredLocale(null)}
            disabled={isPending}
            className={`
              relative uppercase text-[11px] tracking-[0.2em] font-light
              transition-opacity duration-300
              ${locale === loc.code ? "opacity-100" : "opacity-50"}
              ${hoveredLocale === loc.code && locale !== loc.code ? "opacity-100" : ""}
              ${isPending ? "cursor-wait" : "cursor-pointer"}
            `}
          >
            {loc.label}
            {locale === loc.code && (
              <motion.span
                layoutId="locale-underline"
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
