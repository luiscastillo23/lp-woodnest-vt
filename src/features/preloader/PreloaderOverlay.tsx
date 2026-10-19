import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderOverlayProps {
  progress: number;
  isLoaded: boolean;
}

export const PreloaderOverlay: React.FC<PreloaderOverlayProps> = ({ progress, isLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const strokeWidth = 1.5;
  const radius = 24;
  const w = Math.max(dimensions.width, 100);
  const h = Math.max(dimensions.height, 100);

  const pathData = `
    M ${w / 2} ${strokeWidth / 2}
    L ${w - radius} ${strokeWidth / 2}
    A ${radius} ${radius} 0 0 1 ${w - strokeWidth / 2} ${radius}
    L ${w - strokeWidth / 2} ${h - radius}
    A ${radius} ${radius} 0 0 1 ${w - radius} ${h - strokeWidth / 2}
    L ${radius} ${h - strokeWidth / 2}
    A ${radius} ${radius} 0 0 1 ${strokeWidth / 2} ${h - radius}
    L ${strokeWidth / 2} ${radius}
    A ${radius} ${radius} 0 0 1 ${radius} ${strokeWidth / 2}
    Z
  `;

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-30">
      {dimensions.width > 0 && (
        <svg className="w-full h-full overflow-visible">
          <motion.path
            d={pathData}
            fill="none"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ ease: 'linear', duration: 0.05 }}
          />
        </svg>
      )}

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
            className="absolute bottom-8 left-10"
          >
            <span className="text-6xl md:text-7xl font-light tracking-tight text-white/60 select-none">
              {progress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};