import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface StarTextEffectProps {
  text: string;
  className?: string;
  delay?: number;
  particleColor?: string;
  particleCount?: number;
}

export function StarTextEffect({ 
  text, 
  className = "",
  delay = 0,
  particleColor = "#BCFF2F",
  particleCount = 150
}: StarTextEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    
    if (!container || !canvas || !textElement) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * 2; // 高DPI支持
      canvas.height = rect.height * 2;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(2, 2);
    };

    resizeCanvas();

    // 创建文字路径数据
    const createTextPath = () => {
      // 创建临时画布获取文字像素数据
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return [];

      tempCanvas.width = canvas.width / 2;
      tempCanvas.height = canvas.height / 2;
      
      // 设置字体
      const fontSize = Math.min(tempCanvas.width / text.length * 1.2, 120);
      tempCtx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
      tempCtx.fillStyle = '#ffffff';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      
      // 绘制文字
      tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);
      
      // 获取像素数据
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixels = imageData.data;
      const textPixels = [];
      
      // 采样文字像素点
      for (let y = 0; y < tempCanvas.height; y += 3) {
        for (let x = 0; x < tempCanvas.width; x += 3) {
          const index = (y * tempCanvas.width + x) * 4;
          if (pixels[index + 3] > 128) { // alpha > 128
            textPixels.push({ x, y });
          }
        }
      }
      
      return textPixels;
    };

    // 粒子类
    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      opacity: number;
      speedX: number;
      speedY: number;

      constructor(targetX: number, targetY: number) {
        this.targetX = targetX;
        this.targetY = targetY;
        
        // 随机初始位置（散开状态）
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 300;
        this.x = targetX + Math.cos(angle) * distance;
        this.y = targetY + Math.sin(angle) * distance;
        
        this.size = 1 + Math.random() * 2;
        this.opacity = 0;
        this.speedX = 0;
        this.speedY = 0;
      }

      update() {
        // 缓动到目标位置
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.speedX += dx * 0.002;
        this.speedY += dy * 0.002;
        this.speedX *= 0.95;
        this.speedY *= 0.95;
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = particleColor;
        
        // 绘制星星形状
        const spikes = 5;
        const outerRadius = this.size;
        const innerRadius = outerRadius * 0.4;
        
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const angle = (i / (spikes * 2)) * Math.PI * 2;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const x = this.x + Math.cos(angle) * radius;
          const y = this.y + Math.sin(angle) * radius;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        
        // 添加发光效果
        ctx.shadowColor = particleColor;
        ctx.shadowBlur = 5;
        ctx.fill();
        
        ctx.restore();
      }
    }

    // 创建粒子系统
    const textPixels = createTextPath();
    const particles: Particle[] = [];
    
    // 从文字像素中选择粒子位置
    const selectedPixels = textPixels.sort(() => Math.random() - 0.5).slice(0, particleCount);
    
    selectedPixels.forEach(pixel => {
      particles.push(new Particle(pixel.x, pixel.y));
    });

    // 动画循环
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      
      animationId = requestAnimationFrame(animate);
    };

    // GSAP动画时间线
    const tl = gsap.timeline({ delay });

    // 隐藏原始文字
    gsap.set(textElement, { opacity: 0 });

    // 粒子聚合动画
    tl.to({}, {
      duration: 0.1,
      onComplete: () => animate()
    })
    .to(particles, {
      opacity: 1,
      duration: 1.5,
      stagger: 0.01,
      ease: "power2.out"
    })
    .to({}, {
      duration: 2,
      onComplete: () => {
        // 2秒后开始散开动画
        gsap.to(particles, {
          x: (i) => particles[i].x + (Math.random() - 0.5) * 400,
          y: (i) => particles[i].y + (Math.random() - 0.5) * 400,
          opacity: 0,
          duration: 1.5,
          stagger: 0.005,
          ease: "power2.in",
          onComplete: () => {
            // 显示原始文字
            gsap.to(textElement, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        });
      }
    });

    // 监听窗口大小变化
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      tl.kill();
    };
  }, [text, delay, particleColor, particleCount]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: '200px' }}
    >
      {/* 画布 */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
      />
      
      {/* 原始文字（作为fallback和最终显示） */}
      <div 
        ref={textRef}
        className="relative z-10 text-center font-black leading-none bg-gradient-to-r from-[#BCFF2F] via-[#00D26B] to-[#BCFF2F] bg-clip-text text-transparent"
        style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
      >
        {text}
      </div>
    </div>
  );
}

// 简化版本 - 使用SVG实现
export function SimpleStarText({
  text,
  className = "",
  delay = 0
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 创建星星元素
    const createStars = () => {
      const starCount = 50;
      const stars = [];

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'absolute w-1 h-1 bg-[#BCFF2F] rounded-full';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = '0';
        container.appendChild(star);
        stars.push(star);
      }

      return stars;
    };

    const stars = createStars();

    // GSAP动画
    const tl = gsap.timeline({ delay, repeat: -1, repeatDelay: 3 });

    tl.fromTo(stars, 
      { 
        scale: 0,
        opacity: 0,
        rotation: 0
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 360,
        duration: 1.5,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }
    )
    .to(stars, {
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.02,
      ease: "power2.in"
    }, "+=1");

    return () => {
      tl.kill();
      stars.forEach(star => star.remove());
    };
  }, [text, delay]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: '200px' }}
    >
      <div className="relative z-10 text-center font-black leading-none bg-gradient-to-r from-[#BCFF2F] via-[#00D26B] to-[#BCFF2F] bg-clip-text text-transparent">
        {text}
      </div>
    </div>
  );
}