import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "nl"],
  defaultLocale: "en",
  localePrefix: "never" // Clean URLs without /en or /nl prefix
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
