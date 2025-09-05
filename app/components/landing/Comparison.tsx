import { Icon } from "@iconify/react";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const leftItems = [
  { icon: "mdi:key-variant", title: "身份与凭据", desc: "多套密钥、难以共享与吊销，易出错。" },
  { icon: "mdi:cloud-off-outline", title: "配置与同步", desc: "手工备份/同步，跨设备易失控。" },
  { icon: "mdi:alert-octagon", title: "安全与审计", desc: "明文/半明文存储，缺审计与追责。" },
  { icon: "mdi:account-multiple-outline", title: "协作与权限", desc: "权限粒度粗，团队管理复杂。" },
  { icon: "mdi:cash-remove", title: "总拥有成本", desc: "人力维护高，合规与事故成本不可控。" },
];

const rightItems = [
  { icon: "mdi:wallet", title: "钱包统一认证", desc: "Web3 钱包即身份，一键授权/吊销。" },
  { icon: "mdi:database-lock", title: "链上加密存储", desc: "ECIES 加密，配置上链，随处可取。" },
  { icon: "mdi:clipboard-text-search", title: "可追溯审计", desc: "链上事件可查，操作留痕可验证。" },
  { icon: "mdi:shield-account", title: "合约化权限", desc: "合约管理团队权限，最小授权原则。" },
  { icon: "mdi:cash-check", title: "低成本高收益", desc: "X Layer 低 Gas，自动化降低运维成本。" },
];

export function Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement[]>([]);
  const rightRef = useRef<HTMLDivElement[]>([]);
  const [allowMotion, setAllowMotion] = useState(true);

  leftRef.current = [];
  rightRef.current = [];

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
      gsap.set([leftRef.current, rightRef.current], { opacity: 0, y: allowMotion ? 12 : 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(leftRef.current, {
            opacity: 1,
            y: 0,
            duration: allowMotion ? 0.5 : 0.01,
            ease: "power2.out",
            stagger: 0.06,
          });
          gsap.to(rightRef.current, {
            opacity: 1,
            y: 0,
            duration: allowMotion ? 0.5 : 0.01,
            ease: "power2.out",
            stagger: 0.06,
            delay: 0.08,
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [allowMotion]);

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-4xl md:max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            传统方式 vs <span className="text-[#BCFF2F]">Nexion</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 mt-3">
            聚焦五个关键维度：身份 · 存储 · 安全 · 协作 · 成本
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
          {/* 左：传统方式 */}
          <div className="w-full lg:w-max mx-auto">
            <div className="text-sm text-gray-400 mb-3">传统 SSH 管理</div>
            <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden w-full lg:w-max">
              {leftItems.map((it, i) => (
                <div
                  key={i}
                  ref={(el) => el && (leftRef.current[i] = el)}
                  className={`flex items-start gap-3 p-4 ${allowMotion ? 'opacity-0 translate-y-3' : ''}`}
                >
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center mt-0.5">
                    <Icon icon="mdi:close" className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{it.title}</div>
                    <div className="text-gray-400 text-sm mt-1 leading-relaxed">{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：Nexion 方案 */}
          <div className="w-full lg:w-max mx-auto">
            <div className="text-sm text-gray-400 mb-3">Nexion 方案</div>
            <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden w-full lg:w-max">
              {rightItems.map((it, i) => (
                <div
                  key={i}
                  ref={(el) => el && (rightRef.current[i] = el)}
                  className={`flex items-start gap-3 p-4 ${allowMotion ? 'opacity-0 translate-y-3' : ''}`}
                >
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center mt-0.5">
                    <Icon icon="mdi:check" className="w-3.5 h-3.5 text-[#BCFF2F]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{it.title}</div>
                    <div className="text-gray-400 text-sm mt-1 leading-relaxed">{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
