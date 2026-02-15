import { TourPoint, DOUBLE_FLOOR_HOUSE_TOUR } from './tourPoints';
import { AUCKLAND_NORTHCROSS_TOUR } from './aucklandTourPoints';

export type Region = 'Auckland' | 'Wellington' | 'Demo';

export interface RoomLabel {
    id: string;
    name: string;
    description?: string;
    position: [number, number, number];
}

export interface PropertyConfig {
    id: string;
    name: string;
    region: Region;
    modelPath: string;
    coordinates: { lat: number; lng: number };
    initialPosition: [number, number, number];
    initialLookAt: [number, number, number];
    materialStyle: 'modern' | 'minimalist' | 'none';
    floorPlanPath?: string;
    description: string;
    tourPoints: TourPoint[];
    roomLabels?: RoomLabel[];
}

export const PROPERTY_LIST: PropertyConfig[] = [
    {
        id: 'demo-house',
        name: 'Classic Two-Story House',
        region: 'Demo',
        modelPath: '/models/two-story-house.glb',
        coordinates: { lat: 0, lng: 0 },
        initialPosition: [146.65, 14, 138.17],
        initialLookAt: [150, 14, 145],
        materialStyle: 'minimalist',
        description: 'A professional two-story architectural demo house.',
        tourPoints: DOUBLE_FLOOR_HOUSE_TOUR
    },
    {
        id: 'auckland-northcross',
        name: 'Auckland Northcross Rooms',
        region: 'Auckland',
        modelPath: '/models/Auckland Northcross rooms.glb',
        coordinates: { lat: -36.723, lng: 174.745 },
        initialPosition: [-5, 3, 5],
        initialLookAt: [0, 1.5, 0],
        materialStyle: 'modern',
        description: 'A real-world interior scan of a residential property in Northcross, Auckland.',
        tourPoints: AUCKLAND_NORTHCROSS_TOUR,
        roomLabels: [
            // Top Row (Left to Right)
            { id: 'top-1', name: 'Living Room', position: [-4, 1.9, -2.5] },
            { id: 'top-2', name: 'Child Bedroom', position: [0.2, 1.9, -3.5] },
            { id: 'top-3', name: 'Guest Bedroom', position: [2.6, 1.9, -3.5] },
            { id: 'top-4', name: 'Master Suite', position: [6, 1.5, -3.5] },

            // Bottom Row (Left to Right) - Moved 20px (approx 2.5 units) up/inward
            { id: 'bot-1', name: 'Family Living', position: [-5.3, 1.5, 0.5] },
            { id: 'bot-2', name: 'Kitchen', position: [-2.5, 1.5, 1.3] },
            { id: 'bot-3', name: 'Dining Area', position: [0.3, 1.5, 0.5] },
            { id: 'bot-4', name: 'Laundry Room', position: [3.1, 1.5, 1.9] },
            { id: 'bot-5', name: 'Guest Toilet', position: [4.8, 1.5, 1.3] },
            { id: 'bot-6', name: 'Luxury Bathroom', position: [7.2, 1.5, 1.5] },

            // Extreme Bottom
            { id: 'patio', name: 'Covered Patio & Deck', position: [1.2, 1.5, 4] }
        ]
    }
];

export const getPropertyById = (id: string) => PROPERTY_LIST.find(p => p.id === id);
