import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
import { useLanguage } from "../../i18n/useLanguage";

interface OKXButtonProps {
  variant?: 'primary' | 'secondary' | 'icon' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: string;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  href?: string;
  target?: string;
}

export function OKXButton({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  href,
  target
}: OKXButtonProps) {
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };

  const variantClasses = {
    primary: `
      bg-[#BCFF2F] text-[#1C260A] font-medium
      hover:bg-[rgba(188,255,47,0.8)] active:bg-[rgba(188,255,47,0.6)]
      border border-transparent
    `,
    secondary: `
      bg-transparent text-[#CCCCCC] font-medium border border-[#333333]
      hover:border-[#BCFF2F] hover:text-[#BCFF2F]
      active:border-[rgba(188,255,47,0.8)] active:text-[rgba(188,255,47,0.8)]
    `,
    icon: `
      w-8 h-8 bg-transparent text-[#CCCCCC] border border-[#333333]
      hover:border-[#BCFF2F] hover:text-[#BCFF2F] hover:bg-[rgba(188,255,47,0.1)]
      active:bg-[rgba(188,255,47,0.2)]
      flex items-center justify-center
    `,
    ghost: `
      bg-transparent text-[#CCCCCC] font-medium border-none
      hover:text-[#BCFF2F] hover:bg-[rgba(188,255,47,0.1)]
      active:bg-[rgba(188,255,47,0.2)]
    `
  };

  const baseClasses = `
    relative rounded-md transition-all duration-200 ease-out
    flex items-center justify-center gap-2
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(188,255,47,0.5)]
    ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const MotionComponent = motion.button;
  const Component = href ? motion.a : MotionComponent;

  return (
    <Component
      className={baseClasses}
      onClick={!disabled ? onClick : undefined}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      whileHover={!disabled ? { scale: variant === 'icon' ? 1.05 : 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {loading ? (
        <>
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="ml-2">加载中...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon icon={icon} className="w-4 h-4" />
          )}
          {variant !== 'icon' && <span>{children}</span>}
          {variant === 'icon' && icon && (
            <Icon icon={icon} className="w-4 h-4" />
          )}
          {icon && iconPosition === 'right' && (
            <Icon icon={icon} className="w-4 h-4" />
          )}
        </>
      )}
    </Component>
  );
}

// 预设的按钮组合
export const OKXButtons = {
  Download: ({ className, href = "https://github.com/AceXiamo/Nexion/releasess", target = "_blank", ...props }: Omit<OKXButtonProps, 'children'>) => {
    const { t } = useLanguage();
    return (
      <OKXButton 
        variant="primary" 
        icon="mdi:download" 
        href={href}
        target={target}
        className={className}
        {...props}
      >
        {t('buttons.download')}
      </OKXButton>
    );
  },

  GitHub: ({ className, ...props }: Omit<OKXButtonProps, 'children' | 'href' | 'target'>) => {
    const { t } = useLanguage();
    return (
      <OKXButton
        variant="secondary"
        icon="mdi:github"
        href="https://github.com/AceXiamo/Nexion"
        target="_blank"
        className={className}
        {...props}
      >
        {t('buttons.github')}
      </OKXButton>
    );
  },

  StarOnGitHub: ({ className, ...props }: Omit<OKXButtonProps, 'children' | 'href' | 'target'>) => {
    const { t } = useLanguage();
    return (
      <OKXButton
        variant="primary"
        icon="mdi:star"
        href="https://github.com/AceXiamo/Nexion"
        target="_blank"
        className={className}
        {...props}
      >
        {t('buttons.starOnGitHub')}
      </OKXButton>
    );
  },

  Fork: ({ className, ...props }: Omit<OKXButtonProps, 'children' | 'href' | 'target'>) => {
    const { t } = useLanguage();
    return (
      <OKXButton
        variant="ghost"
        icon="mdi:source-fork"
        href="https://github.com/AceXiamo/Nexion/fork"
        target="_blank"
        className={className}
        {...props}
      >
        {t('buttons.fork')}
      </OKXButton>
    );
  },

  Demo: ({ className, href = "#demo", ...props }: Omit<OKXButtonProps, 'children'>) => {
    const { t } = useLanguage();
    return (
      <OKXButton 
        variant="ghost" 
        icon="mdi:play-circle" 
        href={href}
        className={className}
        {...props}
      >
        {t('buttons.demo')}
      </OKXButton>
    );
  },

  Connect: ({ className, ...props }: Omit<OKXButtonProps, 'children'>) => (
    <OKXButton 
      variant="primary" 
      icon="mdi:wallet" 
      className={className}
      {...props}
    >
      连接钱包
    </OKXButton>
  )
};
