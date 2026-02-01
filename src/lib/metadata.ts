import { Metadata } from "next";

const baseUrl = "https://loesnooitgedagt.com";

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  type?: "website" | "profile" | "article";
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.jpg",
  type = "website",
}: PageMetadata): Metadata {
  const fullTitle = `${title} | Loes Nooitgedagt Photography`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "Loes Nooitgedagt",
      "photography",
      "photographer Netherlands",
      "professional photographer",
      ...keywords,
    ],
    authors: [{ name: "Loes Nooitgedagt", url: baseUrl }],
    creator: "Loes Nooitgedagt",
    publisher: "Loes Nooitgedagt Photography",
    openGraph: {
      title: fullTitle,
      description,
      url: baseUrl,
      siteName: "Loes Nooitgedagt Photography",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      alternateLocale: ["nl_NL"],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@loesnooitgedagt",
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
  };
}

export const portfolioMetadata = {
  wedding: {
    title: "Wedding Photography",
    description: "Timeless wedding photography capturing your love story with artistry and emotion. From intimate ceremonies to grand celebrations, every precious moment documented beautifully.",
    keywords: ["wedding photographer", "bruidsfotograaf", "wedding photography Netherlands", "destination wedding photographer", "trouwfotograaf"],
    ogImage: "/og-wedding.jpg",
  },
  lifestyle: {
    title: "Lifestyle Photography",
    description: "Authentic lifestyle photography that captures the beauty in your daily rituals, family connections, and personal style with an editorial approach.",
    keywords: ["lifestyle photographer", "lifestyle fotografie", "family photographer", "personal branding", "lifestyle photography Netherlands"],
    ogImage: "/og-lifestyle.jpg",
  },
  brand: {
    title: "Brand Photography",
    description: "Professional brand photography that communicates your values, connects with your audience, and elevates your business presence through compelling visual narratives.",
    keywords: ["brand photographer", "bedrijfsfotografie", "commercial photography", "business photographer", "brand photography Netherlands"],
    ogImage: "/og-brand.jpg",
  },
  portrait: {
    title: "Portrait Photography",
    description: "Fine art portrait photography that reveals your essence, capturing depth, beauty, and your unique story through intimate and artistic portraiture.",
    keywords: ["portrait photographer", "portretfotograaf", "fine art portraits", "editorial portraits", "headshots photographer"],
    ogImage: "/og-portrait.jpg",
  },
  event: {
    title: "Event Photography",
    description: "Professional event photography with a documentary approach, capturing the energy, emotion, and authentic moments of corporate gatherings and special celebrations.",
    keywords: ["event photographer", "evenementenfotograaf", "corporate event photography", "conference photographer", "event photography Netherlands"],
    ogImage: "/og-event.jpg",
  },
};
