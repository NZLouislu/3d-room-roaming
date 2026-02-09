


interface CoordinatesPanelProps {
  position: [number, number, number];
  target: [number, number, number];
  visible: boolean;
}

export const CoordinatesPanel = ({ position, target, visible }: CoordinatesPanelProps) => {
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
      <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-bold text-center">
        Bird View Coordinates
      </div>

      <div className="space-y-3">
        <div className="bg-white/10 p-2 rounded">
          <div className="text-gray-400 text-xs">Camera Position (x, y, z)</div>
          <div className="text-green-400 font-bold">
            [{position[0]}, {position[1]}, {position[2]}]
          </div>
        </div>

        <div className="bg-white/10 p-2 rounded">
          <div className="text-gray-400 text-xs">Target/LookAt (x, y, z)</div>
          <div className="text-blue-400 font-bold">
            [{target[0]}, {target[1]}, {target[2]}]
          </div>
        </div>

        <button
          onClick={handleRecord}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>⏺</span> Record View
        </button>

        <div className="text-[10px] text-gray-500 text-center leading-tight">
          Adjust view with Mouse/Touch.<br />
          Click record to save for Room Point setup.
        </div>
      </div>
    </div>
  );
};
