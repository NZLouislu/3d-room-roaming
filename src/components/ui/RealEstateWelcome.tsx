import { useState } from 'react';

interface WelcomeProps {
  onStart: (mode: 'auto-tour' | 'free-explore' | 'bird-view') => void;
}

export function RealEstateWelcome({ onStart }: WelcomeProps) {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  const handleStart = (mode: 'auto-tour' | 'free-explore' | 'bird-view') => {
    setVisible(false);
    onStart(mode);
  };
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full mx-auto my-auto overflow-hidden">
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 sm:px-8 sm:py-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
            Premium Double Floor House
          </h1>
          <p className="text-blue-100 mt-1 sm:mt-2 text-sm sm:base">
            Virtual 3D Tour - Experience Your Dream Home
          </p>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            
            <button
              onClick={() => handleStart('auto-tour')}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-blue-200 hover:border-blue-500 transition-all duration-300 p-4 sm:p-6 md:p-8 text-left bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎬</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Guided Tour
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                Sit back and enjoy an automated tour showcasing the best features
              </p>
              <ul className="text-xs text-gray-500 space-y-1 hidden xs:block">
                <li>✓ Exterior 360° view</li>
                <li>✓ Key rooms highlights</li>
                <li>✓ Perfect for first-time</li>
              </ul>
              <div className="mt-4 inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium group-hover:bg-blue-700 transition w-full text-center sm:w-auto">
                Start Tour
              </div>
            </button>
            
            <button
              onClick={() => handleStart('free-explore')}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-green-200 hover:border-green-500 transition-all duration-300 p-4 sm:p-6 md:p-8 text-left bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎮</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Free Explore
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                Navigate freely and explore every corner at your own pace
              </p>
              <ul className="text-xs text-gray-500 space-y-1 hidden xs:block">
                <li>✓ WASD + Mouse controls</li>
                <li>✓ Quick viewpoint jumps</li>
                <li>✓ Measure rooms yourself</li>
              </ul>
              <div className="mt-4 inline-block bg-green-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium group-hover:bg-green-700 transition w-full text-center sm:w-auto">
                Start Exploring
              </div>
            </button>

            <button
              onClick={() => handleStart('bird-view')}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-purple-200 hover:border-purple-500 transition-all duration-300 p-4 sm:p-6 md:p-8 text-left bg-gradient-to-br from-purple-50 to-fuchsia-50 hover:shadow-xl sm:col-span-2 lg:col-span-1"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🦅</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Bird View
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                Get a complete overhead perspective of the entire property layout
              </p>
              <ul className="text-xs text-gray-500 space-y-1 hidden xs:block">
                <li>✓ Top-down perspective</li>
                <li>✓ Record room coordinates</li>
                <li>✓ Understand layout</li>
              </ul>
              <div className="mt-4 inline-block bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium group-hover:bg-purple-700 transition w-full text-center sm:w-auto">
                Start View
              </div>
            </button>
            
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🏠</span>
              Property Highlights
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-center sm:text-left">
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Bedrooms</div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600">4</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Bathrooms</div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600">3</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Floors</div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600">2</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Living Area</div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600 whitespace-nowrap">280m²</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Garage</div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600">Double</div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Garden</div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600">Yes</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
