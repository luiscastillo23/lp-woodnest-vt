import { PropertyImagesTuple, assertValidPropertyImages } from '../types';

export interface HouseGalleryImage {
  id: string;
  title: string;
  roomTag: string;
  dimensions: string;
  caption: string;
  url: string;
  /** Strictly 5 to 12 images of this specific inmueble/space; images[0] is the principal image */
  images: PropertyImagesTuple<string>;
  focalPosition: string;
  hearthGlowPos: string;
}

export interface LocationActivity {
  id: string;
  title: string;
  category: 'Thermal & Wellness' | 'Alpine & Fjord Trek' | 'Gastronomy' | 'Nocturnal Sky' | 'Private Transfer';
  duration: string;
  schedule: string;
  difficulty: string;
  price: number;
  priceUnit: 'per group' | 'per guest' | 'per session';
  description: string;
  includedEquipment: string;
  imageUrl: string;
}

export interface GuestReview {
  id: string;
  guestName: string;
  guestOrigin: string;
  stayDate: string;
  nightsStayed: number;
  cabinModel: string;
  rating: number;
  title: string;
  comment: string;
  activitiesBooked: string[];
}

export interface DetailedSanctuary {
  id: string;
  name: string;
  region: string;
  country: string;
  coordinates: string;
  center: {
    lat: number;
    lng: number;
  };
  elevation: string;
  elevationMeters: number;
  bortleClass: string;
  daylightHours: string;
  azimuth: string;
  nearestTown: string;
  tempRange: string;
  cabinsCount: number;
  priceFrom: number;
  shortDescription: string;
  architecturalNarrative: string[];
  houseSpecs: {
    interiorArea: string;
    deckArea: string;
    bedrooms: string;
    bathrooms: string;
    maxGuests: number;
    acousticIsolation: string;
    heatingSystem: string;
    glazingSpec: string;
  };
  highlights: string[];
  focalPosition: string;
  hearthGlowPos: string;
  hueFilter: string;
  elevationCurve: string;
  markerX: number;
  markerY: number;
  /** Strictly 5 to 12 images; images[0] is the principal displayed image */
  images: PropertyImagesTuple<string>;
  /** Strictly 5 to 12 detailed gallery entries; gallery[0] is the principal displayed image */
  gallery: PropertyImagesTuple<HouseGalleryImage>;
  activities: LocationActivity[];
  ratingSummary: {
    overall: number;
    reviewsCount: number;
    architecturalCraft: number;
    acousticPrivacy: number;
    wildernessAccess: number;
    conciergeService: number;
  };
  reviews: GuestReview[];
}

export const DETAILED_SANCTUARIES: DetailedSanctuary[] = [
  {
    id: 'evergreen-valley',
    name: 'Evergreen Pine Valley',
    region: 'Pacific Canopy',
    country: 'Cascade Range, Washington',
    coordinates: '47.5962° N, 120.6615° W',
    center: {
      lat: 47.5962,
      lng: -120.6615,
    },
    elevation: '1,180 m',
    elevationMeters: 1180,
    bortleClass: 'Class 1 · True Dark Sky',
    daylightHours: '11h 40m Equinox',
    azimuth: '242° WSW Valley Aspect',
    nearestTown: '22 min from Leavenworth Airfield',
    tempRange: '4°C – 16°C',
    cabinsCount: 6,
    priceFrom: 359,
    shortDescription:
      'Set deep inside 400-acre old-growth Douglas fir woodland beside a glacial river bend. Each cabin is spaced 180 meters apart for complete acoustic privacy.',
    architecturalNarrative: [
      'Designed around three centuries-old Douglas fir trunks without felling a single canopy tree, the Evergreen Pine Valley residence rests on low-impact helical steel micropiles above a carpet of native sword fern and Oregon moss. Triple-glazed structural sky-frames open the entire western elevation toward the Wenatchee glacial river bend.',
      'Inside, kiln-dried Pacific red cedar planking meets honed Columbia River basalt flagstones with hydronic radiant floor heating. At the center of the double-height living volume, a suspended Gyrofocus cast-iron hearth rotates 360 degrees, casting warm amber firelight across the glass gable as twilight settles into the canyon.',
    ],
    houseSpecs: {
      interiorArea: '118 m² (1,270 sq ft)',
      deckArea: '46 m² cantilevered red-cedar terrace',
      bedrooms: '2 King Canopy Suites + Loft Daybed',
      bathrooms: '2 Rain-Shower Wet Rooms + Outdoor Cedar Tub',
      maxGuests: 5,
      acousticIsolation: 'STC-62 triple laminated acoustic glass · 180m cabin buffer',
      heatingSystem: 'Suspended cast-iron wood hearth + geothermal basalt floor',
      glazingSpec: '5.4m floor-to-ridge low-iron heated glass wall',
    },
    highlights: [
      'Private riverfront cedar soaking decks',
      'Direct trailhead access to Alpine Lakes Wilderness',
      'Zero light pollution — Bortle Class 1 night sky',
    ],
    focalPosition: 'center 58%',
    hearthGlowPos: '46% 62%',
    hueFilter: 'hue-rotate(155deg) saturate(0.55) brightness(0.62)',
    elevationCurve: 'M 0 110 C 120 105, 210 68, 340 48 C 460 30, 560 72, 720 88',
    markerX: 340,
    markerY: 48,
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
    gallery: assertValidPropertyImages(
      [
        {
          id: 'ev-ext',
          title: 'Western Twilight Gable & River Overlook',
          roomTag: 'Principal Exterior',
          dimensions: '5.4m Ridge Height · Cantilevered Steel & Cedar',
          caption: 'Evening hearth glow radiating into the old-growth Douglas fir canopy above the glacial river bend.',
          url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=2000&q=85',
              'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85',
            ],
            'ev-ext'
          ),
          focalPosition: 'center 55%',
          hearthGlowPos: '48% 60%',
        },
        {
          id: 'ev-living',
          title: 'Double-Height Hearth & Basalt Living Hall',
          roomTag: 'Great Room',
          dimensions: '54 m² · 360° Suspended Cast-Iron Fireplace',
          caption: 'Hand-rubbed Western red cedar acoustic ceiling with heated basalt stone floors and seasoned birch firewood.',
          url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
            ],
            'ev-living'
          ),
          focalPosition: 'center 50%',
          hearthGlowPos: '52% 58%',
        },
        {
          id: 'ev-master',
          title: 'Canopy Sky-Roof Primary Suite',
          roomTag: 'Primary Suite',
          dimensions: '32 m² · Heated Stargazing Skylight',
          caption: 'Organic raw-wool mattress positioned directly beneath a zero-condensation zenith glass roof.',
          url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=85',
            ],
            'ev-master'
          ),
          focalPosition: 'center 60%',
          hearthGlowPos: '45% 55%',
        },
        {
          id: 'ev-deck',
          title: 'Riverfront Japanese Cedar Hinoki Soaking Tub',
          roomTag: 'Thermal Deck',
          dimensions: '46 m² · 40°C Spring-Fed Thermal Soak',
          caption: 'Private timber deck suspended over the fern ravine with wood-fired soaking tub and outdoor rain shower.',
          url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
            ],
            'ev-deck'
          ),
          focalPosition: 'center 52%',
          hearthGlowPos: '50% 62%',
        },
        {
          id: 'ev-kitchen',
          title: 'Monolithic Basalt Kitchen & Chef Table',
          roomTag: 'Kitchen & Dining',
          dimensions: '28 m² · Gaggenau Induction & Wine Cellar',
          caption: 'Custom blackened-steel island stocked with Pacific Northwest biodynamic wines and artisan pour-over coffee gear.',
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
            ],
            'ev-kitchen'
          ),
          focalPosition: 'center 48%',
          hearthGlowPos: '54% 52%',
        },
        {
          id: 'ev-loft',
          title: 'Canopy Glass Study & Acoustic Listening Loft',
          roomTag: 'Reading Loft',
          dimensions: '20 m² · Cantilevered Fir Desk & Analog Hi-Fi',
          caption: 'Upper-level timber mezzanine overlooking the river bend with curated architectural monographs.',
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=85',
            ],
            'ev-loft'
          ),
          focalPosition: 'center 50%',
          hearthGlowPos: '48% 55%',
        },
        {
          id: 'ev-bath',
          title: 'Columbia Basalt Wet Room & Forest Rain Shower',
          roomTag: 'Basalt Bath',
          dimensions: '18 m² · Radiant Stone Slab & Skylight',
          caption: 'Floor-to-ceiling honed basalt wet room with brass rain-head and direct access to the cedar soaking terrace.',
          url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
            ],
            'ev-bath'
          ),
          focalPosition: 'center 50%',
          hearthGlowPos: '50% 55%',
        },
      ],
      'evergreen-valley'
    ),
    activities: [
      {
        id: 'ev-act-sauna',
        title: 'Private Riverbank Cedar Sauna & Glacial Cold Plunge',
        category: 'Thermal & Wellness',
        duration: '2.5 Hours',
        schedule: '16:30 Twilight Session',
        difficulty: 'Restorative · All Levels',
        price: 145,
        priceUnit: 'per session',
        description:
          'Our forest host pre-fires your private riverbank barrel sauna to 92°C with wild Douglas fir needle steam infusion, paired with guided breathwork and a 5°C glacial river plunge.',
        includedEquipment: 'Heated linen robes, cedar essential oil infusion, herbal electrolyte tea',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'ev-act-trek',
        title: 'Old-Growth Canopy & Enchantments Ridge Expedition',
        category: 'Alpine & Fjord Trek',
        duration: '4.5 Hours',
        schedule: '07:30 Dawn Departure',
        difficulty: 'Moderate · 520m Elevation Gain',
        price: 185,
        priceUnit: 'per group',
        description:
          'Private naturalist-led trek along uncrowded backcountry granite ridges bordering the Alpine Lakes Wilderness, finishing with hot cedar-smoked salmon and espresso at a high-altitude lookout.',
        includedEquipment: 'Carbon trekking poles, Swarovski binoculars, trail breakfast pack',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'ev-act-chef',
        title: 'Open-Hearth Pacific Foraged Tasting Dinner',
        category: 'Gastronomy',
        duration: '3 Hours',
        schedule: '19:30 In-Cabin Service',
        difficulty: 'Private In-Cabin Dining',
        price: 260,
        priceUnit: 'per group',
        description:
          'A five-course menu prepared over your cabin’s live wood hearth by our resident culinary team: wild chanterelle consommé, cedar-planked king salmon, and smoked huckleberry tart.',
        includedEquipment: 'Full sommelier pairing, handmade ceramics, zero cleanup',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'ev-act-astro',
        title: 'Bortle Class 1 Deep-Sky Telescope & Astrophotography',
        category: 'Nocturnal Sky',
        duration: '2 Hours',
        schedule: '22:00 Nocturnal Zenith',
        difficulty: 'Effortless · Private Deck',
        price: 130,
        priceUnit: 'per session',
        description:
          'Set up on your private deck with a motorized Celestron 11-inch Schmidt-Cassegrain telescope and full-frame astrophotography rig to capture nebulae and the Milky Way core.',
        includedEquipment: '11" motorized telescope, camera adapter, heated cashmere blankets',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    ratingSummary: {
      overall: 4.97,
      reviewsCount: 84,
      architecturalCraft: 5.0,
      acousticPrivacy: 5.0,
      wildernessAccess: 4.9,
      conciergeService: 5.0,
    },
    reviews: [
      {
        id: 'rev-ev-1',
        guestName: 'Marcus & Elena Vance',
        guestOrigin: 'Seattle, WA',
        stayDate: 'October 2026',
        nightsStayed: 4,
        cabinModel: 'Evergreen Pine Family Lodge',
        rating: 5.0,
        title: 'Architectural silence we did not know existed.',
        comment:
          'The transition from the forest road into the cabin feels like stepping inside a warm lantern in the middle of a cathedral of fir trees. Even with rain falling on the sky-roof, the interior acoustics are library-quiet. Adding the private hearth dinner and the riverbank sauna made the four nights unforgettable.',
        activitiesBooked: [
          'Private Riverbank Cedar Sauna & Glacial Cold Plunge',
          'Open-Hearth Pacific Foraged Tasting Dinner',
        ],
      },
      {
        id: 'rev-ev-2',
        guestName: 'Dr. Henrik Lindqvist',
        guestOrigin: 'Vancouver, BC',
        stayDate: 'September 2026',
        nightsStayed: 3,
        cabinModel: 'Evergreen Canopy Residence',
        rating: 5.0,
        title: 'Museum-grade timber joinery meets true Bortle 1 sky.',
        comment:
          'As an architect, I usually find flaws in luxury cabin builds within ten minutes. Here, the basalt stone miters, concealed window tracks, and suspended fireplace are executed with Swiss precision. We spent two hours each night in the outdoor cedar tub watching the Milky Way move across the ridge.',
        activitiesBooked: ['Bortle Class 1 Deep-Sky Telescope & Astrophotography'],
      },
      {
        id: 'rev-ev-3',
        guestName: 'Clara Moreau',
        guestOrigin: 'San Francisco, CA',
        stayDate: 'August 2026',
        nightsStayed: 5,
        cabinModel: 'Evergreen Pine Family Lodge',
        rating: 4.9,
        title: 'Effortless arrival and deeply restorative rituals.',
        comment:
          'Being picked up 20 minutes from Leavenworth and arriving to a pre-lit fireplace and 40°C cedar tub set the tone immediately. The Enchantments ridge morning hike with our guide was the highlight of our summer.',
        activitiesBooked: ['Old-Growth Canopy & Enchantments Ridge Expedition'],
      },
    ],
  },
  {
    id: 'aurlandsfjord-ridge',
    name: 'Aurlandsfjord Glass Crest',
    region: 'Nordic Fjords',
    country: 'Vestland, Norway',
    coordinates: '60.9056° N, 7.1892° E',
    center: {
      lat: 60.9056,
      lng: 7.1892,
    },
    elevation: '640 m',
    elevationMeters: 640,
    bortleClass: 'Class 1 · Aurora Corridor',
    daylightHours: '18h 20m Summer Solstice',
    azimuth: '310° NW Fjord Overlook',
    nearestTown: '18 min from Flåm Harbor',
    tempRange: '-2°C – 14°C',
    cabinsCount: 4,
    priceFrom: 420,
    shortDescription:
      'Cantilevered over granite cliffs overlooking dark fjord waters and cascading snowmelt waterfalls. Built with charred Nordic heart-pine and triple-glazed sky roofs.',
    architecturalNarrative: [
      'Anchored directly into Precambrian granite 640 meters above the dark mirror of Aurlandsfjord, the Glass Crest residence projects four meters beyond the cliff edge on tensioned corten steel beams. Its exterior is clad in Shou Sugi Ban charred Norwegian heart-pine that weathers naturally against salt mist and alpine wind.',
      'Floor-to-ceiling frameless glass walls wrap 270 degrees around the living platform, placing you eye-level with sea eagles and cascading snowmelt waterfalls. A private cantilevered red-cedar sauna sits at the western tip of the deck.',
    ],
    houseSpecs: {
      interiorArea: '104 m² (1,120 sq ft)',
      deckArea: '38 m² cliff-edge granite & pine terrace',
      bedrooms: '2 Panoramic Fjord Suites',
      bathrooms: '1.5 Alta Quartzite Baths + Cliff Sauna',
      maxGuests: 4,
      acousticIsolation: 'Triple argon-filled structural glazing · 220m cliff separation',
      heatingSystem: 'Nordpeis wood-burning stove + geothermal underfloor loops',
      glazingSpec: '270° structural glass corner with zero vertical mullions',
    },
    highlights: [
      '270-degree panoramic fjord and waterfall views',
      'Wood-fired cantilevered sauna over the cliff edge',
      'Private electric boat mooring at fjord base',
    ],
    focalPosition: '35% 48%',
    hearthGlowPos: '42% 58%',
    hueFilter: 'hue-rotate(168deg) saturate(0.5) brightness(0.58)',
    elevationCurve: 'M 0 35 C 140 38, 240 42, 390 74 C 510 98, 610 104, 720 108',
    markerX: 390,
    markerY: 74,
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
    gallery: assertValidPropertyImages(
      [
        {
          id: 'af-ext',
          title: 'Cantilevered Cliff-Edge Glass Pavilion',
          roomTag: 'Principal Exterior',
          dimensions: '640m Above Aurlandsfjord · Charred Heart-Pine',
          caption: 'Suspended above the fjord twilight with warm amber firelight reflecting across the granite ledge.',
          url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2000&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2000&q=85',
              'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
            ],
            'af-ext'
          ),
          focalPosition: 'center 50%',
          hearthGlowPos: '44% 58%',
        },
        {
          id: 'af-living',
          title: '270° Fjord Lookout Lounge & Hearth',
          roomTag: 'Great Room',
          dimensions: '48 m² · Mullion-Free Corner Glazing',
          caption: 'Norwegian wool lounge seating oriented toward the fjord bend and distant snowfields.',
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
            ],
            'af-living'
          ),
          focalPosition: 'center 54%',
          hearthGlowPos: '50% 60%',
        },
        {
          id: 'af-sauna',
          title: 'Cliffside Wood-Fired Cedar Sauna & Fjord View',
          roomTag: 'Thermal Ritual',
          dimensions: '14 m² · Direct Fjord Horizon Window',
          caption: 'Birch-stoked sauna perched on the western rock outcrop with outdoor cold-water deluge shower.',
          url: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=85',
            ],
            'af-sauna'
          ),
          focalPosition: 'center 48%',
          hearthGlowPos: '48% 58%',
        },
        {
          id: 'af-bed',
          title: 'Aurora Sky-Frame Master Bedroom',
          roomTag: 'Primary Suite',
          dimensions: '28 m² · North-West Aurora Borealis Aspect',
          caption: 'Heated acoustic glass roof engineered for watching the northern lights from beneath goose-down duvets.',
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
            ],
            'af-bed'
          ),
          focalPosition: 'center 58%',
          hearthGlowPos: '46% 52%',
        },
        {
          id: 'af-dining',
          title: 'Smoked Oak Nordic Kitchen & Fjord Bar',
          roomTag: 'Kitchen & Dining',
          dimensions: '24 m² · Handcrafted Alta Slate Countertops',
          caption: 'Equipped with a Nordic fermentation pantry, artisanal aquavit selection, and fjord-water filtration.',
          url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
            ],
            'af-dining'
          ),
          focalPosition: 'center 52%',
          hearthGlowPos: '52% 56%',
        },
        {
          id: 'af-terrace',
          title: 'Suspended Fjord Firepit & Granite Overlook Deck',
          roomTag: 'Cliff Terrace',
          dimensions: '38 m² · Corten Steel Hearth Over Aurlandsfjord',
          caption: 'Cantilevered granite terrace with recessed wind-shielded fire bowl and heated sheepskin loungers.',
          url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
            ],
            'af-terrace'
          ),
          focalPosition: 'center 54%',
          hearthGlowPos: '48% 60%',
        },
      ],
      'aurlandsfjord-ridge'
    ),
    activities: [
      {
        id: 'af-act-boat',
        title: 'Private Silent Electric Fjord Cruise to Nærøyfjord',
        category: 'Alpine & Fjord Trek',
        duration: '3.5 Hours',
        schedule: '14:00 Private Mooring',
        difficulty: 'Effortless · Private Captain',
        price: 290,
        priceUnit: 'per group',
        description:
          'Glide silently across UNESCO-protected Nærøyfjord aboard our custom carbon-electric launch with zero engine noise, stopping at hanging valleys accessible only by water.',
        includedEquipment: 'Thermal flotation suits, hot lingonberry toddy, Leica marine optics',
        imageUrl: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'af-act-sauna',
        title: 'Aufguss Cliff Sauna & Fjord Ice-Water Immersion',
        category: 'Thermal & Wellness',
        duration: '2 Hours',
        schedule: '17:30 Blue Hour',
        difficulty: 'Restorative · Guided Contrast',
        price: 155,
        priceUnit: 'per session',
        description:
          'Guided Nordic sauna master session using crushed juniper and pine essential oils, alternating with cold immersion in our granite plunge basin.',
        includedEquipment: 'Merino sauna hats, birch whisks, sea-buckthorn elixir',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'af-act-seafood',
        title: 'Live-Fire Norwegian King Crab & Langoustine Feast',
        category: 'Gastronomy',
        duration: '3 Hours',
        schedule: '20:00 In-Cabin Hearth',
        difficulty: 'Private Chef Service',
        price: 280,
        priceUnit: 'per group',
        description:
          'Harvested the same morning from Vestland waters and roasted over birch embers on your terrace with browned butter, wild sea herbs, and aged cider pairings.',
        includedEquipment: 'Private chef, paired Nordic ciders & wines, full table service',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'af-act-kayak',
        title: 'Mirror-Water Dawn Fjord Kayaking & Waterfall Landing',
        category: 'Alpine & Fjord Trek',
        duration: '3 Hours',
        schedule: '06:30 First Light',
        difficulty: 'Moderate · Guided Paddle',
        price: 165,
        priceUnit: 'per group',
        description:
          'Paddle across glass-still morning fjord water before any ferry traffic begins, landing at a secluded gravel cove beneath a 140-meter waterfall.',
        includedEquipment: 'Carbon expedition kayaks, drysuits, campfire espresso',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    ratingSummary: {
      overall: 4.99,
      reviewsCount: 62,
      architecturalCraft: 5.0,
      acousticPrivacy: 5.0,
      wildernessAccess: 5.0,
      conciergeService: 4.9,
    },
    reviews: [
      {
        id: 'rev-af-1',
        guestName: 'Soren & Freja Kjeldsen',
        guestOrigin: 'Copenhagen, Denmark',
        stayDate: 'October 2026',
        nightsStayed: 3,
        cabinModel: 'Glass Crest Cliff Residence',
        rating: 5.0,
        title: 'Like floating in warm amber air above the fjord.',
        comment:
          'Waking up suspended 640 meters above Aurlandsfjord while mist rises from the water is indescribable. The silent electric boat cruise into Nærøyfjord and the king crab hearth dinner were worth every krone.',
        activitiesBooked: [
          'Private Silent Electric Fjord Cruise to Nærøyfjord',
          'Live-Fire Norwegian King Crab & Langoustine Feast',
        ],
      },
      {
        id: 'rev-af-2',
        guestName: 'Julian Vance-Sterling',
        guestOrigin: 'London, UK',
        stayDate: 'September 2026',
        nightsStayed: 4,
        cabinModel: 'Glass Crest Cliff Residence',
        rating: 5.0,
        title: 'Unmatched Nordic minimalism and drama.',
        comment:
          'The cantilevered sauna looking straight down the fjord at twilight is the single greatest architectural space I have ever experienced. We saw the aurora borealis on our second night directly through the bedroom sky-roof.',
        activitiesBooked: ['Aufguss Cliff Sauna & Fjord Ice-Water Immersion'],
      },
    ],
  },
  {
    id: 'dolomites-larch',
    name: 'Val Gardena Larch Sanctuary',
    region: 'Alpine Ridge',
    country: 'South Tyrol, Italy',
    coordinates: '46.5591° N, 11.7219° E',
    center: {
      lat: 46.5591,
      lng: 11.7219,
    },
    elevation: '1,840 m',
    elevationMeters: 1840,
    bortleClass: 'Class 2 · High Alpine Zenith',
    daylightHours: '300+ Clear Alpine Days/Yr',
    azimuth: '195° SSW Limestone Aspect',
    nearestTown: '35 min from Bolzano Heliport',
    tempRange: '-4°C – 18°C',
    cabinsCount: 5,
    priceFrom: 449,
    shortDescription:
      'High-altitude timber hideaways tucked into golden larch meadows beneath the Dolomite limestone spires. Designed for ski-in winter solitude and summer ridge hikes.',
    architecturalNarrative: [
      'Positioned at 1,840 meters on a sun-drenched South Tyrolean pasture facing the Sassolungo massif, Val Gardena Larch Sanctuary pairs traditional Ladin dry-stone dolomite masonry with cantilevered brushed larch timber.',
      'Every evening at sunset, the pale limestone towers opposite the cabin ignite with pink and amber Enrosadira alpenglow, mirrored inside by an indoor-outdoor cast-iron hearth and heated Dolomia stone slabs.',
    ],
    houseSpecs: {
      interiorArea: '126 m² (1,355 sq ft)',
      deckArea: '52 m² south-facing alpenglow loggia',
      bedrooms: '2 Alpine Suites + bunk alcove',
      bathrooms: '2.5 Dolomite Stone Baths + Hammam Steam Room',
      maxGuests: 5,
      acousticIsolation: 'Triple alpine glazing · 200m meadow buffer',
      heatingSystem: 'Indoor-outdoor cast-iron hearth + geothermal radiant stone',
      glazingSpec: '6.0m panoramic sliding glass wall facing Sassolungo',
    },
    highlights: [
      'Heated stone ski & alpine gear mudroom',
      'Indoor-outdoor cast-iron hearth fireplace',
      'Daily mountain breakfast basket delivered at dawn',
    ],
    focalPosition: '62% 52%',
    hearthGlowPos: '50% 60%',
    hueFilter: 'hue-rotate(148deg) saturate(0.6) brightness(0.60)',
    elevationCurve: 'M 0 112 C 150 96, 290 42, 470 22 C 580 14, 650 48, 720 64',
    markerX: 470,
    markerY: 22,
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
    gallery: assertValidPropertyImages(
      [
        {
          id: 'dl-ext',
          title: 'Alpenglow Larch Pavilion & Limestone Spires',
          roomTag: 'Principal Exterior',
          dimensions: '1,840m Altitude · Brushed Alpine Larch',
          caption: 'Set in golden autumn larch meadows beneath the towering walls of the Dolomites.',
          url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
              'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=85',
            ],
            'dl-ext'
          ),
          focalPosition: '62% 52%',
          hearthGlowPos: '50% 60%',
        },
        {
          id: 'dl-living',
          title: 'Indoor-Outdoor Hearth & Dolomia Stone Salon',
          roomTag: 'Great Room',
          dimensions: '58 m² · Pass-Through Cast-Iron Fireplace',
          caption: 'Ladin larch beams and custom Loden wool sofas framing the Sassolungo ridge.',
          url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
            ],
            'dl-living'
          ),
          focalPosition: 'center 52%',
          hearthGlowPos: '48% 58%',
        },
        {
          id: 'dl-spa',
          title: 'Private Hay-Bath Sauna & Outdoor Hot Loggia',
          roomTag: 'Thermal Suite',
          dimensions: '30 m² · Alpine Herb Steam & Heated Pool',
          caption: 'Traditional South Tyrolean mountain hay sauna and 39°C infinity vitality pool.',
          url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85',
            ],
            'dl-spa'
          ),
          focalPosition: 'center 50%',
          hearthGlowPos: '52% 62%',
        },
        {
          id: 'dl-suite',
          title: 'South-Tyrol Swiss Pine Master Sanctuary',
          roomTag: 'Primary Suite',
          dimensions: '34 m² · Aromatic Zirm (Cembra Pine) Timber',
          caption: 'Crafted from untreated high-altitude Cembra pine proven to lower nighttime heart rate.',
          url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
            ],
            'dl-suite'
          ),
          focalPosition: 'center 56%',
          hearthGlowPos: '46% 54%',
        },
        {
          id: 'dl-cellar',
          title: 'Alto Adige Wine Library & Alpine Kitchen',
          roomTag: 'Kitchen & Cellar',
          dimensions: '32 m² · 48-Bottle Climate Wine Wall',
          caption: 'Curated with high-altitude Kerner, Lagrein, and Pinot Nero vintages from neighboring Abbey cellars.',
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
            ],
            'dl-cellar'
          ),
          focalPosition: 'center 48%',
          hearthGlowPos: '54% 52%',
        },
        {
          id: 'dl-loggia',
          title: 'Sassolungo Alpenglow Sun Loggia & Trail Mudroom',
          roomTag: 'Alpine Loggia',
          dimensions: '52 m² · South-Facing Larch Terrace & Ski Room',
          caption: 'Expansive outdoor larch deck oriented directly toward the evening Enrosadira limestone glow.',
          url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
            ],
            'dl-loggia'
          ),
          focalPosition: 'center 50%',
          hearthGlowPos: '50% 58%',
        },
        {
          id: 'dl-stube',
          title: 'Ladin Timber Dining Stube & Sommelier Table',
          roomTag: 'Dining Stube',
          dimensions: '26 m² · Hand-Carved Larch & Dolomite Hearth',
          caption: 'Intimate candlelit dining alcove designed for private high-altitude wine tastings and hearth dinners.',
          url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
            ],
            'dl-stube'
          ),
          focalPosition: 'center 52%',
          hearthGlowPos: '50% 60%',
        },
        {
          id: 'dl-observatory',
          title: 'High-Alpine Zenith Stargazing Terrace',
          roomTag: 'Sky Observatory',
          dimensions: '24 m² · Heated Dolomite Loungers & Telescope Mount',
          caption: 'Unobstructed Bortle Class 2 nocturnal sky above the 3,000-meter Dolomite peaks.',
          url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
            ],
            'dl-observatory'
          ),
          focalPosition: 'center 45%',
          hearthGlowPos: '48% 55%',
        },
      ],
      'dolomites-larch'
    ),
    activities: [
      {
        id: 'dl-act-via',
        title: 'Private UIAA Mountain Guide: Seceda & Puez Ridge Traverse',
        category: 'Alpine & Fjord Trek',
        duration: '5 Hours',
        schedule: '08:00 Ridge Ascent',
        difficulty: 'Moderate–Active · Custom Pace',
        price: 240,
        priceUnit: 'per group',
        description:
          'Ascend the iconic Seceda刀-edge ridgeline and Puez-Odle plateau with a certified South Tyrolean alpine guide, stopping at a historic family-run mountain Malga for warm strudel.',
        includedEquipment: 'Via ferrata kit, Salewa alpine packs, mountain hut lunch',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'dl-act-wine',
        title: 'Alto Adige Biodynamic Cellar Tasting & Ladin Hearth Dinner',
        category: 'Gastronomy',
        duration: '3 Hours',
        schedule: '19:30 In-Cabin Sommelier',
        difficulty: 'Private In-Cabin Experience',
        price: 250,
        priceUnit: 'per group',
        description:
          'Our sommelier and chef present five rare high-altitude Alto Adige vintages alongside speck-wrapped venison, mountain cheese fonduta, and buckwheat cake.',
        includedEquipment: '5 rare wine pairings, Zalto stemware, full chef service',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'dl-act-hay',
        title: 'Alpe di Siusi Warm Alpine Hay Bath & Sound Therapy',
        category: 'Thermal & Wellness',
        duration: '2 Hours',
        schedule: '16:30 Enrosadira Sunset',
        difficulty: 'Deeply Restorative',
        price: 160,
        priceUnit: 'per session',
        description:
          'Centuries-old South Tyrolean wellness ritual using wild arnica, gentian, and thyme-rich mountain hay harvested at 2,000 meters to release deep muscular tension.',
        includedEquipment: 'Organic alpine hay wrap, herbal oil massage, pine tea',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'dl-act-heli',
        title: 'Bolzano Heliport Scenic Dolomite Crest Transfer',
        category: 'Private Transfer',
        duration: '35 Minutes Flight',
        schedule: 'Custom Arrival / Sunset',
        difficulty: 'Direct Pad-to-Sanctuary',
        price: 390,
        priceUnit: 'per group',
        description:
          'Direct Airbus H125 helicopter flight from Bolzano over the Sella Ronda towers and Marmolada glacier, landing at our private meadow pad.',
        includedEquipment: 'Bose aviation headsets, luggage transfer, champagne welcome',
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    ratingSummary: {
      overall: 4.98,
      reviewsCount: 71,
      architecturalCraft: 5.0,
      acousticPrivacy: 4.9,
      wildernessAccess: 5.0,
      conciergeService: 5.0,
    },
    reviews: [
      {
        id: 'rev-dl-1',
        guestName: 'Matteo & Beatrice Conti',
        guestOrigin: 'Milan, Italy',
        stayDate: 'October 2026',
        nightsStayed: 4,
        cabinModel: 'Val Gardena Larch Residence',
        rating: 5.0,
        title: 'The Enrosadira sunset from the outdoor loggia is pure magic.',
        comment:
          'Watching the Dolomite peaks turn glowing rose-gold while sitting beside the indoor-outdoor hearth with a glass of Lagrein was unforgettable. The Cembra pine bedroom smells incredible and we slept better than we have in years.',
        activitiesBooked: [
          'Private UIAA Mountain Guide: Seceda & Puez Ridge Traverse',
          'Alto Adige Biodynamic Cellar Tasting & Ladin Hearth Dinner',
        ],
      },
      {
        id: 'rev-dl-2',
        guestName: ' Lukas Weber',
        guestOrigin: 'Zurich, Switzerland',
        stayDate: 'September 2026',
        nightsStayed: 3,
        cabinModel: 'Val Gardena Larch Residence',
        rating: 5.0,
        title: 'True ski-in / hike-out isolation with five-star warmth.',
        comment:
          'Zero road noise, zero crowds, just golden larch trees and limestone cliffs. The dawn breakfast basket left silently in the heated mudroom airlock each morning is a brilliant touch.',
        activitiesBooked: ['Alpe di Siusi Warm Alpine Hay Bath & Sound Therapy'],
      },
    ],
  },
  {
    id: 'hardanger-moss',
    name: 'Hardanger Birch Cove',
    region: 'Nordic Fjords',
    country: 'Hardangervidda, Norway',
    coordinates: '60.3542° N, 6.7210° E',
    center: {
      lat: 60.3542,
      lng: 6.7210,
    },
    elevation: '510 m',
    elevationMeters: 510,
    bortleClass: 'Class 1 · Mirror Lagoon',
    daylightHours: '100% Off-Grid Micro-Hydro',
    azimuth: '165° SE Glacier Basin',
    nearestTown: '25 min from Odda Station',
    tempRange: '1°C – 15°C',
    cabinsCount: 3,
    priceFrom: 389,
    shortDescription:
      'Nestled where ancient silver birch groves meet mirror-still glacier lagoons. Constructed on micro-pilings to leave the native moss carpet untouched.',
    architecturalNarrative: [
      'Accessible via a private mossy footpath along the edge of a glacial meltwater lagoon below the Folgefonna ice cap, Hardanger Birch Cove consists of just three off-grid architectural pavilions powered entirely by a silent micro-hydro turbine.',
      'Elevated on slender bronze-anodized columns above silver birch roots and reindeer moss, the cabin extends over the water with a suspended meditation net, a private cold-plunge ladder, and a wood-burning hearth.',
    ],
    houseSpecs: {
      interiorArea: '96 m² (1,035 sq ft)',
      deckArea: '42 m² over-water lagoon deck',
      bedrooms: '1 Master Lagoon Suite + Guest Tea Alcove',
      bathrooms: '1.5 Norwegian Granite Wet Room + Dock Sauna',
      maxGuests: 4,
      acousticIsolation: 'Off-grid zero-hum power · 260m cove separation',
      heatingSystem: 'Jøtul cast-iron wood stove + micro-hydro radiant floor',
      glazingSpec: 'Floor-to-waterline structural acoustic glass',
    },
    highlights: [
      'Suspended over-water meditation deck',
      'Cold-plunge lagoon ladder with heated towel rack',
      '100% off-grid solar and micro-hydro energy',
    ],
    focalPosition: '48% 65%',
    hearthGlowPos: '44% 64%',
    hueFilter: 'hue-rotate(160deg) saturate(0.52) brightness(0.60)',
    elevationCurve: 'M 0 65 C 160 72, 290 86, 430 84 C 550 82, 640 92, 720 96',
    markerX: 430,
    markerY: 84,
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
    gallery: assertValidPropertyImages(
      [
        {
          id: 'hm-ext',
          title: 'Over-Water Birch Cove Pavilion at Dusk',
          roomTag: 'Principal Exterior',
          dimensions: 'Micro-Piling Foundation · Untouched Reindeer Moss',
          caption: 'Warm hearth light mirrored across the still glacial lagoon beneath the Folgefonna ice cap.',
          url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=85',
              'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=85',
            ],
            'hm-ext'
          ),
          focalPosition: '48% 65%',
          hearthGlowPos: '44% 64%',
        },
        {
          id: 'hm-living',
          title: 'Waterline Hearth Salon & Birch Acoustic Ceiling',
          roomTag: 'Great Room',
          dimensions: '44 m² · Jøtul Cast-Iron Wood Stove',
          caption: 'Positioned just 1.2 meters above the lagoon surface so water reflections dance across the birch ceiling.',
          url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
            ],
            'hm-living'
          ),
          focalPosition: 'center 52%',
          hearthGlowPos: '50% 58%',
        },
        {
          id: 'hm-dock',
          title: 'Glacial Lagoon Plunge Deck & Floating Sauna',
          roomTag: 'Thermal Dock',
          dimensions: '42 m² · Heated Brass Ladder & Towel Warmer',
          caption: 'Step directly from the 90°C birch-fired sauna into crystal-clear 6°C glacier meltwater.',
          url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
            ],
            'hm-dock'
          ),
          focalPosition: 'center 50%',
          hearthGlowPos: '48% 60%',
        },
        {
          id: 'hm-bed',
          title: 'Silver Birch Grove Primary Bedroom & Wet Room',
          roomTag: 'Primary Suite',
          dimensions: '26 m² · Corner Glass into Moss Forest',
          caption: 'Surrounded by white birch trunks and soft moss carpet with blackout linen drapery.',
          url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85',
            ],
            'hm-bed'
          ),
          focalPosition: 'center 55%',
          hearthGlowPos: '45% 54%',
        },
        {
          id: 'hm-tea',
          title: 'Nordic Botanical Pantry & Ember Cider Deck',
          roomTag: 'Kitchen & Pantry',
          dimensions: '22 m² · Hardanger Heirloom Cider Cellar',
          caption: 'Stocked with award-winning Hardanger apple ciders, wild cloudberry preserves, and cast-iron cookware.',
          url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
            ],
            'hm-tea'
          ),
          focalPosition: 'center 48%',
          hearthGlowPos: '52% 52%',
        },
        {
          id: 'hm-net',
          title: 'Suspended Over-Water Meditation Net & Cove Deck',
          roomTag: 'Lagoon Deck',
          dimensions: '20 m² · Hand-Woven Marine Net Above Glacier Water',
          caption: 'Cantilevered directly over the mirror-still glacial basin surrounded by untouched silver birch.',
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
          images: assertValidPropertyImages(
            [
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
              'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1800&q=85',
            ],
            'hm-net'
          ),
          focalPosition: 'center 55%',
          hearthGlowPos: '46% 58%',
        },
      ],
      'hardanger-moss'
    ),
    activities: [
      {
        id: 'hm-act-glacier',
        title: 'Folgefonna Blue-Ice Glacier Walk & Ice Cave Exploration',
        category: 'Alpine & Fjord Trek',
        duration: '5 Hours',
        schedule: '08:30 Private Guide',
        difficulty: 'Moderate · Crampons Provided',
        price: 235,
        priceUnit: 'per group',
        description:
          'Rope up with our certified glacier glaciologist to traverse ancient deep-blue ice crevasses on the Folgefonna plateau, followed by warm reindeer stew in a heated lavvu tent.',
        includedEquipment: 'Grivel crampons, ice axes, harness, hot expedition lunch',
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'hm-act-cider',
        title: 'Hardanger Heritage Orchard & Sparkling Cider Tasting',
        category: 'Gastronomy',
        duration: '2.5 Hours',
        schedule: '17:00 Cove Deck',
        difficulty: 'Effortless · Private Sommelier',
        price: 150,
        priceUnit: 'per group',
        description:
          'Taste six vintage Champagne-method ciders pressed from steep fjord orchards, paired with cured fjord trout, aged Kraftkar blue cheese, and birch-syrup flatbreads.',
        includedEquipment: '6 vintage cider flights, artisanal charcuterie board',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'hm-act-plunge',
        title: 'Guided Nordic Breathwork & Lagoon Contrast Ritual',
        category: 'Thermal & Wellness',
        duration: '2 Hours',
        schedule: '09:00 Morning Stillness',
        difficulty: 'Restorative · All Levels',
        price: 125,
        priceUnit: 'per session',
        description:
          'Learn vascular breathwork techniques on the over-water deck before entering the mirror lagoon and recovering beside the birch sauna hearth.',
        includedEquipment: 'Heated wool mats, thermal robes, chaga mushroom infusion',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    ratingSummary: {
      overall: 4.96,
      reviewsCount: 49,
      architecturalCraft: 5.0,
      acousticPrivacy: 5.0,
      wildernessAccess: 4.9,
      conciergeService: 5.0,
    },
    reviews: [
      {
        id: 'rev-hm-1',
        guestName: 'Astrid & Håkon Solberg',
        guestOrigin: 'Oslo, Norway',
        stayDate: 'September 2026',
        nightsStayed: 3,
        cabinModel: 'Birch Cove Lagoon Pavilion',
        rating: 5.0,
        title: 'The most peaceful water sanctuary in Norway.',
        comment:
          'Because there are only three cabins on the entire cove and everything runs on silent micro-hydro, the stillness is complete. Morning coffee on the suspended net over the glacier lagoon followed by the Folgefonna ice walk was extraordinary.',
        activitiesBooked: [
          'Folgefonna Blue-Ice Glacier Walk & Ice Cave Exploration',
          'Hardanger Heritage Orchard & Sparkling Cider Tasting',
        ],
      },
      {
        id: 'rev-hm-2',
        guestName: 'Hannah Meyer',
        guestOrigin: 'Hamburg, Germany',
        stayDate: 'August 2026',
        nightsStayed: 4,
        cabinModel: 'Birch Cove Lagoon Pavilion',
        rating: 4.9,
        title: 'Thoughtful ecological architecture.',
        comment:
          'You can see the reindeer moss growing untouched right underneath the glass floor walkway. The heated towel rack at the bottom of the cold-plunge ladder shows how deeply they thought about the guest experience.',
        activitiesBooked: ['Guided Nordic Breathwork & Lagoon Contrast Ritual'],
      },
    ],
  },
];
