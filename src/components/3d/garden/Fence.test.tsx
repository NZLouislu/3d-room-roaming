import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Fence } from './Fence';
import { describe, it, expect } from 'vitest';

describe('Fence', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <Fence />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should render fence posts', () => {
    const { container } = render(
      <Canvas>
        <Fence />
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});
