import { useState } from "react";
import { HOUSE_SEMANTIC_STRUCTURE, SemanticRoom } from "../../data/houseStructure";
import { getCameraPositionForRoom } from "../../utils/semanticNavigation";

interface SemanticRoomSelectorProps {
  onNavigate: (position: [number, number, number], lookAt: [number, number, number]) => void;
  currentRoomId?: string;
}

export function SemanticRoomSelector({
  onNavigate,
  currentRoomId
}: SemanticRoomSelectorProps) {
  const [selectedFloor, setSelectedFloor] = useState<0 | 1 | 2 | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = HOUSE_SEMANTIC_STRUCTURE.filter((room) => {
    const matchesFloor = selectedFloor === "all" || room.floor === selectedFloor;
    const matchesSearch =
      searchQuery === "" ||
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFloor && matchesSearch;
  });

  const groupedRooms = {
    exterior: filteredRooms.filter((r) => r.floor === 0),
    firstFloor: filteredRooms.filter((r) => r.floor === 1),
    secondFloor: filteredRooms.filter((r) => r.floor === 2)
  };

  const handleRoomClick = (room: SemanticRoom) => {
    const result = getCameraPositionForRoom(room.id);
    if (result) {
      onNavigate(
        [result.position.x, result.position.y, result.position.z],
        [result.lookAt.x, result.lookAt.y, result.lookAt.z]
      );
    }
  };

  const RoomButton = ({ room }: { room: SemanticRoom }) => (
    <button
      onClick={() => handleRoomClick(room)}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
        currentRoomId === room.id
          ? "bg-blue-600 text-white"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
    >
      <div className="font-medium">{room.name}</div>
      <div className="text-xs opacity-70">{room.type.replace("_", " ")}</div>
    </button>
  );

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-4 w-72 max-h-[80vh] overflow-hidden flex flex-col">
      <h3 className="font-bold text-gray-800 mb-3">Room Navigator</h3>

      <input
        type="text"
        placeholder="Search rooms..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-1 mb-3">
        {(["all", 0, 1, 2] as const).map((floor) => (
          <button
            key={floor}
            onClick={() => setSelectedFloor(floor)}
            className={`flex-1 px-2 py-1 text-xs rounded-lg transition ${
              selectedFloor === floor
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {floor === "all" ? "All" : floor === 0 ? "Ext" : `${floor}F`}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {groupedRooms.exterior.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Exterior
            </h4>
            <div className="space-y-1">
              {groupedRooms.exterior.map((room) => (
                <RoomButton key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}

        {groupedRooms.firstFloor.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              First Floor
            </h4>
            <div className="space-y-1">
              {groupedRooms.firstFloor.map((room) => (
                <RoomButton key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}

        {groupedRooms.secondFloor.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Second Floor
            </h4>
            <div className="space-y-1">
              {groupedRooms.secondFloor.map((room) => (
                <RoomButton key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}

        {filteredRooms.length === 0 && (
          <div className="text-center text-gray-500 py-4">No rooms found</div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
        {filteredRooms.length} rooms available
      </div>
    </div>
  );
}
