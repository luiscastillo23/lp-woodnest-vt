import React, { useState } from 'react';
import {
  Send,
  Check,
  ChevronDown,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Copy,
  Compass,
  Flame,
} from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';

const FAQ_ITEMS = [
  {
    question: 'How do check-in and off-grid cabin access work?',
    answer:
      '48 hours prior to arrival, our forest hosts send your private GPS trailhead pin and a digital smart-lock keycode. Heated stone pathways and ambient lantern lighting activate automatically two hours before your 2:00 PM check-in.',
  },
  {
    question: 'Is high-speed internet available if I need to work remotely?',
    answer:
      'Every cabin includes concealed Starlink fiber-grade Wi-Fi (220+ Mbps) that can be physically switched off via a solid brass toggle on the wall when you wish to enter a complete digital detox.',
  },
  {
    question: 'What is included in each nightly cabin reservation?',
    answer:
      'All stays include unlimited seasoned birch firewood, private access to your cabin’s cedar sauna and soaking tub, organic locally roasted coffee, and a daily morning bakery & mountain cheese basket.',
  },
  {
    question: 'Can your hosts arrange private helicopter or fjord boat transfers?',
    answer:
      'Yes. We coordinate direct helicopter charters from Bolzano and Seattle, as well as private electric fjord launches from Flåm Harbor directly to our cliffside mooring.',
  },
];

const ARRIVAL_MODES = [
  '4x4 Forest Trailhead',
  'Fjord Electric Launch',
  'Private Helipad Charter',
] as const;

const CABIN_PREPARATIONS = [
  'Hearth Pre-Lit Before Arrival',
  'Sauna Heated to 90°C at Dusk',
  'Foraging & Botanist Provisions',
] as const;

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [sanctuary, setSanctuary] = useState('Evergreen Pine Valley');
  const [guests, setGuests] = useState('2 guests');
  const [arrivalMode, setArrivalMode] = useState<(typeof ARRIVAL_MODES)[number]>(
    '4x4 Forest Trailhead'
  );
  const [selectedPreps, setSelectedPreps] = useState<string[]>([
    'Hearth Pre-Lit Before Arrival',
  ]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedChannel, setCopiedChannel] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (value: string, channel: 'email' | 'phone') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedChannel(channel);
    setTimeout(() => setCopiedChannel(null), 2200);
  };

  const togglePrep = (prep: string) => {
    setSelectedPreps((prev) =>
      prev.includes(prep) ? prev.filter((item) => item !== prep) : [...prev, prep]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name so our resident forest host can address your itinerary.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address (for example, name@domain.com) to receive your retreat dossier.');
      return;
    }
    setError(null);
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 border-t border-white/10 bg-gradient-to-b from-[#091518] via-[#0d1f23] to-[#071114] overflow-hidden"
    >
      {/* Hero-Matched Screen-Blended Hearth Ambient Field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          background:
            'radial-gradient(circle 500px at 72% 52%, rgba(255, 125, 20, 0.15), rgba(251, 146, 60, 0.05) 55%, transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />

      <div className="relative max-w-[1360px] mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-start">
          {/* Left 5 Columns: Direct Concierge Channels & Hairline FAQ */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-5xl md:text-[54px] font-light tracking-[-0.03em] leading-[1.04] text-white mb-4 sm:mb-5 text-balance">
              Plan Your Retreat With Our Forest Hosts
            </h2>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed mb-8 sm:mb-10 text-pretty">
              Whether arranging helicopter transfers to Val Gardena, reserving a full
              sanctuary buyout, or tailoring hearth provisions, our resident hosts respond
              within two hours.
            </p>

            {/* Interactive Copyable Concierge Dispatch Lines */}
            <div className="divide-y divide-white/10 border-t border-b border-white/10 mb-10 sm:mb-12">
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>Direct Concierge Desk</span>
                  </div>
                  <p className="text-sm sm:text-base text-white font-normal break-all sm:break-normal">
                    concierge@woodnest.cabins
                  </p>
                  <p className="text-[11px] text-white/50 font-light mt-0.5">
                    Bespoke itineraries, transfers & full sanctuary buyouts
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('concierge@woodnest.cabins', 'email')}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedChannel === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-amber-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/60" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 tabular-nums">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>24/7 Sanctuary Dispatch</span>
                  </div>
                  <p className="text-sm sm:text-base text-white font-normal">
                    +47 57 66 42 10
                  </p>
                  <p className="text-[11px] text-white/50 font-light mt-0.5">
                    07:00 – 22:00 CET · Direct satellite & trailhead desk
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('+47 57 66 42 10', 'phone')}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedChannel === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-amber-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white/60" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hairline Architectural FAQ Accordion (No Nested Card Clutter) */}
            <div>
              <h3 className="text-sm font-normal text-white/90 tracking-tight mb-3">
                Arrival & Sanctuary Logistics
              </h3>
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {FAQ_ITEMS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="py-4">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 text-left text-xs sm:text-sm font-normal text-white hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-xs text-white/70 font-light leading-relaxed text-pretty">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 7 Columns: GlassCard Tailored Stay & Transfer Configurator */}
          <div className="lg:col-span-7">
            <GlassCard className="p-5 sm:p-10 backdrop-blur-2xl border-white/15 bg-[#091518]/80">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center mx-auto text-amber-300">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                    Retreat Dossier Assigned to Your Host
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-medium">{fullName}</span>. Our
                    resident host for <span className="text-amber-300">{sanctuary}</span> has
                    logged your inquiry for <span className="text-white">{guests}</span> ({arrivalMode})
                    and will send your custom dossier to{' '}
                    <span className="text-white underline">{email}</span> within two hours.
                  </p>
                  {selectedPreps.length > 0 && (
                    <div className="text-xs text-amber-300/90 font-light pt-2">
                      Prepared on arrival: {selectedPreps.join(' · ')}
                    </div>
                  )}
                  <div className="pt-4">
                    <Button
                      variant="glass"
                      onClick={() => {
                        setIsSubmitted(false);
                        setMessage('');
                      }}
                      className="text-xs cursor-pointer"
                    >
                      Modify or Send Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/10">
                    <div>
                      <h3 className="text-lg sm:text-xl font-normal text-white">
                        Configure a Tailored Sanctuary Stay
                      </h3>
                      <p className="text-xs text-white/60 font-light mt-0.5">
                        Direct host coordination, transfer logistics & cabin preparation
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-300/95 tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Under 2h host response</span>
                    </div>
                  </div>

                  {/* Guest Identity Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs text-white/70 font-light mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="Clara Lindqvist"
                        className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs text-white/70 font-light mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="clara@studionord.ch"
                        className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Sanctuary & Party Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-sanctuary"
                        className="block text-xs text-white/70 font-light mb-1.5"
                      >
                        Preferred Sanctuary
                      </label>
                      <select
                        id="contact-sanctuary"
                        value={sanctuary}
                        onChange={(e) => setSanctuary(e.target.value)}
                        className="w-full rounded-xl bg-[#0d1f23] border border-white/15 px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400/80 transition-colors"
                      >
                        <option value="Evergreen Pine Valley">Evergreen Pine Valley (Washington, USA)</option>
                        <option value="Aurlandsfjord Glass Crest">Aurlandsfjord Glass Crest (Vestland, Norway)</option>
                        <option value="Val Gardena Larch Sanctuary">Val Gardena Larch Sanctuary (Dolomites, Italy)</option>
                        <option value="Hardanger Birch Cove">Hardanger Birch Cove (Hardanger, Norway)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-guests"
                        className="block text-xs text-white/70 font-light mb-1.5"
                      >
                        Party Size & Residence
                      </label>
                      <select
                        id="contact-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full rounded-xl bg-[#0d1f23] border border-white/15 px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-400/80 transition-colors"
                      >
                        <option value="2 guests">2 guests · Solstice Canopy A-Frame</option>
                        <option value="3–4 guests">3–4 guests · Evergreen Family Lodge</option>
                        <option value="5–6 guests">5–6 guests · Horizon Cliffside Pavilion</option>
                        <option value="Full Sanctuary Buyout">Full Sanctuary Buyout (Up to 18 guests)</option>
                      </select>
                    </div>
                  </div>

                  {/* Interactive Arrival Transfer Selector */}
                  <div>
                    <span className="block text-xs text-white/70 font-light mb-2">
                      Arrival Transfer Logistics
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {ARRIVAL_MODES.map((mode) => {
                        const active = arrivalMode === mode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setArrivalMode(mode)}
                            className={`px-3.5 py-2.5 rounded-xl text-xs font-normal border text-left transition-all flex items-center justify-between cursor-pointer ${
                              active
                                ? 'bg-amber-400/15 border-amber-400/70 text-amber-200'
                                : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/25'
                            }`}
                          >
                            <span className="truncate">{mode}</span>
                            <Compass
                              className={`w-3.5 h-3.5 shrink-0 ml-1.5 ${
                                active ? 'text-amber-400' : 'text-white/30'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cabin Preparation Preferences */}
                  <div>
                    <span className="block text-xs text-white/70 font-light mb-2">
                      Complimentary Arrival Preparation
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {CABIN_PREPARATIONS.map((prep) => {
                        const isChecked = selectedPreps.includes(prep);
                        return (
                          <button
                            key={prep}
                            type="button"
                            onClick={() => togglePrep(prep)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-light border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                              isChecked
                                ? 'bg-white/15 border-amber-400/60 text-white'
                                : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white/90'
                            }`}
                          >
                            <Flame
                              className={`w-3 h-3 shrink-0 ${
                                isChecked ? 'text-amber-400 fill-amber-400' : 'text-white/35'
                              }`}
                            />
                            <span>{prep}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes & Dietary / Seasonal Requests */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs text-white/70 font-light mb-1.5"
                    >
                      Preferred Dates & Bespoke Requests
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your target travel window, dietary provisions for open-hearth dining, or celebration notes..."
                      className="w-full rounded-xl bg-white/5 border border-white/15 p-4 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-amber-400/80 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="text-xs text-amber-200 bg-amber-400/10 border border-amber-400/40 rounded-xl px-4 py-3 leading-relaxed"
                    >
                      {error}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-[11px] text-white/60 font-light">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Flexible date modifications up to 7 days prior to check-in</span>
                    </div>

                    <Button
                      type="submit"
                      variant="solid"
                      className="w-full sm:w-auto justify-center py-3 px-6 text-xs font-semibold gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Request Retreat Dossier
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
