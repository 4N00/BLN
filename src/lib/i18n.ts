import { useTranslations as useNextIntlTranslations } from "next-intl";
import { getTranslations as getNextIntlTranslations } from "next-intl/server";

// Type-safe translation hook with autocomplete for client components
export function useTranslations<T extends keyof IntlMessages>(
  namespace: T
) {
  return useNextIntlTranslations(namespace);
}

// Type-safe translation getter for server components
export async function getTranslations<T extends keyof IntlMessages>(
  namespace: T
) {
  return getNextIntlTranslations(namespace);
}

// Type for all message keys
export type TranslationKey<T extends keyof IntlMessages> =
  keyof IntlMessages[T];
