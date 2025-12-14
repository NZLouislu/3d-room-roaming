import { Vector3 } from "three";
import {
  SemanticRoom,
  RoomType,
  HOUSE_SEMANTIC_STRUCTURE
} from "../data/houseStructure";
import {
  getCameraPositionForRoom,
  findRoomById,
  findRoomsByType,
  findRoomsByFloor,
  getCurrentRoom,
  navigateToRoom,
  getConnectedRooms,
  planRoute,
  getAllRooms,
  getRoomsByCategory
} from "../utils/semanticNavigation";

export interface FloorPlanData {
  floor: 0 | 1 | 2;
  rooms: Array<{
    id: string;
    name: string;
    type: RoomType;
    bounds: { x: number; z: number; width: number; depth: number };
  }>;
}

export interface NavigationResult {
  success: boolean;
  position?: Vector3;
  lookAt?: Vector3;
  roomId?: string;
  roomName?: string;
  error?: string;
}

export interface AISceneInterface {
  goToRoom: (roomId: string) => NavigationResult;
  goToRoomByName: (roomName: string) => NavigationResult;
  goToRoomByType: (type: RoomType, floor?: number) => NavigationResult;
  listRooms: () => SemanticRoom[];
  listRoomsByFloor: (floor: 0 | 1 | 2) => SemanticRoom[];
  getCurrentLocation: (position: Vector3) => SemanticRoom | null;
  getFloorPlan: (floor: 0 | 1 | 2) => FloorPlanData;
  planRoute: (fromRoomId: string, toRoomId: string) => string[] | null;
  getConnectedRooms: (roomId: string) => SemanticRoom[];
  getRoomInfo: (roomId: string) => SemanticRoom | null;
}

export const AISceneAPI: AISceneInterface = {
  goToRoom: (roomId: string): NavigationResult => {
    const result = getCameraPositionForRoom(roomId);
    if (!result) {
      return {
        success: false,
        error: `Room not found: ${roomId}`
      };
    }

    const room = findRoomById(roomId);
    return {
      success: true,
      position: result.position,
      lookAt: result.lookAt,
      roomId: roomId,
      roomName: room?.name
    };
  },

  goToRoomByName: (roomName: string): NavigationResult => {
    const result = navigateToRoom(roomName);
    if (!result) {
      return {
        success: false,
        error: `Room not found by name: ${roomName}`
      };
    }

    const room = HOUSE_SEMANTIC_STRUCTURE.find((r) =>
      r.name.toLowerCase().includes(roomName.toLowerCase())
    );

    return {
      success: true,
      position: result.position,
      lookAt: result.lookAt,
      roomId: room?.id,
      roomName: room?.name
    };
  },

  goToRoomByType: (type: RoomType, floor?: number): NavigationResult => {
    const rooms = findRoomsByType(type, floor);
    if (rooms.length === 0) {
      return {
        success: false,
        error: `No room found with type: ${type}${floor !== undefined ? ` on floor ${floor}` : ""}`
      };
    }

    const room = rooms[0];
    const result = getCameraPositionForRoom(room.id);
    if (!result) {
      return {
        success: false,
        error: `Failed to get camera position for room: ${room.id}`
      };
    }

    return {
      success: true,
      position: result.position,
      lookAt: result.lookAt,
      roomId: room.id,
      roomName: room.name
    };
  },

  listRooms: (): SemanticRoom[] => {
    return getAllRooms();
  },

  listRoomsByFloor: (floor: 0 | 1 | 2): SemanticRoom[] => {
    return findRoomsByFloor(floor);
  },

  getCurrentLocation: (position: Vector3): SemanticRoom | null => {
    return getCurrentRoom(position);
  },

  getFloorPlan: (floor: 0 | 1 | 2): FloorPlanData => {
    const rooms = findRoomsByFloor(floor);
    return {
      floor,
      rooms: rooms.map((r) => ({
        id: r.id,
        name: r.name,
        type: r.type,
        bounds: r.bounds2D
      }))
    };
  },

  planRoute: (fromRoomId: string, toRoomId: string): string[] | null => {
    return planRoute(fromRoomId, toRoomId);
  },

  getConnectedRooms: (roomId: string): SemanticRoom[] => {
    return getConnectedRooms(roomId);
  },

  getRoomInfo: (roomId: string): SemanticRoom | null => {
    return findRoomById(roomId);
  }
};

export function formatRoomListForAI(): string {
  const { exterior, firstFloor, secondFloor } = getRoomsByCategory();

  let output = "Available Rooms:\n\n";

  output += "Exterior Views:\n";
  exterior.forEach((r) => {
    output += `  - ${r.id}: ${r.name}\n`;
  });

  output += "\nFirst Floor:\n";
  firstFloor.forEach((r) => {
    output += `  - ${r.id}: ${r.name} (${r.type})\n`;
  });

  output += "\nSecond Floor:\n";
  secondFloor.forEach((r) => {
    output += `  - ${r.id}: ${r.name} (${r.type})\n`;
  });

  return output;
}

export function formatFloorPlanForAI(floor: 0 | 1 | 2): string {
  const floorPlan = AISceneAPI.getFloorPlan(floor);
  const floorNames = ["Exterior", "First Floor", "Second Floor"];

  let output = `${floorNames[floor]} Layout:\n\n`;

  floorPlan.rooms.forEach((room) => {
    output += `${room.name} (${room.id}):\n`;
    output += `  Type: ${room.type}\n`;
    output += `  Position: X=${room.bounds.x}, Z=${room.bounds.z}\n`;
    output += `  Size: ${room.bounds.width}m x ${room.bounds.depth}m\n\n`;
  });

  return output;
}
