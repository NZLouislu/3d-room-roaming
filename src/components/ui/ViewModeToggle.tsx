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
    <div className="fixed top-16 sm:top-20 left-4 z-10">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 border border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleMode}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 whitespace-nowrap"
          >
            <span>{mode === 'first-person' ? '👤' : '🎮'}</span>
            <span>{mode === 'first-person' ? '1st Person' : '3rd Person'}</span>
          </button>
          
          <div className="hidden md:block text-sm text-gray-600 border-l border-gray-300 pl-3">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">WASD</kbd> 
                <span className="text-xs">Move</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">Shift</kbd> 
                <span className="text-xs">Run</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
