export type RoomType =
  | "foyer"
  | "living_room"
  | "dining_room"
  | "kitchen"
  | "master_bedroom"
  | "bedroom"
  | "bathroom"
  | "hallway"
  | "garage"
  | "deck"
  | "stairs"
  | "exterior";

export interface ViewpointConfig {
  offset: [number, number, number];
  lookAtOffset: [number, number, number];
}

export interface SemanticRoom {
  id: string;
  type: RoomType;
  floor: 0 | 1 | 2;
  name: string;
  bounds2D: {
    x: number;
    z: number;
    width: number;
    depth: number;
  };
  elevation: number;
  ceilingHeight: number;
  viewpoints: {
    default: ViewpointConfig;
    corner?: ViewpointConfig;
    detail?: ViewpointConfig;
  };
  connectedTo: string[];
}

export const HOUSE_SEMANTIC_STRUCTURE: SemanticRoom[] = [
  {
    id: "exterior-aerial",
    type: "exterior",
    floor: 0,
    name: "Aerial Overview",
    bounds2D: { x: -50, z: -60, width: 20, depth: 20 },
    elevation: 25,
    ceilingHeight: 25,
    viewpoints: {
      default: { offset: [3, 28, -35], lookAtOffset: [0, 0, 0] }
    },
    connectedTo: ["deck-1f"]
  },
  {
    id: "deck-1f",
    type: "deck",
    floor: 1,
    name: "Backyard Deck & Patio",
    bounds2D: { x: -5, z: -20, width: 20, depth: 10 },
    elevation: 10,
    ceilingHeight: 6,
    viewpoints: {
      default: { offset: [12, 5, -7], lookAtOffset: [0, 2, 0] }
    },
    connectedTo: ["exterior-aerial", "stairs-exterior", "foyer-1f"]
  },
  {
    id: "stairs-exterior",
    type: "stairs",
    floor: 1,
    name: "Outdoor Stairs",
    bounds2D: { x: -12, z: -22, width: 6, depth: 6 },
    elevation: 10,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [-10, 2, -8], lookAtOffset: [0, 2, -2] }
    },
    connectedTo: ["deck-1f", "garage-1f"]
  },
  {
    id: "garage-1f",
    type: "garage",
    floor: 1,
    name: "Garage Entrance",
    bounds2D: { x: -12, z: -15, width: 8, depth: 8 },
    elevation: 10,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [-10, 2, -8], lookAtOffset: [0, 2, 2] }
    },
    connectedTo: ["stairs-exterior", "foyer-1f"]
  },
  {
    id: "entrance-1f",
    type: "foyer",
    floor: 1,
    name: "Main Entrance Door",
    bounds2D: { x: -3, z: -12, width: 6, depth: 4 },
    elevation: 10,
    ceilingHeight: 6,
    viewpoints: {
      default: { offset: [0, 2, 2], lookAtOffset: [0, 2, 7] }
    },
    connectedTo: ["garage-1f", "foyer-1f"]
  },
  {
    id: "foyer-1f",
    type: "foyer",
    floor: 1,
    name: "Foyer & Entry Hall",
    bounds2D: { x: -4, z: -8, width: 8, depth: 8 },
    elevation: 12,
    ceilingHeight: 6,
    viewpoints: {
      default: { offset: [0, 4, 3], lookAtOffset: [0, 4, 13] }
    },
    connectedTo: ["entrance-1f", "living-room-1f", "dining-room-1f", "stairs-1f"]
  },
  {
    id: "living-room-1f",
    type: "living_room",
    floor: 1,
    name: "Living Room",
    bounds2D: { x: 4, z: 0, width: 10, depth: 10 },
    elevation: 12,
    ceilingHeight: 6,
    viewpoints: {
      default: { offset: [5, 4, 0], lookAtOffset: [-4, 4, 0] }
    },
    connectedTo: ["foyer-1f", "dining-room-1f", "stairs-1f"]
  },
  {
    id: "dining-room-1f",
    type: "dining_room",
    floor: 1,
    name: "Dining Area",
    bounds2D: { x: -10, z: 0, width: 8, depth: 10 },
    elevation: 12,
    ceilingHeight: 6,
    viewpoints: {
      default: { offset: [-5, 4, 1], lookAtOffset: [0, 4, 0] }
    },
    connectedTo: ["foyer-1f", "kitchen-1f", "living-room-1f"]
  },
  {
    id: "kitchen-1f",
    type: "kitchen",
    floor: 1,
    name: "Modern Kitchen",
    bounds2D: { x: 2, z: -2, width: 10, depth: 8 },
    elevation: 12,
    ceilingHeight: 6,
    viewpoints: {
      default: { offset: [4, 4, -1], lookAtOffset: [-4, 4, -1] }
    },
    connectedTo: ["dining-room-1f"]
  },
  {
    id: "stairs-1f",
    type: "stairs",
    floor: 1,
    name: "Staircase to Second Floor",
    bounds2D: { x: -2, z: -2, width: 4, depth: 4 },
    elevation: 14,
    ceilingHeight: 8,
    viewpoints: {
      default: { offset: [0, 4, 0], lookAtOffset: [0, 6, 0] }
    },
    connectedTo: ["foyer-1f", "living-room-1f", "hallway-2f"]
  },
  {
    id: "hallway-2f",
    type: "hallway",
    floor: 2,
    name: "Second Floor Hallway",
    bounds2D: { x: -4, z: 0, width: 8, depth: 10 },
    elevation: 18,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [0, 2, 5], lookAtOffset: [8, 2, 5] }
    },
    connectedTo: ["stairs-1f", "master-bedroom-2f", "bedroom2-2f", "bedroom3-2f", "bedroom4-2f", "bathroom-2f"]
  },
  {
    id: "master-bedroom-2f",
    type: "master_bedroom",
    floor: 2,
    name: "Master Bedroom",
    bounds2D: { x: 4, z: 0, width: 12, depth: 10 },
    elevation: 18,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [6, 2, 0], lookAtOffset: [0, 2, 0] }
    },
    connectedTo: ["hallway-2f", "master-bath-2f"]
  },
  {
    id: "master-bath-2f",
    type: "bathroom",
    floor: 2,
    name: "Master Bathroom",
    bounds2D: { x: 4, z: 6, width: 8, depth: 6 },
    elevation: 18,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [4, 2, 4], lookAtOffset: [0, 2, 4] }
    },
    connectedTo: ["master-bedroom-2f"]
  },
  {
    id: "bedroom2-2f",
    type: "bedroom",
    floor: 2,
    name: "Bedroom #2",
    bounds2D: { x: -14, z: 4, width: 10, depth: 8 },
    elevation: 18,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [-4, 2, 4], lookAtOffset: [2, 2, 4] }
    },
    connectedTo: ["hallway-2f"]
  },
  {
    id: "bedroom3-2f",
    type: "bedroom",
    floor: 2,
    name: "Bedroom #3",
    bounds2D: { x: -14, z: -2, width: 10, depth: 8 },
    elevation: 18,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [-4, 2, -1], lookAtOffset: [2, 2, -1] }
    },
    connectedTo: ["hallway-2f"]
  },
  {
    id: "bedroom4-2f",
    type: "bedroom",
    floor: 2,
    name: "Bedroom #4",
    bounds2D: { x: 4, z: -8, width: 10, depth: 8 },
    elevation: 18,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [4, 2, -1], lookAtOffset: [-2, 2, -1] }
    },
    connectedTo: ["hallway-2f"]
  },
  {
    id: "bathroom-2f",
    type: "bathroom",
    floor: 2,
    name: "Second Floor Bathroom",
    bounds2D: { x: -14, z: -8, width: 8, depth: 6 },
    elevation: 18,
    ceilingHeight: 4,
    viewpoints: {
      default: { offset: [-4, 2, -1], lookAtOffset: [2, 2, -1] }
    },
    connectedTo: ["hallway-2f"]
  },
  {
    id: "exterior-final",
    type: "exterior",
    floor: 0,
    name: "Final Overview",
    bounds2D: { x: -50, z: -50, width: 100, depth: 100 },
    elevation: 0,
    ceilingHeight: 50,
    viewpoints: {
      default: { offset: [40, 30, 40], lookAtOffset: [0, 0, 0] }
    },
    connectedTo: []
  }
];

export const TOUR_POINT_ROOM_MAP: Record<number, string> = {
  1: "exterior-aerial",
  2: "deck-1f",
  3: "stairs-exterior",
  4: "garage-1f",
  5: "entrance-1f",
  6: "foyer-1f",
  7: "living-room-1f",
  8: "dining-room-1f",
  9: "kitchen-1f",
  10: "stairs-1f",
  11: "hallway-2f",
  12: "master-bedroom-2f",
  13: "master-bath-2f",
  14: "bedroom2-2f",
  15: "bedroom3-2f",
  16: "bedroom4-2f",
  17: "bathroom-2f",
  18: "exterior-final"
};
