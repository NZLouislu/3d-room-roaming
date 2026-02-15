import { TourPoint, DOUBLE_FLOOR_HOUSE_TOUR } from './tourPoints';
import { AUCKLAND_NORTHCROSS_TOUR } from './aucklandTourPoints';

export type Region = 'Auckland' | 'Wellington' | 'Demo';

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
        tourPoints: AUCKLAND_NORTHCROSS_TOUR
    }
];

export const getPropertyById = (id: string) => PROPERTY_LIST.find(p => p.id === id);
