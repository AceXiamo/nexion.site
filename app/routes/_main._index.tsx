import type { Route } from "./+types/home";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { Comparison } from "../components/landing/Comparison";
import { PricingSection } from "../components/landing/PricingSection";
import { Download } from "../components/landing/Download";
import { Footer } from "../components/landing/Footer";
import { VideoShowcase } from "../components/landing/VideoShowcase";
import "../styles/landing.css";

export function meta({}: Route.MetaArgs) {
  // 根据浏览器语言默认选择，后续用户可以通过UI切换
  const isZh = typeof window === 'undefined' || window.navigator.language.startsWith('zh');
  
  if (isZh) {
    return [
      { title: "Nexion - 下一代Web3 SSH管理器" },
      { name: "description", content: "用你的加密钱包替代传统SSH密钥，将配置安全存储在区块链上。体验去中心化时代的服务器管理革命。基于OKB的透明定价，节省高达95%成本。" },
      { name: "keywords", content: "SSH, Web3, 区块链, 加密钱包, 服务器管理, OKX, X Layer, SSH定价, 按需付费, OKB支付" },
      { property: "og:title", content: "Nexion - 下一代Web3 SSH管理器" },
      { property: "og:description", content: "用你的加密钱包替代传统SSH密钥，将配置安全存储在区块链上。基于OKB的透明定价，节省高达95%成本。" },
      { property: "og:type", content: "website" },
    ];
  } else {
    return [
      { title: "Nexion - Next-Gen Web3 SSH Manager" },
      { name: "description", content: "Replace traditional SSH keys with your crypto wallet. Store configurations securely on blockchain. Experience the server management revolution in the decentralized era. Transparent OKB-based pricing, save up to 95% costs." },
      { name: "keywords", content: "SSH, Web3, Blockchain, Crypto Wallet, Server Management, OKX, X Layer, SSH Pricing, Pay-as-you-go, OKB Payment" },
      { property: "og:title", content: "Nexion - Next-Gen Web3 SSH Manager" },
      { property: "og:description", content: "Replace traditional SSH keys with your crypto wallet. Store configurations securely on blockchain. Transparent OKB-based pricing, save up to 95% costs." },
      { property: "og:type", content: "website" },
    ];
  }
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
