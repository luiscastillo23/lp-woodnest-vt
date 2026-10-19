import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'glass' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'solid',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-95';

  const variants = {
    solid: 'bg-white text-slate-950 hover:bg-white/90 rounded-full px-6 py-2.5 text-sm shadow-sm',
    glass: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 rounded-full px-5 py-2 text-sm',
    icon: 'w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80',
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};