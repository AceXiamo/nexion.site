import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { OKXCard } from "../ui/OKXCard";
import { useLanguage } from "../../i18n/useLanguage";

const FEES_OKB = { registration: 0.02, addConfig: 0.005, updateConfig: 0.0015 };
const OKB_PRICE_USD = 190; // Current OKB price in USD

export function PricingSection() {
  const { t } = useLanguage();
  const fees = t('pricing.fees', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    price: string;
  }>;
  const advantages = t('pricing.advantages.items', { returnObjects: true }) as string[];
  
  // Calculate USD prices
  const calculateUSDPrice = (okbAmount: number) => {
    const usdPrice = okbAmount * OKB_PRICE_USD;
    return usdPrice < 0.01 ? '< $0.01' : `$${usdPrice.toFixed(2)}`;
  };
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{t('pricing.title')}</h2>
          <p className="text-base md:text-lg text-gray-400 mt-3">{t('pricing.subtitle')}</p>
        </motion.div>
        {/* 收费规则（精简说明） */}
        <motion.div
          className="max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden">
            {fees.map((fee, i) => {
              const icons = ["mdi:account-plus", "mdi:server-plus", "mdi:pencil"];
              const okbAmounts = [FEES_OKB.registration, FEES_OKB.addConfig, FEES_OKB.updateConfig];
              const usdPrice = calculateUSDPrice(okbAmounts[i]);
              
              return (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Icon icon={icons[i]} className="text-[#BCFF2F]" />
                    <div>
                      <div className="text-white font-medium">{fee.title}</div>
                      <div className="text-gray-400 text-sm">{fee.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{fee.price}</div>
                    <div className="text-gray-400 text-sm">≈ {usdPrice}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 与订阅制的差异（Termius 等） */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="rounded-xl border border-white/10 p-5">
            <div className="text-white font-semibold mb-3">{t('pricing.advantages.title')}</div>
            <ul className="text-gray-400 text-sm space-y-2">
              {advantages.map((advantage, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Icon icon="mdi:check" className="text-[#BCFF2F] mt-0.5" />
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 价格注释 */}
        <motion.div
          className="mt-8 text-center text-sm text-gray-500 space-y-1"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>{t('pricing.note')}</p>
          <p>USD prices calculated at OKB = ${OKB_PRICE_USD} (prices may vary with market)</p>
        </motion.div>
      </div>
    </section>
  );
}
