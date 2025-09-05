import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface OKXCardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'highlight';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function OKXCard({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  hover = false,
  onClick
}: OKXCardProps) {
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8'
  };

  const variantClasses = {
    default: `
      bg-[#0f0f0f] border border-[#1a1a1a]
      ${hover ? 'hover:bg-[#272727] hover:border-[#333333]' : ''}
    `,
    elevated: `
      bg-[#0f0f0f] border border-[#1a1a1a]
      shadow-[0_1px_3px_rgba(0,0,0,0.3)]
      ${hover ? 'hover:bg-[#272727] hover:border-[#333333] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]' : ''}
    `,
    bordered: `
      bg-[#0f0f0f] border border-[#333333]
      ${hover ? 'hover:bg-[#272727] hover:border-[#BCFF2F]' : ''}
    `,
    highlight: `
      bg-gradient-to-br from-[rgba(188,255,47,0.1)] to-[rgba(188,255,47,0.05)]
      border border-[rgba(188,255,47,0.2)]
      ${hover ? 'hover:from-[rgba(188,255,47,0.15)] hover:to-[rgba(188,255,47,0.08)] hover:border-[rgba(188,255,47,0.3)]' : ''}
    `
  };

  const baseClasses = `
    rounded-lg transition-all duration-200 ease-out backdrop-blur-sm
    ${paddingClasses[padding]}
    ${variantClasses[variant]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      whileHover={hover ? { 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  );
}

// 特殊用途的卡片组件
export function FeatureCard({ 
  icon, 
  title, 
  description, 
  highlight = false,
  stats,
  className = ''
}: {
  icon: ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
  stats?: string;
  className?: string;
}) {
  return (
    <OKXCard 
      variant={highlight ? 'highlight' : 'elevated'} 
      hover 
      className={className}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold text-[#FFFFFF] mb-3 leading-tight">
          {title}
        </h3>
        
        <p className="text-[#CCCCCC] text-sm leading-relaxed flex-grow">
          {description}
        </p>
        
        {stats && (
          <div className="mt-4 pt-3 border-t border-[#1a1a1a]">
            <div className="text-[#BCFF2F] text-sm font-medium">
              {stats}
            </div>
          </div>
        )}
      </div>
    </OKXCard>
  );
}

export function PricingCard({
  title,
  price,
  currency,
  description,
  features,
  recommended = false,
  className = ''
}: {
  title: string;
  price: string;
  currency: string;
  description: string;
  features: string[];
  recommended?: boolean;
  className?: string;
}) {
  return (
    <OKXCard 
      variant={recommended ? 'highlight' : 'elevated'} 
      hover 
      className={`relative ${className}`}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#BCFF2F] text-[#1C260A] text-xs font-bold px-3 py-1 rounded-full">
            推荐
          </div>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">{title}</h3>
        <div className="mb-2">
          <span className="text-3xl font-bold text-[#BCFF2F]">{price}</span>
          <span className="text-[#CCCCCC] ml-1">{currency}</span>
        </div>
        <p className="text-[#888888] text-sm">{description}</p>
      </div>
      
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm">
            <div className="w-4 h-4 rounded-full bg-[#BCFF2F] flex items-center justify-center mr-3 flex-shrink-0">
              <div className="w-1.5 h-1.5 bg-[#1C260A] rounded-full"></div>
            </div>
            <span className="text-[#CCCCCC]">{feature}</span>
          </div>
        ))}
      </div>
    </OKXCard>
  );
}