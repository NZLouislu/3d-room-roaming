import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Trees } from './Trees';
import { describe, it, expect } from 'vitest';

describe('Trees', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <Trees count={10} />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should accept custom count prop', () => {
    const { container } = render(
      <Canvas>
        <Trees count={5} />
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('should use default count when not specified', () => {
    const { container } = render(
      <Canvas>
        <Trees />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
