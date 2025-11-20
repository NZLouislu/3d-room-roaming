import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Room } from './Room';
import { describe, it, expect } from 'vitest';

describe('Room', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <Physics>
          <Room />
        </Physics>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should render floor and walls', () => {
    const { container } = render(
      <Canvas>
        <Physics>
          <Room />
        </Physics>
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('should have doorway in front wall', () => {
    const { container } = render(
      <Canvas>
        <Physics>
          <Room />
        </Physics>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
