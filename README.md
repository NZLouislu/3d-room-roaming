# 3D Room Roaming System

A first-person 3D room exploration application built with React Three Fiber, featuring interactive furniture, dynamic lighting, and physics-based player movement.

## Features

- 🎮 **First-Person Controls**: WASD movement with mouse-look camera controls
- 🪑 **Interactive Furniture**: Click on objects to view detailed information
- 🌓 **Dynamic Lighting**: Toggle between day and night modes
- ⚡ **Physics Engine**: Realistic collision detection using Rapier
- 🎨 **Modern UI**: Beautiful Tailwind-styled interface with smooth animations
- ✅ **Fully Tested**: Comprehensive unit, integration, and E2E test coverage

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **3D Engine**: Three.js
- **3D React Wrapper**: React Three Fiber (R3F)
- **3D Helpers**: @react-three/drei
- **Physics**: @react-three/rapier
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Testing**: Vitest + Playwright

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run unit tests
npm test

# Run E2E tests (requires dev server running)
npm run dev  # In one terminal
cd e2e && npx playwright test  # In another terminal
```

## Project Structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── Experience.tsx    # Main 3D scene container
│   │   ├── Player.tsx         # First-person player controller
│   │   ├── Room.tsx           # Room geometry with physics
│   │   ├── Furniture.tsx      # Interactive furniture component
│   │   └── Lighting.tsx       # Dynamic lighting system
│   └── ui/
│       ├── Interface.tsx      # Main UI overlay
│       └── InfoCard.tsx       # Furniture information panel
├── hooks/
│   ├── useKeyboard.ts         # Keyboard input handler
│   └── useStore.ts            # Zustand state management
└── App.tsx                    # Application entry point
```

## Controls

- **W/A/S/D**: Move forward/left/backward/right
- **Mouse**: Look around (click to lock pointer)
- **Left Click**: Interact with furniture
- **Day/Night Button**: Toggle lighting mode

## Testing

### Unit Tests

```bash
npm test
```

### E2E Tests

```bash
# Start dev server
npm run dev

# In another terminal
cd e2e
npx playwright test
```

## Development

### Adding New Furniture

```tsx
<Furniture
  position={[x, y, z]}
  name="Item Name"
  price="$999"
  description="Item description"
  color="#hexcolor"
/>
```

### Modifying Room Layout

Edit `src/components/3d/Room.tsx` to adjust walls, floor, and collision boundaries.

### Customizing Lighting

Modify `src/components/3d/Lighting.tsx` to change day/night lighting configurations.

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy dist folder via Netlify CLI or drag-and-drop
```

## License

MIT

## Contributing

Contributions are welcome! Please ensure all tests pass before submitting a PR.

```bash
npm test
npm run build
cd e2e && npx playwright test
```
