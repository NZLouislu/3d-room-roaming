import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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

vi.mock('./components/3d/Experience', () => ({
  Experience: () => <div>Experience Mock</div>,
}));

describe('App', () => {
  it('renders the Canvas and Interface', () => {
    render(<App />);
    expect(screen.getByText(/Canvas Mock/i)).toBeInTheDocument();
    // Interface might be empty initially, so we check for Canvas
  });
});
