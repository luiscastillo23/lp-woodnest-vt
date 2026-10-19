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