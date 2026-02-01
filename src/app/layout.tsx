import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google"; // Import fonts
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Loes Nooitgedagt - Portfolio",
  description: "High-end photography portfolio",
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
       <body className="antialiased bg-white text-black selection:bg-black selection:text-white cursor-none">
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
