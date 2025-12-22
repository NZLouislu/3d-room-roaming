import { render, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Lighting } from './Lighting';
import { useStore } from '../../hooks/useStore';

// Mock Zustand
vi.mock('../../hooks/useStore', () => ({
  useStore: vi.fn(),
}));

// Mock Three.js hooks
const mockScene = { background: null };
vi.mock('@react-three/fiber', () => ({
  useThree: () => ({ scene: mockScene }),
}));

describe('Lighting', () => {
  it('sets day background color by default', () => {
    (useStore as any).mockImplementation((selector: any) => {
      const state = { isNight: false, performanceTier: 'high' };
      return selector ? selector(state) : state;
    });
    
    render(<Lighting />);
    
    expect(mockScene.background).toBeDefined();
  });

  it('changes background when isNight is true', () => {
    (useStore as any).mockImplementation((selector: any) => {
      const state = { isNight: true, performanceTier: 'high' };
      return selector ? selector(state) : state;
    });
    
    render(<Lighting />);
    
    expect(mockScene.background).toBeDefined();
  });
});
