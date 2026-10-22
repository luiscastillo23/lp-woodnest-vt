import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePreloader } from './hooks/usePreloader';
import { FrameContainer } from './components/layout/FrameContainer';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PreloaderOverlay } from './features/preloader/PreloaderOverlay';
import { HeroTypography } from './features/hero/HeroTypography';
import { BookingWidget } from './features/hero/BookingWidget';
import { RatingBadge } from './components/ui/RatingBadge';
import { LocationsSection } from './features/sections/LocationsSection';
import { RoomsSection } from './features/sections/RoomsSection';
import { ExperiencesSection } from './features/sections/ExperiencesSection';
import { ContactSection } from './features/sections/ContactSection';
import { LocationDetailPage } from './features/location-detail/LocationDetailPage';
import { RotateCcw } from 'lucide-react';

export function App() {
  const { progress, isLoaded, replay } = usePreloader(2600);
  const [selectedCabin, setSelectedCabin] = useState({
    title: 'Evergreen',
    subtitle: 'Pine Family Lodge',
    pricePerNight: 359,
    guestsRange: '2–5 guests',
  });

  return (
    <div className="min-h-screen w-full bg-[#091518] text-white selection:bg-amber-500 selection:text-black">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FrameContainer isLoaded={isLoaded}>
                <PreloaderOverlay progress={progress} isLoaded={isLoaded} />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="flex flex-col justify-between flex-1 h-full w-full z-20"
                  style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}
                >
                  <Navbar />

                  <main className="flex-1 flex flex-col md:flex-row items-start md:items-end justify-between px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-2 gap-6 lg:gap-8">
                    <div className="w-full md:w-auto lg:h-full flex flex-col justify-between gap-4 sm:gap-6">
                      <HeroTypography />
                      <div className="lg:hidden">
                        <RatingBadge />
                      </div>
                    </div>

                    <div className="hidden lg:block lg:mb-2 shrink-0">
                      <RatingBadge />
                    </div>

                    <BookingWidget
                      title={selectedCabin.title}
                      subtitle={selectedCabin.subtitle}
                      pricePerNight={selectedCabin.pricePerNight}
                      guestsRange={selectedCabin.guestsRange}
                    />
                  </main>
                </motion.div>

                {isLoaded && (
                  <button
                    onClick={replay}
                    title="Replay Preloader Animation"
                    className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white/60 hover:text-white text-[11px] border border-white/10 backdrop-blur-md transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Replay Intro
                  </button>
                )}
              </FrameContainer>

              <LocationsSection
                onSelectLocation={(locationName, price) =>
                  setSelectedCabin((prev) => ({
                    ...prev,
                    title: locationName.split(' ')[0],
                    subtitle: locationName,
                    pricePerNight: price,
                  }))
                }
              />

              <RoomsSection
                selectedCabinTitle={selectedCabin.title}
                onSelectRoom={(title, subtitle, pricePerNight, guestsRange) =>
                  setSelectedCabin({ title, subtitle, pricePerNight, guestsRange })
                }
              />

              <ExperiencesSection />

              <ContactSection />

              <Footer />
            </>
          }
        />

        <Route
          path="/location/:slug/detail"
          element={
            <>
              <LocationDetailPage
                onConfirmBooking={({ locationName, totalPrice }) => {
                  setSelectedCabin((prev) => ({
                    ...prev,
                    title: locationName.split(' ')[0],
                    subtitle: locationName,
                    pricePerNight: totalPrice,
                  }));
                }}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/location/:slug"
          element={<Navigate to="detail" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;