import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Calendar as CalendarIcon, Maximize2, ChevronLeft, ChevronRight, X, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { BookingDetails } from '../../types';

const INITIAL_BOOKING_DATA: BookingDetails = {
  title: 'Evergreen',
  subtitle: 'Pine Family Lodge',
  dateFrom: '',
  dateTo: '',
  checkIn: 'After 2:00 PM',
  checkOut: 'Until 12:00 PM',
  pricePerNight: 359,
  guestsRange: '2–5 guests',
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function normalizeDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  const result = normalizeDate(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDateShort(date: Date, referenceYear?: number): string {
  const base = `${MONTH_ABBR[date.getMonth()]} ${date.getDate()}`;
  if (referenceYear !== undefined && date.getFullYear() !== referenceYear) {
    return `${base}, '${String(date.getFullYear()).slice(-2)}`;
  }
  return base;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isBetweenDays(date: Date, start: Date, end: Date): boolean {
  const d = normalizeDate(date).getTime();
  const s = normalizeDate(start).getTime();
  const e = normalizeDate(end).getTime();
  return d > s && d < e;
}

interface BookingWidgetProps {
  title?: string;
  subtitle?: string;
  pricePerNight?: number;
  guestsRange?: string;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  title = INITIAL_BOOKING_DATA.title,
  subtitle = INITIAL_BOOKING_DATA.subtitle,
  pricePerNight = INITIAL_BOOKING_DATA.pricePerNight,
  guestsRange = INITIAL_BOOKING_DATA.guestsRange,
}) => {
  // Normalized "today" (00:00:00) and "maxStartDate" (today + 1 year)
  const today = useMemo(() => normalizeDate(new Date()), []);
  const maxStartDate = useMemo(() => {
    const d = normalizeDate(today);
    d.setFullYear(d.getFullYear() + 1);
    return d;
  }, [today]);

  // Max end date allows checking out up to 14 days after maxStartDate
  const maxEndDate = useMemo(() => addDays(maxStartDate, 14), [maxStartDate]);

  // Default valid dates starting today and 3 nights later
  const [startDate, setStartDate] = useState<Date>(() => today);
  const [endDate, setEndDate] = useState<Date>(() => addDays(today, 3));

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectingTarget, setSelectingTarget] = useState<'from' | 'to'>('from');
  const [currentViewDate, setCurrentViewDate] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [reservedConfirmed, setReservedConfirmed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
        setValidationMessage(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsCalendarOpen(false);
        setValidationMessage(null);
      }
    }
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCalendarOpen]);

  // Calendar month view calculations
  const viewYear = currentViewDate.getFullYear();
  const viewMonth = currentViewDate.getMonth();

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const activeMaxDate = selectingTarget === 'from' ? maxStartDate : maxEndDate;

  const canGoPrevMonth =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const canGoNextMonth =
    viewYear < activeMaxDate.getFullYear() ||
    (viewYear === activeMaxDate.getFullYear() && viewMonth < activeMaxDate.getMonth());

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canGoPrevMonth) return;
    setCurrentViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canGoNextMonth) return;
    setCurrentViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const isDateDisabled = (cellDate: Date): boolean => {
    const time = normalizeDate(cellDate).getTime();
    const todayTime = today.getTime();

    // Rule 1: Neither initial nor final date can be earlier than today
    if (time < todayTime) {
      return true;
    }

    if (selectingTarget === 'from') {
      // Rule 2: Initial date must be at most 1 year from today
      if (time > maxStartDate.getTime()) {
        return true;
      }
    } else {
      // Rule 3: Initial date cannot be greater than final date (final date must be >= startDate)
      if (time < startDate.getTime()) {
        return true;
      }
      if (time > maxEndDate.getTime()) {
        return true;
      }
    }

    return false;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = normalizeDate(new Date(viewYear, viewMonth, day));

    if (clickedDate.getTime() < today.getTime()) {
      setValidationMessage('La fecha no puede ser anterior al día de hoy.');
      return;
    }

    if (selectingTarget === 'from') {
      if (clickedDate.getTime() > maxStartDate.getTime()) {
        setValidationMessage('La fecha inicial debe ser máximo dentro de 1 año.');
        return;
      }

      setStartDate(clickedDate);

      // Ensure startDate is never greater than endDate
      if (clickedDate.getTime() > endDate.getTime()) {
        const adjustedEnd = addDays(clickedDate, 1);
        setEndDate(adjustedEnd);
        setValidationMessage('La fecha final se ajustó para no ser menor que la inicial.');
      } else {
        setValidationMessage(null);
      }

      setSelectingTarget('to');
    } else {
      // selectingTarget === 'to'
      if (clickedDate.getTime() < startDate.getTime()) {
        setValidationMessage('La fecha final no puede ser menor que la fecha inicial.');
        return;
      }
      if (clickedDate.getTime() > maxEndDate.getTime()) {
        setValidationMessage('La fecha seleccionada excede el límite permitido.');
        return;
      }

      setEndDate(clickedDate);
      setValidationMessage(null);
      setSelectingTarget('from');
    }
  };

  const calculateNights = () => {
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  return (
    <div id="hero-booking" ref={containerRef} className="relative w-full max-w-[330px] md:mb-8">
      <GlassCard className="w-full backdrop-blur-2xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-normal leading-snug text-white">
              {title}
            </h2>
            <p className="text-lg font-normal leading-snug text-white">
              {subtitle}
            </p>
          </div>
          <Button
            variant="icon"
            aria-label="Expand calendar details"
            onClick={() => {
              setIsCalendarOpen((prev) => !prev);
              setValidationMessage(null);
            }}
            className={isCalendarOpen ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : ''}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Date Options Element - Focus Mode Target with Downward Calendar Anchor */}
        <div
          role="group"
          aria-label="Select booking dates"
          className={`relative grid grid-cols-2 rounded-xl p-2 mb-3 transition-all duration-200 select-none ${
            isCalendarOpen
              ? 'bg-white/15 border border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.22)] ring-1 ring-amber-400/40'
              : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25'
          }`}
        >
          {/* Check-in (Fecha Inicial) Option */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectingTarget('from');
              setValidationMessage(null);
              setIsCalendarOpen(true);
              setCurrentViewDate(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
            }}
            className={`flex items-center gap-2 border-r border-white/10 pr-2 py-1 px-2 rounded-lg transition-all text-left cursor-pointer ${
              isCalendarOpen && selectingTarget === 'from'
                ? 'bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/50 shadow-sm'
                : 'hover:bg-white/5'
            }`}
          >
            <CalendarIcon
              className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                isCalendarOpen && selectingTarget === 'from'
                  ? 'text-amber-400'
                  : 'text-white/60'
              }`}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-white/50 leading-none mb-0.5">
                Check-in
              </span>
              <span className="text-xs font-medium text-white/95 truncate">
                {formatDateShort(startDate, today.getFullYear())}
              </span>
            </div>
          </button>

          {/* Check-out (Fecha Final) Option */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectingTarget('to');
              setValidationMessage(null);
              setIsCalendarOpen(true);
              setCurrentViewDate(new Date(endDate.getFullYear(), endDate.getMonth(), 1));
            }}
            className={`flex items-center gap-2 pl-2.5 py-1 px-2 rounded-lg transition-all text-left cursor-pointer ${
              isCalendarOpen && selectingTarget === 'to'
                ? 'bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/50 shadow-sm'
                : 'hover:bg-white/5'
            }`}
          >
            <CalendarIcon
              className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                isCalendarOpen && selectingTarget === 'to'
                  ? 'text-amber-400'
                  : 'text-white/60'
              }`}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] uppercase tracking-wider text-white/50 leading-none mb-0.5">
                Check-out
              </span>
              <span className="text-xs font-medium text-white/95 truncate">
                {formatDateShort(endDate, today.getFullYear())}
              </span>
            </div>
          </button>

          {/* Downward-Opening Interactive Calendar Popover */}
          <AnimatePresence>
            {isCalendarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-[calc(100%+6px)] -left-2 -right-2 z-50 rounded-2xl bg-[#091518]/98 backdrop-blur-2xl border border-amber-400/40 shadow-[0_16px_40px_rgba(0,0,0,0.85)] p-2.5 text-white cursor-default"
              >
                {/* Visual Pointer Arrow aligned with active date field */}
                <div
                  className={`absolute -top-1.5 w-3 h-3 rotate-45 bg-[#091518] border-l border-t border-amber-400/40 transition-all duration-200 ${
                    selectingTarget === 'from' ? 'left-12' : 'left-[calc(50%+36px)]'
                  }`}
                />

                {/* Field Mode Switcher Tabs inside Calendar */}
                <div className="grid grid-cols-2 gap-1 bg-white/5 p-1 rounded-lg mb-1.5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectingTarget('from');
                      setValidationMessage(null);
                      setCurrentViewDate(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
                    }}
                    className={`py-1 px-2 rounded-md text-[10px] font-medium transition-all flex items-center justify-between gap-1 whitespace-nowrap cursor-pointer ${
                      selectingTarget === 'from'
                        ? 'bg-amber-400 text-black shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">Inicial (Check-in)</span>
                    <span className="font-semibold tabular-nums shrink-0">{formatDateShort(startDate)}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectingTarget('to');
                      setValidationMessage(null);
                      setCurrentViewDate(new Date(endDate.getFullYear(), endDate.getMonth(), 1));
                    }}
                    className={`py-1 px-2 rounded-md text-[10px] font-medium transition-all flex items-center justify-between gap-1 whitespace-nowrap cursor-pointer ${
                      selectingTarget === 'to'
                        ? 'bg-amber-400 text-black shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">Final (Check-out)</span>
                    <span className="font-semibold tabular-nums shrink-0">{formatDateShort(endDate)}</span>
                  </button>
                </div>

                {/* Header: Month / Year with Navigation & Close */}
                <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-white/10">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    disabled={!canGoPrevMonth}
                    aria-label="Previous month"
                    className={`w-5 h-5 flex items-center justify-center rounded-md transition-colors ${
                      canGoPrevMonth
                        ? 'hover:bg-white/10 text-white/80 hover:text-white cursor-pointer'
                        : 'text-white/20 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-[11px] font-semibold tracking-wide text-white">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </div>

                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      disabled={!canGoNextMonth}
                      aria-label="Next month"
                      className={`w-5 h-5 flex items-center justify-center rounded-md transition-colors ${
                        canGoNextMonth
                          ? 'hover:bg-white/10 text-white/80 hover:text-white cursor-pointer'
                          : 'text-white/20 cursor-not-allowed'
                      }`}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCalendarOpen(false);
                        setValidationMessage(null);
                      }}
                      aria-label="Close calendar"
                      className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors ml-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-0.5 text-center mb-0.5 text-[9px] text-white/45 font-medium">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className="leading-4">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-0.5 text-center tabular-nums">
                  {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-5 w-full" />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const cellDate = normalizeDate(new Date(viewYear, viewMonth, day));
                    const disabled = isDateDisabled(cellDate);
                    const isStart = isSameDay(cellDate, startDate);
                    const isEnd = isSameDay(cellDate, endDate);
                    const isToday = isSameDay(cellDate, today);
                    const isInRange = isBetweenDays(cellDate, startDate, endDate);
                    const isHoveredRange =
                      !disabled &&
                      hoveredDate &&
                      selectingTarget === 'to' &&
                      cellDate > startDate &&
                      cellDate <= hoveredDate;

                    let cellClass =
                      'h-5 w-full text-[10px] rounded-md flex items-center justify-center transition-all select-none relative ';

                    if (disabled) {
                      cellClass += 'text-white/20 cursor-not-allowed line-through decoration-white/20';
                    } else if (isStart || isEnd) {
                      cellClass += 'bg-amber-400 text-black font-semibold shadow-sm cursor-pointer';
                    } else if (isInRange || isHoveredRange) {
                      cellClass += 'bg-amber-400/20 text-amber-200 font-medium rounded-none cursor-pointer';
                    } else {
                      cellClass += 'text-white/85 hover:bg-white/15 hover:text-white cursor-pointer';
                    }

                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleDateClick(day)}
                        onMouseEnter={() => !disabled && setHoveredDate(cellDate)}
                        onMouseLeave={() => setHoveredDate(null)}
                        className={cellClass}
                      >
                        {day}
                        {isToday && !isStart && !isEnd && (
                          <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-amber-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Validation feedback or active rule info */}
                <div className="mt-1.5 pt-1.5 border-t border-white/10">
                  {validationMessage ? (
                    <div className="flex items-center gap-1.5 text-[9.5px] text-amber-300 bg-amber-400/10 border border-amber-400/30 rounded-lg px-2 py-1 mb-1.5">
                      <AlertCircle className="w-3 h-3 flex-shrink-0 text-amber-400" />
                      <span>{validationMessage}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[9.5px] text-white/45 mb-1 px-0.5 tabular-nums">
                      <span>
                        {selectingTarget === 'from'
                          ? `Permitido: Hoy (${formatDateShort(today)}) – ${formatDateShort(maxStartDate, today.getFullYear())}`
                          : `Mínimo: ${formatDateShort(startDate, today.getFullYear())}`}
                      </span>
                      <span className="text-amber-300/90 font-medium">
                        {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                    </div>
                  )}

                  {/* Footer with Summary & Confirm */}
                  <div className="flex items-center justify-between tabular-nums">
                    <div className="text-[10.5px] text-white/80 font-medium">
                      {formatDateShort(startDate, today.getFullYear())} → {formatDateShort(endDate, today.getFullYear())}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCalendarOpen(false);
                        setValidationMessage(null);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold text-[10.5px] transition-colors shadow-sm cursor-pointer"
                    >
                      <Check className="w-3 h-3" />
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
          <div className="border-r border-white/10 pr-2">
            <span className="block text-[10px] text-white/50">Check-in</span>
            <span className="text-xs text-white/90 font-light">{INITIAL_BOOKING_DATA.checkIn}</span>
          </div>
          <div className="pl-3">
            <span className="block text-[10px] text-white/50">Check-out</span>
            <span className="text-xs text-white/90 font-light">{INITIAL_BOOKING_DATA.checkOut}</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between mb-4 tabular-nums">
          <div>
            <span className="text-2xl font-normal text-white">${pricePerNight}</span>
            <span className="text-xs text-white/60">/night</span>
            <span className="block text-[11px] text-amber-300/80 font-light mt-0.5">
              {nights} night{nights > 1 ? 's' : ''} · ${nights * pricePerNight} total
            </span>
          </div>
          <span className="text-xs text-white/70 font-light">{guestsRange}</span>
        </div>

        <Button
          variant="solid"
          onClick={() => {
            setReservedConfirmed(true);
            setTimeout(() => setReservedConfirmed(false), 3500);
          }}
          className={`w-full py-3 text-xs font-semibold cursor-pointer ${
            reservedConfirmed ? 'bg-amber-400 text-slate-950 hover:bg-amber-300' : ''
          }`}
        >
          {reservedConfirmed
            ? `Reserved ${title} (${formatDateShort(startDate)} – ${formatDateShort(endDate)})`
            : `Reserve · $${nights * pricePerNight}`}
        </Button>
      </GlassCard>
    </div>
  );
};