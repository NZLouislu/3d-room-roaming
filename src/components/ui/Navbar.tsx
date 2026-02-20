

import { useStore } from '../../hooks/useStore';

interface NavbarProps {
  isInteriorMode: boolean;
  onToggleInterior: () => void;
  onLaunchSpatialTwin?: () => void;
}

export const Navbar = ({ isInteriorMode, onToggleInterior, onLaunchSpatialTwin }: NavbarProps) => {
  const isNight = useStore((state) => state.isNight);
  const toggleIsNight = useStore((state) => state.toggleIsNight);

  return (
    <nav className="absolute top-16 left-0 w-full p-3 sm:p-4 flex justify-between items-start pointer-events-none z-50">
      <div className="flex flex-wrap gap-2 sm:gap-4 pointer-events-auto">
        <button
          onClick={onToggleInterior}
          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-lg backdrop-blur-sm border-2 ${isInteriorMode
            ? 'bg-blue-600 border-blue-400 text-white'
            : 'bg-white/90 border-transparent text-gray-800 hover:bg-white'
            }`}
        >
          {isInteriorMode ? '🏠 Exit Interior' : '🏠 Interior Model'}
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

        <button
          onClick={onLaunchSpatialTwin}
          className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all bg-blue-600 text-white border-2 border-blue-400 shadow-lg backdrop-blur-sm hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          🌍 Spatial Twin
        </button>
      </div>

      <div className="pointer-events-auto">

      </div>
    </nav>
  );
};
