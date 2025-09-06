import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../i18n/useLanguage";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const productHrefs = ["#features", "#pricing", "#download", "https://github.com/AceXiamo/Nexion/wiki"];

const techHrefs = [
  "https://www.okx.com/xlayer",
  "https://www.okx.com/web3",
  "https://github.com/AceXiamo/Nexion",
  "https://github.com/AceXiamo/Nexion/tree/main/contracts"
];

const socialLinks = [
  { icon: "mdi:github", href: "https://github.com/AceXiamo/Nexion" },
  { icon: "mdi:twitter", href: "#" },
  { icon: "mdi:discord", href: "#" }
];

export function Footer() {
  const { t } = useLanguage();
  const brandRef = useRef<HTMLSpanElement>(null)

  // 动态文字渐变（GSAP 背景位移动画）
  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = brandRef.current
    if (!el) return

    // 初始化渐变背景（使用多停靠点，形成流动效果）
    el.style.backgroundImage = 'linear-gradient(90deg, #BCFF2F, #00D26B, #3B82F6, #BCFF2F)'
    el.style.backgroundSize = '200% 200%'
    el.style.backgroundPosition = '0% 50%'

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const tween = gsap.to(el, {
      backgroundPosition: '200% 50%',
      duration: 8,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tween?.kill()
    }
  }, [])
  
  const productLinks = [
    { name: t('footer.links.features'), href: productHrefs[0] },
    { name: t('footer.links.pricing'), href: productHrefs[1] },
    { name: t('footer.links.download'), href: productHrefs[2] },
    { name: t('footer.links.docs'), href: productHrefs[3] }
  ];

  const techLinks = [
    { name: t('footer.links.xlayer'), href: techHrefs[0], external: true },
    { name: t('footer.links.okxWallet'), href: techHrefs[1], external: true },
    { name: t('footer.links.openSource'), href: techHrefs[2], external: true },
    { name: t('footer.links.contracts'), href: techHrefs[3], external: true }
  ];
  return (
    <footer className="py-12 border-t border-white/10 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <motion.div
              className="flex items-center space-x-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.img
                src="/logo.png"
                alt="Nexion Logo"
                className="w-10 h-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <span
                ref={brandRef}
                className="text-xl font-bold bg-clip-text text-transparent inline-block"
              >
                Nexion
              </span>
            </motion.div>
            
            <motion.div
              className="text-gray-400 max-w-[400px] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t('footer.description')}
            </motion.div>
            
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-gray-400 hover:text-[#BCFF2F] transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon icon={link.icon} className="text-2xl" />
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#BCFF2F] transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Tech Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white mb-4">{t('footer.technology')}</h4>
            <ul className="space-y-2">
              {techLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-[#BCFF2F] transition-colors inline-flex items-center"
                  >
                    {link.name}
                    {link.external && (
                      <Icon icon="mdi:external-link" className="text-xs ml-1" />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>{t('footer.copyright')}</p>
          <p className="mt-2">
            {t('footer.poweredBy')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
