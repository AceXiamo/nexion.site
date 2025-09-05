import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface GSAPTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  cursor?: boolean;
}

export function GSAPTypewriter({
  text,
  speed = 80,
  delay = 0,
  onComplete,
  className = "",
  cursor = true
}: GSAPTypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const characters = text.split("");
    
    // GSAP cursor animation
    if (cursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    const typeTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < characters.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          
          // Add subtle character entrance animation
          if (textRef.current) {
            const lastChar = textRef.current.lastElementChild || textRef.current;
            gsap.fromTo(lastChar, 
              { 
                scale: 0.8, 
                opacity: 0.7 
              },
              { 
                scale: 1, 
                opacity: 1, 
                duration: 0.2,
                ease: "back.out(1.7)"
              }
            );
          }
          
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          
          // Hide cursor when complete
          if (cursor && cursorRef.current) {
            gsap.to(cursorRef.current, {
              opacity: 0,
              duration: 0.5,
              delay: 1
            });
          }
          
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(typeTimer);
  }, [text, speed, delay, onComplete, cursor]);

  return (
    <span className={className}>
      <span ref={textRef}>{displayText}</span>
      {cursor && (
        <span 
          ref={cursorRef}
          className="border-r-2 border-[#BCFF2F] ml-1"
        >
          &nbsp;
        </span>
      )}
    </span>
  );
}

// Enhanced typing effect with multiple lines
interface MultilineTypewriterProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  className?: string;
  onComplete?: () => void;
}

export function MultilineTypewriter({
  lines,
  speed = 80,
  lineDelay = 500,
  className = "",
  onComplete
}: MultilineTypewriterProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  
  const handleLineComplete = (text: string) => {
    setCompletedLines(prev => [...prev, text]);
    
    if (currentLine < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, lineDelay);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className={className}>
      {completedLines.map((line, index) => (
        <div key={index} className="text-[#00D26B] text-sm flex items-center mb-1">
          <span className="w-4 h-4 mr-2">✓</span>
          {line}
        </div>
      ))}
      {currentLine < lines.length && (
        <div className="text-[#00D26B] text-sm flex items-center mb-1">
          <span className="w-4 h-4 mr-2">✓</span>
          <GSAPTypewriter 
            text={lines[currentLine]}
            speed={speed}
            onComplete={() => handleLineComplete(lines[currentLine])}
            cursor={currentLine === lines.length - 1}
          />
        </div>
      )}
    </div>
  );
}