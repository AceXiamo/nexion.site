import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8", 
  lg: "w-12 h-12",
  xl: "w-16 h-16"
};

export function LoadingSpinner({ 
  size = "md", 
  color = "#BCFF2F",
  message,
  className = ""
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div 
          className="absolute inset-0 border-2 border-transparent rounded-full"
          style={{ 
            borderTopColor: color,
            borderRightColor: `${color}80`
          }}
        />
      </motion.div>
      
      {message && (
        <motion.p
          className="text-gray-400 text-sm text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// Nexion 风格的加载动画
export function NexionLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <motion.div
        className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold"
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        &gt;_
      </motion.div>
      
      <motion.div
        className="flex space-x-1"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial="animate"
        animate="animate"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[#BCFF2F]"
            variants={{
              animate: {
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4]
              }
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// 骨架屏组件
export function SkeletonLoader({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

// 错误状态组件
interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function ErrorState({ 
  title = "出错了",
  message = "加载时遇到问题，请稍后重试。",
  action,
  className = ""
}: ErrorStateProps) {
  return (
    <motion.div
      className={`text-center py-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Icon 
          icon="mdi:alert-circle-outline" 
          className="text-6xl text-red-400 mx-auto mb-4" 
        />
      </motion.div>
      
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">{message}</p>
      
      {action && (
        <motion.button
          onClick={action.onClick}
          className="px-6 py-3 bg-[#BCFF2F] text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}