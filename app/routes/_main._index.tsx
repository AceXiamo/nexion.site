import type { Route } from "./+types/_main._index";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { Comparison } from "../components/landing/Comparison";
import { PricingSection } from "../components/landing/PricingSection";
import { Download } from "../components/landing/Download";
import { Footer } from "../components/landing/Footer";
import { VideoShowcase } from "../components/landing/VideoShowcase";
import "../styles/landing.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nexion - Next-Gen Web3 SSH Manager" },
    { name: "description", content: "Replace traditional SSH keys with your crypto wallet. Store configurations securely on blockchain. Experience the server management revolution in the decentralized era. Transparent OKB-based pricing, save up to 95% costs." },
    { name: "keywords", content: "SSH, Web3, Blockchain, Crypto Wallet, Server Management, OKX, X Layer, SSH Pricing, Pay-as-you-go, OKB Payment" },
    { property: "og:title", content: "Nexion - Next-Gen Web3 SSH Manager" },
    { property: "og:description", content: "Replace traditional SSH keys with your crypto wallet. Store configurations securely on blockchain. Transparent OKB-based pricing, save up to 95% costs." },
    { property: "og:type", content: "website" },
  ];
}

export default function Home() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Hero />
      <Features />
      <VideoShowcase />
      <Comparison />
      <PricingSection />
      <Download />
      <Footer />
    </div>
  );
}
