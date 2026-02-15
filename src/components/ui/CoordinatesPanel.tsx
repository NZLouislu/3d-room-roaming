


import { useStore } from '../../hooks/useStore';

interface CoordinatesPanelProps {
  visible: boolean;
}

export const CoordinatesPanel = ({ visible }: CoordinatesPanelProps) => {
  const { birdViewCoords, panMode, setPanMode } = useStore();
  const { pos: position, target } = birdViewCoords;

  if (!visible) return null;

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
        <div className="bg-white/10 p-2 rounded border border-white/5">
          <div className="text-gray-400 text-[10px] uppercase mb-1">Camera Position</div>
          <div className="text-green-400 font-bold text-sm">
            [{position[0]}, {position[1]}, {position[2]}]
          </div>
        </div>

        <div className="bg-white/10 p-2 rounded border border-white/5">
          <div className="text-gray-400 text-[10px] uppercase mb-1">Target LookAt</div>
          <div className="text-blue-400 font-bold text-sm">
            [{target[0]}, {target[1]}, {target[2]}]
          </div>
        </div>

        <button
          onClick={handleRecord}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg"
        >
          <span>⏺</span> Record View
        </button>

        <button
          onClick={() => setPanMode(!panMode)}
          className={`w-full flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-lg transition-all border ${panMode
            ? 'bg-orange-500 text-white border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'}`}
        >
          <span className="text-xl">{panMode ? '✋' : '🔄'}</span>
          <span className="text-xs uppercase tracking-widest">{panMode ? 'Pan Mode' : 'Rotate Mode'}</span>
        </button>

        <div className="text-[10px] text-gray-500 text-center leading-tight pt-1 opacity-60">
          {panMode ? "DRAG TO MOVE MODEL" : "DRAG TO ROTATE VIEW"}
        </div>
      </div>
    </div>
  );
};
