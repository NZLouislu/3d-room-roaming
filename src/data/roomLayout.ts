export interface FurnitureConfig {
  id: string;
  model?: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  interactive?: boolean;
  action?: string;
  name: string;
  price?: string;
  description?: string;
  color?: string;
}

export interface RoomConfig {
  furniture: FurnitureConfig[];
}

export const roomLayout: Record<string, RoomConfig> = {
  livingRoom: {
    furniture: [
      {
        id: 'sofa-1',
        position: [-2, 0.5, -2],
        rotation: [0, 0, 0],
        interactive: true,
        action: 'sit',
        name: 'Modern Sofa',
        price: '$599',
        description: 'Comfortable 3-seater sofa with premium fabric.',
        color: '#4f46e5'
      },
      {
        id: 'table-1',
        position: [2, 0.5, -2],
        interactive: true,
        action: 'inspect',
        name: 'Coffee Table',
        price: '$199',
        description: 'Solid oak wood coffee table.',
        color: '#d97706'
      },
      {
        id: 'lamp-1',
        position: [3, 0, 2],
        interactive: true,
        action: 'toggle_light',
        name: 'Floor Lamp',
        price: '$89',
        description: 'Modern LED floor lamp.',
        color: '#fbbf24'
      }
    ]
  },
  bedroom: {
    furniture: [
      {
        id: 'bed-1',
        position: [5, 0.5, -5],
        interactive: true,
        action: 'sleep',
        name: 'Queen Bed',
        price: '$899',
        description: 'Comfortable queen-size bed.',
        color: '#8b5cf6'
      }
    ]
  }
};
