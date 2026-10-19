import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'rounded-3xl bg-[#091518]/75 backdrop-blur-xl border border-white/15 shadow-2xl p-6 text-white',
        className
      )}
    >
      {children}
    </div>
  );
};