import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Garden } from './Garden';
import { describe, it, expect } from 'vitest';

describe('Garden', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <Garden />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should render all garden elements', () => {
    const { container } = render(
      <Canvas>
        <Garden />
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});
