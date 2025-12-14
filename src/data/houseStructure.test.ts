import { describe, it, expect } from "vitest";
import {
  HOUSE_SEMANTIC_STRUCTURE,
  TOUR_POINT_ROOM_MAP,
  RoomType,
  SemanticRoom
} from "./houseStructure";

describe("houseStructure", () => {
  describe("HOUSE_SEMANTIC_STRUCTURE", () => {
    it("should have 18 rooms defined", () => {
      expect(HOUSE_SEMANTIC_STRUCTURE.length).toBe(18);
    });

    it("should have unique room IDs", () => {
      const ids = HOUSE_SEMANTIC_STRUCTURE.map((r) => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have valid floor values (0, 1, or 2)", () => {
      HOUSE_SEMANTIC_STRUCTURE.forEach((room) => {
        expect([0, 1, 2]).toContain(room.floor);
      });
    });

    it("should have positive ceiling heights", () => {
      HOUSE_SEMANTIC_STRUCTURE.forEach((room) => {
        expect(room.ceilingHeight).toBeGreaterThan(0);
      });
    });

    it("should have valid bounds2D with positive dimensions", () => {
      HOUSE_SEMANTIC_STRUCTURE.forEach((room) => {
        expect(room.bounds2D.width).toBeGreaterThan(0);
        expect(room.bounds2D.depth).toBeGreaterThan(0);
      });
    });

    it("should have default viewpoint for all rooms", () => {
      HOUSE_SEMANTIC_STRUCTURE.forEach((room) => {
        expect(room.viewpoints.default).toBeDefined();
        expect(room.viewpoints.default.offset).toHaveLength(3);
        expect(room.viewpoints.default.lookAtOffset).toHaveLength(3);
      });
    });
  });

  describe("Room distribution by floor", () => {
    it("should have 2 exterior rooms (floor 0)", () => {
      const exteriorRooms = HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.floor === 0);
      expect(exteriorRooms.length).toBe(2);
    });

    it("should have 9 first floor rooms", () => {
      const firstFloorRooms = HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.floor === 1);
      expect(firstFloorRooms.length).toBe(9);
    });

    it("should have 7 second floor rooms", () => {
      const secondFloorRooms = HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.floor === 2);
      expect(secondFloorRooms.length).toBe(7);
    });
  });

  describe("Room types", () => {
    const expectedTypes: RoomType[] = [
      "exterior",
      "foyer",
      "living_room",
      "dining_room",
      "kitchen",
      "master_bedroom",
      "bedroom",
      "bathroom",
      "hallway",
      "garage",
      "deck",
      "stairs"
    ];

    it("should have rooms with valid types", () => {
      HOUSE_SEMANTIC_STRUCTURE.forEach((room) => {
        expect(expectedTypes).toContain(room.type);
      });
    });

    it("should have exactly one kitchen", () => {
      const kitchens = HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.type === "kitchen");
      expect(kitchens.length).toBe(1);
      expect(kitchens[0].id).toBe("kitchen-1f");
    });

    it("should have exactly one living room", () => {
      const livingRooms = HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.type === "living_room");
      expect(livingRooms.length).toBe(1);
      expect(livingRooms[0].id).toBe("living-room-1f");
    });

    it("should have exactly one master bedroom", () => {
      const masterBedrooms = HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.type === "master_bedroom");
      expect(masterBedrooms.length).toBe(1);
      expect(masterBedrooms[0].floor).toBe(2);
    });

    it("should have 3 regular bedrooms", () => {
      const bedrooms = HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.type === "bedroom");
      expect(bedrooms.length).toBe(3);
    });

    it("should have 2 bathrooms", () => {
      const bathrooms = HOUSE_SEMANTIC_STRUCTURE.filter((r) => r.type === "bathroom");
      expect(bathrooms.length).toBe(2);
    });
  });

  describe("Room connectivity", () => {
    it("should have valid connectedTo references", () => {
      const allIds = new Set(HOUSE_SEMANTIC_STRUCTURE.map((r) => r.id));

      HOUSE_SEMANTIC_STRUCTURE.forEach((room) => {
        room.connectedTo.forEach((connectedId) => {
          expect(allIds.has(connectedId)).toBe(true);
        });
      });
    });

    it("should have foyer connected to multiple rooms", () => {
      const foyer = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === "foyer-1f");
      expect(foyer?.connectedTo.length).toBeGreaterThanOrEqual(3);
    });

    it("should have hallway-2f connected to all second floor rooms", () => {
      const hallway = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === "hallway-2f");
      expect(hallway?.connectedTo.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("TOUR_POINT_ROOM_MAP", () => {
    it("should have 18 tour point mappings", () => {
      expect(Object.keys(TOUR_POINT_ROOM_MAP).length).toBe(18);
    });

    it("should map tour points 1-18", () => {
      for (let i = 1; i <= 18; i++) {
        expect(TOUR_POINT_ROOM_MAP[i]).toBeDefined();
      }
    });

    it("should map to valid room IDs", () => {
      const allIds = new Set(HOUSE_SEMANTIC_STRUCTURE.map((r) => r.id));

      Object.values(TOUR_POINT_ROOM_MAP).forEach((roomId) => {
        expect(allIds.has(roomId)).toBe(true);
      });
    });

    it("should map tour point 9 to kitchen", () => {
      expect(TOUR_POINT_ROOM_MAP[9]).toBe("kitchen-1f");
    });

    it("should map tour point 12 to master bedroom", () => {
      expect(TOUR_POINT_ROOM_MAP[12]).toBe("master-bedroom-2f");
    });
  });

  describe("Specific room validation", () => {
    it("kitchen-1f should have correct properties", () => {
      const kitchen = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === "kitchen-1f");
      expect(kitchen).toBeDefined();
      expect(kitchen?.type).toBe("kitchen");
      expect(kitchen?.floor).toBe(1);
      expect(kitchen?.name).toBe("Modern Kitchen");
    });

    it("master-bedroom-2f should have correct properties", () => {
      const masterBedroom = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === "master-bedroom-2f");
      expect(masterBedroom).toBeDefined();
      expect(masterBedroom?.type).toBe("master_bedroom");
      expect(masterBedroom?.floor).toBe(2);
      expect(masterBedroom?.connectedTo).toContain("master-bath-2f");
    });

    it("living-room-1f should be on first floor", () => {
      const livingRoom = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === "living-room-1f");
      expect(livingRoom?.floor).toBe(1);
      expect(livingRoom?.elevation).toBe(12);
    });
  });
});
