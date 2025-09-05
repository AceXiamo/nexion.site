import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SpectacularTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function SpectacularText({ 
  text, 
  className = "",
  delay = 0,
  duration = 2
}: SpectacularTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 创建字符元素
    const chars = text.split("").map(char => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(100px) rotateX(90deg)";
      span.style.transformOrigin = "0 50%";
      return span;
    });

    // 清空容器并添加字符
    container.innerHTML = "";
    chars.forEach(char => container.appendChild(char));

    // 创建惊艳的动画序列
    const tl = gsap.timeline({ delay });

    // 字符逐个显示动画
    tl.to(chars, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: {
        amount: duration,
        from: "start",
        ease: "power2.out"
      },
      ease: "back.out(1.7)"
    })
    
    // 添加发光效果
    .to(container, {
      textShadow: `
        0 0 5px rgba(188, 255, 47, 0.5),
        0 0 10px rgba(188, 255, 47, 0.3),
        0 0 15px rgba(188, 255, 47, 0.2),
        0 0 20px rgba(188, 255, 47, 0.1)
      `,
      duration: 0.5,
      ease: "power2.inOut"
    }, `-=${duration * 0.3}`)
    
    // 添加字符微动画
    .to(chars, {
      y: -5,
      duration: 0.3,
      stagger: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    }, `-=${duration * 0.2}`);

    // 持续的呼吸发光效果
    gsap.to(container, {
      textShadow: `
        0 0 8px rgba(188, 255, 47, 0.4),
        0 0 16px rgba(188, 255, 47, 0.2),
        0 0 24px rgba(188, 255, 47, 0.1)
      `,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay + duration + 1
    });

    return () => {
      tl.kill();
    };
  }, [text, delay, duration]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    />
  );
}

// 渐变文字组件
interface GradientTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function GradientText({ 
  text, 
  className = "",
  delay = 0
}: GradientTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // 设置初始状态
    gsap.set(element, {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)"
    });

    // 动画序列
    const tl = gsap.timeline({ delay });

    tl.to(element, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power3.out"
    })
    
    // 渐变动画
    .to(element, {
      backgroundPosition: "200% center",
      duration: 3,
      repeat: -1,
      ease: "none"
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, [delay]);

  return (
    <div 
      ref={textRef}
      className={`${className} bg-gradient-to-r from-[#BCFF2F] via-[#00D26B] via-[#3B82F6] to-[#BCFF2F] bg-clip-text text-transparent`}
      style={{
        backgroundSize: "200% 100%",
        backgroundPosition: "0% center"
      }}
    >
      {text}
    </div>
  );
}

// 打字机 + 发光效果
interface TypingGlowProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypingGlow({ 
  text, 
  className = "",
  speed = 80,
  delay = 0
}: TypingGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let currentText = "";
    let i = 0;

    const typeTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          currentText += text[i];
          container.textContent = currentText;
          
          // 添加发光效果到新字符
          gsap.to(container, {
            textShadow: `
              0 0 10px rgba(188, 255, 47, 0.8),
              0 0 20px rgba(188, 255, 47, 0.4),
              0 0 30px rgba(188, 255, 47, 0.2)
            `,
            duration: 0.1,
            yoyo: true,
            repeat: 1
          });
          
          i++;
        } else {
          clearInterval(interval);
          
          // 最终发光效果
          gsap.to(container, {
            textShadow: `
              0 0 15px rgba(188, 255, 47, 0.6),
              0 0 25px rgba(188, 255, 47, 0.3),
              0 0 35px rgba(188, 255, 47, 0.1)
            `,
            duration: 1,
            ease: "power2.inOut"
          });
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(typeTimer);
  }, [text, speed, delay]);

  return (
    <div 
      ref={containerRef}
      className={className}
    />
  );
}