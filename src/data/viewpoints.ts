export interface Viewpoint {
  id: string;
  name: string;
  icon: string;
  position: [number, number, number];
  lookAt: [number, number, number];
  category: 'exterior' | 'interior' | 'special';
}

export const HOUSE_VIEWPOINTS: Viewpoint[] = [
  {
    id: 'front-exterior',
    name: 'Front View',
    icon: '🏠',
    position: [0, 3, 25],
    lookAt: [0, 5, 0],
    category: 'exterior'
  },
  {
    id: 'aerial',
    name: 'Aerial View',
    icon: '🛩️',
    position: [0, 25, 0],
    lookAt: [0, 0, 0],
    category: 'special'
  },
  {
    id: 'entrance',
    name: 'Main Entrance',
    icon: '🚪',
    position: [0, 1.6, 10],
    lookAt: [0, 1.6, 0],
    category: 'exterior'
  },
  {
    id: 'living-room',
    name: 'Living Room',
    icon: '🛋️',
    position: [0, 1.6, 0],
    lookAt: [0, 1.6, -5],
    category: 'interior'
  },
  {
    id: 'master-bedroom',
    name: 'Master Bedroom',
    icon: '🛏️',
    position: [5, 5.6, 5],
    lookAt: [0, 5.6, 0],
    category: 'interior'
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: '🍳',
    position: [-5, 1.6, -3],
    lookAt: [-5, 1.6, -8],
    category: 'interior'
  },
  {
    id: 'garden',
    name: 'Garden View',
    icon: '🌳',
    position: [0, 3, -20],
    lookAt: [0, 3, 0],
    category: 'exterior'
  }
];
