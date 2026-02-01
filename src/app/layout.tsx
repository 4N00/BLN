import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google"; // Import fonts
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import { TransitionProvider } from "@/context/TransitionContext";
import { SplitTransitionProvider } from "@/context/SplitTransitionContext";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import SplitTransitionOverlay from "@/components/SplitTransitionOverlay";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";

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
  title: "Loes Nooitgedagt - Portfolio",
  description: "High-end photography portfolio",
};

import CustomCursor from "@/components/CustomCursor";

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
      <body className="antialiased bg-white text-black selection:bg-black selection:text-white cursor-none">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <TransitionProvider>
            <PageTransitionProvider>
              <SplitTransitionProvider>
                <SmoothScroll>
                  <CustomCursor />
                  <Navigation />
                  <SplitTransitionOverlay />
                  <main className="min-h-screen">{children}</main>
                </SmoothScroll>
              </SplitTransitionProvider>
            </PageTransitionProvider>
          </TransitionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
