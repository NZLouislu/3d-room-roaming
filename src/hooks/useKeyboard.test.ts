import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useKeyboard } from './useKeyboard';

describe('useKeyboard', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useKeyboard());
    expect(result.current).toEqual({
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
    });
  });

  it('should update state on key down', () => {
    const { result } = renderHook(() => useKeyboard());

    act(() => {
      const event = new KeyboardEvent('keydown', { code: 'KeyW' });
      document.dispatchEvent(event);
    });

    expect(result.current.forward).toBe(true);
  });

  it('should update state on key up', () => {
    const { result } = renderHook(() => useKeyboard());

    // Press key
    act(() => {
      const event = new KeyboardEvent('keydown', { code: 'KeyW' });
      document.dispatchEvent(event);
    });
    expect(result.current.forward).toBe(true);

    // Release key
    act(() => {
      const event = new KeyboardEvent('keyup', { code: 'KeyW' });
      document.dispatchEvent(event);
    });
    expect(result.current.forward).toBe(false);
  });

  it('should handle multiple keys', () => {
    const { result } = renderHook(() => useKeyboard());

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
    });

    expect(result.current.forward).toBe(true);
    expect(result.current.left).toBe(true);
  });
});
