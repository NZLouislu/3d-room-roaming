import { describe, it, expect } from "vitest";
import { Vector3 } from "three";
import {
  AISceneAPI,
  formatRoomListForAI,
  formatFloorPlanForAI
} from "./aiSceneInterface";

describe("aiSceneInterface", () => {
  describe("AISceneAPI.goToRoom", () => {
    it("should navigate to kitchen successfully", () => {
      const result = AISceneAPI.goToRoom("kitchen-1f");

      expect(result.success).toBe(true);
      expect(result.position).toBeInstanceOf(Vector3);
      expect(result.lookAt).toBeInstanceOf(Vector3);
      expect(result.roomId).toBe("kitchen-1f");
      expect(result.roomName).toBe("Modern Kitchen");
    });

    it("should navigate to master bedroom successfully", () => {
      const result = AISceneAPI.goToRoom("master-bedroom-2f");

      expect(result.success).toBe(true);
      expect(result.roomId).toBe("master-bedroom-2f");
      expect(result.roomName).toBe("Master Bedroom");
    });

    it("should fail for non-existent room", () => {
      const result = AISceneAPI.goToRoom("fake-room");

      expect(result.success).toBe(false);
      expect(result.error).toContain("not found");
      expect(result.position).toBeUndefined();
    });
  });

  describe("AISceneAPI.goToRoomByName", () => {
    it("should find room by partial name", () => {
      const result = AISceneAPI.goToRoomByName("Kitchen");

      expect(result.success).toBe(true);
      expect(result.roomName).toContain("Kitchen");
    });

    it("should find living room", () => {
      const result = AISceneAPI.goToRoomByName("Living");

      expect(result.success).toBe(true);
    });

    it("should fail for non-existent name", () => {
      const result = AISceneAPI.goToRoomByName("Swimming Pool");

      expect(result.success).toBe(false);
    });
  });

  describe("AISceneAPI.goToRoomByType", () => {
    it("should find kitchen by type", () => {
      const result = AISceneAPI.goToRoomByType("kitchen");

      expect(result.success).toBe(true);
      expect(result.roomId).toBe("kitchen-1f");
    });

    it("should find bedroom on second floor", () => {
      const result = AISceneAPI.goToRoomByType("bedroom", 2);

      expect(result.success).toBe(true);
      expect(result.roomId).toContain("2f");
    });

    it("should fail for kitchen on second floor", () => {
      const result = AISceneAPI.goToRoomByType("kitchen", 2);

      expect(result.success).toBe(false);
    });
  });

  describe("AISceneAPI.listRooms", () => {
    it("should return all 18 rooms", () => {
      const rooms = AISceneAPI.listRooms();
      expect(rooms.length).toBe(18);
    });

    it("should include kitchen", () => {
      const rooms = AISceneAPI.listRooms();
      const kitchen = rooms.find((r) => r.id === "kitchen-1f");
      expect(kitchen).toBeDefined();
    });
  });

  describe("AISceneAPI.listRoomsByFloor", () => {
    it("should return 9 first floor rooms", () => {
      const rooms = AISceneAPI.listRoomsByFloor(1);
      expect(rooms.length).toBe(9);
    });

    it("should return 7 second floor rooms", () => {
      const rooms = AISceneAPI.listRoomsByFloor(2);
      expect(rooms.length).toBe(7);
    });

    it("should return 2 exterior rooms", () => {
      const rooms = AISceneAPI.listRoomsByFloor(0);
      expect(rooms.length).toBe(2);
    });
  });

  describe("AISceneAPI.getCurrentLocation", () => {
    it("should identify position in kitchen", () => {
      const kitchenPos = new Vector3(10, 13, 2);
      const room = AISceneAPI.getCurrentLocation(kitchenPos);

      expect(room?.id).toBe("kitchen-1f");
    });

    it("should return null for position outside rooms", () => {
      const outsidePos = new Vector3(1000, 1000, 1000);
      const room = AISceneAPI.getCurrentLocation(outsidePos);

      expect(room).toBeNull();
    });
  });

  describe("AISceneAPI.getFloorPlan", () => {
    it("should return first floor plan", () => {
      const plan = AISceneAPI.getFloorPlan(1);

      expect(plan.floor).toBe(1);
      expect(plan.rooms.length).toBe(9);
    });

    it("should include room bounds", () => {
      const plan = AISceneAPI.getFloorPlan(1);
      const kitchen = plan.rooms.find((r) => r.id === "kitchen-1f");

      expect(kitchen).toBeDefined();
      expect(kitchen?.bounds).toBeDefined();
      expect(kitchen?.bounds.width).toBeGreaterThan(0);
    });

    it("should return second floor plan", () => {
      const plan = AISceneAPI.getFloorPlan(2);

      expect(plan.floor).toBe(2);
      expect(plan.rooms.length).toBe(7);
    });
  });

  describe("AISceneAPI.planRoute", () => {
    it("should plan route from foyer to kitchen", () => {
      const route = AISceneAPI.planRoute("foyer-1f", "kitchen-1f");

      expect(route).not.toBeNull();
      expect(route![0]).toBe("foyer-1f");
      expect(route![route!.length - 1]).toBe("kitchen-1f");
    });

    it("should plan route across floors", () => {
      const route = AISceneAPI.planRoute("foyer-1f", "master-bedroom-2f");

      expect(route).not.toBeNull();
      expect(route!.length).toBeGreaterThan(2);
    });

    it("should return null for disconnected rooms", () => {
      const route = AISceneAPI.planRoute("exterior-final", "kitchen-1f");

      expect(route).toBeNull();
    });
  });

  describe("AISceneAPI.getConnectedRooms", () => {
    it("should get rooms connected to foyer", () => {
      const connected = AISceneAPI.getConnectedRooms("foyer-1f");

      expect(connected.length).toBeGreaterThan(0);
    });

    it("should get rooms connected to hallway", () => {
      const connected = AISceneAPI.getConnectedRooms("hallway-2f");

      expect(connected.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("AISceneAPI.getRoomInfo", () => {
    it("should get kitchen info", () => {
      const info = AISceneAPI.getRoomInfo("kitchen-1f");

      expect(info).toBeDefined();
      expect(info?.name).toBe("Modern Kitchen");
      expect(info?.type).toBe("kitchen");
      expect(info?.floor).toBe(1);
    });

    it("should return null for non-existent room", () => {
      const info = AISceneAPI.getRoomInfo("fake-room");

      expect(info).toBeNull();
    });
  });

  describe("formatRoomListForAI", () => {
    it("should return formatted string", () => {
      const output = formatRoomListForAI();

      expect(typeof output).toBe("string");
      expect(output).toContain("Available Rooms");
      expect(output).toContain("First Floor");
      expect(output).toContain("Second Floor");
      expect(output).toContain("kitchen-1f");
    });

    it("should include all room categories", () => {
      const output = formatRoomListForAI();

      expect(output).toContain("Exterior");
      expect(output).toContain("First Floor");
      expect(output).toContain("Second Floor");
    });
  });

  describe("formatFloorPlanForAI", () => {
    it("should format first floor plan", () => {
      const output = formatFloorPlanForAI(1);

      expect(typeof output).toBe("string");
      expect(output).toContain("First Floor");
      expect(output).toContain("Kitchen");
      expect(output).toContain("Position");
      expect(output).toContain("Size");
    });

    it("should format second floor plan", () => {
      const output = formatFloorPlanForAI(2);

      expect(output).toContain("Second Floor");
      expect(output).toContain("Master Bedroom");
    });

    it("should include room dimensions", () => {
      const output = formatFloorPlanForAI(1);

      expect(output).toMatch(/\d+m x \d+m/);
    });
  });
});
