interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export function SEOHead({
  title = "Nexion - Next-Gen Web3 SSH Manager",
  description = "Replace traditional SSH keys with your crypto wallet. Store configurations securely on blockchain. Experience the server management revolution in the decentralized era.",
  keywords = "SSH, Web3, Blockchain, Crypto Wallet, Server Management, OKX, X Layer, Decentralized, Terminal, Security",
  ogImage = "/og-image.jpg",
  canonicalUrl = "https://nexion.tech",
  structuredData
}: SEOHeadProps) {
  const meta = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: "Nexion Team" },
    { name: "robots", content: "index, follow" },
    
    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: ogImage },
    { property: "og:site_name", content: "Nexion" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:creator", content: "@NexionTech" },
    
    // Additional Meta
    { name: "theme-color", content: "#BCFF2F" },
    { name: "msapplication-TileColor", content: "#BCFF2F" },
    { name: "apple-mobile-web-app-title", content: "Nexion" },
    { name: "application-name", content: "Nexion" },
    { name: "format-detection", content: "telephone=no" },
    
    // Canonical URL
    ...(canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [])
  ];

  return {
    meta,
    links: [
      ...(canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : []),
    ],
    scripts: [
      ...(structuredData ? [{
        type: "application/ld+json",
        children: JSON.stringify(structuredData)
      }] : [])
    ]
  };
}

// Structured Data Template
export const NexionStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Nexion",
  "description": "Next-generation Web3 SSH Manager, replace traditional SSH keys with crypto wallet",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": ["Windows", "macOS", "Linux"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "Nexion Team"
  },
  "downloadUrl": "https://github.com/NexionDev/app/releases",
  "featureList": [
    "Web3 Wallet Authentication",
    "Blockchain Configuration Storage",
    "End-to-End Encryption",
    "Cross-Platform Support",
    "Multi-Device Sync"
  ],
  "screenshot": "/screenshots/nexion-dashboard.jpg"
};
