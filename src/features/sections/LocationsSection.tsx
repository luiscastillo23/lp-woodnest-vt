import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, MapPin, ArrowUpRight, Mountain, Wind, Trees, Navigation, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { SanctuaryLocation, assertValidPropertyImages } from '../../types';

interface ExtendedSanctuaryLocation extends SanctuaryLocation {
  elevationMeters: number;
  bortleClass: string;
  daylightHours: string;
  azimuth: string;
  focalPosition: string;
  hearthGlowPos: string;
  hueFilter: string;
  elevationCurve: string;
  markerX: number;
  markerY: number;
}

const SANCTUARY_LOCATIONS: ExtendedSanctuaryLocation[] = [
  {
    id: 'evergreen-valley',
    name: 'Evergreen Pine Valley',
    region: 'Pacific Canopy',
    country: 'Cascade Range, Washington',
    coordinates: '47.7511° N, 120.7401° W',
    elevation: '1,180 m',
    elevationMeters: 1180,
    bortleClass: 'Class 1 · True Dark Sky',
    daylightHours: '11h 40m Equinox',
    azimuth: '242° WSW Valley Aspect',
    nearestTown: '22 min from Leavenworth Airfield',
    tempRange: '4°C – 16°C',
    cabinsCount: 6,
    priceFrom: 359,
    description:
      'Set deep inside 400-acre old-growth Douglas fir woodland beside a glacial river bend. Each cabin is spaced 180 meters apart for complete acoustic privacy.',
    highlights: [
      'Private riverfront cedar soaking decks',
      'Direct trailhead access to Alpine Lakes Wilderness',
      'Zero light pollution — Bortle Class 1 night sky',
    ],
    images: assertValidPropertyImages(
      [
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
      ],
      'evergreen-valley'
    ),
    focalPosition: 'center 58%',
    hearthGlowPos: '46% 62%',
    hueFilter: 'hue-rotate(155deg) saturate(0.55) brightness(0.62)',
    elevationCurve: 'M 0 110 C 120 105, 210 68, 340 48 C 460 30, 560 72, 720 88',
    markerX: 340,
    markerY: 48,
  },
  {
    id: 'aurlandsfjord-ridge',
    name: 'Aurlandsfjord Glass Crest',
    region: 'Nordic Fjords',
    country: 'Vestland, Norway',
    coordinates: '60.9056° N, 7.1892° E',
    elevation: '640 m',
    elevationMeters: 640,
    bortleClass: 'Class 1 · Aurora Corridor',
    daylightHours: '18h 20m Summer Solstice',
    azimuth: '310° NW Fjord Overlook',
    nearestTown: '18 min from Flåm Harbor',
    tempRange: '-2°C – 14°C',
    cabinsCount: 4,
    priceFrom: 420,
    description:
      'Cantilevered over granite cliffs overlooking dark fjord waters and cascading snowmelt waterfalls. Built with charred Nordic heart-pine and triple-glazed sky roofs.',
    highlights: [
      '270-degree panoramic fjord and waterfall views',
      'Wood-fired cantilevered sauna over the cliff edge',
      'Private electric boat mooring at fjord base',
    ],
    images: assertValidPropertyImages(
      [
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=85',
      ],
      'aurlandsfjord-ridge'
    ),
    focalPosition: '35% 48%',
    hearthGlowPos: '42% 58%',
    hueFilter: 'hue-rotate(168deg) saturate(0.5) brightness(0.58)',
    elevationCurve: 'M 0 35 C 140 38, 240 42, 390 74 C 510 98, 610 104, 720 108',
    markerX: 390,
    markerY: 74,
  },
  {
    id: 'dolomites-larch',
    name: 'Val Gardena Larch Sanctuary',
    region: 'Alpine Ridge',
    country: 'South Tyrol, Italy',
    coordinates: '46.5591° N, 11.7219° E',
    elevation: '1,840 m',
    elevationMeters: 1840,
    bortleClass: 'Class 2 · High Alpine Zenith',
    daylightHours: '300+ Clear Alpine Days/Yr',
    azimuth: '195° SSW Limestone Aspect',
    nearestTown: '35 min from Bolzano Heliport',
    tempRange: '-4°C – 18°C',
    cabinsCount: 5,
    priceFrom: 449,
    description:
      'High-altitude timber hideaways tucked into golden larch meadows beneath the Dolomite limestone spires. Designed for ski-in winter solitude and summer ridge hikes.',
    highlights: [
      'Heated stone ski & alpine gear mudroom',
      'Indoor-outdoor cast-iron hearth fireplace',
      'Daily mountain breakfast basket delivered at dawn',
    ],
    images: assertValidPropertyImages(
      [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
      ],
      'dolomites-larch'
    ),
    focalPosition: '62% 52%',
    hearthGlowPos: '50% 60%',
    hueFilter: 'hue-rotate(148deg) saturate(0.6) brightness(0.60)',
    elevationCurve: 'M 0 112 C 150 96, 290 42, 470 22 C 580 14, 650 48, 720 64',
    markerX: 470,
    markerY: 22,
  },
  {
    id: 'hardanger-moss',
    name: 'Hardanger Birch Cove',
    region: 'Nordic Fjords',
    country: 'Hardangervidda, Norway',
    coordinates: '60.3542° N, 6.7210° E',
    elevation: '510 m',
    elevationMeters: 510,
    bortleClass: 'Class 1 · Mirror Lagoon',
    daylightHours: '100% Off-Grid Micro-Hydro',
    azimuth: '165° SE Glacier Basin',
    nearestTown: '25 min from Odda Station',
    tempRange: '1°C – 15°C',
    cabinsCount: 3,
    priceFrom: 389,
    description:
      'Nestled where ancient silver birch groves meet mirror-still glacier lagoons. Constructed on micro-pilings to leave the native moss carpet untouched.',
    highlights: [
      'Suspended over-water meditation deck',
      'Cold-plunge lagoon ladder with heated towel rack',
      '100% off-grid solar and micro-hydro energy',
    ],
    images: assertValidPropertyImages(
      [
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=85',
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
      ],
      'hardanger-moss'
    ),
    focalPosition: '48% 65%',
    hearthGlowPos: '44% 64%',
    hueFilter: 'hue-rotate(160deg) saturate(0.52) brightness(0.60)',
    elevationCurve: 'M 0 65 C 160 72, 290 86, 430 84 C 550 82, 640 92, 720 96',
    markerX: 430,
    markerY: 84,
  },
];

const REGIONS = ['All Regions', 'Pacific Canopy', 'Nordic Fjords', 'Alpine Ridge'] as const;

interface LocationsSectionProps {
  onSelectLocation?: (locationName: string, price: number) => void;
  onOpenLocationDetail?: (locationId: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onSelectLocation,
  onOpenLocationDetail,
}) => {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState<(typeof REGIONS)[number]>('All Regions');
  const [selectedId, setSelectedId] = useState<string>(SANCTUARY_LOCATIONS[0].id);
  const [viewMode, setViewMode] = useState<'atmosphere' | 'topography'>('atmosphere');

  const filteredLocations =
    activeRegion === 'All Regions'
      ? SANCTUARY_LOCATIONS
      : SANCTUARY_LOCATIONS.filter((loc) => loc.region === activeRegion);

  const activeLocation =
    filteredLocations.find((loc) => loc.id === selectedId) || filteredLocations[0];

  const handleReserveLocation = () => {
    if (onSelectLocation) {
      onSelectLocation(activeLocation.name, activeLocation.priceFrom);
    }
    const heroEl = document.getElementById('hero-booking');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDetail = (locId: string = activeLocation.id) => {
    if (onOpenLocationDetail) {
      onOpenLocationDetail(locId);
    }
    navigate(`/location/${locId}/detail`);
  };

  return (
    <section
      id="locations"
      className="relative py-28 md:py-36 px-6 md:px-10 border-t border-white/10 bg-gradient-to-b from-[#0c1a1e] via-[#0d1f23] to-[#091518] overflow-hidden"
    >
      {/* Hero-Matched Screen-Blended Hearth Ambient Field */}
      <div
        className="pointer-events-none absolute inset-0 opacity-75"
        style={{
          background:
            'radial-gradient(circle 520px at 28% 42%, rgba(255, 125, 20, 0.16), rgba(251, 146, 60, 0.05) 55%, transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />

      <div className="relative max-w-[1360px] mx-auto z-10">
        {/* Section Heading — No Eyebrow Kicker, Direct Hero-Scale Display Authority */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-[56px] font-light tracking-[-0.03em] leading-[1.04] text-white max-w-2xl text-balance">
              Remote Wilderness, Effortless Arrival
            </h2>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed max-w-lg text-pretty">
              Four protected forest and fjord reserves across North America and Europe.
              Each site is selected for old-growth silence, dark-sky purity, and private arrival within 35 minutes of regional air or fjord terminals.
            </p>
          </div>

          {/* Interactive Region Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter sanctuaries by region"
            className="inline-flex items-center gap-1 p-1.5 rounded-full bg-[#091518]/90 border border-white/15 backdrop-blur-2xl overflow-x-auto self-start lg:self-end"
          >
            {REGIONS.map((region) => {
              const isActive = activeRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveRegion(region);
                    const firstMatch =
                      region === 'All Regions'
                        ? SANCTUARY_LOCATIONS[0]
                        : SANCTUARY_LOCATIONS.find((l) => l.region === region);
                    if (firstMatch) setSelectedId(firstMatch.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Column Architectural Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left 7 Columns: Primary GlassCard Sanctuary Viewport */}
          <div className="lg:col-span-7 flex">
            <GlassCard className="w-full flex flex-col justify-between p-0 overflow-hidden border-white/15 bg-[#091518]/80 backdrop-blur-2xl">
              {/* Top Atmospheric / Cartographic Viewport matching Hero FrameContainer */}
              <div className="relative h-80 sm:h-[360px] w-full overflow-hidden bg-[#12262b] border-b border-white/10">
                {/* Base Twilight Forest Layer — Displays Principal Image (images[0]) */}
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat transition-all duration-700 scale-105"
                  style={{
                    backgroundImage: `url('${activeLocation.images[0]}')`,
                    backgroundPosition: activeLocation.focalPosition,
                    filter: activeLocation.hueFilter,
                  }}
                />

                {/* Hero-Matched Boreal Gradient Wash */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#2c4f58]/55 via-[#19333a]/45 to-[#091518]/95" />

                {/* Hero-Matched Hearth Firelight Screen Glow */}
                <div
                  className="pointer-events-none absolute inset-0 transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle 240px at ${activeLocation.hearthGlowPos}, rgba(255, 125, 20, 0.52), rgba(251, 146, 60, 0.18) 55%, transparent 80%)`,
                    mixBlendMode: 'screen',
                  }}
                />

                {/* Precision Geodesic & Topographic Geometry Overlay (Authentic Vector Telemetry) */}
                <svg
                  viewBox="0 0 720 360"
                  className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
                    viewMode === 'topography' ? 'opacity-100' : 'opacity-45'
                  }`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="altitudeFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(251, 191, 36, 0.22)" />
                      <stop offset="100%" stopColor="rgba(251, 191, 36, 0.0)" />
                    </linearGradient>
                  </defs>

                  {/* Subtle Geodesic Meridian Grid Lines */}
                  <line x1="180" y1="0" x2="180" y2="360" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
                  <line x1="360" y1="0" x2="360" y2="360" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
                  <line x1="540" y1="0" x2="540" y2="360" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
                  <line x1="0" y1="180" x2="720" y2="180" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 6" />

                  {/* Topographic Contour Curves */}
                  <path
                    d="M 0 140 C 180 110, 340 165, 520 125 C 610 105, 670 130, 720 118"
                    fill="none"
                    stroke="rgba(255,255,255,0.09)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 0 195 C 210 160, 390 215, 560 170 C 640 150, 685 175, 720 165"
                    fill="none"
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth="1"
                  />

                  {/* Dynamic Sanctuary Elevation Profile Curve in middle-lower band */}
                  <g transform="translate(0, 145)">
                    <path
                      d={`${activeLocation.elevationCurve} L 720 140 L 0 140 Z`}
                      fill="url(#altitudeFill)"
                    />
                    <path
                      d={activeLocation.elevationCurve}
                      fill="none"
                      stroke="rgba(251, 191, 36, 0.65)"
                      strokeWidth="1.5"
                    />
                    {/* Active Sanctuary Waypoint Target Crosshair */}
                    <line
                      x1={activeLocation.markerX}
                      y1={activeLocation.markerY - 22}
                      x2={activeLocation.markerX}
                      y2={activeLocation.markerY + 22}
                      stroke="rgba(251, 191, 36, 0.55)"
                      strokeWidth="1"
                    />
                    <line
                      x1={activeLocation.markerX - 22}
                      y1={activeLocation.markerY}
                      x2={activeLocation.markerX + 22}
                      y2={activeLocation.markerY}
                      stroke="rgba(251, 191, 36, 0.55)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={activeLocation.markerX}
                      cy={activeLocation.markerY}
                      r="11"
                      fill="none"
                      stroke="rgba(251, 191, 36, 0.7)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={activeLocation.markerX}
                      cy={activeLocation.markerY}
                      r="3.5"
                      fill="#fbbf24"
                    />
                  </g>
                </svg>

                {/* Top Telemetry & View Mode Bar */}
                <div className="absolute top-5 left-6 right-6 flex flex-wrap items-center justify-between gap-3 z-10">
                  <div className="flex items-center gap-2 text-xs text-white/85 tabular-nums font-light">
                    <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{activeLocation.coordinates}</span>
                    <span className="text-white/35" aria-hidden="true">·</span>
                    <span className="text-amber-300/90">{activeLocation.elevation} ASL</span>
                  </div>

                  {/* Interactive Viewport Mode Switcher */}
                  <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#091518]/80 border border-white/15 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setViewMode('atmosphere')}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewMode === 'atmosphere'
                          ? 'bg-white text-slate-950'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Twilight View
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('topography')}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        viewMode === 'topography'
                          ? 'bg-amber-400 text-slate-950'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Elevation Profile
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay Title & Nightly Rate */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-300/95 mb-1.5 font-light">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{activeLocation.country}</span>
                      <span className="text-white/40" aria-hidden="true">·</span>
                      <span>{activeLocation.region}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.h3
                        key={activeLocation.id}
                        role="button"
                        tabIndex={0}
                        title={`Explore ${activeLocation.name} full detail page`}
                        onClick={() => handleOpenDetail(activeLocation.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenDetail(activeLocation.id);
                          }
                        }}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="group inline-flex items-center gap-2.5 text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.02em] text-white hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        <span className="underline decoration-amber-400/50 underline-offset-8 group-hover:decoration-amber-300">
                          {activeLocation.name}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-amber-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                      </motion.h3>
                    </AnimatePresence>
                  </div>

                  <div className="text-left sm:text-right tabular-nums shrink-0">
                    <span className="text-[11px] text-white/60 font-light block">
                      Sanctuary nightly rate
                    </span>
                    <span className="text-2xl sm:text-3xl font-normal text-white">
                      ${activeLocation.priceFrom}
                    </span>
                    <span className="text-xs text-white/60">/night</span>
                  </div>
                </div>
              </div>

              {/* Lower Architectural Brief & Telemetry Strip */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-7">
                <div>
                  {/* Unboxed Environmental Telemetry Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-6 mb-6 border-b border-white/10 tabular-nums">
                    <div>
                      <span className="block text-[11px] text-white/50 font-light mb-0.5">
                        Orientation & Aspect
                      </span>
                      <span className="text-xs text-white/90 font-normal inline-flex items-center gap-1.5">
                        <Navigation className="w-3 h-3 text-amber-400 shrink-0" />
                        {activeLocation.azimuth}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-white/50 font-light mb-0.5">
                        Nocturnal Sky Quality
                      </span>
                      <span className="text-xs text-white/90 font-normal">
                        {activeLocation.bortleClass}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="block text-[11px] text-white/50 font-light mb-0.5">
                        Seasonal Microclimate
                      </span>
                      <span className="text-xs text-white/90 font-normal inline-flex items-center gap-1.5">
                        <Sun className="w-3 h-3 text-amber-400 shrink-0" />
                        {activeLocation.tempRange} · {activeLocation.daylightHours}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-white/80 font-light leading-relaxed mb-6 text-pretty">
                    {activeLocation.description}
                  </p>

                  {/* 3 Sanctuary Highlights separated by clean hairlines */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-5 border-t border-white/10">
                    {activeLocation.highlights.map((item, idx) => (
                      <div key={idx} className="text-xs text-white/80 font-light leading-relaxed">
                        <span className="text-amber-400 font-medium block mb-1 tabular-nums">
                          0{idx + 1}.
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-white/65 font-light tabular-nums">
                    <span className="text-white/90 font-normal">
                      {activeLocation.cabinsCount} private cabins
                    </span>
                    <span className="mx-2 text-white/35" aria-hidden="true">·</span>
                    <span>{activeLocation.nearestTown}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <Button
                      variant="glass"
                      onClick={() => handleOpenDetail(activeLocation.id)}
                      className="gap-1.5 whitespace-nowrap shrink-0 text-xs font-medium cursor-pointer"
                    >
                      Explore Residence & Map
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                    </Button>
                    <Button
                      variant="solid"
                      onClick={handleReserveLocation}
                      className="gap-2 whitespace-nowrap shrink-0 text-xs font-semibold cursor-pointer"
                    >
                      Reserve {activeLocation.name.split(' ')[0]}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right 5 Columns: Hairline-Divided Architectural Sanctuary Ledger (No Nested Cards) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#091518]/65 backdrop-blur-2xl border border-white/15 p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/10">
                <h3 className="text-sm font-normal text-white/90 tracking-tight">
                  Sanctuary Directory
                </h3>
                <span className="text-xs text-white/50 font-light tabular-nums">
                  {filteredLocations.length} of {SANCTUARY_LOCATIONS.length} reserves shown
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {filteredLocations.map((location, index) => {
                  const isSelected = location.id === activeLocation.id;
                  return (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => setSelectedId(location.id)}
                      className={`w-full text-left py-5 px-4 -mx-4 rounded-2xl transition-all duration-200 cursor-pointer group ${
                        isSelected
                          ? 'bg-white/[0.07]'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-white/55 tabular-nums mb-1 font-light">
                            <span className={isSelected ? 'text-amber-400 font-medium' : 'text-white/45'}>
                              0{index + 1}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{location.country}</span>
                          </div>
                          <h4
                            className={`text-lg font-normal tracking-tight transition-colors ${
                              isSelected ? 'text-amber-300' : 'text-white group-hover:text-white/90'
                            }`}
                          >
                            {location.name}
                          </h4>
                        </div>

                        <div className="text-right tabular-nums shrink-0">
                          <span className="text-lg font-normal text-white">
                            ${location.priceFrom}
                          </span>
                          <span className="text-xs text-white/50">/nt</span>
                        </div>
                      </div>

                      <p className="text-xs text-white/65 font-light line-clamp-2 mb-3 leading-relaxed">
                        {location.description}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-white/55 tabular-nums font-light">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="inline-flex items-center gap-1">
                            <Mountain className="w-3 h-3 text-amber-400/80" />
                            {location.elevation}
                          </span>
                          <span className="text-white/30" aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Wind className="w-3 h-3 text-amber-400/80" />
                            {location.tempRange}
                          </span>
                          <span className="text-white/30" aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Trees className="w-3 h-3 text-amber-400/80" />
                            {location.cabinsCount} cabins
                          </span>
                        </div>

                        <span
                          className={`whitespace-nowrap shrink-0 transition-colors ${
                            isSelected
                              ? 'text-amber-300 font-medium'
                              : 'text-white/40 group-hover:text-white/75'
                          }`}
                        >
                          {isSelected ? 'Active View' : 'Inspect →'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Acoustic Distance & Sustainability Note */}
            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4 text-xs text-white/55 font-light tabular-nums">
              <span>Minimum 180 m acoustic buffer between cabins</span>
              <span className="text-amber-300/90 shrink-0">Helipad & EV Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
