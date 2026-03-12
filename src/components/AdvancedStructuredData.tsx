export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://loesnooitgedagt.com/#organization",
    "name": "Loes Nooitgedagt Fotografie",
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
    "description": "Fotograaf gespecialiseerd in bruiloften, lifestyle, brand, portret en evenementfotografie in Nederland",
    "email": "info@loesnooitgedagt.com",
    "telephone": "+31618431148",
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
    "paymentAccepted": ["Bankoverschrijving", "Creditcard", "PayPal"],
    "currenciesAccepted": "EUR",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    "sameAs": [
      "https://www.instagram.com/byloesnooitgedagt/",
      "https://www.linkedin.com/in/loes-nooitgedagt-72006314b/",
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
    "description": "Fotograaf gespecialiseerd in lifestyle, bruiloft, brand, portret en evenementfotografie",
    "jobTitle": "Fotograaf",
    "worksFor": {
      "@id": "https://loesnooitgedagt.com/#organization",
    },
    "sameAs": [
      "https://www.instagram.com/byloesnooitgedagt/",
      "https://www.linkedin.com/in/loes-nooitgedagt-72006314b/",
    ],
    "knowsAbout": [
      "Bruiloftsfotografie",
      "Lifestyle fotografie",
      "Merkfotografie",
      "Portretfotografie",
      "Evenementfotografie",
      "Editorial fotografie",
      "Commerciële fotografie",
    ],
    "award": [
      "8+ Jaar Professionele Ervaring",
      "150+ Afgeronde Projecten",
      "50+ Tevreden Klanten",
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
      "serviceType": "Bruiloftsfotografie",
      "provider": {
        "@id": "https://loesnooitgedagt.com/#organization",
      },
      "areaServed": {
        "@type": "Country",
        "name": "Netherlands",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Bruiloftsfotografie Pakketten",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bruiloftsfotografie Pakket",
              "description": "Volledige dagdekking van jullie trouwdag met professionele bewerking",
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
      "description": "Bruiloftsfotografie die jullie liefdesverhaal vastlegt met creativiteit en emotie",
    },
    lifestyle: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Lifestyle Fotografie",
      "provider": {
        "@id": "https://loesnooitgedagt.com/#organization",
      },
      "areaServed": {
        "@type": "Country",
        "name": "Netherlands",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Lifestyle Fotografie Pakketten",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Lifestyle Fotografie Sessie",
              "description": "2 uur lifestyle fotografie sessie met professionele bewerking",
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
      "description": "Authentieke lifestyle fotografie die de schoonheid van het dagelijks leven en persoonlijke momenten vastlegt",
    },
    brand: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Merkfotografie",
      "provider": {
        "@id": "https://loesnooitgedagt.com/#organization",
      },
      "areaServed": {
        "@type": "Country",
        "name": "Netherlands",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Merkfotografie Pakketten",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Merkfotografie Pakket",
              "description": "Halve dag merkfotografie sessie met consultatie en commerciële licentie",
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
      "description": "Professionele merkfotografie voor bedrijven en ondernemers",
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
    "name": "Fotografie Portfolio",
    "description": "Fotografie portfolio van Loes Nooitgedagt",
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
    "name": "Loes Nooitgedagt Fotografie",
    "url": "https://loesnooitgedagt.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://loesnooitgedagt.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    "inLanguage": ["nl", "en"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
