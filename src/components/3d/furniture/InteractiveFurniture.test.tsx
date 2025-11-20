import { render, fireEvent } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { InteractiveFurniture } from './InteractiveFurniture';
import { describe, it, expect, vi } from 'vitest';

describe('InteractiveFurniture', () => {
  const defaultProps = {
    id: 'test-1',
    position: [0, 0, 0] as [number, number, number],
    name: 'Test Item',
    onInteract: vi.fn()
  };

  it('should render children', () => {
    const { container } = render(
      <Canvas>
        <InteractiveFurniture {...defaultProps}>
          <mesh data-testid="child-mesh">
            <boxGeometry />
          </mesh>
        </InteractiveFurniture>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <InteractiveFurniture {...defaultProps}>
          <group />
        </InteractiveFurniture>
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});
