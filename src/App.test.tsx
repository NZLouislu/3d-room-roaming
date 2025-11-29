import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock Three.js/Canvas components since they don't run in JSDOM
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas-mock">Canvas Mock {children}</div>,
  useFrame: vi.fn(),
  useThree: () => ({ camera: { position: { set: vi.fn() }, rotation: { copy: vi.fn() } } }),
}));

vi.mock('@react-three/drei', () => ({
  Sky: () => <div>Sky Mock</div>,
  PointerLockControls: () => <div>Controls Mock</div>,
  Environment: () => <div>Environment Mock</div>,
  ContactShadows: () => <div>ContactShadows Mock</div>,
}));

vi.mock('@react-three/rapier', () => ({
  Physics: ({ children }: { children: React.ReactNode }) => <div>Physics Mock {children}</div>,
  RigidBody: ({ children }: { children: React.ReactNode }) => <div>RigidBody Mock {children}</div>,
  CapsuleCollider: () => <div>Collider Mock</div>,
  useRapier: () => ({ world: {} }),
}));

vi.mock('./components/ui/Interface', () => ({
  Interface: () => <div>Interface Mock</div>,
}));

vi.mock('./components/3d/ExperienceImproved', () => ({
  ExperienceImproved: () => <div>ExperienceImproved Mock</div>,
}));

vi.mock('./components/ui/RealEstateWelcome', () => ({
  RealEstateWelcome: () => <div>RealEstateWelcome Mock</div>,
}));

vi.mock('./components/ui/ViewModeToggle', () => ({
  ViewModeToggle: () => <div>ViewModeToggle Mock</div>,
}));

vi.mock('./components/3d/AutoTourController', () => ({
  AutoTourController: () => <div>AutoTourController Mock</div>,
  TourUI: () => <div>TourUI Mock</div>,
}));

vi.mock('./components/ui/ViewpointSelector', () => ({
  ViewpointSelector: () => <div>ViewpointSelector Mock</div>,
}));

vi.mock('./components/ui/PropertyInfoOverlay', () => ({
  PropertyInfoOverlay: () => <div>PropertyInfoOverlay Mock</div>,
}));

vi.mock('./data/tourPoints', () => ({
  DOUBLE_FLOOR_HOUSE_TOUR: [],
}));

describe('App', () => {
  it('renders the welcome screen initially', () => {
    render(<App />);
    expect(screen.getByText(/RealEstateWelcome Mock/i)).toBeInTheDocument();
  });
});
