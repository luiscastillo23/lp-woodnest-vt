import React, { useState } from 'react';
import {
  Flame,
  Check,
  Plus,
  Star,
  Clock,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Compass,
  Wind,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { ForestExperience } from '../../types';

interface EnrichedExperience extends ForestExperience {
  subtitle: string;
  durationHours: number;
  sensoryNotes: {
    atmosphere: string;
    soundscape: string;
    temperature: string;
  };
  telemetryLabel: string;
  telemetryValue: string;
  photoUrl: string;
  photoAlt: string;
  photoFilter: string;
  glowPosition: string;
  moments: string[];
  svgCurve: string;
}

const FOREST_EXPERIENCES: EnrichedExperience[] = [
  {
    id: 'wood-fired-sauna-plunge',
    number: '01',
    title: 'Wood-Fired Cedar Sauna & Glacial Plunge',
    subtitle: 'Private Waterside Thermal Ritual',
    season: 'All Seasons',
    duration: '2.5 hours',
    durationHours: 2.5,
    schedule: 'Daily · Private Dusk Session (17:30)',
    priceLabel: 'Complimentary with stay',
    sensoryNotes: {
      atmosphere: 'Aromatic Red Cedar & Birch Steam',
      soundscape: 'Crackling Hearth & Glacial River Current',
      temperature: '90°C Dry Sauna ⇄ 4°C Mountain Stream',
    },
    telemetryLabel: 'Thermal Contrast Cycle',
    telemetryValue: '3 Rounds · 15m Heat / 90s Cold Plunge',
    description:
      'Step from the enveloping 90°C warmth of a hand-built western red-cedar sauna—infused with wild pine needle steam and lit only by amber firelight—straight into a crystal-clear 4°C glacial pool.',
    outcomeMetric: '98% of guests rate this their #1 restorative ritual',
    imageUrl: 'sauna',
    photoUrl:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    photoAlt:
      'Warm glowing cedar sauna with steam rising beside dark forest waters at dusk',
    photoFilter: 'hue-rotate(15deg) saturate(0.75) brightness(0.68) contrast(1.08)',
    glowPosition: '42% 62%',
    moments: [
      'Pre-heated to 90°C with seasoned birch logs two hours before dusk',
      'Private cedar boardwalk leading directly to the glacial plunge ladder',
      'Heated basalt stone deck with organic linen robes & warm spruce tea',
    ],
    svgCurve: 'M 0 65 Q 45 12, 90 65 T 180 65 T 270 65 T 360 65',
  },
  {
    id: 'foraging-hearth-table',
    number: '02',
    title: 'Wild Foraging & Open-Hearth Tasting Menu',
    subtitle: 'Canopy Botanical Walk & Fire-Cooked Dinner',
    season: 'Autumn',
    duration: '4 hours',
    durationHours: 4.0,
    schedule: 'Thu – Sun · 16:00 Forest Departure',
    priceLabel: '$145 per guest',
    sensoryNotes: {
      atmosphere: 'Woodsmoke, Moss & Roasted Chanterelles',
      soundscape: 'Dusk Wind in Old-Growth Douglas Firs',
      temperature: 'Open Cast-Iron Ember Hearth (260°C)',
    },
    telemetryLabel: 'Harvest Radius & Terroir',
    telemetryValue: '100% Foraged Within 4.0 km Canopy Radius',
    description:
      'Walk the mossy forest floor at golden hour with our resident botanist to gather golden chanterelles, spruce tips, and wild lingonberries, followed by an intimate 5-course dinner cooked over glowing birch embers.',
    outcomeMetric: '100% hyper-local ingredients harvested within 4 km',
    imageUrl: 'foraging',
    photoUrl:
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=85',
    photoAlt:
      'Warm campfire embers and lantern-lit outdoor forest table surrounded by twilight pines',
    photoFilter: 'hue-rotate(5deg) saturate(0.8) brightness(0.65) contrast(1.06)',
    glowPosition: '50% 68%',
    moments: [
      'Guided botanical walk through 400-acre old-growth mossy woodland',
      'Five-course tasting menu seared on suspended cast-iron grates over embers',
      'Paired with small-batch Nordic botanical infusions and aged cellar vintages',
    ],
    svgCurve: 'M 0 78 C 80 72, 130 24, 210 28 C 280 32, 310 58, 360 40',
  },
  {
    id: 'bortle-1-astronomy',
    number: '03',
    title: 'Dark-Sky Telescope & Aurora Night Watch',
    subtitle: 'Bortle Class 1 Celestial Sanctuary',
    season: 'Winter',
    duration: '2 hours',
    durationHours: 2.0,
    schedule: 'Clear Nights · 22:00 – 00:00 Zenith',
    priceLabel: '$95 per cabin',
    sensoryNotes: {
      atmosphere: 'Crisp Sub-Zero Pine Air & Spiced Cloudberry',
      soundscape: 'Complete 19 dB Nocturnal Forest Silence',
      temperature: 'Heated Deck Loungers & Reindeer Wool Throws',
    },
    telemetryLabel: 'Nocturnal Sky Luminance',
    telemetryValue: '21.99 mag/arcsec² · Bortle Class 1 Zenith',
    description:
      'Recline on heated timber loungers beneath an untouched canopy of 4,500+ naked-eye stars and dancing northern lights. Includes private guidance with our 11-inch deep-sky telescope and hot cloudberry cider.',
    outcomeMetric: 'Bortle Class 1 sky — over 4,500 visible naked-eye stars',
    imageUrl: 'astronomy',
    photoUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
    photoAlt:
      'Star-filled night sky and glowing mountain peaks in deep boreal twilight',
    photoFilter: 'hue-rotate(155deg) saturate(0.65) brightness(0.66) contrast(1.1)',
    glowPosition: '48% 58%',
    moments: [
      'Zero exterior light pollution across the entire mountain valley',
      'Computerized 11-inch Celestron deep-sky nebula & planetary tracking',
      'Served with steaming copper mugs of spiced Nordic cloudberry cider',
    ],
    svgCurve: 'M 0 82 C 95 78, 140 16, 180 16 C 220 16, 265 78, 360 82',
  },
  {
    id: 'dawn-canopy-kayak',
    number: '04',
    title: 'Silent Dawn Fjord & Mirror-Lake Paddling',
    subtitle: 'First-Light Cedar Kayak Expedition',
    season: 'Summer',
    duration: '3 hours',
    durationHours: 3.0,
    schedule: 'Daily · 06:00 Sunrise Launch',
    priceLabel: 'Complimentary with stay',
    sensoryNotes: {
      atmosphere: 'Morning Mist, Wet Cedar & Glacier Water',
      soundscape: 'Dipping Wooden Oars & Distant Loons',
      temperature: '12°C Glass-Calm Mirror Lagoon',
    },
    telemetryLabel: 'Acoustic Water Surface',
    telemetryValue: '0 Knots Wind · Zero Motorized Craft Zone',
    description:
      'Glide across glass-calm morning waters in handcrafted cedar-strip kayaks before the valley breeze wakes. Watch golden dawn light pierce the blue canyon mist as eagles and elk move along the shoreline.',
    outcomeMetric: 'Zero motorized watercraft permitted on sanctuary lakes',
    imageUrl: 'kayak',
    photoUrl:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=85',
    photoAlt:
      'Wooden boat gliding across a mirror-still misty mountain lake surrounded by dark pines at dawn',
    photoFilter: 'hue-rotate(150deg) saturate(0.6) brightness(0.68) contrast(1.05)',
    glowPosition: '52% 54%',
    moments: [
      'Handcrafted western red-cedar kayaks waiting at your private dock',
      'Waterproof dry-bags stocked with freshly brewed thermos espresso & pastries',
      'Access to hidden waterfall coves unreachable by foot trails',
    ],
    svgCurve: 'M 0 52 C 60 46, 120 58, 180 52 C 240 46, 300 58, 360 52',
  },
];

const SEASONS = ['All Seasons', 'Winter', 'Summer', 'Autumn'] as const;

const GUEST_REFLECTIONS = [
  {
    quote:
      'Stepping out of the 90°C cedar sauna into the mist rising off the river while the cabin hearth glowed behind us was unforgettable. Four nights without notifications reset our nervous systems completely.',
    author: 'Elena Rostova & Marc Lindqvist',
    role: 'Architectural Founders, Studio Nord',
    stayMeta: '5 nights at Evergreen Pine Valley · February 2026',
    ritualHighlight: 'Wood-Fired Cedar Sauna & Glacial Plunge',
    rating: '5.0',
    photoUrl:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80',
  },
  {
    quote:
      'We paddled across the mirror lagoon at 6:00 AM without another human sound for miles, then returned to a warm fire and fresh mountain bread on our deck. It feels like living inside a private national park.',
    author: 'Dr. Henrik Solberg',
    role: 'Neurobiologist, University of Oslo',
    stayMeta: '4 nights at Aurlandsfjord Glass Crest · January 2026',
    ritualHighlight: 'Silent Dawn Fjord Paddling & Aurora Watch',
    rating: '4.9',
    photoUrl:
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=80',
  },
];

export const ExperiencesSection: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<(typeof SEASONS)[number]>('All Seasons');
  const [activeExperienceId, setActiveExperienceId] = useState<string>(
    FOREST_EXPERIENCES[0].id
  );
  const [itineraryIds, setItineraryIds] = useState<string[]>([
    'wood-fired-sauna-plunge',
    'dawn-canopy-kayak',
  ]);

  const filteredExperiences =
    selectedSeason === 'All Seasons'
      ? FOREST_EXPERIENCES
      : FOREST_EXPERIENCES.filter(
          (exp) => exp.season === selectedSeason || exp.season === 'All Seasons'
        );

  const spotlightExperience =
    filteredExperiences.find((exp) => exp.id === activeExperienceId) ||
    filteredExperiences[0];

  const toggleItinerary = (id: string) => {
    setItineraryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedExperiences = FOREST_EXPERIENCES.filter((exp) =>
    itineraryIds.includes(exp.id)
  );
  const totalCuratedHours = selectedExperiences.reduce(
    (sum, item) => sum + item.durationHours,
    0
  );

  const isSpotlightAdded = itineraryIds.includes(spotlightExperience.id);

  return (
    <section
      id="experiences"
      className="relative py-28 md:py-36 px-6 md:px-10 border-t border-white/10 bg-gradient-to-b from-[#091518] via-[#0c1d22] to-[#091518] overflow-hidden"
    >
      {/* Hero-Matched Screen-Blended Hearth Ambient Field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(circle 560px at 32% 38%, rgba(255, 125, 20, 0.16), rgba(251, 146, 60, 0.06) 55%, transparent 78%)',
          mixBlendMode: 'screen',
        }}
      />

      <div className="relative max-w-[1360px] mx-auto z-10">
        {/* Section Heading — Direct Hero-Scale Display Typography (No Eyebrow Kicker) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-light tracking-[-0.03em] leading-[1.04] text-white max-w-2xl text-balance">
              Slow Rituals for Every Season
            </h2>
            <p className="text-xs md:text-sm text-white/75 max-w-xl font-light leading-relaxed text-pretty">
              Immerse yourself in the sensory quiet of the wilderness—from wood-fired cedar steam rising into sub-zero twilight to glass-calm dawn paddles across glacier water.
            </p>
          </div>

          {/* Seasonal Filter Controls matching Hero Pill Aesthetic */}
          <div
            role="tablist"
            aria-label="Filter experiences by season"
            className="inline-flex items-center gap-1 p-1.5 rounded-full bg-[#091518]/90 border border-white/15 backdrop-blur-2xl self-start lg:self-end overflow-x-auto"
          >
            {SEASONS.map((season) => {
              const active = selectedSeason === season;
              return (
                <button
                  key={season}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSelectedSeason(season);
                    const nextList =
                      season === 'All Seasons'
                        ? FOREST_EXPERIENCES
                        : FOREST_EXPERIENCES.filter(
                            (e) => e.season === season || e.season === 'All Seasons'
                          );
                    if (
                      nextList.length > 0 &&
                      !nextList.some((e) => e.id === activeExperienceId)
                    ) {
                      setActiveExperienceId(nextList[0].id);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {season}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. FEATURED SENSORY IMMERSION STAGE (Echoes the Hero FrameContainer + GlassCard Architecture) */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#12262b] mb-12 shadow-2xl">
          {/* Full-Bleed Evocative Photography with Hero Twilight Grading & Fallback */}
          <AnimatePresence mode="wait">
            <motion.div
              key={spotlightExperience.id}
              initial={{ opacity: 0.35, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.35, scale: 1.02 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <img
                src={spotlightExperience.photoUrl}
                alt={spotlightExperience.photoAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center scale-105"
                style={{ filter: spotlightExperience.photoFilter }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Hero-Matched Boreal Twilight Gradient Wash */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#091518]/90 via-[#19333a]/50 to-[#091518]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091518] via-transparent to-[#0c1a1e]/60" />

          {/* Hero-Matched Warm Hearth Firelight Screen Glow */}
          <div
            className="pointer-events-none absolute inset-0 transition-all duration-700"
            style={{
              background: `radial-gradient(circle 340px at ${spotlightExperience.glowPosition}, rgba(255, 125, 20, 0.52), rgba(251, 146, 60, 0.18) 55%, transparent 80%)`,
              mixBlendMode: 'screen',
            }}
          />

          {/* Stage Content Grid: Left Sensory Narrative + Right Floating GlassCard (Like Hero BookingWidget) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-end min-h-[500px] lg:min-h-[540px]">
            {/* Left 7 Columns: Atmospheric Headline & Sensory Immersion Telemetry */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
              {/* Top Unboxed Metadata Strip */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/85 tabular-nums font-light">
                <span className="text-amber-400 font-medium">
                  Ritual {spotlightExperience.number} / 04
                </span>
                <span className="text-white/35" aria-hidden="true">·</span>
                <span>{spotlightExperience.season}</span>
                <span className="text-white/35" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {spotlightExperience.duration}
                </span>
                <span className="text-white/35" aria-hidden="true">·</span>
                <span className="text-amber-300">{spotlightExperience.priceLabel}</span>
              </div>

              {/* Bottom Left Display Title & Sensory Field Notes */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs sm:text-sm text-amber-300/90 font-light mb-2">
                    {spotlightExperience.subtitle}
                  </p>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] leading-[1.06] text-white max-w-xl text-balance">
                    {spotlightExperience.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-xl text-pretty">
                  {spotlightExperience.description}
                </p>

                {/* 3 Sensory Immersion Dimensions separated by subtle hairlines */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-white/15 max-w-2xl">
                  <div>
                    <span className="block text-[10px] text-white/50 font-light mb-0.5">
                      Olfactory & Atmosphere
                    </span>
                    <span className="text-xs text-white/90 font-light">
                      {spotlightExperience.sensoryNotes.atmosphere}
                    </span>
                  </div>
                  <div className="sm:border-l sm:border-white/10 sm:pl-4">
                    <span className="block text-[10px] text-white/50 font-light mb-0.5">
                      Natural Soundscape
                    </span>
                    <span className="text-xs text-white/90 font-light">
                      {spotlightExperience.sensoryNotes.soundscape}
                    </span>
                  </div>
                  <div className="sm:border-l sm:border-white/10 sm:pl-4 tabular-nums">
                    <span className="block text-[10px] text-white/50 font-light mb-0.5">
                      Thermal & Microclimate
                    </span>
                    <span className="text-xs text-amber-300/95 font-normal">
                      {spotlightExperience.sensoryNotes.temperature}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Hero-Style GlassCard Ritual Dossier */}
            <div className="lg:col-span-5 flex justify-end">
              <GlassCard className="w-full max-w-[430px] backdrop-blur-2xl bg-[#091518]/80 border-white/15 p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-white/10">
                  <div>
                    <span className="block text-[11px] text-amber-400 font-normal mb-0.5">
                      Curated Ritual Dossier
                    </span>
                    <h4 className="text-lg font-normal text-white leading-snug">
                      What You Will Experience
                    </h4>
                  </div>
                  <div className="text-right tabular-nums shrink-0">
                    <span className="text-xs text-white/55 block">Duration</span>
                    <span className="text-sm font-medium text-white">
                      {spotlightExperience.duration}
                    </span>
                  </div>
                </div>

                {/* Moments / Highlights */}
                <div className="space-y-2.5 mb-5">
                  {spotlightExperience.moments.map((moment, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-white/85 font-light leading-relaxed"
                    >
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{moment}</span>
                    </div>
                  ))}
                </div>

                {/* Authentic Geometric Telemetry Waveform inside GlassCard */}
                <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 mb-5">
                  <div className="flex items-center justify-between gap-2 text-[11px] tabular-nums mb-1.5">
                    <span className="text-white/55 font-light">
                      {spotlightExperience.telemetryLabel}
                    </span>
                    <span className="text-amber-300 font-normal">
                      {spotlightExperience.telemetryValue}
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 360 72"
                    className="w-full h-9 overflow-visible"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <line
                      x1="0"
                      y1="36"
                      x2="360"
                      y2="36"
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="3 5"
                    />
                    <path
                      d={spotlightExperience.svgCurve}
                      fill="none"
                      stroke="rgba(251, 191, 36, 0.8)"
                      strokeWidth="1.75"
                    />
                    <circle cx="90" cy="40" r="3" fill="#fbbf24" />
                    <circle cx="270" cy="40" r="3" fill="#fbbf24" />
                  </svg>
                </div>

                {/* Schedule & Primary Action */}
                <div className="flex items-center justify-between text-xs text-white/70 font-light mb-4 tabular-nums">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {spotlightExperience.schedule}
                  </span>
                </div>

                <Button
                  variant="solid"
                  onClick={() => toggleItinerary(spotlightExperience.id)}
                  className={`w-full py-3 text-xs font-semibold gap-2 cursor-pointer ${
                    isSpotlightAdded
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : ''
                  }`}
                >
                  {isSpotlightAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Added to Your Stay Itinerary
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      Add Ritual to Stay · {spotlightExperience.priceLabel}
                    </>
                  )}
                </Button>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* 2. VISUAL GALLERY OF ALL SEASONAL RITUALS (Photographic Cards with Hearth Glow) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {filteredExperiences.map((exp) => {
            const isSelected = exp.id === spotlightExperience.id;
            const isAdded = itineraryIds.includes(exp.id);

            return (
              <div
                key={exp.id}
                onClick={() => setActiveExperienceId(exp.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveExperienceId(exp.id);
                  }
                }}
                className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-xl ${
                  isSelected
                    ? 'bg-[#091518]/90 border-amber-400/70 shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
                    : 'bg-[#091518]/65 border-white/15 hover:border-white/30'
                }`}
              >
                {/* Photographic Visual Header */}
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-[#12262b] border-b border-white/10">
                    <img
                      src={exp.photoUrl}
                      alt={exp.photoAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      style={{ filter: exp.photoFilter }}
                    />

                    {/* Boreal Scrim & Warm Hearth Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091518] via-[#091518]/30 to-black/25" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-85"
                      style={{
                        background: `radial-gradient(circle 140px at ${exp.glowPosition}, rgba(255, 125, 20, 0.45), transparent 75%)`,
                        mixBlendMode: 'screen',
                      }}
                    />

                    {/* Top Card Unboxed Metadata */}
                    <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between text-[11px] text-white/90 tabular-nums">
                      <span>
                        <strong className="text-amber-400 font-medium">{exp.number}.</strong>{' '}
                        {exp.season}
                      </span>
                      <span className="text-white/80">{exp.duration}</span>
                    </div>

                    {/* Bottom Image Overlay Caption */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px]">
                      <span className="text-amber-300/95 font-light truncate">
                        {exp.priceLabel}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 font-medium shrink-0 ${
                          isSelected ? 'text-amber-300' : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        {isSelected ? 'Viewing' : 'Preview'}
                      </span>
                    </div>
                  </div>

                  {/* Card Copy */}
                  <div className="p-5">
                    <h4 className="text-lg font-normal text-white leading-snug mb-2 group-hover:text-amber-200 transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-xs text-white/65 font-light leading-relaxed line-clamp-2 mb-3">
                      {exp.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/55 font-light">
                      <Wind className="w-3 h-3 text-amber-400/80 shrink-0" />
                      <span className="truncate">{exp.sensoryNotes.atmosphere}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-5 pb-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-white/50 font-light truncate tabular-nums">
                    {exp.schedule.split('·')[0]}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItinerary(exp.id);
                    }}
                    className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isAdded
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3" />
                        In Stay
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. LIVE CURATED STAY ITINERARY BAR WITH VISUAL THUMBNAILS */}
        <div className="rounded-3xl bg-[#091518]/85 border border-white/15 backdrop-blur-2xl p-6 sm:p-7 mb-24 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Visual Stack of Selected Experience Photos */}
            {selectedExperiences.length > 0 && (
              <div className="flex items-center -space-x-3 shrink-0">
                {selectedExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#091518] bg-[#12262b] relative shadow-md"
                    title={exp.title}
                  >
                    <img
                      src={exp.photoUrl}
                      alt={exp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      style={{ filter: exp.photoFilter }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-300 tabular-nums">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Your Curated Forest Itinerary · {selectedExperiences.length} ritual
                  {selectedExperiences.length === 1 ? '' : 's'} ({totalCuratedHours} hours of immersion)
                </span>
              </div>
              {selectedExperiences.length > 0 ? (
                <p className="text-sm text-white/85 font-light">
                  {selectedExperiences.map((e) => e.title).join('  ·  ')}
                </p>
              ) : (
                <p className="text-sm text-white/55 font-light">
                  Select any seasonal ritual above to include it in your cabin reservation.
                </p>
              )}
            </div>
          </div>

          <Button
            variant="solid"
            onClick={() => {
              const el = document.getElementById('hero-booking');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="gap-2 text-xs font-semibold whitespace-nowrap shrink-0 self-start lg:self-center cursor-pointer"
          >
            Reserve Cabin With These Rituals
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* 4. VERIFIED GUEST JOURNALS WITH ATMOSPHERIC VIGNETTES */}
        <div className="pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h3 className="text-3xl sm:text-4xl font-light tracking-[-0.03em] text-white text-balance">
                4.7 Average Rating Across 1,800+ Forest Stays
              </h3>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-white/75 tabular-nums font-light">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
              <span>94% repeat or direct-referred guests in 2025–2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-b border-white/10">
            {GUEST_REFLECTIONS.map((item, index) => (
              <article
                key={index}
                className={`py-8 md:py-10 flex flex-col justify-between gap-6 ${
                  index === 0 ? 'md:pr-10' : 'md:pl-10'
                }`}
              >
                {/* Top Photographic Stay Vignette */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/15 bg-[#12262b] shrink-0">
                    <img
                      src={item.photoUrl}
                      alt={item.ritualHighlight}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      style={{
                        filter: 'hue-rotate(155deg) saturate(0.55) brightness(0.7)',
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'radial-gradient(circle 30px at 50% 60%, rgba(255, 125, 20, 0.5), transparent 80%)',
                        mixBlendMode: 'screen',
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300/95 font-light mb-0.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{item.ritualHighlight}</span>
                    </div>
                    <p className="text-xs text-white/55 font-light tabular-nums truncate">
                      {item.stayMeta}
                    </p>
                  </div>
                </div>

                <blockquote className="text-base sm:text-lg text-white/90 font-light leading-relaxed tracking-[-0.01em] text-pretty">
                  “{item.quote}”
                </blockquote>

                <div className="flex items-end justify-between gap-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <p className="text-white font-medium">{item.author}</p>
                    <p className="text-white/60 font-light">{item.role}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-400 tabular-nums shrink-0">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm text-white font-medium">{item.rating}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
