import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Use default locale if none is provided
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
