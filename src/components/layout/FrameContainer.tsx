import React from 'react';
import { motion } from 'framer-motion';

interface FrameContainerProps {
  isLoaded: boolean;
  children: React.ReactNode;
}

export const FrameContainer: React.FC<FrameContainerProps> = ({ isLoaded, children }) => {
  return (
    <div className="relative w-full min-h-[100dvh] lg:h-[100dvh] flex items-stretch lg:items-center justify-center p-3 sm:p-5 md:p-8 lg:p-10 select-none bg-[#1c353d] z-30">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=85')",
            filter: 'hue-rotate(155deg) saturate(0.55) brightness(0.65)',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#2c4f58]/60 via-[#19333a]/40 to-[#0c1a1e]/90" />

        <motion.div
          initial={{ opacity: 0.25 }}
          animate={{ opacity: isLoaded ? 0.95 : 0.25 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle 260px at 45% 63%, rgba(255, 125, 20, 0.55), rgba(251, 146, 60, 0.18) 55%, transparent 80%)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      <div className="relative w-full min-h-[calc(100dvh-1.5rem)] sm:min-h-[calc(100dvh-2.5rem)] md:min-h-[calc(100dvh-4rem)] lg:min-h-0 lg:h-full max-w-[1360px] lg:max-h-[820px] flex flex-col justify-between z-10">
        {children}
      </div>
    </div>
  );
};