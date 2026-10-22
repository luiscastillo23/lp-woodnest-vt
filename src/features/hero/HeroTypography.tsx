import React from 'react';

export const HeroTypography: React.FC = () => {
  return (
    <div className="flex flex-col justify-between gap-4 sm:gap-6 lg:gap-8 lg:h-full">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[76px] font-light tracking-[-0.03em] leading-[1.04] text-white max-w-xl mt-1 sm:mt-2 lg:mt-4">
        Nature’s <br />
        Perfect <br />
        Hideaways
      </h1>

      <p className="text-xs sm:text-sm text-white/75 max-w-[300px] sm:max-w-[320px] lg:max-w-[260px] font-light leading-relaxed">
        Discover handpicked luxury cabins in breathtaking locations. Unplug,
        unwind, and reconnect with what matters most.
      </p>
    </div>
  );
};