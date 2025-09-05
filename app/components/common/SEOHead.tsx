interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export function SEOHead({
  title = "Nexion - 下一代Web3 SSH管理器",
  description = "用你的加密钱包替代传统SSH密钥，将配置安全存储在区块链上。体验去中心化时代的服务器管理革命。",
  keywords = "SSH, Web3, 区块链, 加密钱包, 服务器管理, OKX, X Layer, 去中心化, 终端, 安全",
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
    { property: "og:locale", content: "zh_CN" },
    
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

// 结构化数据模板
export const NexionStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Nexion",
  "description": "下一代Web3 SSH管理器，用加密钱包替代传统SSH密钥",
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
  "downloadUrl": "https://github.com/AceXiamo/Nexion",
  "featureList": [
    "Web3 钱包认证",
    "区块链配置存储",
    "端到端加密",
    "跨平台支持",
    "多设备同步"
  ],
  "screenshot": "/screenshots/nexion-dashboard.jpg"
};