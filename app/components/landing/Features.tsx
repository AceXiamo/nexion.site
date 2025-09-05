import { Icon } from "@iconify/react";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    icon: "mdi:wallet",
    title: "Web3 身份认证",
    description: "告别复杂的SSH密钥管理，使用你熟悉的加密钱包进行身份验证。一个钱包，连接所有服务器。",
    highlight: "支持 OKX、MetaMask、Trust Wallet",
    gradient: "from-[#BCFF2F] to-green-400",
    bgGradient: "from-[#BCFF2F]/10 to-green-400/10",
    delay: 0
  },
  {
    icon: "mdi:database-lock",
    title: "区块链存储",
    description: "SSH配置通过ECIES加密存储在X Layer区块链上，确保数据永不丢失，完全由你控制。",
    highlight: "年费用仅 $1.20，超低Gas成本",
    gradient: "from-blue-500 to-purple-500",
    bgGradient: "from-blue-500/10 to-purple-500/10",
    delay: 0.2
  },
  {
    icon: "mdi:shield-lock",
    title: "军事级加密",
    description: "采用ECIES + ChaCha20Poly1305加密算法，确保你的SSH配置和连接信息绝对安全。",
    highlight: "抗量子计算，面向未来",
    gradient: "from-red-500 to-pink-500",
    bgGradient: "from-red-500/10 to-pink-500/10",
    delay: 0.4
  },
  {
    icon: "mdi:laptop",
    title: "跨平台体验",
    description: "基于Electron构建，完美支持Windows、macOS、Linux。现代化界面，原生应用体验。",
    highlight: "一次配置，处处可用",
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-500/10 to-orange-500/10",
    delay: 0.6
  },
  {
    icon: "mdi:sync",
    title: "多设备同步",
    description: "配置存储在区块链上，无论在哪台设备上，只要连接钱包就能访问你的所有SSH配置。",
    highlight: "随时随地，无缝切换",
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-500/10 to-cyan-500/10",
    delay: 0.8
  },
  {
    icon: "mdi:github",
    title: "开源 & 透明",
    description: "核心代码开源，智能合约公开可验证。社区驱动发展，任何人都可以审查和贡献。",
    highlight: "信任通过代码建立",
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-500/10 to-indigo-500/10",
    delay: 1.0
  }
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const underlineRef = useRef<HTMLSpanElement[]>([]);
  const [allowMotion, setAllowMotion] = useState(true);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setAllowMotion(!mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(itemsRef.current, { opacity: 0, y: allowMotion ? 12 : 0 });
      gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "0% 50%" });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(itemsRef.current, {
            opacity: 1,
            y: 0,
            duration: allowMotion ? 0.6 : 0.01,
            ease: "power2.out",
            stagger: 0.08,
          });
          gsap.to(underlineRef.current, {
            scaleX: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.1,
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [allowMotion]);

  itemsRef.current = [];
  underlineRef.current = [];

  return (
    <section ref={sectionRef} id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            为什么选择 <span className="text-[#BCFF2F]">Nexion</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 mt-3">
            用更简单的方式，获得更强的安全与协作能力
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => el && (itemsRef.current[i] = el)}
              className={`group relative p-5 rounded-xl transition-colors ${allowMotion ? 'opacity-0 translate-y-3' : ''} hover:bg-white/[0.03]`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center">
                    <Icon icon={f.icon} className="w-4 h-4 text-white/80 group-hover:text-[#BCFF2F] transition-colors" />
                  </div>
                </div>
                <div>
                  <div className="relative inline-block">
                    <h3 className="text-white font-semibold">
                      {f.title}
                    </h3>
                    <span
                      ref={(el) => el && (underlineRef.current[i] = el)}
                      className="absolute left-0 -bottom-1 h-0.5 w-full bg-gradient-to-r from-[#BCFF2F] to-transparent"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    {f.description}
                  </p>
                  <div className="text-xs text-gray-500 mt-3">
                    {f.highlight}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
