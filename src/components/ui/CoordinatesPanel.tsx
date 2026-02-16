import { useStore } from '../../hooks/useStore';
import { PROPERTY_LIST } from '../../data/properties';

interface CoordinatesPanelProps {
  visible: boolean;
}

export const CoordinatesPanel = ({ visible }: CoordinatesPanelProps) => {
  const { birdViewCoords, panMode, setPanMode, currentPropertyId, setTeleportTarget } = useStore();
  const { pos: position, target } = birdViewCoords;

  const currentProperty = PROPERTY_LIST.find(p => p.id === currentPropertyId);
  const roomLabels = currentProperty?.roomLabels || [];

  if (!visible) return null;

  const handleRoomSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = e.target.value;
    const room = roomLabels.find(r => r.id === roomId);
    if (room) {
      setTeleportTarget(room.position);
    }
  };

  const handleRecord = () => {
    const recordData = {
      position,
      target,
      timestamp: new Date().toISOString()
    };

    console.log('=== 📍 3D Coordinate Recorded ===');
    console.log(JSON.stringify(recordData, null, 2));

    alert(`Coordinates Recorded!\nPos: [${position.join(', ')}]\nTarget: [${target.join(', ')}]\n(Check Console for JSON)`);
  };

  return (
    <div className="absolute top-24 left-4 bg-black/80 text-white p-4 rounded-xl backdrop-blur-md shadow-2xl z-40 w-80 font-mono transition-all">
      <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-bold text-center border-b border-white/10 pb-2">
        🏠 Bird View Toolset
      </div>

      <div className="space-y-3 mt-3">
        {/* Room Navigation Dropdown */}
        <div className="relative">
          <label className="text-gray-400 text-[10px] uppercase mb-1 block">Quick Navigation</label>
          <select
            onChange={handleRoomSelect}
            className="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg px-3 py-2 text-sm text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled className="bg-gray-900 text-gray-500">Jump to Room...</option>
            {roomLabels.map(room => (
              <option key={room.id} value={room.id} className="bg-gray-900 text-white">
                📍 {room.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 bottom-2.5 pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>

        <div className="bg-white/10 p-2 rounded border border-white/5">
          <div className="text-gray-400 text-[10px] uppercase mb-1">Camera Position</div>
          <div className="text-green-400 font-bold text-sm text-[11px]">
            [{position[0].toFixed(2)}, {position[1].toFixed(2)}, {position[2].toFixed(2)}]
          </div>
        </div>

        <div className="bg-white/10 p-2 rounded border border-white/5">
          <div className="text-gray-400 text-[10px] uppercase mb-1">Target LookAt</div>
          <div className="text-blue-400 font-bold text-sm text-[11px]">
            [{target[0].toFixed(2)}, {target[1].toFixed(2)}, {target[2].toFixed(2)}]
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRecord}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg text-[11px] uppercase"
          >
            <span>⏺</span> Record
          </button>

          <button
            onClick={() => setPanMode(!panMode)}
            className={`flex-1 flex items-center justify-center gap-2 font-bold py-2.5 px-3 rounded-lg transition-all border ${panMode
              ? 'bg-orange-500 text-white border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'} text-[11px] uppercase`}
          >
            <span>{panMode ? '✋' : '🔄'}</span>
            <span>{panMode ? 'Move' : 'Rotate'}</span>
          </button>
        </div>

        <div className="text-[10px] text-gray-500 text-center leading-tight pt-1 opacity-60">
          {panMode ? "DRAG TO MOVE MODEL" : "DRAG TO ROTATE VIEW"}
        </div>
      </div>
    </div>
  );
};
