import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Loes Nooitgedagt | Professional Photographer",
  description: "Meet Loes Nooitgedagt, a professional photographer specializing in lifestyle, wedding, brand, portrait, and event photography in the Netherlands. 8+ years of experience capturing authentic moments.",
  keywords: ["Loes Nooitgedagt", "professional photographer", "photography portfolio", "Dutch photographer", "lifestyle photographer", "wedding photographer"],
  openGraph: {
    title: "About Loes Nooitgedagt | Professional Photographer",
    description: "Meet Loes Nooitgedagt, a professional photographer with 8+ years of experience capturing authentic moments across the Netherlands.",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Loes Nooitgedagt - Professional Photographer"
      }
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Loes Nooitgedagt | Professional Photographer",
    description: "Meet Loes Nooitgedagt, a professional photographer with 8+ years of experience.",
    images: ["/og-about.jpg"],
  },
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      nl: "/about",
    },
  },
};
