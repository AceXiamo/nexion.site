import { Icon } from "@iconify/react";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../i18n/useLanguage";

const featureIcons = [
  "mdi:wallet",
  "mdi:database-lock", 
  "mdi:shield-lock",
  "mdi:laptop",
  "mdi:sync",
  "mdi:github"
];

const featureGradients = [
  { gradient: "from-[#BCFF2F] to-green-400", bgGradient: "from-[#BCFF2F]/10 to-green-400/10" },
  { gradient: "from-blue-500 to-purple-500", bgGradient: "from-blue-500/10 to-purple-500/10" },
  { gradient: "from-red-500 to-pink-500", bgGradient: "from-red-500/10 to-pink-500/10" },
  { gradient: "from-yellow-500 to-orange-500", bgGradient: "from-yellow-500/10 to-orange-500/10" },
  { gradient: "from-teal-500 to-cyan-500", bgGradient: "from-teal-500/10 to-cyan-500/10" },
  { gradient: "from-purple-500 to-indigo-500", bgGradient: "from-purple-500/10 to-indigo-500/10" }
];

export function Features() {
  const { t, currentLanguage } = useLanguage();
  const features = t('features.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    highlight: string;
  }>;
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const underlineRef = useRef<HTMLSpanElement[]>([]);
  const [allowMotion, setAllowMotion] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

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

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: false, // Allow retriggering
        onEnter: () => {
          if (!hasAnimated || currentLanguage) {
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
            setHasAnimated(true);
          }
        },
      });
      
      return () => trigger.kill();
    }, sectionRef);
    return () => ctx.revert();
  }, [allowMotion, currentLanguage, hasAnimated]);

  // Reset animation state when language changes
  useLayoutEffect(() => {
    setHasAnimated(false);
    if (sectionRef.current && itemsRef.current.length > 0) {
      gsap.set(itemsRef.current, { opacity: 0, y: allowMotion ? 12 : 0 });
      gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "0% 50%" });
    }
  }, [currentLanguage, allowMotion]);

  itemsRef.current = [];
  underlineRef.current = [];

  return (
    <section ref={sectionRef} id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {t('features.title')} <span className="text-[#BCFF2F]">Nexion</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 mt-3">
            {t('features.subtitle')}
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
                    <Icon icon={featureIcons[i]} className="w-4 h-4 text-white/80 group-hover:text-[#BCFF2F] transition-colors" />
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
