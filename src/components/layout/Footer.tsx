import React, { useState } from 'react';
import { Flame, ArrowUp, Check, Compass, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!valid) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    const el = document.getElementById('hero-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#071114] text-white px-6 md:px-10 pt-20 pb-14 overflow-hidden">
      {/* Subtle Horizon Hearth Glow echoing the Hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-65"
        style={{
          background:
            'radial-gradient(circle 480px at 50% 0%, rgba(255, 125, 20, 0.14), rgba(251, 146, 60, 0.04) 55%, transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />

      <div className="relative max-w-[1360px] mx-auto z-10">
        {/* Top Architectural Closing Band */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 mb-16 border-b border-white/10">
          <div className="space-y-3">
            <a href="#" className="inline-flex items-center gap-2.5 group">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 transition-transform group-hover:scale-110" />
              </span>
              <span className="text-lg font-medium tracking-tight text-white">
                WoodNest
              </span>
            </a>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-[1.06] text-white max-w-xl text-balance">
              Built for Deep Silence and Seasonal Living
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="text-xs text-white/65 font-light tabular-nums">
              <span className="block text-white/90 font-normal">Direct Cabin Reservations</span>
              <span>From $289/night · 4 Protected Reserves</span>
            </div>
            <button
              type="button"
              onClick={scrollToBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-white/90 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Reserve Your Hideaway</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main 12-Column Footer Directory */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Colophon & Environmental Standards */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-medium text-white/90">
              Architectural Stewardship
            </h3>
            <p className="text-xs text-white/65 font-light leading-relaxed max-w-xs text-pretty">
              Architectural timber hideaways in protected Nordic, Alpine, and Pacific
              old-growth forests. Every cabin sits on removable micro-pilings to leave
              native root systems intact.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-300/85 font-light tabular-nums pt-1">
              <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>100% Off-Grid Solar & Micro-Hydro · FSC Timber</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-medium text-white/90">Navigation</h3>
            <ul className="space-y-2.5 text-xs text-white/65 font-light">
              <li>
                <a href="#locations" className="hover:text-amber-300 transition-colors">
                  Sanctuary Locations
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-amber-300 transition-colors">
                  Architectural Cabins
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-amber-300 transition-colors">
                  Seasonal Rituals
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">
                  Private Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Sanctuaries with Coordinates */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-medium text-white/90">Protected Reserves</h3>
            <ul className="space-y-2.5 text-xs text-white/65 font-light tabular-nums">
              <li>
                <a href="#locations" className="hover:text-white transition-colors block">
                  Evergreen Pine Valley · <span className="text-white/45">47.75° N</span>
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors block">
                  Aurlandsfjord Glass Crest · <span className="text-white/45">60.90° N</span>
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors block">
                  Val Gardena Larch · <span className="text-white/45">46.55° N</span>
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors block">
                  Hardanger Birch Cove · <span className="text-white/45">60.35° N</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Seasonal Dispatches Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-medium text-white/90">Seasonal Dispatches</h3>
            <p className="text-xs text-white/65 font-light leading-relaxed">
              Receive early access to winter solstice cabin releases and newly commissioned forest sites.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-xl px-3.5 py-2.5">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Registered for seasonal dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setEmailError(false);
                    }}
                    placeholder="name@domain.com"
                    aria-label="Email for seasonal dispatches"
                    className="w-full rounded-full bg-white/5 border border-white/15 px-4 py-2.5 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-amber-400/80 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-full bg-amber-400 text-slate-950 hover:bg-amber-300 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </div>
                {emailError && (
                  <p role="alert" className="text-[11px] text-amber-300 pl-2">
                    Enter a valid email address (e.g., name@domain.com) to subscribe.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <p className="tabular-nums">
            © {new Date().getFullYear()} WoodNest Sanctuaries. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-white/85 transition-colors">
              Privacy & Land Stewardship
            </a>
            <a href="#contact" className="hover:text-white/85 transition-colors">
              Reservation Terms
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
