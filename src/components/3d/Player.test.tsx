import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Player } from './Player';

// Mocks
vi.mock('@react-three/fiber', () => ({
  useFrame: vi.fn(),
  useThree: () => ({
    camera: {
      position: { set: vi.fn() },
      rotation: { copy: vi.fn() },
    },
  }),
}));

vi.mock('@react-three/rapier', () => ({
  RigidBody: ({ children }: { children: React.ReactNode }) => <div>RigidBody {children}</div>,
  CapsuleCollider: () => <div>CapsuleCollider</div>,
  RapierRigidBody: {},
}));

vi.mock('@react-three/drei', () => ({
  PointerLockControls: () => <div>PointerLockControls</div>,
}));

vi.mock('../../hooks/useKeyboard', () => ({
  useKeyboard: () => ({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  }),
}));

describe('Player', () => {
  it('renders correctly with physics body and controls', () => {
    const { getByText } = render(<Player />);
    
    expect(getByText('RigidBody')).toBeInTheDocument();
    expect(getByText('CapsuleCollider')).toBeInTheDocument();
    expect(getByText('PointerLockControls')).toBeInTheDocument();
  });
});
