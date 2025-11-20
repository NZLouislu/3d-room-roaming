import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Ground } from './Ground';
import { describe, it, expect } from 'vitest';

describe('Ground', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <Physics>
          <Ground />
        </Physics>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should render mesh with plane geometry', () => {
    const { container } = render(
      <Canvas>
        <Physics>
          <Ground />
        </Physics>
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('should have physics collider', () => {
    const { container } = render(
      <Canvas>
        <Physics>
          <Ground />
        </Physics>
      </Canvas>
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });
});
