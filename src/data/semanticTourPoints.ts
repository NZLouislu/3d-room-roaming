import { getCameraPositionForRoom } from "../utils/semanticNavigation";
import { TourPoint } from "./tourPoints";

export interface SemanticTourPoint {
  id: number;
  roomId: string;
  viewType: "default" | "corner" | "detail" | "custom";
  customPosition?: [number, number, number];
  customLookAt?: [number, number, number];
  duration: number;
  title: string;
  description: string;
}

export const SEMANTIC_HOUSE_TOUR: SemanticTourPoint[] = [
  {
    id: 1,
    roomId: "exterior-aerial",
    viewType: "default",
    duration: 3,
    title: "Welcome - Backyard Overview",
    description: "Stunning aerial view of the backyard with deck, stairs, and garage"
  },
  {
    id: 2,
    roomId: "deck-1f",
    viewType: "custom",
    customPosition: [12, 15, -17],
    customLookAt: [0, 12, 0],
    duration: 4,
    title: "Backyard Deck & Patio",
    description: "Spacious wooden deck perfect for outdoor entertaining"
  },
  {
    id: 3,
    roomId: "stairs-exterior",
    viewType: "custom",
    customPosition: [-10, 12, -20],
    customLookAt: [0, 12, -12],
    duration: 3,
    title: "Outdoor Stairs",
    description: "Elegant stairs connecting the yard to the deck area"
  },
  {
    id: 4,
    roomId: "garage-1f",
    viewType: "custom",
    customPosition: [-10, 12, -20],
    customLookAt: [0, 12, -10],
    duration: 3,
    title: "Garage Entrance",
    description: "Convenient garage access with modern door design"
  },
  {
    id: 5,
    roomId: "entrance-1f",
    viewType: "custom",
    customPosition: [0, 12, -10],
    customLookAt: [0, 12, -5],
    duration: 4,
    title: "Main Entrance Door",
    description: "Welcoming entrance with glass panels and modern design"
  },
  {
    id: 6,
    roomId: "foyer-1f",
    viewType: "custom",
    customPosition: [0, 16, -5],
    customLookAt: [0, 16, 5],
    duration: 4,
    title: "Foyer & Entry Hall",
    description: "Bright and spacious entrance hall with natural light"
  },
  {
    id: 7,
    roomId: "living-room-1f",
    viewType: "custom",
    customPosition: [9, 16, 5],
    customLookAt: [0, 16, 5],
    duration: 5,
    title: "Living Room",
    description: "Open-concept living area with floor-to-ceiling windows"
  },
  {
    id: 8,
    roomId: "dining-room-1f",
    viewType: "custom",
    customPosition: [-5, 16, 6],
    customLookAt: [0, 16, 5],
    duration: 4,
    title: "Dining Area",
    description: "Elegant dining space adjacent to the kitchen"
  },
  {
    id: 9,
    roomId: "kitchen-1f",
    viewType: "custom",
    customPosition: [8, 16, 3],
    customLookAt: [0, 16, 3],
    duration: 5,
    title: "Modern Kitchen",
    description: "State-of-the-art kitchen with premium appliances and island"
  },
  {
    id: 10,
    roomId: "stairs-1f",
    viewType: "custom",
    customPosition: [0, 18, 0],
    customLookAt: [0, 20, 0],
    duration: 3,
    title: "Staircase to Second Floor",
    description: "Elegant staircase with modern railing design"
  },
  {
    id: 11,
    roomId: "hallway-2f",
    viewType: "custom",
    customPosition: [0, 20, 5],
    customLookAt: [8, 20, 5],
    duration: 3,
    title: "Second Floor Hallway",
    description: "Spacious hallway connecting all second floor rooms"
  },
  {
    id: 12,
    roomId: "master-bedroom-2f",
    viewType: "custom",
    customPosition: [10, 20, 5],
    customLookAt: [5, 20, 5],
    duration: 5,
    title: "Master Bedroom",
    description: "Luxurious master suite with walk-in closet and en-suite bathroom"
  },
  {
    id: 13,
    roomId: "master-bath-2f",
    viewType: "custom",
    customPosition: [8, 20, 8],
    customLookAt: [5, 20, 8],
    duration: 4,
    title: "Master Bathroom",
    description: "Spa-like master bathroom with premium finishes"
  },
  {
    id: 14,
    roomId: "bedroom2-2f",
    viewType: "custom",
    customPosition: [-8, 20, 8],
    customLookAt: [-3, 20, 8],
    duration: 4,
    title: "Bedroom #2",
    description: "Spacious second bedroom with great views"
  },
  {
    id: 15,
    roomId: "bedroom3-2f",
    viewType: "custom",
    customPosition: [-8, 20, 3],
    customLookAt: [-3, 20, 3],
    duration: 4,
    title: "Bedroom #3",
    description: "Comfortable third bedroom perfect for family or guests"
  },
  {
    id: 16,
    roomId: "bedroom4-2f",
    viewType: "custom",
    customPosition: [8, 20, -3],
    customLookAt: [3, 20, -3],
    duration: 4,
    title: "Bedroom #4",
    description: "Fourth bedroom with ample closet space"
  },
  {
    id: 17,
    roomId: "bathroom-2f",
    viewType: "custom",
    customPosition: [-8, 20, -3],
    customLookAt: [-3, 20, -3],
    duration: 3,
    title: "Second Floor Bathroom",
    description: "Full bathroom serving bedrooms 2, 3, and 4"
  },
  {
    id: 18,
    roomId: "exterior-final",
    viewType: "default",
    duration: 4,
    title: "Final Overview",
    description: "Complete view of your dream home. Tour complete - explore freely!"
  }
];

export function semanticTourPointToLegacy(point: SemanticTourPoint): TourPoint {
  if (point.viewType === "custom" && point.customPosition && point.customLookAt) {
    return {
      id: point.id,
      position: point.customPosition,
      lookAt: point.customLookAt,
      duration: point.duration,
      title: point.title,
      description: point.description
    };
  }

  const cameraData = getCameraPositionForRoom(point.roomId, point.viewType === "custom" ? "default" : point.viewType);

  if (cameraData) {
    return {
      id: point.id,
      position: [cameraData.position.x, cameraData.position.y, cameraData.position.z],
      lookAt: [cameraData.lookAt.x, cameraData.lookAt.y, cameraData.lookAt.z],
      duration: point.duration,
      title: point.title,
      description: point.description
    };
  }

  return {
    id: point.id,
    position: [0, 20, 0],
    lookAt: [0, 0, 0],
    duration: point.duration,
    title: point.title,
    description: point.description
  };
}

export function convertSemanticTourToLegacy(
  semanticTour: SemanticTourPoint[]
): TourPoint[] {
  return semanticTour.map(semanticTourPointToLegacy);
}

export const LEGACY_COMPATIBLE_TOUR = convertSemanticTourToLegacy(SEMANTIC_HOUSE_TOUR);
