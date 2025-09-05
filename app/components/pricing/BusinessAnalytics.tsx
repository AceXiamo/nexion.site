import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface RevenueProjection {
  userScale: string;
  users: number;
  registrationRevenue: number;
  configRevenue: number;
  updateRevenue: number;
  totalRevenue: number;
}

const revenueData: RevenueProjection[] = [
  {
    userScale: "1,000用户",
    users: 1000,
    registrationRevenue: 5310,
    configRevenue: 8850,
    updateRevenue: 8800,
    totalRevenue: 23000
  },
  {
    userScale: "5,000用户", 
    users: 5000,
    registrationRevenue: 26550,
    configRevenue: 70800,
    updateRevenue: 105600,
    totalRevenue: 203000
  },
  {
    userScale: "20,000用户",
    users: 20000,
    registrationRevenue: 106200,
    configRevenue: 283200,
    updateRevenue: 422400,
    totalRevenue: 800000
  }
];

interface MarketAdvantage {
  category: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  stats?: string;
}

const marketAdvantages: MarketAdvantage[] = [
  {
    category: "技术优势",
    title: "去中心化存储",
    description: "数据安全可控，审计可追溯，所有操作链上记录",
    icon: "mdi:database-lock",
    color: "blue",
    stats: "100% 数据自主权"
  },
  {
    category: "技术优势", 
    title: "Web3原生",
    description: "与区块链生态完美融合，支持多种钱包认证",
    icon: "mdi:web",
    color: "purple",
    stats: "首个 Web3 SSH工具"
  },
  {
    category: "经济优势",
    title: "成本大幅降低",
    description: "比传统方案节省50-95%，按需付费无月费订阅",
    icon: "mdi:cash-multiple",
    color: "green",
    stats: "节省高达 95%"
  },
  {
    category: "经济优势",
    title: "价格透明",
    description: "明确的收费标准，无隐藏成本，动态调整有保护",
    icon: "mdi:eye",
    color: "yellow",
    stats: "0 隐藏费用"
  },
  {
    category: "用户优势",
    title: "统一身份认证",
    description: "Web3钱包管理，数据完全自主权，跨平台兼容",
    icon: "mdi:account-key",
    color: "cyan",
    stats: "一个钱包管理全部"
  },
  {
    category: "用户优势",
    title: "支持各种客户端",
    description: "兼容现有SSH工具，无需改变使用习惯",
    icon: "mdi:tools",
    color: "orange",
    stats: "100% 兼容性"
  }
];

const targetUsers = [
  {
    title: "个人开发者",
    description: "追求成本效益的技术人员",
    icon: "mdi:account-circle",
    marketSize: "全球500万+",
    painPoint: "密钥管理混乱，成本高昂"
  },
  {
    title: "开发团队", 
    description: "需要协作管理的小团队",
    icon: "mdi:account-group",
    marketSize: "企业团队100万+",
    painPoint: "配置同步困难，权限管理复杂"
  },
  {
    title: "企业用户",
    description: "重视安全和合规的公司",
    icon: "mdi:office-building",
    marketSize: "中大型企业50万+",
    painPoint: "安全风险高，审计困难"
  },
  {
    title: "Web3项目",
    description: "原生区块链技术栈用户",
    icon: "mdi:ethereum",
    marketSize: "区块链项目10万+",
    painPoint: "技术栈不统一，缺乏原生工具"
  }
];

export function BusinessAnalytics() {
  const [selectedRevenue, setSelectedRevenue] = useState(1);
  const [activeAdvantage, setActiveAdvantage] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "from-blue-500 to-cyan-500",
      purple: "from-purple-500 to-pink-500", 
      green: "from-green-500 to-emerald-500",
      yellow: "from-yellow-500 to-orange-500",
      cyan: "from-cyan-500 to-blue-500",
      orange: "from-orange-500 to-red-500"
    };
    return colorMap[color] || "from-gray-500 to-gray-600";
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* 收益预测 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              收益
              <span className="text-[#BCFF2F] mx-2">预测分析</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              基于用户规模增长和使用模式的商业收益预测
            </p>
          </div>

          {/* 用户规模选择器 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {revenueData.map((data, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedRevenue(index)}
                className={`
                  px-6 py-3 rounded-xl font-semibold transition-all duration-300
                  ${selectedRevenue === index
                    ? 'bg-[#BCFF2F] text-black shadow-lg shadow-[#BCFF2F]/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-white/10'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {data.userScale}
              </motion.button>
            ))}
          </div>

          {/* 收益详情 */}
          <motion.div
            key={selectedRevenue}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center mb-4">
                <Icon icon="mdi:account-plus" className="text-2xl text-blue-400 mr-3" />
                <h3 className="font-semibold text-white">注册收益</h3>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                ${revenueData[selectedRevenue].registrationRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-gray-400">一次性用户注册费用</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center mb-4">
                <Icon icon="mdi:server-plus" className="text-2xl text-green-400 mr-3" />
                <h3 className="font-semibold text-white">配置收益</h3>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${revenueData[selectedRevenue].configRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-gray-400">年新增配置收入</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center mb-4">
                <Icon icon="mdi:pencil" className="text-2xl text-purple-400 mr-3" />
                <h3 className="font-semibold text-white">更新收益</h3>
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                ${revenueData[selectedRevenue].updateRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-gray-400">年配置更新收入</p>
            </div>

            <div className="bg-gradient-to-br from-[#BCFF2F]/20 to-yellow-500/20 rounded-2xl p-6 border border-[#BCFF2F]/30">
              <div className="flex items-center mb-4">
                <Icon icon="mdi:trophy" className="text-2xl text-[#BCFF2F] mr-3" />
                <h3 className="font-semibold text-white">年总收益</h3>
              </div>
              <div className="text-4xl font-bold text-[#BCFF2F] mb-2">
                ${revenueData[selectedRevenue].totalRevenue.toLocaleString()}+
              </div>
              <p className="text-sm text-gray-400">预估年度总收益</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 核心优势 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              核心
              <span className="text-[#BCFF2F] mx-2">竞争优势</span>
            </h2>
            <p className="text-xl text-gray-400">
              多维度优势构建强大的市场竞争力
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                className={`
                  group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-2xl p-6 border border-white/10 cursor-pointer
                  ${activeAdvantage === advantage.title ? 'ring-2 ring-[#BCFF2F]/50' : ''}
                `}
                onClick={() => setActiveAdvantage(activeAdvantage === advantage.title ? null : advantage.title)}
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getColorClasses(advantage.color)} flex items-center justify-center`}>
                    <Icon icon={advantage.icon} className="text-xl text-white" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-gray-400">
                    {advantage.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#BCFF2F] transition-colors">
                  {advantage.title}
                </h3>
                
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {advantage.description}
                </p>

                {advantage.stats && (
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-sm text-gray-500">核心数据</span>
                    <span className={`font-bold text-transparent bg-gradient-to-r ${getColorClasses(advantage.color)} bg-clip-text`}>
                      {advantage.stats}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 目标市场 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              目标
              <span className="text-[#BCFF2F] mx-2">市场定位</span>
            </h2>
            <p className="text-xl text-gray-400">
              精准定位核心用户群体，满足不同场景需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetUsers.map((user, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-2xl p-6 border border-white/10 text-center"
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(188, 255, 47, 0.1)"
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#BCFF2F]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon icon={user.icon} className="text-2xl text-[#BCFF2F]" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{user.title}</h3>
                <p className="text-gray-400 mb-4">{user.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">市场规模: </span>
                    <span className="text-[#BCFF2F] font-semibold">{user.marketSize}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">痛点: </span>
                    <span className="text-gray-300">{user.painPoint}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}