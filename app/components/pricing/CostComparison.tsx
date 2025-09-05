import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

interface ScenarioData {
  title: string;
  description: string;
  configs: number;
  years: number;
  updatesPerConfigPerYear: number;
  timeframe: string;
  traditional: {
    solutions: Array<{
      name: string;
      cost: number; // USD total over timeframe
      period: string;
    }>;
  };
}

const FEES_OKB = { registration: 0.1, addConfig: 0.02, updateConfig: 0.005 };

const scenarios: ScenarioData[] = [
  {
    title: "个人开发者",
    description: "个人项目，适中的配置管理需求",
    configs: 20,
    years: 2,
    updatesPerConfigPerYear: 2,
    timeframe: "2年使用",
    traditional: {
      solutions: [
        { name: "1Password", cost: 192, period: "$8×24个月" },
        { name: "LastPass", cost: 144, period: "$6×24个月" }
      ]
    }
  },
  {
    title: "开发团队",
    description: "小型团队，协作开发环境",
    configs: 50,
    years: 1,
    updatesPerConfigPerYear: 1,
    timeframe: "1年使用",
    traditional: {
      solutions: [
        { name: "Teleport", cost: 120, period: "$120/年" },
        { name: "SSH Key管理", cost: 360, period: "$30/月×12" }
      ]
    }
  },
  {
    title: "企业用户",
    description: "大型企业，复杂配置管理",
    configs: 100,
    years: 1,
    updatesPerConfigPerYear: 1,
    timeframe: "1年使用",
    traditional: {
      solutions: [
        { name: "strongDM", cost: 8400, period: "$70/用户/月×10用户×12" },
        { name: "Teleport Enterprise", cost: 2400, period: "$200/月×12" }
      ]
    }
  }
];

export function CostComparison() {
  const [activeScenario, setActiveScenario] = useState(0);
  const okbUsd = Number(import.meta.env.VITE_OKB_PRICE_USD || "");

  const computed = useMemo(() => {
    const s = scenarios[activeScenario];
    const updatesCount = s.configs * s.updatesPerConfigPerYear * s.years;
    const registrationOKB = FEES_OKB.registration;
    const configurationsOKB = FEES_OKB.addConfig * s.configs;
    const updatesOKB = FEES_OKB.updateConfig * updatesCount;
    const totalOKB = registrationOKB + configurationsOKB + updatesOKB;

    const competitorUSD = s.traditional.solutions.reduce((sum, it) => sum + it.cost, 0);
    const nexionUSD = okbUsd ? totalOKB * okbUsd : undefined;
    const savingsUSD = okbUsd ? Math.max(competitorUSD - nexionUSD!, 0) : undefined;
    const savingsPct = okbUsd ? `${Math.round((savingsUSD! / competitorUSD) * 100)}%` : undefined;

    return {
      updatesCount,
      registrationOKB,
      configurationsOKB,
      updatesOKB,
      totalOKB,
      competitorUSD,
      nexionUSD,
      savingsUSD,
      savingsPct,
    };
  }, [activeScenario, okbUsd]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            成本
            <span className="text-[#BCFF2F] mx-2">优势分析</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            与传统 SSH 管理方案对比，Nexion 采用 OKB 按需付费，链上可查、透明可控
          </p>
        </motion.div>

        {/* 场景选择器 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {scenarios.map((scenario, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveScenario(index)}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all duration-300
                ${activeScenario === index
                  ? 'bg-[#BCFF2F] text-black shadow-lg shadow-[#BCFF2F]/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/10'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {scenario.title}
            </motion.button>
          ))}
        </motion.div>

        {/* 对比展示 */}
        <motion.div
          key={activeScenario}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 传统方案 */}
          <motion.div
            className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                <Icon icon="mdi:alert-circle" className="text-2xl text-red-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">传统方案</h3>
                <p className="text-gray-400">{scenarios[activeScenario].description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>配置数量: {scenarios[activeScenario].configs}个</span>
                <span>{scenarios[activeScenario].timeframe}</span>
              </div>
              
              {scenarios[activeScenario].traditional.solutions.map((solution, idx) => (
                <div key={idx} className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">{solution.name}</h4>
                      <p className="text-sm text-gray-400">{solution.period}</p>
                    </div>
                    <div className="text-2xl font-bold text-red-400">
                      ${solution.cost}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-4 border-t border-red-500/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">传统方案成本范围</span>
                  <span className="text-2xl font-bold text-red-400">
                    ${Math.min(...scenarios[activeScenario].traditional.solutions.map(s => s.cost))} - 
                    ${Math.max(...scenarios[activeScenario].traditional.solutions.map(s => s.cost))}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nexion 方案 */}
          <motion.div
            className="bg-gradient-to-br from-[#BCFF2F]/10 to-green-500/10 rounded-2xl p-8 border border-[#BCFF2F]/20"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#BCFF2F]/20 rounded-xl flex items-center justify-center mr-4">
                <Icon icon="mdi:check-circle" className="text-2xl text-[#BCFF2F]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Nexion 方案</h3>
                <p className="text-gray-400">Web3原生SSH管理</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>配置数量: {scenarios[activeScenario].configs}个</span>
                <span>{scenarios[activeScenario].timeframe}</span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#BCFF2F]/10 rounded-lg p-4 border border-[#BCFF2F]/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">用户注册</h4>
                      <p className="text-sm text-gray-400">一次性费用</p>
                    </div>
                    <div className="text-xl font-bold text-[#BCFF2F]">{FEES_OKB.registration} OKB</div>
                  </div>
                </div>

                <div className="bg-[#BCFF2F]/10 rounded-lg p-4 border border-[#BCFF2F]/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">配置存储</h4>
                      <p className="text-sm text-gray-400">{FEES_OKB.addConfig} OKB × {scenarios[activeScenario].configs}个</p>
                    </div>
                    <div className="text-xl font-bold text-[#BCFF2F]">{computed.configurationsOKB.toFixed(3)} OKB</div>
                  </div>
                </div>

                <div className="bg-[#BCFF2F]/10 rounded-lg p-4 border border-[#BCFF2F]/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-white">配置更新</h4>
                      <p className="text-sm text-gray-400">{FEES_OKB.updateConfig} OKB × {computed.updatesCount} 次</p>
                    </div>
                    <div className="text-xl font-bold text-[#BCFF2F]">{computed.updatesOKB.toFixed(3)} OKB</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#BCFF2F]/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Nexion 总成本</span>
                  <span className="text-3xl font-bold text-[#BCFF2F]">{computed.totalOKB.toFixed(3)} OKB</span>
                </div>
                {computed.nexionUSD !== undefined && (
                  <div className="text-sm text-gray-400 mt-1">
                    约 ${computed.nexionUSD.toFixed(2)} 美元（按 OKB={okbUsd} USD）
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 节省展示 */}
        <motion.div
          key={`savings-${activeScenario}`}
          className="mt-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-[#BCFF2F]/20 via-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-[#BCFF2F]/30">
            <motion.div
              className="flex items-center justify-center mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Icon icon="mdi:trophy" className="text-4xl text-[#BCFF2F] mr-3" />
              <h3 className="text-3xl font-bold text-white">
                {computed.savingsPct ? (
                  <>为{scenarios[activeScenario].title}节省 {computed.savingsPct}</>
                ) : (
                  <>Nexion 总成本：{computed.totalOKB.toFixed(3)} OKB</>
                )}
              </h3>
            </motion.div>

            {computed.savingsUSD !== undefined && (
              <p className="text-xl text-gray-300 mb-4">
                选择 Nexion，{scenarios[activeScenario].timeframe}预计可节省 
                <span className="text-[#BCFF2F] font-bold text-2xl mx-2">
                  ${computed.savingsUSD.toFixed(2)}
                </span>
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Icon icon="mdi:shield-check" className="text-[#BCFF2F] mr-2" />
                区块链安全存储
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:account-key" className="text-[#BCFF2F] mr-2" />
                Web3钱包认证
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:sync" className="text-[#BCFF2F] mr-2" />
                多设备同步
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:code-tags" className="text-[#BCFF2F] mr-2" />
                开源透明
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
