

import { useStore } from '../../hooks/useStore';

interface NavbarProps {
  isBirdView: boolean;
  onToggleBirdView: () => void;
}

export const Navbar = ({ isBirdView, onToggleBirdView }: NavbarProps) => {
  const isNight = useStore((state) => state.isNight);
  const toggleIsNight = useStore((state) => state.toggleIsNight);

  return (
    <nav className="absolute top-16 left-0 w-full p-3 sm:p-4 flex justify-between items-start pointer-events-none z-50">
      <div className="flex flex-wrap gap-2 sm:gap-4 pointer-events-auto">
        <button
          onClick={onToggleBirdView}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-lg backdrop-blur-sm border-2 ${isBirdView
              ? 'bg-blue-600 border-blue-400 text-white'
              : 'bg-white/90 border-transparent text-gray-800 hover:bg-white'
            }`}
        >
          {isBirdView ? '🦅 Exit Bird' : '🦅 Bird View'}
        </button>

        <button
          onClick={toggleIsNight}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-lg backdrop-blur-sm border-2 ${isNight
              ? 'bg-indigo-900 border-indigo-700 text-yellow-300'
              : 'bg-yellow-400 border-yellow-200 text-orange-900'
            }`}
        >
          {isNight ? '🌙 Night' : '☀️ Day'}
        </button>
      </div>

      <div className="pointer-events-auto">

      </div>
    </nav>
  );
};
