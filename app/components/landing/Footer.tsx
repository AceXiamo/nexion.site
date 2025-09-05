import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const productLinks = [
  { name: "功能特性", href: "#features" },
  { name: "定价策略", href: "#pricing" },
  { name: "下载体验", href: "#download" },
  { name: "使用文档", href: "https://github.com/AceXiamo/Nexion/wiki" }
];

const techLinks = [
  { name: "X Layer", href: "https://www.okx.com/xlayer", external: true },
  { name: "OKX Wallet", href: "https://www.okx.com/web3", external: true },
  { name: "开源代码", href: "https://github.com/AceXiamo/Nexion", external: true },
  { name: "智能合约", href: "https://github.com/AceXiamo/Nexion/tree/main/contracts", external: true }
];

const socialLinks = [
  { icon: "mdi:github", href: "https://github.com/AceXiamo/Nexion" },
  { icon: "mdi:twitter", href: "#" },
  { icon: "mdi:discord", href: "#" }
];

export function Footer() {
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
              <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold text-white bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                &gt;_
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#BCFF2F] to-blue-400 bg-clip-text text-transparent">
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
              下一代Web3 SSH管理器，让去中心化技术为服务器管理带来革命性体验。
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
            <h4 className="font-semibold text-white mb-4">产品</h4>
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
            <h4 className="font-semibold text-white mb-4">技术</h4>
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
          className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 Nexion. 采用 Apache 2.0 许可证开源.</p>
          <p className="mt-2">
            构建于 <span className="text-[#BCFF2F]">X Layer</span> 区块链网络
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
