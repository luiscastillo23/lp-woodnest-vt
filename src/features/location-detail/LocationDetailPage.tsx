import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Compass,
  MapPin,
  Star,
  Check,
  Plus,
  Trash2,
  Flame,
  Mountain,
  Wind,
  Sun,
  ShieldCheck,
  Clock,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Navigation,
  MessageSquarePlus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import {
  DetailedSanctuary,
  DETAILED_SANCTUARIES,
  GuestReview,
} from '../../data/sanctuariesData';
import { SanctuaryNearbyMap } from './SanctuaryNearbyMap';

interface LocationDetailPageProps {
  locationId?: string;
  onBack?: () => void;
  onSelectLocationId?: (id: string) => void;
  onConfirmBooking?: (summary: {
    locationName: string;
    nights: number;
    guests: number;
    totalPrice: number;
  }) => void;
}

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({
  locationId,
  onBack,
  onSelectLocationId,
  onConfirmBooking,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const resolvedSlug = slug || locationId || DETAILED_SANCTUARIES[0].id;
  const sanctuary: DetailedSanctuary =
    DETAILED_SANCTUARIES.find((s) => s.id === resolvedSlug) || DETAILED_SANCTUARIES[0];

  const handleBackNavigation = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  const handleSwitchLocation = (newSlug: string) => {
    if (onSelectLocationId) {
      onSelectLocationId(newSlug);
    }
    navigate(`/location/${newSlug}/detail`);
  };

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [nights, setNights] = useState<number>(3);
  const [guests, setGuests] = useState<number>(2);
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([
    sanctuary.activities[0]?.id || '',
  ]);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Guest review submission state
  const [customReviews, setCustomReviews] = useState<Record<string, GuestReview[]>>({});
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [newReviewName, setNewReviewName] = useState<string>('');
  const [newReviewOrigin, setNewReviewOrigin] = useState<string>('');
  const [newReviewTitle, setNewReviewTitle] = useState<string>('');
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);

  // Reset gallery index & default activity when switching sanctuary
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedActivityIds(
      sanctuary.activities[0] ? [sanctuary.activities[0].id] : []
    );
    setBookingConfirmed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sanctuary.id]);

  const activePhoto =
    sanctuary.gallery[activeImageIndex] || sanctuary.gallery[0];

  const toggleActivity = (activityId: string) => {
    setBookingConfirmed(false);
    setSelectedActivityIds((prev) =>
      prev.includes(activityId)
        ? prev.filter((id) => id !== activityId)
        : [...prev, activityId]
    );
  };

  const selectedActivities = sanctuary.activities.filter((act) =>
    selectedActivityIds.includes(act.id)
  );

  const accommodationSubtotal = sanctuary.priceFrom * nights;
  const activitiesSubtotal = selectedActivities.reduce(
    (sum, act) => sum + act.price,
    0
  );
  const totalPlanPrice = accommodationSubtotal + activitiesSubtotal;

  const allReviews = [
    ...(customReviews[sanctuary.id] || []),
    ...sanctuary.reviews,
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const created: GuestReview = {
      id: `custom-${Date.now()}`,
      guestName: newReviewName.trim(),
      guestOrigin: newReviewOrigin.trim() || 'Verified Sanctuary Guest',
      stayDate: 'October 2026',
      nightsStayed: nights,
      cabinModel: `${sanctuary.name.split(' ')[0]} Residence`,
      rating: newReviewRating,
      title:
        newReviewTitle.trim() ||
        'An unforgettable stay in the wilderness.',
      comment: newReviewComment.trim(),
      activitiesBooked: selectedActivities.map((a) => a.title),
    };

    setCustomReviews((prev) => ({
      ...prev,
      [sanctuary.id]: [created, ...(prev[sanctuary.id] || [])],
    }));

    setNewReviewName('');
    setNewReviewOrigin('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  const handleConfirmPlan = () => {
    setBookingConfirmed(true);
    if (onConfirmBooking) {
      onConfirmBooking({
        locationName: sanctuary.name,
        nights,
        guests,
        totalPrice: totalPlanPrice,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#091518] text-white selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Top Architectural Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#091518]/85 backdrop-blur-2xl">
        <div className="max-w-[1380px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleBackNavigation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-medium text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Back to Overview</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-white/60 font-light tabular-nums">
              <span className="px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[11px] text-amber-300/90">
                /location/{sanctuary.id}/detail
              </span>
              <span className="text-white/25" aria-hidden="true">·</span>
              <span className="text-white/90 font-normal">{sanctuary.name}</span>
            </div>
          </div>

          {/* Quick Section Anchors */}
          <nav
            aria-label="Sanctuary detail sections"
            className="hidden lg:flex items-center gap-6 text-xs text-white/70 font-light"
          >
            <a href="#detail-gallery" className="hover:text-white transition-colors">
              Residence Gallery
            </a>
            <a href="#detail-description" className="hover:text-white transition-colors">
              Architecture & Specs
            </a>
            <a href="#detail-activities" className="hover:text-white transition-colors">
              Nearby Activities ({selectedActivities.length} in Plan)
            </a>
            <a href="#detail-map" className="hover:text-white transition-colors">
              Google Maps Territory
            </a>
            <a href="#detail-reviews" className="hover:text-white transition-colors">
              Guest Reviews ({allReviews.length})
            </a>
          </nav>

          {/* Live Plan Total Pill */}
          <div className="flex items-center gap-3">
            <div className="text-right tabular-nums hidden md:block">
              <span className="block text-[10px] text-white/50 font-light">
                Total Plan ({nights} nt + {selectedActivities.length} rituals)
              </span>
              <span className="text-base font-medium text-amber-300">
                ${totalPlanPrice.toLocaleString()}
              </span>
            </div>
            <a
              href="#plan-summary-card"
              className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap"
            >
              Review Plan
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative py-12 md:py-16 px-6 md:px-10 overflow-hidden">
        {/* Hero-Matched Screen-Blended Hearth Ambient Field */}
        <div
          className="pointer-events-none absolute inset-0 opacity-75"
          style={{
            background:
              'radial-gradient(circle 650px at 30% 18%, rgba(255, 125, 20, 0.16), rgba(251, 146, 60, 0.05) 55%, transparent 75%)',
            mixBlendMode: 'screen',
          }}
        />

        <div className="relative max-w-[1380px] mx-auto z-10 space-y-20">
          {/* 1. Sanctuary Header & Switcher Strip */}
          <section id="detail-gallery" className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-amber-300/95 tabular-nums font-light">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{sanctuary.country}</span>
                  <span className="text-white/35" aria-hidden="true">·</span>
                  <span>{sanctuary.coordinates}</span>
                  <span className="text-white/35" aria-hidden="true">·</span>
                  <span>{sanctuary.elevation} ASL</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] leading-[1.03] text-white text-balance">
                  {sanctuary.name}
                </h1>
              </div>

              {/* Rating & Nightly Rate Summary */}
              <div className="flex flex-wrap items-center gap-6 pb-1 tabular-nums">
                <a
                  href="#detail-reviews"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/15 hover:bg-white/[0.09] transition-colors"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <div>
                    <span className="text-sm font-medium text-white">
                      {sanctuary.ratingSummary.overall.toFixed(2)}
                    </span>
                    <span className="text-xs text-white/60 ml-1.5">
                      ({allReviews.length} guest reviews)
                    </span>
                  </div>
                </a>

                <div className="text-right">
                  <span className="block text-[11px] text-white/55 font-light">
                    Base Sanctuary Rate
                  </span>
                  <span className="text-2xl sm:text-3xl font-light text-white">
                    ${sanctuary.priceFrom}
                  </span>
                  <span className="text-xs text-white/60">/night</span>
                </div>
              </div>
            </div>

            {/* Interactive Principal House Image + Rest of House Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Principal Image Stage (8 Columns) */}
              <div className="lg:col-span-8">
                <div className="relative h-[420px] sm:h-[540px] w-full rounded-3xl overflow-hidden border border-white/15 bg-[#12262b] group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePhoto.id}
                      src={activePhoto.url}
                      alt={activePhoto.title}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        objectPosition: activePhoto.focalPosition,
                        filter: 'saturate(0.85) contrast(1.04) brightness(0.84)',
                      }}
                    />
                  </AnimatePresence>

                  {/* Hero-Matched Boreal Twilight Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#091518]/50 via-transparent to-[#091518]/92" />

                  {/* Hero-Matched Hearth Firelight Screen Glow */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-all duration-700"
                    style={{
                      background: `radial-gradient(circle 280px at ${activePhoto.hearthGlowPos}, rgba(255, 125, 20, 0.46), rgba(251, 146, 60, 0.16) 55%, transparent 80%)`,
                      mixBlendMode: 'screen',
                    }}
                  />

                  {/* Top Photo Metadata Bar */}
                  <div className="absolute top-5 left-6 right-6 flex items-center justify-between gap-3 z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#091518]/80 border border-white/15 backdrop-blur-md text-xs text-white/90 tabular-nums">
                      <span className="text-amber-400 font-medium">
                        0{activeImageIndex + 1} / 0{sanctuary.gallery.length}
                      </span>
                      <span className="text-white/30" aria-hidden="true">·</span>
                      <span>{activePhoto.roomTag}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#091518]/80 hover:bg-[#091518] border border-white/15 backdrop-blur-md text-xs text-white/85 hover:text-white transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspect Fullscreen</span>
                    </button>
                  </div>

                  {/* Prev / Next Image Controls */}
                  <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <button
                      type="button"
                      aria-label="Previous house photo"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? sanctuary.gallery.length - 1 : prev - 1
                        )
                      }
                      className="pointer-events-auto w-10 h-10 rounded-full bg-[#091518]/75 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/15 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next house photo"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === sanctuary.gallery.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="pointer-events-auto w-10 h-10 rounded-full bg-[#091518]/75 hover:bg-amber-400 text-white hover:text-slate-950 border border-white/15 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Photo Caption & Architectural Spec */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
                    <div className="space-y-1 max-w-xl">
                      <span className="text-xs text-amber-300/95 font-light tabular-nums">
                        {activePhoto.dimensions}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                        {activePhoto.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/75 font-light">
                        {activePhoto.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 4 Columns: Interactive Gallery of the Rest of the House Images */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-medium text-white/85">
                    Complete Residence Gallery ({sanctuary.gallery.length} Spaces)
                  </span>
                  <span className="text-[11px] text-white/50 font-light">
                    Select any space to inspect
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 flex-1">
                  {sanctuary.gallery.map((img, idx) => {
                    const isSelected = idx === activeImageIndex;
                    return (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative group flex items-center gap-3.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer overflow-hidden ${
                          isSelected
                            ? 'bg-white/[0.09] border-amber-400/80 shadow-sm'
                            : 'bg-[#0c1a1e]/75 border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div className="relative w-20 sm:w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-[#12262b]">
                          <img
                            src={img.url}
                            alt={img.title}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#091518]/60 to-transparent" />
                          <span className="absolute bottom-1 left-1.5 text-[10px] font-medium text-white/90 tabular-nums">
                            0{idx + 1}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <span
                            className={`block text-[10px] uppercase tracking-wider mb-0.5 ${
                              isSelected ? 'text-amber-300' : 'text-white/50'
                            }`}
                          >
                            {img.roomTag}
                          </span>
                          <h3 className="text-xs sm:text-sm font-normal text-white truncate">
                            {img.title}
                          </h3>
                          <p className="text-[11px] text-white/50 font-light truncate tabular-nums">
                            {img.dimensions}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* 2. Architectural Description, Specifications & Live Plan Calculator */}
          <section
            id="detail-description"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-8 border-t border-white/10"
          >
            {/* Left 7 Columns: Architectural Narrative & Specifications */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-5">
                <h2 className="text-3xl sm:text-4xl font-light tracking-[-0.02em] text-white">
                  Architectural Monograph & Wilderness Setting
                </h2>

                <p className="text-base text-amber-200/90 font-light leading-relaxed">
                  {sanctuary.shortDescription}
                </p>

                {sanctuary.architecturalNarrative.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-white/75 font-light leading-relaxed text-pretty"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Hairline Architectural Specifications Ledger */}
              <div className="rounded-3xl border border-white/15 bg-[#0c1a1e]/60 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-lg font-normal text-white">
                    Residence Technical Specifications
                  </h3>
                  <span className="text-xs text-amber-300 tabular-nums font-light">
                    Max {sanctuary.houseSpecs.maxGuests} Guests · {sanctuary.cabinsCount} Private Cabins
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 text-xs tabular-nums">
                  <div className="border-b border-white/10 pb-3.5">
                    <span className="block text-white/50 font-light mb-1">
                      Heated Interior Footprint
                    </span>
                    <span className="text-sm text-white font-normal">
                      {sanctuary.houseSpecs.interiorArea}
                    </span>
                  </div>
                  <div className="border-b border-white/10 pb-3.5">
                    <span className="block text-white/50 font-light mb-1">
                      Cantilevered Outdoor Deck
                    </span>
                    <span className="text-sm text-white font-normal">
                      {sanctuary.houseSpecs.deckArea}
                    </span>
                  </div>
                  <div className="border-b border-white/10 pb-3.5">
                    <span className="block text-white/50 font-light mb-1">
                      Sleeping Quarters
                    </span>
                    <span className="text-sm text-white font-normal">
                      {sanctuary.houseSpecs.bedrooms}
                    </span>
                  </div>
                  <div className="border-b border-white/10 pb-3.5">
                    <span className="block text-white/50 font-light mb-1">
                      Thermal & Bathing Spaces
                    </span>
                    <span className="text-sm text-white font-normal">
                      {sanctuary.houseSpecs.bathrooms}
                    </span>
                  </div>
                  <div className="border-b border-white/10 pb-3.5">
                    <span className="block text-white/50 font-light mb-1">
                      Hearth & Thermal Engineering
                    </span>
                    <span className="text-sm text-white font-normal">
                      {sanctuary.houseSpecs.heatingSystem}
                    </span>
                  </div>
                  <div className="border-b border-white/10 pb-3.5">
                    <span className="block text-white/50 font-light mb-1">
                      Structural Glazing & Acoustic Rating
                    </span>
                    <span className="text-sm text-white font-normal">
                      {sanctuary.houseSpecs.acousticIsolation}
                    </span>
                  </div>
                </div>

                {/* Sanctuary Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {sanctuary.highlights.map((item, idx) => (
                    <div key={idx} className="text-xs text-white/80 font-light leading-relaxed">
                      <span className="text-amber-400 font-medium block mb-1 tabular-nums">
                        0{idx + 1}.
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky Sanctuary Plan & Total Price Calculator */}
            <div id="plan-summary-card" className="lg:col-span-5 lg:sticky lg:top-28">
              <GlassCard className="p-6 sm:p-8 border-white/15 bg-[#091518]/90 backdrop-blur-2xl space-y-6">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-xs text-amber-300 font-light block mb-1">
                      Bespoke Stay & Ritual Plan
                    </span>
                    <h3 className="text-2xl font-light text-white">
                      {sanctuary.name}
                    </h3>
                  </div>
                  <div className="text-right tabular-nums">
                    <span className="text-2xl font-normal text-white">
                      ${sanctuary.priceFrom}
                    </span>
                    <span className="text-xs text-white/55 block">/night</span>
                  </div>
                </div>

                {/* Nights & Guests Interactive Controls */}
                <div className="grid grid-cols-2 gap-3 tabular-nums">
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <label className="text-[11px] text-white/55 font-light flex items-center gap-1.5 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Duration (Nights)</span>
                    </label>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setNights((n) => Math.max(1, n - 1))}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium text-white">
                        {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setNights((n) => Math.min(14, n + 1))}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <label className="text-[11px] text-white/55 font-light flex items-center gap-1.5 mb-2">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Guests</span>
                    </label>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium text-white">
                        {guests} {guests === 1 ? 'guest' : 'guests'}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setGuests((g) => Math.min(sanctuary.houseSpecs.maxGuests, g + 1))
                        }
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Itemized Price Breakdown */}
                <div className="space-y-3 pt-2 border-t border-white/10 text-xs tabular-nums">
                  <div className="flex items-center justify-between text-white/85">
                    <span>
                      Sanctuary Residence (${sanctuary.priceFrom} × {nights}{' '}
                      {nights === 1 ? 'night' : 'nights'})
                    </span>
                    <span className="font-medium text-white">
                      ${accommodationSubtotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Added Activities List */}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-white/55">
                      <span>Curated Nearby Activities in Plan</span>
                      <a
                        href="#detail-activities"
                        className="text-amber-300 hover:underline"
                      >
                        + Customize below
                      </a>
                    </div>

                    {selectedActivities.length === 0 ? (
                      <p className="text-[11px] text-white/45 italic py-1.5">
                        No extra activities selected yet. Add experiences below to include them in your plan.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {selectedActivities.map((act) => (
                          <div
                            key={act.id}
                            className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/25"
                          >
                            <div className="min-w-0">
                              <span className="block text-xs text-white truncate">
                                {act.title}
                              </span>
                              <span className="text-[10px] text-amber-300/85">
                                {act.duration} · {act.priceUnit}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-medium text-amber-300">
                                +${act.price}
                              </span>
                              <button
                                type="button"
                                title="Remove activity from plan"
                                onClick={() => toggleActivity(act.id)}
                                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {activitiesSubtotal > 0 && (
                    <div className="flex items-center justify-between text-amber-300/90 pt-1">
                      <span>Activities Subtotal ({selectedActivities.length})</span>
                      <span>+${activitiesSubtotal.toLocaleString()}</span>
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="pt-4 border-t border-white/15 flex items-baseline justify-between">
                    <div>
                      <span className="text-sm font-medium text-white block">
                        Total Sanctuary & Activity Plan
                      </span>
                      <span className="text-[11px] text-white/50 font-light">
                        Includes private arrival transfer & firewood prep
                      </span>
                    </div>
                    <span className="text-3xl font-light text-amber-300">
                      ${totalPlanPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {bookingConfirmed ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                      <Check className="w-4 h-4" />
                      <span>Sanctuary Plan Reserved in Your Itinerary</span>
                    </div>
                    <p className="text-xs text-white/75 font-light leading-relaxed">
                      {sanctuary.name} for {nights} nights ({guests} guests) with{' '}
                      {selectedActivities.length} curated experiences ($
                      {totalPlanPrice.toLocaleString()} total) is ready.
                    </p>
                  </div>
                ) : (
                  <Button
                    variant="solid"
                    onClick={handleConfirmPlan}
                    className="w-full py-3.5 text-xs font-semibold cursor-pointer"
                  >
                    Reserve Sanctuary & Plan (${totalPlanPrice.toLocaleString()})
                  </Button>
                )}
              </GlassCard>
            </div>
          </section>

          {/* 3. Curated Nearby Activities & Plan Customizer */}
          <section
            id="detail-activities"
            className="pt-12 border-t border-white/10 space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-light tracking-[-0.02em] text-white">
                  Nearby Experiences & Wilderness Rituals
                </h2>
                <p className="text-xs sm:text-sm text-white/70 font-light max-w-2xl">
                  Prepared by our local forest guides, alpine mountaineers, and hearth chefs around{' '}
                  <span className="text-white">{sanctuary.name}</span>. Add any experience below to include it in your stay plan and calculate your total rate automatically.
                </p>
              </div>

              <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#0c1a1e] border border-white/15 tabular-nums">
                <div>
                  <span className="block text-[10px] text-white/50 uppercase tracking-wider">
                    Added to Plan ({selectedActivities.length})
                  </span>
                  <span className="text-sm font-medium text-amber-300">
                    +${activitiesSubtotal.toLocaleString()} in experiences
                  </span>
                </div>
                <span className="text-white/20" aria-hidden="true">|</span>
                <div>
                  <span className="block text-[10px] text-white/50 uppercase tracking-wider">
                    New Total ({nights} Nights)
                  </span>
                  <span className="text-base font-medium text-white">
                    ${totalPlanPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sanctuary.activities.map((activity) => {
                const isAdded = selectedActivityIds.includes(activity.id);
                return (
                  <div
                    key={activity.id}
                    className={`group rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isAdded
                        ? 'bg-[#0d2227]/90 border-amber-400/70 shadow-lg'
                        : 'bg-[#091518]/75 border-white/15 hover:border-white/30'
                    }`}
                  >
                    <div>
                      {/* Activity Atmospheric Photo Header */}
                      <div className="relative h-56 w-full overflow-hidden bg-[#12262b]">
                        <img
                          src={activity.imageUrl}
                          alt={activity.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{
                            filter: 'saturate(0.82) contrast(1.05) brightness(0.82)',
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#091518] via-[#091518]/35 to-transparent" />

                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full bg-[#091518]/85 border border-white/15 backdrop-blur-md text-[11px] text-amber-300 font-medium">
                            {activity.category}
                          </span>

                          <div className="px-3.5 py-1 rounded-full bg-[#091518]/90 border border-white/15 backdrop-blur-md text-xs font-medium text-white tabular-nums">
                            +${activity.price}{' '}
                            <span className="text-[10px] text-white/60 font-light">
                              {activity.priceUnit}
                            </span>
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-5 right-5">
                          <div className="flex items-center gap-3 text-[11px] text-white/75 tabular-nums mb-1 font-light">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-400" />
                              {activity.duration}
                            </span>
                            <span className="text-white/35" aria-hidden="true">·</span>
                            <span>{activity.schedule}</span>
                            <span className="text-white/35" aria-hidden="true">·</span>
                            <span>{activity.difficulty}</span>
                          </div>
                          <h3 className="text-xl font-normal text-white tracking-tight">
                            {activity.title}
                          </h3>
                        </div>
                      </div>

                      {/* Activity Description & Gear */}
                      <div className="p-6 space-y-4">
                        <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                          {activity.description}
                        </p>
                        <div className="pt-3 border-t border-white/10 text-xs text-white/60 font-light">
                          <span className="text-white/85 font-normal">Included: </span>
                          {activity.includedEquipment}
                        </div>
                      </div>
                    </div>

                    {/* Add / Remove from Plan Footer */}
                    <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-4">
                      <div className="tabular-nums">
                        <span className="block text-[10px] text-white/50">
                          Plan Contribution
                        </span>
                        <span className="text-base font-medium text-white">
                          +${activity.price}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleActivity(activity.id)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-amber-400 text-slate-950 shadow-sm'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Plan (+${activity.price})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-amber-400" />
                            <span>Add to Plan (+${activity.price})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. Interactive Google Maps Territory & Live Nearby Points of Interest */}
          <section id="detail-map" className="pt-12 border-t border-white/10">
            <SanctuaryNearbyMap sanctuary={sanctuary} />
          </section>

          {/* 5. Guest Ratings & Verified Commentaries */}
          <section
            id="detail-reviews"
            className="pt-12 border-t border-white/10 space-y-10"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-light tracking-[-0.02em] text-white">
                  Guest Evaluations & Verified Journals
                </h2>
                <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl">
                  Reflections from architects, naturalists, and travelers who have stayed at{' '}
                  <span className="text-white">{sanctuary.name}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs font-medium text-white transition-colors self-start lg:self-end cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
                <span>{showReviewForm ? 'Close Review Form' : 'Share Your Stay Experience'}</span>
              </button>
            </div>

            {/* Rating Breakdown Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#0c1a1e]/70 tabular-nums items-center">
              <div className="lg:col-span-4 flex items-center gap-5 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
                <div className="text-5xl sm:text-6xl font-light text-white tracking-tight">
                  {sanctuary.ratingSummary.overall.toFixed(2)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/85 font-normal">
                    Verified Sanctuary Standard
                  </p>
                  <p className="text-[11px] text-white/50 font-light">
                    Based on {allReviews.length} verified stays
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  {
                    label: 'Architectural Craft',
                    score: sanctuary.ratingSummary.architecturalCraft,
                  },
                  {
                    label: 'Acoustic Privacy',
                    score: sanctuary.ratingSummary.acousticPrivacy,
                  },
                  {
                    label: 'Wilderness Access',
                    score: sanctuary.ratingSummary.wildernessAccess,
                  },
                  {
                    label: 'Host Concierge',
                    score: sanctuary.ratingSummary.conciergeService,
                  },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/65 font-light">{metric.label}</span>
                      <span className="text-white font-medium">
                        {metric.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${(metric.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Add Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleAddReview}
                className="p-6 sm:p-8 rounded-3xl border border-amber-400/35 bg-[#0c1a1e]/90 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-normal text-white">
                    Log a Guest Entry for {sanctuary.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= newReviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-white/30'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g., Sofia & Liam)"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-[#091518] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="City / Country (e.g., Madrid, Spain)"
                    value={newReviewOrigin}
                    onChange={(e) => setNewReviewOrigin(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-[#091518] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Headline summary"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-[#091518] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <textarea
                  rows={3}
                  required
                  placeholder="Describe the cabin architecture, acoustic stillness, and any nearby activities you experienced..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#091518] border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400"
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 rounded-full text-xs text-white/65 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button variant="solid" type="submit" className="text-xs font-semibold">
                    Publish Guest Review
                  </Button>
                </div>
              </form>
            )}

            {/* Verified Guest Reviews List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 sm:p-7 rounded-3xl border border-white/15 bg-[#091518]/80 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 tabular-nums">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                        <span className="text-xs text-white font-medium ml-1">
                          {rev.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-[11px] text-white/45 font-light">
                        {rev.stayDate} · {rev.nightsStayed} nights
                      </span>
                    </div>

                    <h3 className="text-base font-normal text-white leading-snug">
                      “{rev.title}”
                    </h3>

                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    {rev.activitiesBooked.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {rev.activitiesBooked.map((actName, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-[10px] text-amber-300/90 font-light"
                          >
                            + {actName}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-medium text-white block">
                          {rev.guestName}
                        </span>
                        <span className="text-[11px] text-white/50 font-light">
                          {rev.guestOrigin}
                        </span>
                      </div>
                      <span className="text-[11px] text-emerald-300/90 inline-flex items-center gap-1 font-light">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Stay
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Other Woodnest Sanctuaries Switcher Footer Band */}
          <section className="pt-12 border-t border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-light text-white">
                Explore Other Woodnest Reserves
              </h3>
              <button
                type="button"
                onClick={handleBackNavigation}
                className="text-xs text-amber-300 hover:underline cursor-pointer"
              >
                Return to Main Landing Page →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DETAILED_SANCTUARIES.map((item) => {
                const isCurrent = item.id === sanctuary.id;
                return (
                  <Link
                    key={item.id}
                    to={`/location/${item.id}/detail`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwitchLocation(item.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer block ${
                      isCurrent
                        ? 'bg-amber-400/15 border-amber-400/60'
                        : 'bg-[#0c1a1e]/60 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <span className="text-[10px] text-white/50 uppercase tracking-wider block mb-1">
                      {item.country}
                    </span>
                    <span className="text-sm font-medium text-white block mb-1">
                      {item.name}
                    </span>
                    <span className="text-xs text-amber-300 tabular-nums">
                      ${item.priceFrom}/night · /location/{item.id}/detail
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Fullscreen Lightbox Modal for House Images */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#091518]/95 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-10"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-white/80 tabular-nums">
                <span className="text-amber-400 font-medium">
                  0{activeImageIndex + 1} / 0{sanctuary.gallery.length}
                </span>
                <span className="mx-2 text-white/30">·</span>
                <span>{activePhoto.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 my-6 flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain rounded-2xl border border-white/15"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-white/75 font-light">
                {activePhoto.caption}
              </p>
              <div className="flex items-center gap-2">
                {sanctuary.gallery.map((g, idx) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-8 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      idx === activeImageIndex
                        ? 'border-amber-400 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={g.url}
                      alt={g.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
