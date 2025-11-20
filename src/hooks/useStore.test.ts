import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useStore } from './useStore';

describe('useStore', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.selectedObject).toBeNull();
  });

  it('should update selectedObject', () => {
    const { result } = renderHook(() => useStore());
    const mockData = { name: 'Sofa', price: '$999', description: 'Comfy' };

    act(() => {
      result.current.setSelectedObject(mockData);
    });

    expect(result.current.selectedObject).toEqual(mockData);
  });

  it('should clear selectedObject', () => {
    const { result } = renderHook(() => useStore());
    const mockData = { name: 'Sofa', price: '$999', description: 'Comfy' };

    act(() => {
      result.current.setSelectedObject(mockData);
    });
    expect(result.current.selectedObject).toEqual(mockData);

    act(() => {
      result.current.setSelectedObject(null);
    });
    expect(result.current.selectedObject).toBeNull();
  });
});
