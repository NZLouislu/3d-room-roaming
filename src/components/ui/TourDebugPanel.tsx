import { useState, useEffect } from 'react';
import { TourPoint } from '../../data/tourPoints';

interface TourDebugPanelProps {
  tourPoints: TourPoint[];
  currentIndex: number;
  onSelectView: (index: number) => void;
  isPaused: boolean;
  onTogglePause: () => void;
  currentPosition: [number, number, number];
  currentLookAt: [number, number, number];
  onUpdatePosition: (pos: [number, number, number]) => void;
  onUpdateLookAt: (lookAt: [number, number, number]) => void;
  onApplyChanges: () => void;
  livePosition?: [number, number, number];
}

export function TourDebugPanel({
  tourPoints,
  currentIndex,
  onSelectView,
  isPaused,
  onTogglePause,
  currentPosition,
  currentLookAt,
  onUpdatePosition,
  onUpdateLookAt,
  onApplyChanges,
  livePosition
}: TourDebugPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const displayPosition = livePosition || currentPosition;

  const [posX, setPosX] = useState(displayPosition[0].toFixed(2));
  const [posY, setPosY] = useState(displayPosition[1].toFixed(2));
  const [posZ, setPosZ] = useState(displayPosition[2].toFixed(2));

  const [lookX, setLookX] = useState(currentLookAt[0].toFixed(2));
  const [lookY, setLookY] = useState(currentLookAt[1].toFixed(2));
  const [lookZ, setLookZ] = useState(currentLookAt[2].toFixed(2));

  useEffect(() => {
    setPosX(displayPosition[0].toFixed(2));
    setPosY(displayPosition[1].toFixed(2));
    setPosZ(displayPosition[2].toFixed(2));
  }, [displayPosition]);

  useEffect(() => {
    setLookX(currentLookAt[0].toFixed(2));
    setLookY(currentLookAt[1].toFixed(2));
    setLookZ(currentLookAt[2].toFixed(2));
  }, [currentLookAt]);

  const handleApply = () => {
    const newPos: [number, number, number] = [
      parseFloat(posX),
      parseFloat(posY),
      parseFloat(posZ)
    ];
    const newLookAt: [number, number, number] = [
      parseFloat(lookX),
      parseFloat(lookY),
      parseFloat(lookZ)
    ];
    onUpdatePosition(newPos);
    onUpdateLookAt(newLookAt);
    onApplyChanges();
  };

  const handleCopyToClipboard = () => {
    const code = `{
  id: ${tourPoints[currentIndex].id},
  position: [${posX}, ${posY}, ${posZ}],
  lookAt: [${lookX}, ${lookY}, ${lookZ}],
  duration: ${tourPoints[currentIndex].duration},
  title: "${tourPoints[currentIndex].title}",
  description: "${tourPoints[currentIndex].description}"
}`;
    navigator.clipboard.writeText(code);
    alert('Copied to clipboard!');
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed top-20 left-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700 transition"
      >
        🔧 Debug Panel
      </button>
    );
  }

  return (
    <div className="fixed top-20 left-4 z-50 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 w-96 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-purple-800 flex items-center gap-2">
          🔧 Tour Debug Panel
        </h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select View
          </label>
          <select
            value={currentIndex}
            onChange={(e) => onSelectView(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {tourPoints.map((point, index) => (
              <option key={point.id} value={index}>
                {index + 1}. {point.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onTogglePause}
            className={`flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium transition ${isPaused
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-orange-600 hover:bg-orange-700'
              }`}
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium transition ${editMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 hover:bg-gray-700'
              }`}
          >
            {editMode ? '📝 Editing' : '✏️ Edit Mode'}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Position (X, Y, Z) {livePosition && <span className="text-green-600">● Live</span>}
              </label>
              {editMode && (
                <span className="text-xs text-gray-500">Editable</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                step="0.1"
                value={posX}
                onChange={(e) => setPosX(e.target.value)}
                disabled={!editMode}
                className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                placeholder="X"
              />
              <input
                type="number"
                step="0.1"
                value={posY}
                onChange={(e) => setPosY(e.target.value)}
                disabled={!editMode}
                className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                placeholder="Y"
              />
              <input
                type="number"
                step="0.1"
                value={posZ}
                onChange={(e) => setPosZ(e.target.value)}
                disabled={!editMode}
                className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                placeholder="Z"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Look At (X, Y, Z)
              </label>
              {editMode && (
                <span className="text-xs text-gray-500">Editable</span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                step="0.1"
                value={lookX}
                onChange={(e) => setLookX(e.target.value)}
                disabled={!editMode}
                className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                placeholder="X"
              />
              <input
                type="number"
                step="0.1"
                value={lookY}
                onChange={(e) => setLookY(e.target.value)}
                disabled={!editMode}
                className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                placeholder="Y"
              />
              <input
                type="number"
                step="0.1"
                value={lookZ}
                onChange={(e) => setLookZ(e.target.value)}
                disabled={!editMode}
                className="px-2 py-1 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                placeholder="Z"
              />
            </div>
          </div>
        </div>

        {editMode && (
          <div className="space-y-2">
            <button
              onClick={handleApply}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
            >
              Apply Changes
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
            >
              📋 Copy Code
            </button>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            WASD Controls (when paused)
          </h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li><kbd className="px-1 py-0.5 bg-white rounded border">W</kbd> Move forward (+Z)</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded border">S</kbd> Move backward (-Z)</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded border">A</kbd> Move left (-X)</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded border">D</kbd> Move right (+X)</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded border">Q</kbd> Move up (+Y)</li>
            <li><kbd className="px-1 py-0.5 bg-white rounded border">E</kbd> Move down (-Y)</li>
            <li className="mt-2 pt-2 border-t border-blue-200">
              <kbd className="px-1 py-0.5 bg-white rounded border">Shift</kbd> + Key = Faster movement
            </li>
            <li className="mt-2 pt-2 border-t border-blue-200 text-green-700 font-semibold">
              Coordinates update in real-time as you move!
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-1">
            Current View Info
          </h4>
          <p className="text-xs text-gray-600">
            <strong>ID:</strong> {tourPoints[currentIndex].id}
          </p>
          <p className="text-xs text-gray-600">
            <strong>Duration:</strong> {tourPoints[currentIndex].duration}s
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {tourPoints[currentIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}
