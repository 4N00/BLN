import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import { TransitionProvider } from "@/context/TransitionContext";
import { SplitTransitionProvider } from "@/context/SplitTransitionContext";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import SplitTransitionOverlay from "@/components/SplitTransitionOverlay";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CustomCursor from "@/components/CustomCursor";
import StructuredData from "@/components/StructuredData";
import { OrganizationSchema, PersonSchema, WebSiteSchema } from "@/components/AdvancedStructuredData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loesnooitgedagt.com"),
  title: {
    default: "Loes Nooitgedagt | Photography Portfolio",
    template: "%s | Loes Nooitgedagt Photography"
  },
  description: "Award-winning photographer in Netherlands ✨ Specializing in Wedding, Lifestyle, Brand & Portrait Photography | 150+ Happy Clients | Book Your Session →",
  keywords: [
    "photographer Netherlands",
    "wedding photographer",
    "bruidsfotograaf",
    "lifestyle photography",
    "lifestyle fotografie",
    "brand photography",
    "bedrijfsfotografie",
    "portrait photographer",
    "portretfotograaf",
    "event photography",
    "professional photographer Netherlands",
    "fotograaf Nederland",
    "Amsterdam photographer",
    "destination wedding photographer"
  ],
  authors: [{ name: "Loes Nooitgedagt" }],
  creator: "Loes Nooitgedagt",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["nl_NL"],
    url: "https://loesnooitgedagt.com",
    siteName: "Loes Nooitgedagt Photography",
    title: "Loes Nooitgedagt | Photography Portfolio",
    description: "Professional photography services specializing in lifestyle, wedding, brand, portrait, and event photography.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Loes Nooitgedagt Photography"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Loes Nooitgedagt | Photography Portfolio",
    description: "Professional photography services specializing in lifestyle, wedding, brand, portrait, and event photography.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${cormorant.variable} ${playfair.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="geo.region" content="NL" />
        <meta name="geo.placename" content="Netherlands" />
        <meta name="language" content={locale} />
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://loesnooitgedagt.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://loesnooitgedagt.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" hrefLang="en" href="https://loesnooitgedagt.com" />
        <link rel="alternate" hrefLang="nl" href="https://loesnooitgedagt.com" />
        <link rel="alternate" hrefLang="x-default" href="https://loesnooitgedagt.com" />
        <StructuredData />
        <OrganizationSchema />
        <PersonSchema />
        <WebSiteSchema />
      </head>
      <body className="antialiased bg-white text-black selection:bg-black selection:text-white md:cursor-none">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white">
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <TransitionProvider>
            <PageTransitionProvider>
              <SplitTransitionProvider>
                <SmoothScroll>
                  <CustomCursor />
                  <Navigation />
                  <SplitTransitionOverlay />
                  <main id="main-content" className="min-h-screen">{children}</main>
                </SmoothScroll>
              </SplitTransitionProvider>
            </PageTransitionProvider>
          </TransitionProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
