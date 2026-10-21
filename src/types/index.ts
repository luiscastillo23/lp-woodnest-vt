export interface NavItem {
  label: string;
  href: string;
}

/**
 * Strict tuple type enforcing that every property/location ("inmueble")
 * has a minimum of 5 images and a maximum of 12 images.
 * Index 0 is always the principal displayed image.
 */
export type PropertyImagesTuple<T = string> =
  | [T, T, T, T, T]
  | [T, T, T, T, T, T]
  | [T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T, T, T, T, T];

export const MIN_PROPERTY_IMAGES = 5;
export const MAX_PROPERTY_IMAGES = 12;

export function assertValidPropertyImages<T>(
  images: PropertyImagesTuple<T>,
  propertyId: string
): PropertyImagesTuple<T> {
  if (images.length < MIN_PROPERTY_IMAGES || images.length > MAX_PROPERTY_IMAGES) {
    throw new Error(
      `Property "${propertyId}" must have between ${MIN_PROPERTY_IMAGES} and ${MAX_PROPERTY_IMAGES} images (found ${images.length}).`
    );
  }
  return images;
}

export interface BookingDetails {
  title: string;
  subtitle: string;
  dateFrom: string;
  dateTo: string;
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
  guestsRange: string;
}

export interface SanctuaryLocation {
  id: string;
  name: string;
  region: 'Nordic Fjords' | 'Alpine Ridge' | 'Pacific Canopy';
  country: string;
  coordinates: string;
  elevation: string;
  nearestTown: string;
  tempRange: string;
  cabinsCount: number;
  priceFrom: number;
  description: string;
  highlights: string[];
  /** Strictly 5 to 12 images; images[0] is the principal image displayed */
  images: PropertyImagesTuple<string>;
}

export interface CabinRoom {
  id: string;
  title: string;
  subtitle: string;
  areaSqm: number;
  guestsRange: string;
  bedConfig: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  architecturalNote: string;
  /** Strictly 5 to 12 images; images[0] is the principal image displayed */
  images: PropertyImagesTuple<string>;
}

export interface ForestExperience {
  id: string;
  number: string;
  title: string;
  season: 'All Seasons' | 'Winter' | 'Summer' | 'Autumn';
  duration: string;
  schedule: string;
  priceLabel: string;
  description: string;
  outcomeMetric: string;
  imageUrl: string;
}