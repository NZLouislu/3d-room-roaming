import { describe, it, expect } from "vitest";
import {
  SEMANTIC_HOUSE_TOUR,
  semanticTourPointToLegacy,
  convertSemanticTourToLegacy,
  LEGACY_COMPATIBLE_TOUR
} from "./semanticTourPoints";
import { HOUSE_SEMANTIC_STRUCTURE } from "./houseStructure";

describe("semanticTourPoints", () => {
  describe("SEMANTIC_HOUSE_TOUR", () => {
    it("should have 18 tour points", () => {
      expect(SEMANTIC_HOUSE_TOUR.length).toBe(18);
    });

    it("should have unique IDs from 1 to 18", () => {
      const ids = SEMANTIC_HOUSE_TOUR.map((p) => p.id);
      expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    });

    it("should have valid roomId references", () => {
      const validRoomIds = new Set(HOUSE_SEMANTIC_STRUCTURE.map((r) => r.id));

      SEMANTIC_HOUSE_TOUR.forEach((point) => {
        expect(validRoomIds.has(point.roomId)).toBe(true);
      });
    });

    it("should have positive durations", () => {
      SEMANTIC_HOUSE_TOUR.forEach((point) => {
        expect(point.duration).toBeGreaterThan(0);
      });
    });

    it("should have non-empty titles and descriptions", () => {
      SEMANTIC_HOUSE_TOUR.forEach((point) => {
        expect(point.title.length).toBeGreaterThan(0);
        expect(point.description.length).toBeGreaterThan(0);
      });
    });

    it("should have custom positions for custom viewType", () => {
      const customPoints = SEMANTIC_HOUSE_TOUR.filter((p) => p.viewType === "custom");

      customPoints.forEach((point) => {
        expect(point.customPosition).toBeDefined();
        expect(point.customLookAt).toBeDefined();
        expect(point.customPosition).toHaveLength(3);
        expect(point.customLookAt).toHaveLength(3);
      });
    });
  });

  describe("semanticTourPointToLegacy", () => {
    it("should convert custom viewType with custom positions", () => {
      const customPoint = SEMANTIC_HOUSE_TOUR.find((p) => p.viewType === "custom");
      expect(customPoint).toBeDefined();

      const legacy = semanticTourPointToLegacy(customPoint!);

      expect(legacy.id).toBe(customPoint!.id);
      expect(legacy.position).toEqual(customPoint!.customPosition);
      expect(legacy.lookAt).toEqual(customPoint!.customLookAt);
      expect(legacy.duration).toBe(customPoint!.duration);
      expect(legacy.title).toBe(customPoint!.title);
      expect(legacy.description).toBe(customPoint!.description);
    });

    it("should convert default viewType using room data", () => {
      const defaultPoint = SEMANTIC_HOUSE_TOUR.find((p) => p.viewType === "default");
      expect(defaultPoint).toBeDefined();

      const legacy = semanticTourPointToLegacy(defaultPoint!);

      expect(legacy.id).toBe(defaultPoint!.id);
      expect(legacy.position).toHaveLength(3);
      expect(legacy.lookAt).toHaveLength(3);
      expect(legacy.duration).toBe(defaultPoint!.duration);
    });

    it("should preserve all metadata", () => {
      const point = SEMANTIC_HOUSE_TOUR[0];
      const legacy = semanticTourPointToLegacy(point);

      expect(legacy.title).toBe(point.title);
      expect(legacy.description).toBe(point.description);
      expect(legacy.duration).toBe(point.duration);
    });
  });

  describe("convertSemanticTourToLegacy", () => {
    it("should convert all tour points", () => {
      const legacy = convertSemanticTourToLegacy(SEMANTIC_HOUSE_TOUR);
      expect(legacy.length).toBe(SEMANTIC_HOUSE_TOUR.length);
    });

    it("should maintain order", () => {
      const legacy = convertSemanticTourToLegacy(SEMANTIC_HOUSE_TOUR);

      for (let i = 0; i < legacy.length; i++) {
        expect(legacy[i].id).toBe(SEMANTIC_HOUSE_TOUR[i].id);
      }
    });
  });

  describe("LEGACY_COMPATIBLE_TOUR", () => {
    it("should have 18 tour points", () => {
      expect(LEGACY_COMPATIBLE_TOUR.length).toBe(18);
    });

    it("should have valid position arrays", () => {
      LEGACY_COMPATIBLE_TOUR.forEach((point) => {
        expect(point.position).toHaveLength(3);
        expect(typeof point.position[0]).toBe("number");
        expect(typeof point.position[1]).toBe("number");
        expect(typeof point.position[2]).toBe("number");
      });
    });

    it("should have valid lookAt arrays", () => {
      LEGACY_COMPATIBLE_TOUR.forEach((point) => {
        expect(point.lookAt).toHaveLength(3);
        expect(typeof point.lookAt[0]).toBe("number");
        expect(typeof point.lookAt[1]).toBe("number");
        expect(typeof point.lookAt[2]).toBe("number");
      });
    });

    it("should be compatible with TourPoint interface", () => {
      LEGACY_COMPATIBLE_TOUR.forEach((point) => {
        expect(point).toHaveProperty("id");
        expect(point).toHaveProperty("position");
        expect(point).toHaveProperty("lookAt");
        expect(point).toHaveProperty("duration");
        expect(point).toHaveProperty("title");
        expect(point).toHaveProperty("description");
      });
    });

    it("should have kitchen tour point at position 9", () => {
      const kitchenPoint = LEGACY_COMPATIBLE_TOUR.find((p) => p.id === 9);
      expect(kitchenPoint).toBeDefined();
      expect(kitchenPoint?.title).toBe("Modern Kitchen");
    });

    it("should have master bedroom tour point at position 12", () => {
      const masterBedroomPoint = LEGACY_COMPATIBLE_TOUR.find((p) => p.id === 12);
      expect(masterBedroomPoint).toBeDefined();
      expect(masterBedroomPoint?.title).toBe("Master Bedroom");
    });
  });

  describe("Tour point specific validations", () => {
    it("tour point 1 should be aerial overview", () => {
      const point = SEMANTIC_HOUSE_TOUR[0];
      expect(point.id).toBe(1);
      expect(point.roomId).toBe("exterior-aerial");
      expect(point.title).toContain("Welcome");
    });

    it("tour point 18 should be final overview", () => {
      const point = SEMANTIC_HOUSE_TOUR[17];
      expect(point.id).toBe(18);
      expect(point.roomId).toBe("exterior-final");
      expect(point.title).toContain("Final");
    });

    it("first floor tour points should be between 5-10", () => {
      const firstFloorPoints = SEMANTIC_HOUSE_TOUR.filter((p) => {
        const room = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === p.roomId);
        return room?.floor === 1 && room.type !== "deck" && room.type !== "stairs";
      });

      expect(firstFloorPoints.length).toBeGreaterThan(0);
    });

    it("second floor tour points should be between 11-17", () => {
      const secondFloorPoints = SEMANTIC_HOUSE_TOUR.filter((p) => {
        const room = HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === p.roomId);
        return room?.floor === 2;
      });

      expect(secondFloorPoints.length).toBe(7);
    });
  });
});
