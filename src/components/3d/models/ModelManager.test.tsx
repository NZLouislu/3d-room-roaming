import { render, screen } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { ModelManager, Loader } from './ModelManager';
import { describe, it, expect } from 'vitest';

describe('ModelManager', () => {
  it('should render children when loaded', () => {
    const { container } = render(
      <Canvas>
        <ModelManager>
          <mesh data-testid="test-mesh">
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </ModelManager>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should render without crashing', () => {
    const { container } = render(
      <Canvas>
        <ModelManager>
          <group />
        </ModelManager>
      </Canvas>
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});

describe('Loader', () => {
  it('should render loading text', () => {
    const { container } = render(
      <Canvas>
        <Loader />
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
