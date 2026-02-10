export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Loes Nooitgedagt Photography",
    "description": "Professional photography services specializing in lifestyle, wedding, brand, portrait, and event photography",
    "url": "https://loesnooitgedagt.com",
    "logo": "https://loesnooitgedagt.com/logo.png",
    "image": "https://loesnooitgedagt.com/og-image.jpg",
    "email": "info@loesnooitgedagt.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL"
    },
    "priceRange": "€€€",
    "serviceType": [
      "Wedding Photography",
      "Lifestyle Photography",
      "Brand Photography",
      "Portrait Photography",
      "Event Photography"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Netherlands"
    },
    "sameAs": [
      "https://www.instagram.com/loesnooitgedagt",
      "https://www.linkedin.com/in/loesnooitgedagt"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
