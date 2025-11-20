import { roomLayout } from './roomLayout';
import { describe, it, expect } from 'vitest';

describe('roomLayout', () => {
  it('should have livingRoom configuration', () => {
    expect(roomLayout.livingRoom).toBeDefined();
    expect(roomLayout.livingRoom.furniture).toBeInstanceOf(Array);
  });

  it('should have bedroom configuration', () => {
    expect(roomLayout.bedroom).toBeDefined();
    expect(roomLayout.bedroom.furniture).toBeInstanceOf(Array);
  });

  it('should have valid furniture items in livingRoom', () => {
    const { furniture } = roomLayout.livingRoom;
    expect(furniture.length).toBeGreaterThan(0);
    
    furniture.forEach(item => {
      expect(item.id).toBeDefined();
      expect(item.position).toBeInstanceOf(Array);
      expect(item.position.length).toBe(3);
      expect(item.name).toBeDefined();
    });
  });

  it('should have valid position arrays', () => {
    const allFurniture = [
      ...roomLayout.livingRoom.furniture,
      ...roomLayout.bedroom.furniture
    ];

    allFurniture.forEach(item => {
      expect(item.position).toHaveLength(3);
      item.position.forEach(coord => {
        expect(typeof coord).toBe('number');
      });
    });
  });

  it('should have unique furniture IDs', () => {
    const allFurniture = [
      ...roomLayout.livingRoom.furniture,
      ...roomLayout.bedroom.furniture
    ];

    const ids = allFurniture.map(item => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
