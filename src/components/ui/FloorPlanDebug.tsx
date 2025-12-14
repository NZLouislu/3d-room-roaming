import { useState } from "react";
import { HOUSE_SEMANTIC_STRUCTURE } from "../../data/houseStructure";

interface FloorPlanDebugProps {
  currentRoomId?: string;
  cameraPosition?: [number, number, number];
  onRoomClick?: (roomId: string) => void;
}

const ROOM_COLORS: Record<string, string> = {
  exterior: "#94a3b8",
  foyer: "#fbbf24",
  living_room: "#60a5fa",
  dining_room: "#34d399",
  kitchen: "#f472b6",
  master_bedroom: "#a78bfa",
  bedroom: "#c084fc",
  bathroom: "#22d3d8",
  hallway: "#9ca3af",
  garage: "#78716c",
  deck: "#a3e635",
  stairs: "#fb923c"
};

export function FloorPlanDebug({
  currentRoomId,
  cameraPosition,
  onRoomClick
}: FloorPlanDebugProps) {
  const [selectedFloor, setSelectedFloor] = useState<0 | 1 | 2>(1);

  const rooms = HOUSE_SEMANTIC_STRUCTURE.filter(
    (r) => r.floor === selectedFloor && r.type !== "exterior"
  );

  const scale = 8;
  const offsetX = 150;
  const offsetZ = 150;

  const toScreenX = (x: number) => x * scale + offsetX;
  const toScreenY = (z: number) => z * scale + offsetZ;

  const getCameraScreenPos = () => {
    if (!cameraPosition) return null;
    return {
      x: toScreenX(cameraPosition[0]),
      y: toScreenY(cameraPosition[2])
    };
  };

  const cameraScreenPos = getCameraScreenPos();

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-4 w-80">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">Floor Plan</h3>
        <div className="flex gap-1">
          {[1, 2].map((floor) => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor as 1 | 2)}
              className={`px-3 py-1 text-sm rounded-lg transition ${
                selectedFloor === floor
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {floor}F
            </button>
          ))}
        </div>
      </div>

      <svg
        width={300}
        height={300}
        className="bg-gray-50 rounded-lg border border-gray-200"
      >
        {rooms.map((room) => {
          const isSelected = room.id === currentRoomId;
          const color = ROOM_COLORS[room.type] || "#e5e7eb";

          return (
            <g
              key={room.id}
              onClick={() => onRoomClick?.(room.id)}
              className="cursor-pointer"
            >
              <rect
                x={toScreenX(room.bounds2D.x)}
                y={toScreenY(room.bounds2D.z)}
                width={room.bounds2D.width * scale}
                height={room.bounds2D.depth * scale}
                fill={isSelected ? color : `${color}80`}
                stroke={isSelected ? "#1e40af" : "#374151"}
                strokeWidth={isSelected ? 3 : 1}
                rx={4}
              />
              <text
                x={toScreenX(room.bounds2D.x + room.bounds2D.width / 2)}
                y={toScreenY(room.bounds2D.z + room.bounds2D.depth / 2)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                fontWeight={isSelected ? "bold" : "normal"}
                fill="#1f2937"
                className="pointer-events-none"
              >
                {room.name.length > 12
                  ? room.name.substring(0, 10) + "..."
                  : room.name}
              </text>
            </g>
          );
        })}

        {cameraScreenPos && (
          <g>
            <circle
              cx={cameraScreenPos.x}
              cy={cameraScreenPos.y}
              r={6}
              fill="#ef4444"
              stroke="#fff"
              strokeWidth={2}
            />
            <circle
              cx={cameraScreenPos.x}
              cy={cameraScreenPos.y}
              r={12}
              fill="none"
              stroke="#ef4444"
              strokeWidth={1}
              strokeDasharray="3,3"
            />
          </g>
        )}
      </svg>

      <div className="mt-3 text-xs text-gray-600">
        <div className="flex flex-wrap gap-2">
          {Object.entries(ROOM_COLORS)
            .filter(([type]) => rooms.some((r) => r.type === type))
            .map(([type, color]) => (
              <div key={type} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="capitalize">{type.replace("_", " ")}</span>
              </div>
            ))}
        </div>
      </div>

      {currentRoomId && (
        <div className="mt-3 p-2 bg-blue-50 rounded-lg text-sm">
          <span className="font-medium text-blue-800">Current: </span>
          <span className="text-blue-600">
            {HOUSE_SEMANTIC_STRUCTURE.find((r) => r.id === currentRoomId)?.name ||
              currentRoomId}
          </span>
        </div>
      )}
    </div>
  );
}
