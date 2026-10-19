import React from 'react';
import { Star } from 'lucide-react';

export const RatingBadge: React.FC = () => {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="text-lg font-medium tracking-tight text-white">4.7</span>
      </div>
      <p className="text-xs text-white/70 font-light">from 1,800+ stays</p>
    </div>
  );
};