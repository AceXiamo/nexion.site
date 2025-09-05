import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl", 
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-8xl",
  full: "max-w-full"
};

const paddingClasses = {
  sm: "px-4 py-8",
  md: "px-6 py-12",
  lg: "px-8 py-16", 
  xl: "px-12 py-20"
};

export function ResponsiveContainer({ 
  children, 
  className = "", 
  maxWidth = "xl",
  padding = "md",
  animate = false
}: ResponsiveContainerProps) {
  const containerClasses = `
    ${maxWidthClasses[maxWidth]} 
    ${paddingClasses[padding]} 
    mx-auto 
    ${className}
  `.trim();

  if (animate) {
    return (
      <motion.div
        className={containerClasses}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

// 响应式网格组件
interface ResponsiveGridProps {
  children: ReactNode;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12"
};

export function ResponsiveGrid({ 
  children, 
  cols = { sm: 1, md: 2, lg: 3 },
  gap = "md",
  className = ""
}: ResponsiveGridProps) {
  const gridClasses = `
    grid 
    ${cols.sm ? `grid-cols-${cols.sm}` : 'grid-cols-1'}
    ${cols.md ? `md:grid-cols-${cols.md}` : ''}
    ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''}
    ${cols.xl ? `xl:grid-cols-${cols.xl}` : ''}
    ${gapClasses[gap]}
    ${className}
  `.trim();

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}

// 响应式文本组件
interface ResponsiveTextProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "left" | "center" | "right";
  className?: string;
}

const textSizeClasses = {
  sm: "text-sm md:text-base",
  md: "text-base md:text-lg",
  lg: "text-lg md:text-xl lg:text-2xl",
  xl: "text-xl md:text-2xl lg:text-3xl xl:text-4xl",
  "2xl": "text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
};

const alignClasses = {
  left: "text-left",
  center: "text-center", 
  right: "text-right"
};

export function ResponsiveText({ 
  children, 
  size = "md",
  align = "left",
  className = ""
}: ResponsiveTextProps) {
  const textClasses = `
    ${textSizeClasses[size]}
    ${alignClasses[align]}
    ${className}
  `.trim();

  return (
    <div className={textClasses}>
      {children}
    </div>
  );
}