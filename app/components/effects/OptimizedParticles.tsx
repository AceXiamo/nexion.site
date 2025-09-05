import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface OptimizedParticlesProps {
  count?: number;
  className?: string;
  color?: string;
  speed?: number;
  size?: number;
}

export function OptimizedParticles({ 
  count = 30, 
  className = "",
  color = "rgba(188, 255, 47, 0.8)",
  speed = 1,
  size = 2
}: OptimizedParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 生成初始粒子数据
  const initialParticles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      life: Math.random() * 100,
      maxLife: 100,
      size: Math.random() * size + 1
    }));
  }, [count, speed, size]);

  useEffect(() => {
    particlesRef.current = initialParticles;
  }, [initialParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvas();
    window.addEventListener('resize', updateCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // 更新粒子位置
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // 边界检测
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // 重置生命周期结束的粒子
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = particle.maxLife;
        }

        // 绘制粒子
        const alpha = particle.life / particle.maxLife;
        ctx.globalAlpha = alpha * 0.8;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color]);

  // 移动端检测，降低粒子数量
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const displayCount = isMobile ? Math.floor(count / 2) : count;

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Canvas 版本用于更好的性能 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isMobile ? 0.5 : 0.8 }}
      />
      
      {/* Fallback: DOM 版本（如果 Canvas 不可用） */}
      <div className="absolute inset-0 hidden">
        {Array.from({ length: displayCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{ 
              backgroundColor: color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 预设配置
export const ParticlePresets = {
  default: {
    count: 30,
    color: "rgba(188, 255, 47, 0.8)",
    speed: 1,
    size: 2
  },
  subtle: {
    count: 20,
    color: "rgba(188, 255, 47, 0.4)",
    speed: 0.5,
    size: 1
  },
  intense: {
    count: 50,
    color: "rgba(188, 255, 47, 1)",
    speed: 2,
    size: 3
  }
};