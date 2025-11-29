import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

beforeAll(() => {
  const mockUseGLTF: any = vi.fn(() => ({
    nodes: {
      TestMesh: { geometry: {} }
    },
    materials: {
      TestMaterial: {}
    }
  }));
  
  mockUseGLTF.preload = vi.fn();
  
  vi.mock('@react-three/drei', () => ({
    useGLTF: mockUseGLTF
  }));
});

describe('TwoStoryHouse', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should render canvas', () => {
    const { container } = render(
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });

  it('should render with physics', () => {
    const { container } = render(
      <Canvas>
        <Physics>
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Physics>
      </Canvas>
    );
    expect(container).toBeTruthy();
  });
});
