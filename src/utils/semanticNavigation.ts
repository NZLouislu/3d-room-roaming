import { Vector3 } from "three";
import {
  HOUSE_SEMANTIC_STRUCTURE,
  SemanticRoom,
  RoomType,
  TOUR_POINT_ROOM_MAP
} from "../data/houseStructure";

export function getRoomCenter(room: SemanticRoom): Vector3 {
  const centerX = room.bounds2D.x + room.bounds2D.width / 2;
  const centerZ = room.bounds2D.z + room.bounds2D.depth / 2;
  const centerY = room.elevation;
  return new Vector3(centerX, centerY, centerZ);
}

export function getCameraPositionForRoom(
  roomId: string,
  viewType: "default" | "corner" | "detail" = "default"
): { position: Vector3; lookAt: Vector3 } | null {
  const room = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === roomId);
  if (!room) return null;

  const center = getRoomCenter(room);
  const vp = room.viewpoints[viewType] || room.viewpoints.default;

  return {
    position: new Vector3(
      center.x + vp.offset[0],
      center.y + vp.offset[1],
      center.z + vp.offset[2]
    ),
    lookAt: new Vector3(
      center.x + vp.lookAtOffset[0],
      center.y + vp.lookAtOffset[1],
      center.z + vp.lookAtOffset[2]
    )
  };
}

export function findRoomById(roomId: string): SemanticRoom | null {
  return HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === roomId) || null;
}

export function findRoomsByType(type: RoomType, floor?: number): SemanticRoom[] {
  return HOUSE_SEMANTIC_STRUCTURE.filter(
    (r) => r.type === type && (floor === undefined || r.floor === floor)
  );
}

export function findRoomsByFloor(floor: 0 | 1 | 2): SemanticRoom[] {
  return HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.floor === floor);
}

export function getCurrentRoom(position: Vector3): SemanticRoom | null {
  const matchingRooms = HOUSE_SEMANTIC_STRUCTURE.filter((room) => {
    const inX =
      position.x >= room.bounds2D.x &&
      position.x <= room.bounds2D.x + room.bounds2D.width;
    const inZ =
      position.z >= room.bounds2D.z &&
      position.z <= room.bounds2D.z + room.bounds2D.depth;
    const inY =
      position.y >= room.elevation &&
      position.y <= room.elevation + room.ceilingHeight;
    return inX && inZ && inY;
  });

  if (matchingRooms.length === 0) return null;
  if (matchingRooms.length === 1) return matchingRooms[0];

  return matchingRooms.reduce((smallest, room) => {
    const smallestArea = smallest.bounds2D.width * smallest.bounds2D.depth;
    const roomArea = room.bounds2D.width * room.bounds2D.depth;
    return roomArea < smallestArea ? room : smallest;
  });
}

export function navigateToRoom(
  roomQuery: string
): { position: Vector3; lookAt: Vector3 } | null {
  const normalized = roomQuery.toLowerCase().replace(/\s+/g, "-");

  let room = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === normalized);

  if (!room) {
    room = HOUSE_SEMANTIC_STRUCTURE.find(
      (r) =>
        r.type.replace("_", "-") === normalized ||
        r.name.toLowerCase().includes(roomQuery.toLowerCase())
    );
  }

  if (!room) return null;
  return getCameraPositionForRoom(room.id);
}

export function getRoomForTourPoint(tourPointId: number): SemanticRoom | null {
  const roomId = TOUR_POINT_ROOM_MAP[tourPointId];
  if (!roomId) return null;
  return findRoomById(roomId);
}

export function getConnectedRooms(roomId: string): SemanticRoom[] {
  const room = findRoomById(roomId);
  if (!room) return [];

  return room.connectedTo
    .map((id) => findRoomById(id))
    .filter((r): r is SemanticRoom => r !== null);
}

export function planRoute(
  fromRoomId: string,
  toRoomId: string
): string[] | null {
  const visited = new Set<string>();
  const queue: { roomId: string; path: string[] }[] = [
    { roomId: fromRoomId, path: [fromRoomId] }
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.roomId === toRoomId) {
      return current.path;
    }

    if (visited.has(current.roomId)) continue;
    visited.add(current.roomId);

    const room = findRoomById(current.roomId);
    if (!room) continue;

    for (const connectedId of room.connectedTo) {
      if (!visited.has(connectedId)) {
        queue.push({
          roomId: connectedId,
          path: [...current.path, connectedId]
        });
      }
    }
  }

  return null;
}

export function getAllRooms(): SemanticRoom[] {
  return [...HOUSE_SEMANTIC_STRUCTURE];
}

export function getRoomsByCategory(): {
  exterior: SemanticRoom[];
  firstFloor: SemanticRoom[];
  secondFloor: SemanticRoom[];
} {
  return {
    exterior: HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.floor === 0),
    firstFloor: HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.floor === 1),
    secondFloor: HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.floor === 2)
  };
}
