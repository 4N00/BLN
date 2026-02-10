export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://loesnooitgedagt.com/#organization",
    "name": "Loes Nooitgedagt Photography",
    "alternateName": "Loes Nooitgedagt",
    "url": "https://loesnooitgedagt.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://loesnooitgedagt.com/logo.png",
      "width": 600,
      "height": 600,
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://loesnooitgedagt.com/og-image.jpg",
      "width": 1200,
      "height": 630,
    },
    "description": "Professional photography services specializing in lifestyle, wedding, brand, portrait, and event photography in the Netherlands",
    "email": "info@loesnooitgedagt.com",
    "telephone": "+31-XXX-XXXXXX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL",
      "addressRegion": "Netherlands",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.3676",
      "longitude": "4.9041",
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Netherlands",
      },
      {
        "@type": "Country",
        "name": "Belgium",
      },
    ],
    "priceRange": "€€€",
    "paymentAccepted": ["Bank Transfer", "Credit Card", "PayPal"],
    "currenciesAccepted": "EUR",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    "sameAs": [
      "https://www.instagram.com/loesnooitgedagt",
      "https://www.linkedin.com/in/loesnooitgedagt",
      "https://www.facebook.com/loesnooitgedagt",
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://loesnooitgedagt.com/contact",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://loesnooitgedagt.com/#person",
    "name": "Loes Nooitgedagt",
    "givenName": "Loes",
    "familyName": "Nooitgedagt",
    "url": "https://loesnooitgedagt.com",
    "image": "https://loesnooitgedagt.com/loes-portrait.jpg",
    "description": "Professional photographer specializing in lifestyle, wedding, brand, portrait, and event photography",
    "jobTitle": "Professional Photographer",
    "worksFor": {
      "@id": "https://loesnooitgedagt.com/#organization",
    },
    "sameAs": [
      "https://www.instagram.com/loesnooitgedagt",
      "https://www.linkedin.com/in/loesnooitgedagt",
    ],
    "knowsAbout": [
      "Wedding Photography",
      "Lifestyle Photography",
      "Brand Photography",
      "Portrait Photography",
      "Event Photography",
      "Editorial Photography",
      "Commercial Photography",
    ],
    "award": [
      "8+ Years Professional Experience",
      "150+ Completed Projects",
      "50+ Happy Clients",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://loesnooitgedagt.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({ service }: { service: string }) {
  const services: Record<string, any> = {
    wedding: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Wedding Photography",
      "provider": {
        "@id": "https://loesnooitgedagt.com/#organization",
      },
      "areaServed": {
        "@type": "Country",
        "name": "Netherlands",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Wedding Photography Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Wedding Photography Package",
              "description": "Full day coverage of your wedding day with professional editing",
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "1800",
              "priceCurrency": "EUR",
              "valueAddedTaxIncluded": true,
            },
          },
        ],
      },
      "image": "https://loesnooitgedagt.com/og-wedding.jpg",
      "description": "Professional wedding photography capturing your love story with artistry and emotion",
    },
    lifestyle: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Lifestyle Photography",
      "provider": {
        "@id": "https://loesnooitgedagt.com/#organization",
      },
      "areaServed": {
        "@type": "Country",
        "name": "Netherlands",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Lifestyle Photography Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Lifestyle Photography Session",
              "description": "2-hour lifestyle photography session with professional editing",
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "375",
              "priceCurrency": "EUR",
              "valueAddedTaxIncluded": true,
            },
          },
        ],
      },
      "image": "https://loesnooitgedagt.com/og-lifestyle.jpg",
      "description": "Authentic lifestyle photography capturing everyday beauty and personal moments",
    },
    brand: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Brand Photography",
      "provider": {
        "@id": "https://loesnooitgedagt.com/#organization",
      },
      "areaServed": {
        "@type": "Country",
        "name": "Netherlands",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Brand Photography Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Brand Photography Package",
              "description": "Half-day brand photography session with consultation and commercial license",
            },
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "600",
              "priceCurrency": "EUR",
              "valueAddedTaxIncluded": true,
            },
          },
        ],
      },
      "image": "https://loesnooitgedagt.com/og-brand.jpg",
      "description": "Professional brand photography for businesses and entrepreneurs",
    },
  };

  const schema = services[service] || services.wedding;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ImageGallerySchema({ images }: { images: Array<{ url: string; caption: string; name: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Photography Portfolio",
    "description": "Professional photography portfolio by Loes Nooitgedagt",
    "image": images.map((img) => ({
      "@type": "ImageObject",
      "contentUrl": img.url,
      "name": img.name,
      "description": img.caption,
      "author": {
        "@id": "https://loesnooitgedagt.com/#person",
      },
      "copyrightHolder": {
        "@id": "https://loesnooitgedagt.com/#organization",
      },
      "copyrightYear": new Date().getFullYear(),
      "license": "https://loesnooitgedagt.com/license",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Loes Nooitgedagt Photography",
    "url": "https://loesnooitgedagt.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://loesnooitgedagt.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    "inLanguage": ["en", "nl"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
