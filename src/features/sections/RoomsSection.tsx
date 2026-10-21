import React, { useState } from 'react';
import { Star, Check, Flame, ArrowUpRight, Layers, Compass, VolumeX, Thermometer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { CabinRoom, assertValidPropertyImages } from '../../types';

interface ExtendedCabinRoom extends CabinRoom {
  dimensionsMetric: string;
  ceilingHeight: string;
  acousticRating: string;
  thermalRating: string;
  saunaSpec: string;
  focalCrop: string;
  hearthPos: string;
  hueFilter: string;
  materials: { name: string; origin: string; swatch: string }[];
}

const CABIN_ROOMS: ExtendedCabinRoom[] = [
  {
    id: 'pine-family-lodge',
    title: 'Evergreen',
    subtitle: 'Pine Family Lodge',
    areaSqm: 92,
    dimensionsMetric: '11.5 m × 8.0 m',
    ceilingHeight: '6.4 m Double-Height Gable',
    acousticRating: '21 dB Interior Silence',
    thermalRating: 'R-42 Passive Envelope',
    saunaSpec: 'Cedar Barrel Sauna + 4°C Rain Shower',
    guestsRange: '2–5 guests',
    bedConfig: '1 King Suite + Panoramic Mezzanine Loft',
    pricePerNight: 359,
    rating: 4.9,
    reviewsCount: 640,
    description:
      'Our flagship two-level timber sanctuary crafted from kiln-dried western red cedar. Features a double-height glass gable framing old-growth pines and a suspended cast-iron fireplace.',
    features: [
      'Private cedar barrel sauna & cold rain shower',
      'Suspended wood-burning hearth with seasoned birch',
      'Heated basalt stone floors throughout',
      'Chef-grade induction kitchen & espresso bar',
    ],
    architecturalNote: 'Acoustic triple-glazing with zero exterior light bleed.',
    images: assertValidPropertyImages(
      [
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
      ],
      'pine-family-lodge'
    ),
    focalCrop: '45% 55%',
    hearthPos: '45% 63%',
    hueFilter: 'hue-rotate(155deg) saturate(0.55) brightness(0.64)',
    materials: [
      { name: 'Western Red Cedar', origin: 'FSC Cascade Timber', swatch: '#7c4a2d' },
      { name: 'Honed Basalt', origin: 'Radiant Heated Slab', swatch: '#1e292b' },
      { name: 'Seasoned Birch', origin: 'Kiln-Dried Hearth Fuel', swatch: '#d97706' },
    ],
  },
  {
    id: 'nordic-glass-aframe',
    title: 'Solstice',
    subtitle: 'Canopy Glass A-Frame',
    areaSqm: 64,
    dimensionsMetric: '9.2 m × 7.0 m',
    ceilingHeight: '5.8 m Pitch Sky-Roof',
    acousticRating: '19 dB Canopy Isolation',
    thermalRating: 'Argon Triple-Glazed Sky',
    saunaSpec: 'Sunken Cedar Hot Tub on Canopy Deck',
    guestsRange: '2 guests',
    bedConfig: '1 Stargazing King Bed Under Sky Roof',
    pricePerNight: 289,
    rating: 4.8,
    reviewsCount: 720,
    description:
      'An intimate architectural A-frame elevated 4 meters above the mossy forest floor on steel pilings. Designed for couples seeking uninterrupted stargazing from bed.',
    features: [
      'Motorized blackout & sheer sky-roof shades',
      'Outdoor sunken cedar hot soaking tub on deck',
      'Bespoke smoked-oak acoustic sound system',
      'Organic flax linen bedding & heated wool throws',
    ],
    architecturalNote: 'Zero-footprint micropile foundation preserving tree roots.',
    images: assertValidPropertyImages(
      [
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
      ],
      'nordic-glass-aframe'
    ),
    focalCrop: '52% 42%',
    hearthPos: '48% 58%',
    hueFilter: 'hue-rotate(165deg) saturate(0.50) brightness(0.60)',
    materials: [
      { name: 'Nordic Heart-Pine', origin: 'Elevated Frame', swatch: '#855836' },
      { name: 'Low-Iron Solar Glass', origin: 'Zenith Sky Roof', swatch: '#2c4f58' },
      { name: 'Smoked European Oak', origin: 'Acoustic Millwork', swatch: '#3e2c23' },
    ],
  },
  {
    id: 'cliffside-cedar-pavilion',
    title: 'Horizon',
    subtitle: 'Cliffside Cedar Pavilion',
    areaSqm: 118,
    dimensionsMetric: '14.8 m × 8.0 m',
    ceilingHeight: '3.6 m Cantilevered Span',
    acousticRating: '20 dB Granite Ridge Buffer',
    thermalRating: 'Shou Sugi Ban Weather Shield',
    saunaSpec: 'Finlandia Wood Sauna + Plunge Pool',
    guestsRange: '2–6 guests',
    bedConfig: '2 King Suites + Private Study',
    pricePerNight: 449,
    rating: 4.95,
    reviewsCount: 480,
    description:
      'Cantilevered over a granite ridge with 270-degree views of misty mountain valleys. Includes a private wellness wing with a wood-fired sauna and outdoor fire pit.',
    features: [
      'Cantilevered glass meditation & dining terrace',
      'Private Finlandia wood-fired sauna & plunge pool',
      'Dual master suites with freestanding stone tubs',
      'Dedicated fiber-optic satellite workspace nook',
    ],
    architecturalNote: 'Charred Shou Sugi Ban cedar exterior for weather resilience.',
    images: assertValidPropertyImages(
      [
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
      ],
      'cliffside-cedar-pavilion'
    ),
    focalCrop: '38% 60%',
    hearthPos: '43% 65%',
    hueFilter: 'hue-rotate(150deg) saturate(0.58) brightness(0.62)',
    materials: [
      { name: 'Shou Sugi Ban Cedar', origin: 'Charred Timber Cladding', swatch: '#141e20' },
      { name: 'Alpine Dolomite Stone', origin: 'Freestanding Soaking Tubs', swatch: '#475569' },
      { name: 'Unlacquered Brass', origin: 'Tactile Hardware & Toggles', swatch: '#f59e0b' },
    ],
  },
];

interface RoomsSectionProps {
  selectedCabinTitle?: string;
  onSelectRoom?: (title: string, subtitle: string, price: number, guestsRange: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  selectedCabinTitle,
  onSelectRoom,
}) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(CABIN_ROOMS[0].id);
  const [visualMode, setVisualMode] = useState<'exterior' | 'blueprint'>('exterior');

  const activeRoom = CABIN_ROOMS.find((r) => r.id === activeRoomId) || CABIN_ROOMS[0];

  const handleBookCabin = (room: ExtendedCabinRoom) => {
    setActiveRoomId(room.id);
    if (onSelectRoom) {
      onSelectRoom(room.title, room.subtitle, room.pricePerNight, room.guestsRange);
    }
    const heroEl = document.getElementById('hero-booking');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="rooms"
      className="relative py-28 md:py-36 px-6 md:px-10 border-t border-white/10 bg-gradient-to-b from-[#091518] via-[#0e2227] to-[#091518] overflow-hidden"
    >
      {/* Hero-Matched Screen-Blended Firelight Field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          background:
            'radial-gradient(circle 500px at 74% 38%, rgba(255, 125, 20, 0.15), rgba(251, 146, 60, 0.05) 55%, transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />

      <div className="relative max-w-[1360px] mx-auto z-10">
        {/* Section Header — Direct Display Authority without Eyebrow Kicker */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-light tracking-[-0.03em] leading-[1.04] text-white max-w-2xl text-balance">
              Designed to Disappear Into the Trees
            </h2>
            <p className="text-xs md:text-sm text-white/70 max-w-xl font-light leading-relaxed text-pretty">
              Every cabin is built from sustainably harvested Nordic and Pacific timber,
              combining raw natural textures with museum-grade acoustic silence and radiant thermal comfort.
            </p>
          </div>

          {/* Interactive Cabin Typology Switcher */}
          <div
            role="tablist"
            aria-label="Select cabin architecture"
            className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#091518]/90 border border-white/15 backdrop-blur-2xl overflow-x-auto self-start lg:self-end"
          >
            {CABIN_ROOMS.map((room) => {
              const isSelected = room.id === activeRoom.id;
              return (
                <button
                  key={room.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 tabular-nums ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-white/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{room.title}</span>
                  <span className={isSelected ? 'text-slate-950/65 font-normal' : 'text-white/45 font-light'}>
                    {room.areaSqm} m²
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Asymmetric 12-Column Cabin Monograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-12">
          {/* Left 7 Columns: Dual-Mode Twilight & 1:100 CAD Blueprint Canvas */}
          <div className="lg:col-span-7 flex">
            <div className="relative w-full min-h-[420px] sm:min-h-[500px] rounded-3xl overflow-hidden border border-white/15 bg-[#0c1d22] flex flex-col justify-between p-6 sm:p-8">
              {/* Mode 1: Twilight Exterior & Hearth Glow matching Hero FrameContainer */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  visualMode === 'exterior' ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-700 scale-105"
                  style={{
                    backgroundImage: `url('${activeRoom.images[0]}')`,
                    backgroundPosition: activeRoom.focalCrop,
                    filter: activeRoom.hueFilter,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#2c4f58]/50 via-[#19333a]/40 to-[#091518]/95" />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(circle 250px at ${activeRoom.hearthPos}, rgba(255, 125, 20, 0.58), rgba(251, 146, 60, 0.2) 55%, transparent 80%)`,
                    mixBlendMode: 'screen',
                  }}
                />
              </div>

              {/* Mode 2: Precision 1:100 Architectural CAD Floorplan Geometry (Authentic Vector Blueprint) */}
              <svg
                viewBox="0 0 720 460"
                className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
                  visualMode === 'blueprint' ? 'opacity-100' : 'opacity-35'
                }`}
                preserveAspectRatio="xMidYMid meet"
                aria-label={`Architectural floorplan for ${activeRoom.title}`}
              >
                <defs>
                  <pattern id="cadGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path
                      d="M 36 0 L 0 0 0 36"
                      fill="none"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="1"
                    />
                  </pattern>
                  <radialGradient id="hearthThermalZone" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(251, 191, 36, 0.32)" />
                    <stop offset="60%" stopColor="rgba(245, 158, 11, 0.08)" />
                    <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
                  </radialGradient>
                </defs>

                <rect width="720" height="460" fill="url(#cadGrid)" />

                {/* Dynamic Floorplan Geometry per Cabin */}
                {activeRoom.id === 'pine-family-lodge' && (
                  <g transform="translate(130, 85)">
                    {/* Outer Timber Deck Envelope */}
                    <rect
                      x="0"
                      y="0"
                      width="460"
                      height="270"
                      fill="rgba(9, 21, 24, 0.45)"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    {/* Insulated Structural Timber Walls */}
                    <rect
                      x="45"
                      y="30"
                      width="330"
                      height="210"
                      fill="rgba(12, 26, 30, 0.72)"
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="2.5"
                    />
                    {/* Interior Partition Walls */}
                    <line x1="215" y1="30" x2="215" y2="155" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
                    <line x1="45" y1="155" x2="275" y2="155" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
                    {/* Hearth Thermal Radiation Zone */}
                    <circle cx="315" cy="135" r="75" fill="url(#hearthThermalZone)" />
                    <circle cx="315" cy="135" r="28" fill="none" stroke="rgba(251,191,36,0.5)" strokeDasharray="2 3" />
                    <circle cx="315" cy="135" r="8" fill="#fbbf24" />
                    {/* Cedar Barrel Sauna on Deck */}
                    <circle
                      cx="418"
                      cy="78"
                      r="26"
                      fill="rgba(251, 191, 36, 0.14)"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                    />
                    {/* Architectural Dimension Callouts */}
                    <line x1="45" y1="12" x2="375" y2="12" stroke="rgba(251,191,36,0.6)" strokeWidth="1" />
                    <text x="210" y="7" fill="rgba(251,191,36,0.9)" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      11,500 mm · DOUBLE-HEIGHT GLAZED ENVELOPE
                    </text>
                    <text x="130" y="95" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">
                      KING SUITE (34 m²)
                    </text>
                    <text x="300" y="95" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">
                      HEARTH HALL
                    </text>
                    <text x="145" y="202" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">
                      MEZZANINE LOFT & STUDY
                    </text>
                    <text x="418" y="118" fill="rgba(251,191,36,0.85)" fontSize="9" textAnchor="middle">
                      SAUNA
                    </text>
                  </g>
                )}

                {activeRoom.id === 'nordic-glass-aframe' && (
                  <g transform="translate(160, 80)">
                    {/* Elevated Canopy Deck */}
                    <rect
                      x="20"
                      y="15"
                      width="360"
                      height="265"
                      fill="rgba(9, 21, 24, 0.45)"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    {/* A-Frame Structural Footprint */}
                    <rect
                      x="65"
                      y="45"
                      width="270"
                      height="185"
                      fill="rgba(12, 26, 30, 0.72)"
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="2.5"
                    />
                    {/* Sky-Roof Ridge Axis */}
                    <line x1="65" y1="137" x2="335" y2="137" stroke="rgba(251,191,36,0.65)" strokeWidth="1.5" strokeDasharray="6 4" />
                    {/* Sunken Cedar Hot Soaking Tub */}
                    <circle cx="200" cy="137" r="70" fill="url(#hearthThermalZone)" />
                    <circle cx="355" cy="195" r="24" fill="rgba(251,191,36,0.18)" stroke="#fbbf24" strokeWidth="1.5" />
                    <text x="200" y="30" fill="rgba(251,191,36,0.9)" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      9,200 mm · ELEVATED MICROPILE A-FRAME
                    </text>
                    <text x="200" y="105" fill="rgba(255,255,255,0.75)" fontSize="10" textAnchor="middle">
                      STARGAZING KING PLATFORM
                    </text>
                    <text x="200" y="182" fill="rgba(255,255,255,0.65)" fontSize="10" textAnchor="middle">
                      ACOUSTIC HEARTH LOUNGE
                    </text>
                  </g>
                )}

                {activeRoom.id === 'cliffside-cedar-pavilion' && (
                  <g transform="translate(105, 85)">
                    {/* Cantilevered Cliff Line */}
                    <path
                      d="M 0 215 Q 250 195, 510 225"
                      fill="none"
                      stroke="rgba(251,191,36,0.45)"
                      strokeWidth="1.5"
                      strokeDasharray="3 5"
                    />
                    {/* Pavilion Linear Wing + Cantilevered Terrace */}
                    <rect
                      x="25"
                      y="35"
                      width="460"
                      height="210"
                      fill="rgba(12, 26, 30, 0.72)"
                      stroke="rgba(255,255,255,0.65)"
                      strokeWidth="2.5"
                    />
                    <line x1="175" y1="35" x2="175" y2="245" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
                    <line x1="345" y1="35" x2="345" y2="245" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
                    <circle cx="260" cy="140" r="78" fill="url(#hearthThermalZone)" />
                    <circle cx="260" cy="140" r="8" fill="#fbbf24" />
                    <text x="255" y="20" fill="rgba(251,191,36,0.9)" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      14,800 mm · CANTILEVERED RIDGE PAVILION
                    </text>
                    <text x="100" y="140" fill="rgba(255,255,255,0.75)" fontSize="10" textAnchor="middle">
                      WEST KING SUITE
                    </text>
                    <text x="260" y="105" fill="rgba(255,255,255,0.8)" fontSize="10" textAnchor="middle">
                      PANORAMIC HEARTH
                    </text>
                    <text x="415" y="140" fill="rgba(251,191,36,0.85)" fontSize="10" textAnchor="middle">
                      SAUNA & PLUNGE WING
                    </text>
                  </g>
                )}
              </svg>

              {/* Top Overlay Controls: Scale & Mode Switcher */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-white/85 tabular-nums font-light">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Scale 1:100</span>
                  <span className="text-white/35" aria-hidden="true">·</span>
                  <span>{activeRoom.dimensionsMetric}</span>
                  <span className="text-white/35" aria-hidden="true">·</span>
                  <span className="text-amber-300/90">{activeRoom.areaSqm} m²</span>
                </div>

                <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#091518]/85 border border-white/15 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setVisualMode('exterior')}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      visualMode === 'exterior'
                        ? 'bg-white text-slate-950'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Twilight Atmosphere
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisualMode('blueprint')}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1.5 ${
                      visualMode === 'blueprint'
                        ? 'bg-amber-400 text-slate-950'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    CAD Floorplan
                  </button>
                </div>
              </div>

              {/* Bottom Overlay Architectural Specs */}
              <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-300/95 mb-1 tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-white">{activeRoom.rating}</span>
                    <span className="text-white/60">({activeRoom.reviewsCount} stays)</span>
                    <span className="text-white/35" aria-hidden="true">·</span>
                    <span>{activeRoom.guestsRange}</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeRoom.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <h3 className="text-3xl sm:text-4xl font-light tracking-[-0.02em] text-white">
                        {activeRoom.title} — {activeRoom.subtitle}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-5 text-xs text-white/75 font-light tabular-nums shrink-0">
                  <span className="inline-flex items-center gap-1.5">
                    <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                    {activeRoom.acousticRating}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                    {activeRoom.thermalRating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: GlassCard Architectural Spec Sheet matching Hero BookingWidget */}
          <div className="lg:col-span-5 flex">
            <GlassCard className="w-full flex flex-col justify-between p-6 sm:p-8 backdrop-blur-2xl border-white/15 bg-[#091518]/80">
              <div>
                <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-white/10">
                  <div>
                    <h4 className="text-xl font-normal text-white leading-snug">
                      {activeRoom.title}
                    </h4>
                    <p className="text-sm font-light text-white/75">
                      {activeRoom.subtitle} · {activeRoom.ceilingHeight}
                    </p>
                  </div>
                  <div className="text-right tabular-nums shrink-0">
                    <span className="text-2xl font-normal text-white">
                      ${activeRoom.pricePerNight}
                    </span>
                    <span className="text-xs text-white/60">/night</span>
                  </div>
                </div>

                {/* Sleeping & Wellness Configuration */}
                <div className="text-xs text-amber-300/95 font-light mb-4 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{activeRoom.bedConfig}</span>
                </div>

                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed mb-6 text-pretty">
                  {activeRoom.description}
                </p>

                {/* Architectural Features List */}
                <div className="space-y-2.5 pt-5 border-t border-white/10 mb-6">
                  {activeRoom.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/85 font-light">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tactile Material Palette Swatches */}
                <div className="pt-5 border-t border-white/10">
                  <span className="block text-[11px] text-white/50 font-light mb-3">
                    Architectural Material Palette
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {activeRoom.materials.map((mat) => (
                      <div key={mat.name} className="flex items-start gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/25 shrink-0 mt-0.5"
                          style={{ backgroundColor: mat.swatch }}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <span className="block text-[11px] text-white/90 font-normal truncate">
                            {mat.name}
                          </span>
                          <span className="block text-[10px] text-white/50 font-light truncate">
                            {mat.origin}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer Synchronized with Hero BookingWidget */}
              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-[11px] text-white/60 font-light">
                  {activeRoom.architecturalNote}
                </div>

                <Button
                  variant={selectedCabinTitle === activeRoom.title ? 'glass' : 'solid'}
                  onClick={() => handleBookCabin(activeRoom)}
                  className={`px-5 py-2.5 text-xs font-semibold gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCabinTitle === activeRoom.title
                      ? 'border-amber-400/60 text-amber-300 bg-amber-400/10'
                      : ''
                  }`}
                >
                  {selectedCabinTitle === activeRoom.title
                    ? `Selected in Hero (${activeRoom.title})`
                    : `Select ${activeRoom.title} · $${activeRoom.pricePerNight}`}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Full-Width Hairline Architectural Comparison Ledger */}
        <div className="pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {CABIN_ROOMS.map((room) => {
              const isSelected = room.id === activeRoom.id;
              const isBookedInHero = selectedCabinTitle === room.title;
              return (
                <div
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveRoomId(room.id);
                    }
                  }}
                  className={`p-5 sm:p-6 transition-colors cursor-pointer ${
                    isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1.5 tabular-nums">
                    <h4 className={`text-base font-normal ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                      {room.title} · <span className="text-white/70 font-light">{room.subtitle}</span>
                    </h4>
                    <span className="text-sm font-normal text-white">${room.pricePerNight}/nt</span>
                  </div>

                  <div className="text-xs text-white/55 font-light tabular-nums mb-3">
                    <span>{room.areaSqm} m²</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>{room.guestsRange}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>{room.saunaSpec}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className={isSelected ? 'text-amber-400 font-medium' : 'text-white/40'}>
                      {isSelected ? 'Inspecting floorplan & specs' : 'Click to inspect specs'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookCabin(room);
                      }}
                      className="text-white/80 hover:text-amber-300 underline decoration-white/30 hover:decoration-amber-300 transition-colors cursor-pointer"
                    >
                      {isBookedInHero ? 'Active in Hero Widget' : 'Load into Booking →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
