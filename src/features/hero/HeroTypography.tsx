import React from 'react';

export const HeroTypography: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <h1 className="text-5xl sm:text-6xl md:text-[76px] font-light tracking-[-0.03em] leading-[1.04] text-white max-w-xl mt-4">
        Nature’s <br />
        Perfect <br />
        Hideaways
      </h1>

      <p className="text-xs md:text-sm text-white/75 max-w-[260px] font-light leading-relaxed">
        Discover handpicked luxury cabins in breathtaking locations. Unplug,
        unwind, and reconnect with what matters most.
      </p>
    </div>
  );
};