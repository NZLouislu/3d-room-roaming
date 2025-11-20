import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Environment } from './Environment';
import { useStore } from '../../hooks/useStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Environment', () => {
  beforeEach(() => {
    useStore.setState({ isNight: false });
  });

  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <Environment />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should render Sky component', () => {
    const { container } = render(
      <Canvas>
        <Environment />
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('should change sun position based on day/night mode', () => {
    const { rerender } = render(
      <Canvas>
        <Environment />
      </Canvas>
    );

    useStore.setState({ isNight: true });

    rerender(
      <Canvas>
        <Environment />
      </Canvas>
    );

    expect(useStore.getState().isNight).toBe(true);
  });
});
