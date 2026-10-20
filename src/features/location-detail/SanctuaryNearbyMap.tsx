/// <reference types="vite/client" />
import React, { useState, useEffect, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  Compass,
  MapPin,
  Star,
  Navigation,
  ExternalLink,
  Trees,
  Utensils,
  Sparkles,
  Train,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { DetailedSanctuary } from '../../data/sanctuariesData';

const GOOGLE_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

type NearbyCategoryKey = 'outdoors' | 'dining' | 'landmarks' | 'transit';

interface CategoryConfig {
  key: NearbyCategoryKey;
  label: string;
  includedTypes: string[];
  radiusMeters: number;
  pinColor: string;
  pinBorder: string;
  icon: React.FC<{ className?: string }>;
}

const NEARBY_CATEGORIES: CategoryConfig[] = [
  {
    key: 'outdoors',
    label: 'Nature & Trailheads',
    includedTypes: ['park', 'national_park', 'hiking_area'],
    radiusMeters: 25000,
    pinColor: '#10b981',
    pinBorder: '#047857',
    icon: Trees,
  },
  {
    key: 'dining',
    label: 'Local Dining & Cafés',
    includedTypes: ['restaurant', 'cafe', 'bakery'],
    radiusMeters: 18000,
    pinColor: '#f59e0b',
    pinBorder: '#b45309',
    icon: Utensils,
  },
  {
    key: 'landmarks',
    label: 'Scenic Points & Culture',
    includedTypes: ['tourist_attraction', 'museum', 'visitor_center'],
    radiusMeters: 25000,
    pinColor: '#38bdf8',
    pinBorder: '#0369a1',
    icon: Sparkles,
  },
  {
    key: 'transit',
    label: 'Harbors, Stations & Access',
    includedTypes: ['train_station', 'ferry_terminal', 'airport', 'transit_station'],
    radiusMeters: 30000,
    pinColor: '#a78bfa',
    pinBorder: '#6d28d9',
    icon: Train,
  },
];

interface LiveNearbyPlace {
  id: string;
  displayName: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
  rating?: number;
  userRatingCount?: number;
  primaryTypeDisplayName?: string;
  googleMapsURI?: string;
  distanceKm?: number;
}

interface NearbyPlacesControllerProps {
  sanctuary: DetailedSanctuary;
  activeCategory: CategoryConfig;
  onPlacesLoaded: (places: LiveNearbyPlace[]) => void;
  onLoadingChange: (loading: boolean) => void;
  onErrorChange: (error: string | null) => void;
  selectedPlaceId: string | null;
}

const NearbyPlacesController: React.FC<NearbyPlacesControllerProps> = ({
  sanctuary,
  activeCategory,
  onPlacesLoaded,
  onLoadingChange,
  onErrorChange,
  selectedPlaceId,
}) => {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const geometryLib = useMapsLibrary('geometry');

  // Recenter map when sanctuary changes
  useEffect(() => {
    if (!map) return;
    map.panTo(sanctuary.center);
    map.setZoom(11);
  }, [map, sanctuary.center]);

  // Fetch real nearby places using Places API (New) Place.searchNearby
  // Reference: https://developers.google.com/maps/documentation/javascript/place-search?utm_campaign=gmp_mcp_codeassist_v1_aistudio
  useEffect(() => {
    if (!placesLib) return;

    let isCancelled = false;

    const fetchNearby = async () => {
      onLoadingChange(true);
      onErrorChange(null);

      try {
        const PlaceClass = (placesLib as unknown as {
          Place: {
            searchNearby: (req: Record<string, unknown>) => Promise<{ places?: any[] }>;
          };
        }).Place;

        if (!PlaceClass || typeof PlaceClass.searchNearby !== 'function') {
          throw new Error('Places API (New) searchNearby is unavailable.');
        }

        const request = {
          fields: [
            'id',
            'displayName',
            'location',
            'formattedAddress',
            'rating',
            'userRatingCount',
            'primaryTypeDisplayName',
            'googleMapsURI',
          ],
          locationRestriction: {
            center: sanctuary.center,
            radius: activeCategory.radiusMeters,
          },
          includedTypes: activeCategory.includedTypes,
          maxResultCount: 10,
          internalUsageAttributionIds: ['gmp_mcp_codeassist_v1_aistudio'],
        };

        const response = await PlaceClass.searchNearby(request);
        if (isCancelled) return;

        const rawPlaces = response?.places ?? [];
        const mapped: LiveNearbyPlace[] = rawPlaces
          .map((p: any) => {
            const loc = p.location;
            if (!loc) return null;
            const lat = typeof loc.lat === 'function' ? loc.lat() : Number(loc.lat);
            const lng = typeof loc.lng === 'function' ? loc.lng() : Number(loc.lng);

            let distanceKm: number | undefined;
            if (geometryLib?.spherical) {
              const meters = geometryLib.spherical.computeDistanceBetween(
                sanctuary.center,
                { lat, lng }
              );
              distanceKm = Math.round((meters / 1000) * 10) / 10;
            }

            return {
              id: String(p.id || `${lat}-${lng}`),
              displayName: String(p.displayName || 'Unnamed Place'),
              formattedAddress: String(p.formattedAddress || ''),
              location: { lat, lng },
              rating: typeof p.rating === 'number' ? p.rating : undefined,
              userRatingCount:
                typeof p.userRatingCount === 'number' ? p.userRatingCount : undefined,
              primaryTypeDisplayName: p.primaryTypeDisplayName
                ? String(p.primaryTypeDisplayName)
                : undefined,
              googleMapsURI: p.googleMapsURI ? String(p.googleMapsURI) : undefined,
              distanceKm,
            };
          })
          .filter(Boolean) as LiveNearbyPlace[];

        onPlacesLoaded(mapped);
      } catch (err) {
        if (isCancelled) return;
        console.error('Nearby search error:', err);
        onErrorChange(
          'Unable to load nearby places from Google Maps Places API. Verify that Places API (New) is enabled on your Google Cloud project.'
        );
        onPlacesLoaded([]);
      } finally {
        if (!isCancelled) {
          onLoadingChange(false);
        }
      }
    };

    fetchNearby();

    return () => {
      isCancelled = true;
    };
  }, [placesLib, geometryLib, sanctuary, activeCategory, onPlacesLoaded, onLoadingChange, onErrorChange]);

  // Pan to selected place when chosen from sidebar
  useEffect(() => {
    if (!map || !selectedPlaceId) return;
  }, [map, selectedPlaceId]);

  return null;
};

interface SanctuaryNearbyMapProps {
  sanctuary: DetailedSanctuary;
}

export const SanctuaryNearbyMap: React.FC<SanctuaryNearbyMapProps> = ({ sanctuary }) => {
  const [activeCategoryKey, setActiveCategoryKey] = useState<NearbyCategoryKey>('outdoors');
  const [places, setPlaces] = useState<LiveNearbyPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<LiveNearbyPlace | null>(null);
  const [showSanctuaryInfo, setShowSanctuaryInfo] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeCategory =
    NEARBY_CATEGORIES.find((c) => c.key === activeCategoryKey) || NEARBY_CATEGORIES[0];

  const handlePlacesLoaded = useCallback((loaded: LiveNearbyPlace[]) => {
    setPlaces(loaded);
    setSelectedPlace(null);
  }, []);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="rounded-3xl border border-white/15 bg-[#091518]/80 p-8 text-center">
        <AlertCircle className="w-6 h-6 text-amber-400 mx-auto mb-3" />
        <p className="text-sm text-white/80 font-light">
          Google Maps API key is not configured in <code className="text-amber-300">VITE_GOOGLE_MAPS_API_KEY</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/15 bg-[#091518]/80 backdrop-blur-2xl overflow-hidden">
      {/* Top Map Header & Live Category Filter Bar */}
      <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-amber-300/90 tabular-nums font-light">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>{sanctuary.coordinates}</span>
            <span className="text-white/30" aria-hidden="true">·</span>
            <span>{sanctuary.elevation} ASL</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-light tracking-[-0.02em] text-white">
            Surrounding Territory & Points of Interest
          </h3>
          <p className="text-xs sm:text-sm text-white/65 font-light max-w-xl">
            Explore real-time trailheads, regional dining, cultural landmarks, and arrival stations surrounding{' '}
            <span className="text-white/90">{sanctuary.name}</span> via Google Maps Platform.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter nearby places on Google Maps"
          className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#0c1a1e] border border-white/10"
        >
          {NEARBY_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.key === activeCategoryKey;
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategoryKey(cat.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map + Live Nearby Places Split Grid */}
      <APIProvider
        apiKey={GOOGLE_MAPS_API_KEY}
        libraries={['places', 'marker', 'geometry']}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Interactive Google Map Canvas (8 Columns) — Explicit Height per CF2 */}
          <div className="lg:col-span-8 relative h-[440px] sm:h-[500px] w-full bg-[#0c1a1e]">
            <Map
              defaultCenter={sanctuary.center}
              defaultZoom={11}
              mapId="DEMO_MAP_ID"
              gestureHandling="cooperative"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                setSelectedPlace(null);
                setShowSanctuaryInfo(false);
              }}
            >
              <NearbyPlacesController
                sanctuary={sanctuary}
                activeCategory={activeCategory}
                onPlacesLoaded={handlePlacesLoaded}
                onLoadingChange={setIsLoading}
                onErrorChange={setErrorMsg}
                selectedPlaceId={selectedPlace?.id || null}
              />

              {/* Primary Sanctuary Residence Marker */}
              <AdvancedMarker
                position={sanctuary.center}
                title={sanctuary.name}
                onClick={() => {
                  setSelectedPlace(null);
                  setShowSanctuaryInfo(true);
                }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-11 h-11 rounded-full bg-amber-400/35 animate-ping" />
                  <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#091518] border-2 border-amber-400 text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                      {sanctuary.name.split(' ')[0]} Sanctuary
                    </span>
                  </div>
                </div>
              </AdvancedMarker>

              {/* Sanctuary InfoWindow */}
              {showSanctuaryInfo && !selectedPlace && (
                <InfoWindow
                  position={sanctuary.center}
                  pixelOffset={[0, -24]}
                  onCloseClick={() => setShowSanctuaryInfo(false)}
                >
                  <div className="text-slate-900 p-1 max-w-[230px]">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 mb-0.5">
                      Woodnest Sanctuary Reserve
                    </p>
                    <h4 className="text-sm font-semibold text-slate-950 mb-1">
                      {sanctuary.name}
                    </h4>
                    <p className="text-xs text-slate-600 mb-1.5">
                      {sanctuary.country} · {sanctuary.elevation}
                    </p>
                    <p className="text-[11px] text-slate-500 tabular-nums">
                      {sanctuary.nearestTown}
                    </p>
                  </div>
                </InfoWindow>
              )}

              {/* Live Nearby Places Markers from Google Maps Places API (New) */}
              {places.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <AdvancedMarker
                    key={place.id}
                    position={place.location}
                    title={place.displayName}
                    onClick={() => {
                      setShowSanctuaryInfo(false);
                      setSelectedPlace(place);
                    }}
                  >
                    <Pin
                      background={isSelected ? '#fbbf24' : activeCategory.pinColor}
                      borderColor={isSelected ? '#78350f' : activeCategory.pinBorder}
                      glyphColor="#091518"
                      scale={isSelected ? 1.25 : 1.0}
                    />
                  </AdvancedMarker>
                );
              })}

              {/* Selected Nearby Place InfoWindow */}
              {selectedPlace && (
                <InfoWindow
                  position={selectedPlace.location}
                  pixelOffset={[0, -34]}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div className="text-slate-900 p-1 max-w-[240px]">
                    {selectedPlace.primaryTypeDisplayName && (
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-700 mb-0.5">
                        {selectedPlace.primaryTypeDisplayName}
                      </p>
                    )}
                    <h4 className="text-sm font-semibold text-slate-950 mb-1">
                      {selectedPlace.displayName}
                    </h4>
                    {selectedPlace.formattedAddress && (
                      <p className="text-xs text-slate-600 mb-1.5 leading-snug">
                        {selectedPlace.formattedAddress}
                      </p>
                    )}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-700 pt-1 border-t border-slate-200">
                      {selectedPlace.rating ? (
                        <span className="inline-flex items-center gap-1 font-medium">
                          ★ {selectedPlace.rating.toFixed(1)}
                          {selectedPlace.userRatingCount
                            ? ` (${selectedPlace.userRatingCount})`
                            : ''}
                        </span>
                      ) : (
                        <span className="text-slate-400">Verified POI</span>
                      )}
                      {selectedPlace.distanceKm !== undefined && (
                        <span className="text-slate-500 tabular-nums">
                          {selectedPlace.distanceKm} km away
                        </span>
                      )}
                    </div>
                    {selectedPlace.googleMapsURI && (
                      <a
                        href={selectedPlace.googleMapsURI}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-teal-800 hover:underline"
                      >
                        View on Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </InfoWindow>
              )}
            </Map>

            {/* Floating Telemetry Pill on Map */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#091518]/90 border border-white/15 backdrop-blur-md text-xs text-white/85 tabular-nums">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>{sanctuary.nearestTown}</span>
            </div>
          </div>

          {/* Right 4 Columns: Live Places Directory from Google Maps API */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#091518]/90 flex flex-col justify-between h-[440px] sm:h-[500px]">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">
                  Nearby {activeCategory.label}
                </h4>
                <p className="text-[11px] text-white/55 font-light tabular-nums">
                  Within {activeCategory.radiusMeters / 1000} km radius · Live Google Places
                </p>
              </div>
              {isLoading && (
                <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
              )}
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-white/10 px-5">
              {errorMsg ? (
                <div className="py-10 text-center space-y-2">
                  <AlertCircle className="w-5 h-5 text-amber-400 mx-auto" />
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {errorMsg}
                  </p>
                </div>
              ) : isLoading && places.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Loader2 className="w-5 h-5 text-amber-400 animate-spin mx-auto" />
                  <p className="text-xs text-white/60 font-light">
                    Scanning surrounding region via Google Maps Places API...
                  </p>
                </div>
              ) : places.length === 0 ? (
                <div className="py-12 text-center space-y-1.5">
                  <MapPin className="w-5 h-5 text-white/40 mx-auto" />
                  <p className="text-xs text-white/70 font-light">
                    True remote wilderness — no commercial POIs found in this category within {activeCategory.radiusMeters / 1000} km.
                  </p>
                  <p className="text-[11px] text-white/45 font-light">
                    Try switching to another category tab above.
                  </p>
                </div>
              ) : (
                places.map((place) => {
                  const isSelected = selectedPlace?.id === place.id;
                  return (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => {
                        setShowSanctuaryInfo(false);
                        setSelectedPlace(place);
                      }}
                      className={`w-full text-left py-3.5 px-3 -mx-3 rounded-xl transition-colors cursor-pointer ${
                        isSelected ? 'bg-amber-400/15' : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h5
                          className={`text-xs font-medium leading-snug ${
                            isSelected ? 'text-amber-300' : 'text-white/90'
                          }`}
                        >
                          {place.displayName}
                        </h5>
                        {place.distanceKm !== undefined && (
                          <span className="text-[11px] text-amber-300/90 tabular-nums shrink-0">
                            {place.distanceKm} km
                          </span>
                        )}
                      </div>

                      {place.formattedAddress && (
                        <p className="text-[11px] text-white/55 font-light line-clamp-1 mb-1.5">
                          {place.formattedAddress}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-white/50 tabular-nums">
                        <span>
                          {place.primaryTypeDisplayName || activeCategory.label}
                        </span>
                        {place.rating && (
                          <span className="inline-flex items-center gap-1 text-amber-300">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {place.rating.toFixed(1)}
                            {place.userRatingCount ? (
                              <span className="text-white/45">
                                ({place.userRatingCount})
                              </span>
                            ) : null}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-[#0c1a1e]/60 flex items-center justify-between text-[11px] text-white/55">
              <span>Click any marker or row to inspect</span>
              <span className="text-amber-300/90 tabular-nums">
                {places.length} places found
              </span>
            </div>
          </div>
        </div>
      </APIProvider>
    </div>
  );
};
