import React from 'react';
import { Calendar, Maximize2 } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { BookingDetails } from '../../types';

const BOOKING_DATA: BookingDetails = {
  title: 'Evergreen',
  subtitle: 'Pine Family Lodge',
  dateFrom: 'Feb 11',
  dateTo: 'Mar 25',
  checkIn: 'After 2:00 PM',
  checkOut: 'Until 12:00 PM',
  pricePerNight: 359,
  guestsRange: '2–5 guests',
};

export const BookingWidget: React.FC = () => {
  return (
    <GlassCard className="w-full max-w-[330px] backdrop-blur-2xl">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-normal leading-snug text-white">
            {BOOKING_DATA.title}
          </h2>
          <p className="text-lg font-normal leading-snug text-white">
            {BOOKING_DATA.subtitle}
          </p>
        </div>
        <Button variant="icon" aria-label="Expand details">
          <Maximize2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 bg-white/5 border border-white/10 rounded-xl p-3 mb-3">
        <div className="flex items-center gap-2 border-r border-white/10 pr-2">
          <Calendar className="w-3.5 h-3.5 text-white/60" />
          <span className="text-xs text-white/90">{BOOKING_DATA.dateFrom}</span>
        </div>
        <div className="flex items-center gap-2 pl-3">
          <Calendar className="w-3.5 h-3.5 text-white/60" />
          <span className="text-xs text-white/90">{BOOKING_DATA.dateTo}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 bg-white/5 border border-white/10 rounded-xl p-3 mb-5">
        <div className="border-r border-white/10 pr-2">
          <span className="block text-[10px] text-white/50">Check-in</span>
          <span className="text-xs text-white/90 font-light">{BOOKING_DATA.checkIn}</span>
        </div>
        <div className="pl-3">
          <span className="block text-[10px] text-white/50">Check-out</span>
          <span className="text-xs text-white/90 font-light">{BOOKING_DATA.checkOut}</span>
        </div>
      </div>

      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-2xl font-normal text-white">${BOOKING_DATA.pricePerNight}</span>
          <span className="text-xs text-white/60">/night</span>
        </div>
        <span className="text-xs text-white/70 font-light">{BOOKING_DATA.guestsRange}</span>
      </div>

      <Button variant="solid" className="w-full py-3 text-xs font-semibold">
        Reserve
      </Button>
    </GlassCard>
  );
};