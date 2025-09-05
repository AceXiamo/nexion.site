import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 backdrop-blur-lg border-b border-white/10 transition-colors duration-300 ${
        scrolled ? "bg-black/90" : "bg-black/80"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
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
            className="flex items-center gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.a
              href="#download"
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              下载
            </motion.a>
            <motion.a
              href="https://github.com/AceXiamo/Nexion/wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              文档
            </motion.a>
            <motion.a
              href="https://github.com/AceXiamo/Nexion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon icon="mdi:github" className="text-xl" />
              <span>GitHub</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
