# WoodNest — Nature's Perfect Hideaways

WoodNest is a modern, interactive web application showcasing luxury cabin and nature hideaway bookings with smooth animations, glassmorphic UI components, and an immersive preloader experience.

## Features

- **Interactive Preloader Overlay**: Smooth progress animation and entry transition powered by Framer Motion.
- **Hero Experience**: Editorial typography, glassmorphic rating badges, and an interactive cabin booking widget.
- **Responsive Design**: Built with Tailwind CSS for a clean, adaptive layout across devices.
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide Icons.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

## Project Structure

```text
├── src/
│   ├── components/
│   │   ├── layout/       # FrameContainer, Navbar
│   │   └── ui/           # Button, GlassCard, RatingBadge
│   ├── features/
│   │   ├── hero/         # BookingWidget, HeroTypography
│   │   └── preloader/    # PreloaderOverlay
│   ├── hooks/            # usePreloader custom hook
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript interfaces
├── index.html
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
