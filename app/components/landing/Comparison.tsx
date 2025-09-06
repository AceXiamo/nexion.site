import { Icon } from "@iconify/react";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n/useLanguage";

const traditionalIcons = [
  "mdi:key-variant",
  "mdi:cloud-off-outline", 
  "mdi:alert-octagon",
  "mdi:account-multiple-outline",
  "mdi:cash-remove"
];

const nexionIcons = [
  "mdi:wallet",
  "mdi:database-lock",
  "mdi:clipboard-text-search",
  "mdi:shield-account",
  "mdi:cash-check"
];

export function Comparison() {
  const { t } = useLanguage();
  const traditionalItems = t('comparison.traditional.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;
  const nexionItems = t('comparison.nexion.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;
  
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
            {t('comparison.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-400 mt-3">
            {t('comparison.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
          {/* 左：传统方式 */}
          <div className="w-full lg:w-max mx-auto">
            <div className="text-sm text-gray-400 mb-3">{t('comparison.traditional.title')}</div>
            <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden w-full lg:w-max">
              {traditionalItems.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => el && (leftRef.current[i] = el)}
                  className={`flex items-start gap-3 p-4 ${allowMotion ? 'opacity-0 translate-y-3' : ''}`}
                >
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center mt-0.5">
                    <Icon icon="mdi:close" className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{item.title}</div>
                    <div className="text-gray-400 text-sm mt-1 leading-relaxed">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：Nexion 方案 */}
          <div className="w-full lg:w-max mx-auto">
            <div className="text-sm text-gray-400 mb-3">{t('comparison.nexion.title')}</div>
            <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden w-full lg:w-max">
              {nexionItems.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => el && (rightRef.current[i] = el)}
                  className={`flex items-start gap-3 p-4 ${allowMotion ? 'opacity-0 translate-y-3' : ''}`}
                >
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center mt-0.5">
                    <Icon icon="mdi:check" className="w-3.5 h-3.5 text-[#BCFF2F]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{item.title}</div>
                    <div className="text-gray-400 text-sm mt-1 leading-relaxed">{item.description}</div>
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
