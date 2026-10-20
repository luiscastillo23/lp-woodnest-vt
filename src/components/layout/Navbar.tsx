import React from 'react';
import { Flame } from 'lucide-react';
import { Button } from '../ui/Button';
import { NavItem } from '../../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Locations', href: '#locations' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 pt-7 pb-4">
      <a href="#" className="flex items-center gap-2 group">
        <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400 transition-transform group-hover:scale-110" />
        </span>
        <span className="text-base font-medium tracking-tight text-white">
          WoodNest
        </span>
      </a>

      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-normal text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          variant="solid"
          onClick={() => {
            const el = document.getElementById('hero-booking');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-5 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
        >
          Book Now
        </Button>
      </div>
    </header>
  );
};