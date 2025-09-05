import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface PricingItem {
  operation: string;
  okbFee: string;
  usdEquivalent: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

const pricingData: PricingItem[] = [
  {
    operation: "用户注册",
    okbFee: "0.03 OKB",
    usdEquivalent: "$5.31",
    description: "一次性费用，筛选认真用户",
    icon: "mdi:account-plus",
    highlight: true
  },
  {
    operation: "新增配置",
    okbFee: "0.01 OKB", 
    usdEquivalent: "$1.77",
    description: "每个SSH配置存储费用",
    icon: "mdi:server-plus"
  },
  {
    operation: "编辑配置",
    okbFee: "0.005 OKB",
    usdEquivalent: "$0.88", 
    description: "防止频繁无意义修改",
    icon: "mdi:pencil"
  },
  {
    operation: "删除配置",
    okbFee: "免费",
    usdEquivalent: "$0",
    description: "鼓励清理无用配置",
    icon: "mdi:delete",
    highlight: true
  }
];

export function PricingTable() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            透明
            <span className="text-[#BCFF2F] mx-2">定价策略</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            基于 OKB 当前价格 <span className="text-[#BCFF2F] font-semibold">$176.99</span>，
            我们采用按需付费模式，无隐藏成本，无月费订阅
          </p>
        </motion.div>

        {/* 定价原则 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { icon: "mdi:cash-multiple", title: "按需付费", desc: "只为实际使用功能付费" },
            { icon: "mdi:timer-sand", title: "一次性成本", desc: "相比传统月费更经济" },
            { icon: "mdi:eye", title: "价格透明", desc: "明确费用结构" },
            { icon: "mdi:tune", title: "动态调整", desc: "管理员可调整（有上限保护）" }
          ].map((principle, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-[#BCFF2F]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon icon={principle.icon} className="text-2xl text-[#BCFF2F]" />
              </div>
              <h3 className="font-semibold text-white mb-2">{principle.title}</h3>
              <p className="text-sm text-gray-400">{principle.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 定价表格 */}
        <motion.div
          className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-[#BCFF2F] font-semibold">操作类型</th>
                  <th className="text-center py-4 px-6 text-[#BCFF2F] font-semibold">OKB 费用</th>
                  <th className="text-center py-4 px-6 text-[#BCFF2F] font-semibold">美元等值</th>
                  <th className="text-left py-4 px-6 text-[#BCFF2F] font-semibold">说明</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((item, index) => (
                  <motion.tr
                    key={index}
                    className={`
                      border-b border-white/5 transition-all duration-300
                      ${item.highlight 
                        ? 'bg-[#BCFF2F]/10 hover:bg-[#BCFF2F]/15' 
                        : 'hover:bg-white/5'
                      }
                      ${hoveredIndex === index ? 'transform scale-[1.02]' : ''}
                    `}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-4">
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center
                          ${item.highlight 
                            ? 'bg-[#BCFF2F]/20 text-[#BCFF2F]' 
                            : 'bg-gray-700/50 text-gray-300'
                          }
                        `}>
                          <Icon icon={item.icon} className="text-xl" />
                        </div>
                        <span className="font-semibold text-white">{item.operation}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className={`
                        font-bold text-lg
                        ${item.highlight ? 'text-[#BCFF2F]' : 'text-white'}
                      `}>
                        {item.okbFee}
                      </span>
                    </td>
                    <td className="py-6 px-6 text-center">
                      <span className="font-semibold text-gray-300">{item.usdEquivalent}</span>
                    </td>
                    <td className="py-6 px-6">
                      <span className="text-gray-400">{item.description}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 价格注释 */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            * 价格基于 OKB 当前市价 $176.99，实际费用将根据交易时的市场价格计算
          </p>
          <p className="text-gray-500 text-sm mt-2">
            * 所有费用将用于维护区块链存储成本和平台运营
          </p>
        </motion.div>
      </div>
    </section>
  );
}