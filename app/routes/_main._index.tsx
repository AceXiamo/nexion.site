import type { Route } from "./+types/_main._index";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { Comparison } from "../components/landing/Comparison";
import { Download } from "../components/landing/Download";
import { Footer } from "../components/landing/Footer";
import { VideoShowcase } from "../components/landing/VideoShowcase";
import "../styles/landing.css";

export function meta({}: Route.MetaArgs) {
  // Since meta function runs on the server, we'll use default English values
  // The actual i18n values will be handled by SEO components in the client
  return [
    { title: "Nexion - Open Source Web3 SSH Manager" },
    { name: "description", content: "Open source Web3 SSH manager that replaces traditional SSH keys with crypto wallets. Store configurations securely on blockchain. Free, self-hosted, and community-driven server management solution." },
    { name: "keywords", content: "SSH, Web3, Blockchain, Crypto Wallet, Server Management, Open Source, Self-hosted, MIT License, GitHub" },

    // Open Graph
    { property: "og:title", content: "Nexion - Open Source Web3 SSH Manager" },
    { property: "og:description", content: "Open source Web3 SSH manager that replaces traditional SSH keys with crypto wallets. Store configurations securely on blockchain. Free, self-hosted, and community-driven server management solution." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://nexion.acexiamo.com/logo.png" },
    { property: "og:url", content: "https://nexion.acexiamo.com" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Nexion - Open Source Web3 SSH Manager" },
    { name: "twitter:description", content: "Open source Web3 SSH manager that replaces traditional SSH keys with crypto wallets. Store configurations securely on blockchain. Free, self-hosted, and community-driven server management solution." },
    { name: "twitter:image", content: "https://nexion.acexiamo.com/logo.png" },
    { name: "twitter:creator", content: "@NexionTech" },
  ];
}

export default function Home() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Hero />
      <Features />
      <VideoShowcase />
      <Comparison />
      <Download />
      <Footer />
    </div>
  );
}
