import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export function LazyImage({ src, alt, className = "", placeholder }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`overflow-hidden ${className}`}>
      {isInView && (
        <>
          {!isLoaded && placeholder && (
            <motion.div
              className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoaded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-gray-400 text-sm">{placeholder}</span>
            </motion.div>
          )}
          <motion.img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={() => setIsLoaded(true)}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </>
      )}
    </div>
  );
}