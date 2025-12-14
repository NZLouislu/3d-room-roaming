import { describe, it, expect } from "vitest";
import { Vector3 } from "three";
import {
  getRoomCenter,
  getCameraPositionForRoom,
  findRoomById,
  findRoomsByType,
  findRoomsByFloor,
  getCurrentRoom,
  navigateToRoom,
  getRoomForTourPoint,
  getConnectedRooms,
  planRoute,
  getAllRooms,
  getRoomsByCategory
} from "./semanticNavigation";

describe("semanticNavigation", () => {
  describe("getRoomCenter", () => {
    it("should calculate correct center for kitchen", () => {
      const kitchen = findRoomById("kitchen-1f");
      expect(kitchen).toBeDefined();

      const center = getRoomCenter(kitchen!);
      expect(center).toBeInstanceOf(Vector3);
      expect(center.x).toBe(kitchen!.bounds2D.x + kitchen!.bounds2D.width / 2);
      expect(center.z).toBe(kitchen!.bounds2D.z + kitchen!.bounds2D.depth / 2);
      expect(center.y).toBe(kitchen!.elevation);
    });
  });

  describe("getCameraPositionForRoom", () => {
    it("should return position and lookAt for valid room", () => {
      const result = getCameraPositionForRoom("kitchen-1f");
      expect(result).not.toBeNull();
      expect(result?.position).toBeInstanceOf(Vector3);
      expect(result?.lookAt).toBeInstanceOf(Vector3);
    });

    it("should return null for invalid room", () => {
      const result = getCameraPositionForRoom("non-existent-room");
      expect(result).toBeNull();
    });

    it("should return different positions for different rooms", () => {
      const kitchen = getCameraPositionForRoom("kitchen-1f");
      const livingRoom = getCameraPositionForRoom("living-room-1f");

      expect(kitchen).not.toBeNull();
      expect(livingRoom).not.toBeNull();
      expect(kitchen?.position.equals(livingRoom!.position)).toBe(false);
    });

    it("should apply viewpoint offset correctly", () => {
      const room = findRoomById("kitchen-1f");
      const result = getCameraPositionForRoom("kitchen-1f");

      expect(room).toBeDefined();
      expect(result).not.toBeNull();

      const expectedX =
        room!.bounds2D.x +
        room!.bounds2D.width / 2 +
        room!.viewpoints.default.offset[0];
      expect(result?.position.x).toBe(expectedX);
    });
  });

  describe("findRoomById", () => {
    it("should find kitchen by ID", () => {
      const room = findRoomById("kitchen-1f");
      expect(room).toBeDefined();
      expect(room?.name).toBe("Modern Kitchen");
    });

    it("should find master bedroom by ID", () => {
      const room = findRoomById("master-bedroom-2f");
      expect(room).toBeDefined();
      expect(room?.type).toBe("master_bedroom");
    });

    it("should return null for non-existent ID", () => {
      const room = findRoomById("fake-room");
      expect(room).toBeNull();
    });
  });

  describe("findRoomsByType", () => {
    it("should find all bedrooms", () => {
      const bedrooms = findRoomsByType("bedroom");
      expect(bedrooms.length).toBe(3);
    });

    it("should find bedrooms on specific floor", () => {
      const secondFloorBedrooms = findRoomsByType("bedroom", 2);
      expect(secondFloorBedrooms.length).toBe(3);
      secondFloorBedrooms.forEach((room) => {
        expect(room.floor).toBe(2);
      });
    });

    it("should find single kitchen", () => {
      const kitchens = findRoomsByType("kitchen");
      expect(kitchens.length).toBe(1);
      expect(kitchens[0].id).toBe("kitchen-1f");
    });

    it("should return empty array for non-existent type on floor", () => {
      const kitchensOnSecondFloor = findRoomsByType("kitchen", 2);
      expect(kitchensOnSecondFloor.length).toBe(0);
    });
  });

  describe("findRoomsByFloor", () => {
    it("should find all first floor rooms", () => {
      const firstFloorRooms = findRoomsByFloor(1);
      expect(firstFloorRooms.length).toBe(9);
      firstFloorRooms.forEach((room) => {
        expect(room.floor).toBe(1);
      });
    });

    it("should find all second floor rooms", () => {
      const secondFloorRooms = findRoomsByFloor(2);
      expect(secondFloorRooms.length).toBe(7);
    });

    it("should find exterior rooms", () => {
      const exteriorRooms = findRoomsByFloor(0);
      expect(exteriorRooms.length).toBe(2);
    });
  });

  describe("getCurrentRoom", () => {
    it("should identify position inside kitchen", () => {
      const kitchen = findRoomById("kitchen-1f");
      expect(kitchen).toBeDefined();

      const insideKitchen = new Vector3(10, 13, 2);

      const room = getCurrentRoom(insideKitchen);
      expect(room?.id).toBe("kitchen-1f");
    });

    it("should return null for position outside all rooms", () => {
      const outsidePosition = new Vector3(1000, 1000, 1000);
      const room = getCurrentRoom(outsidePosition);
      expect(room).toBeNull();
    });
  });

  describe("navigateToRoom", () => {
    it("should navigate by exact ID", () => {
      const result = navigateToRoom("kitchen-1f");
      expect(result).not.toBeNull();
    });

    it("should navigate by room name", () => {
      const result = navigateToRoom("kitchen");
      expect(result).not.toBeNull();
    });

    it("should navigate by partial name match", () => {
      const result = navigateToRoom("Living");
      expect(result).not.toBeNull();
    });

    it("should return null for non-existent room", () => {
      const result = navigateToRoom("swimming pool");
      expect(result).toBeNull();
    });
  });

  describe("getRoomForTourPoint", () => {
    it("should get room for tour point 9 (kitchen)", () => {
      const room = getRoomForTourPoint(9);
      expect(room?.id).toBe("kitchen-1f");
    });

    it("should get room for tour point 12 (master bedroom)", () => {
      const room = getRoomForTourPoint(12);
      expect(room?.id).toBe("master-bedroom-2f");
    });

    it("should return null for invalid tour point", () => {
      const room = getRoomForTourPoint(999);
      expect(room).toBeNull();
    });
  });

  describe("getConnectedRooms", () => {
    it("should get connected rooms for foyer", () => {
      const connected = getConnectedRooms("foyer-1f");
      expect(connected.length).toBeGreaterThan(0);

      const connectedIds = connected.map((r) => r.id);
      expect(connectedIds).toContain("living-room-1f");
    });

    it("should get connected rooms for hallway-2f", () => {
      const connected = getConnectedRooms("hallway-2f");
      expect(connected.length).toBeGreaterThanOrEqual(5);
    });

    it("should return empty array for non-existent room", () => {
      const connected = getConnectedRooms("fake-room");
      expect(connected.length).toBe(0);
    });
  });

  describe("planRoute", () => {
    it("should plan route from foyer to master bedroom", () => {
      const route = planRoute("foyer-1f", "master-bedroom-2f");
      expect(route).not.toBeNull();
      expect(route![0]).toBe("foyer-1f");
      expect(route![route!.length - 1]).toBe("master-bedroom-2f");
    });

    it("should return single room for same start and end", () => {
      const route = planRoute("kitchen-1f", "kitchen-1f");
      expect(route).toEqual(["kitchen-1f"]);
    });

    it("should return null for disconnected rooms", () => {
      const route = planRoute("exterior-final", "kitchen-1f");
      expect(route).toBeNull();
    });

    it("should find shortest path", () => {
      const route = planRoute("foyer-1f", "living-room-1f");
      expect(route).not.toBeNull();
      expect(route!.length).toBeLessThanOrEqual(3);
    });
  });

  describe("getAllRooms", () => {
    it("should return all 18 rooms", () => {
      const rooms = getAllRooms();
      expect(rooms.length).toBe(18);
    });

    it("should return a copy of the array", () => {
      const rooms1 = getAllRooms();
      const rooms2 = getAllRooms();
      expect(rooms1).not.toBe(rooms2);
    });
  });

  describe("getRoomsByCategory", () => {
    it("should categorize rooms correctly", () => {
      const categories = getRoomsByCategory();

      expect(categories.exterior.length).toBe(2);
      expect(categories.firstFloor.length).toBe(9);
      expect(categories.secondFloor.length).toBe(7);
    });

    it("should have all rooms in categories", () => {
      const categories = getRoomsByCategory();
      const totalRooms =
        categories.exterior.length +
        categories.firstFloor.length +
        categories.secondFloor.length;

      expect(totalRooms).toBe(18);
    });
  });
});
