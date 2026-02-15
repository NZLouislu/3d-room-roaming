import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../hooks/useStore';

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({ currentPropertyId: 'demo-house' });
  });

  it('should have a default property id', () => {
    const state = useStore.getState();
    expect(state.currentPropertyId).toBe('demo-house');
  });

  it('should change current property id', () => {
    const { setCurrentPropertyId } = useStore.getState();
    setCurrentPropertyId('auckland-northcross');

    expect(useStore.getState().currentPropertyId).toBe('auckland-northcross');
  });
});
