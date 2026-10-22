import React, { useState } from 'react';
import { Flame, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { NavItem } from '../../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Locations', href: '#locations' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-40 flex items-center justify-between gap-4 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-7 pb-3 sm:pb-4">
      <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
        <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400 transition-transform group-hover:scale-110" />
        </span>
        <span className="text-base font-medium tracking-tight text-white">
          WoodNest
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-6 lg:gap-7">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs font-normal text-white/80 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <Button
          variant="solid"
          onClick={() => {
            setMobileMenuOpen(false);
            const el = document.getElementById('hero-booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-4 sm:px-5 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
        >
          Book Now
        </Button>

        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            aria-label="Mobile navigation"
            className="md:hidden absolute top-full left-4 right-4 sm:left-6 sm:right-6 mt-1 rounded-2xl bg-[#091518]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-3 flex flex-col gap-1 z-50"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};