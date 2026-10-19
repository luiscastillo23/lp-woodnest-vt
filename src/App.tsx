import React from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from './hooks/usePreloader';
import { FrameContainer } from './components/layout/FrameContainer';
import { Navbar } from './components/layout/Navbar';
import { PreloaderOverlay } from './features/preloader/PreloaderOverlay';
import { HeroTypography } from './features/hero/HeroTypography';
import { BookingWidget } from './features/hero/BookingWidget';
import { RatingBadge } from './components/ui/RatingBadge';
import { RotateCcw } from 'lucide-react';

export function App() {
  const { progress, isLoaded, replay } = usePreloader(2600);

  return (
    <FrameContainer isLoaded={isLoaded}>
      <PreloaderOverlay progress={progress} isLoaded={isLoaded} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col justify-between h-full w-full z-20"
        style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}
      >
        <Navbar />

        <main className="flex-1 flex flex-col md:flex-row items-end justify-between px-8 pb-8 pt-2 gap-8">
          <div className="h-full flex flex-col justify-between">
            <HeroTypography />
          </div>

          <div className="md:mb-2">
            <RatingBadge />
          </div>

          <BookingWidget />
        </main>
      </motion.div>

      {isLoaded && (
        <button
          onClick={replay}
          title="Replay Preloader Animation"
          className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white/60 hover:text-white text-[11px] border border-white/10 backdrop-blur-md transition-all"
        >
          <RotateCcw className="w-3 h-3" />
          Replay Intro
        </button>
      )}
    </FrameContainer>
  );
}

export default App;