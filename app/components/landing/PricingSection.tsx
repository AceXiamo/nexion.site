import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { OKXCard } from "../ui/OKXCard";

const FEES_OKB = { registration: 0.1, addConfig: 0.02, updateConfig: 0.005 };

export function PricingSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">透明 <span className="text-[#BCFF2F]">定价策略</span></h2>
          <p className="text-base md:text-lg text-gray-400 mt-3">只对链上价值交互收费；终端与 FTP 完全免费</p>
        </motion.div>
        {/* 收费规则（精简说明） */}
        <motion.div
          className="max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:account-plus" className="text-[#BCFF2F]" />
                <div>
                  <div className="text-white font-medium">用户注册（一次性）</div>
                  <div className="text-gray-400 text-sm">激活链上身份</div>
                </div>
              </div>
              <div className="text-white font-semibold">{FEES_OKB.registration} OKB</div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:server-plus" className="text-[#BCFF2F]" />
                <div>
                  <div className="text-white font-medium">新增配置</div>
                  <div className="text-gray-400 text-sm">每个 SSH 配置上链存储</div>
                </div>
              </div>
              <div className="text-white font-semibold">{FEES_OKB.addConfig} OKB / 个</div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:pencil" className="text-[#BCFF2F]" />
                <div>
                  <div className="text-white font-medium">编辑配置</div>
                  <div className="text-gray-400 text-sm">更新链上配置数据</div>
                </div>
              </div>
              <div className="text-white font-semibold">{FEES_OKB.updateConfig} OKB / 次</div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:delete" className="text-gray-400" />
                <div>
                  <div className="text-white/80 font-medium">删除配置</div>
                  <div className="text-gray-400 text-sm">标记为失活，可随时恢复/清理</div>
                </div>
              </div>
              <div className="text-gray-300 font-semibold">免费</div>
            </div>
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
            <div className="text-white font-semibold mb-3">我们的优势</div>
            <ul className="text-gray-400 text-sm space-y-2">
              <li className="flex items-start gap-2"><Icon icon="mdi:check" className="text-[#BCFF2F] mt-0.5" />无订阅、无月费：按需付费，用多少付多少</li>
              <li className="flex items-start gap-2"><Icon icon="mdi:check" className="text-[#BCFF2F] mt-0.5" />只对链上价值交互收费：注册 / 新增 / 编辑配置</li>
              <li className="flex items-start gap-2"><Icon icon="mdi:check" className="text-[#BCFF2F] mt-0.5" />连接与传输完全免费：终端与 FTP / SFTP 不收费</li>
              <li className="flex items-start gap-2"><Icon icon="mdi:check" className="text-[#BCFF2F] mt-0.5" />不同于订阅制，避免长期固定成本</li>
            </ul>
          </div>
        </motion.div>

        {/* 价格注释 */}
        <motion.div
          className="mt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>* 实际费用以交易时 OKB 市价为准；费用由合约设定，可链上查询</p>
        </motion.div>
      </div>
    </section>
  );
}
