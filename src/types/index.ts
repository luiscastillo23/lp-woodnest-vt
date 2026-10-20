export interface NavItem {
  label: string;
  href: string;
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
  imageUrl: string;
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
  imageUrl: string;
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