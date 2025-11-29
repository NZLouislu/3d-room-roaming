import { useState } from 'react';

interface ViewModeToggleProps {
  onModeChange: (mode: 'first-person' | 'third-person') => void;
}

export const ViewModeToggle = ({ onModeChange }: ViewModeToggleProps) => {
  const [mode, setMode] = useState<'first-person' | 'third-person'>('third-person');

  const toggleMode = () => {
    const newMode = mode === 'first-person' ? 'third-person' : 'first-person';
    setMode(newMode);
    onModeChange(newMode);
  };

  return (
    <div className="fixed top-4 left-4 z-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMode}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            <span>{mode === 'first-person' ? '👤' : '🎮'}</span>
            <span>{mode === 'first-person' ? '第一人称' : '第三人称'}</span>
          </button>
          
          <div className="text-sm text-gray-600 border-l border-gray-300 pl-3">
            <div className="flex flex-col gap-1">
              <div><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">WASD</kbd> 移动</div>
              <div><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Shift</kbd> 跑步</div>
              <div><kbd className="px-2 py-1 bg-gray-100 rounded text-xs">右键拖拽</kbd> 旋转视角</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
