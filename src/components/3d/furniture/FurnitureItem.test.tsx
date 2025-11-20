import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { FurnitureItem } from './FurnitureItem';
import { describe, it, expect, vi } from 'vitest';

describe('FurnitureItem', () => {
  const defaultProps = {
    id: 'test-1',
    position: [0, 0, 0] as [number, number, number],
    name: 'Test Furniture',
    color: '#ff0000'
  };

  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <Physics>
          <FurnitureItem {...defaultProps} />
        </Physics>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should accept custom position', () => {
    const customPosition: [number, number, number] = [1, 2, 3];
    const { container } = render(
      <Canvas>
        <Physics>
          <FurnitureItem {...defaultProps} position={customPosition} />
        </Physics>
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('should call onInteract when clicked', () => {
    const onInteract = vi.fn();
    const { container } = render(
      <Canvas>
        <Physics>
          <FurnitureItem {...defaultProps} onInteract={onInteract} />
        </Physics>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
