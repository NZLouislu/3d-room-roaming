import { useState } from 'react';

interface WelcomeProps {
  onStart: (mode: 'auto-tour' | 'free-explore') => void;
}

export function RealEstateWelcome({ onStart }: WelcomeProps) {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  const handleStart = (mode: 'auto-tour' | 'free-explore') => {
    setVisible(false);
    onStart(mode);
  };
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden">
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">
            Premium Double Floor House
          </h1>
          <p className="text-blue-100 mt-2">
            Virtual 3D Tour - Experience Your Dream Home
          </p>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            <button
              onClick={() => handleStart('auto-tour')}
              className="group relative overflow-hidden rounded-2xl border-2 border-blue-200 hover:border-blue-500 transition-all duration-300 p-8 text-left bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl"
            >
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Guided Tour
              </h3>
              <p className="text-gray-600 mb-4">
                Sit back and enjoy a 3-minute automated tour showcasing all the best features
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ Exterior 360° view</li>
                <li>✓ Key rooms highlights</li>
                <li>✓ Perfect for first-time viewers</li>
              </ul>
              <div className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-full group-hover:bg-blue-700 transition">
                Start Tour →
              </div>
            </button>
            
            <button
              onClick={() => handleStart('free-explore')}
              className="group relative overflow-hidden rounded-2xl border-2 border-green-200 hover:border-green-500 transition-all duration-300 p-8 text-left bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl"
            >
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Free Exploration
              </h3>
              <p className="text-gray-600 mb-4">
                Navigate freely and explore every corner at your own pace
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>✓ WASD + Mouse controls</li>
                <li>✓ Quick viewpoint jumps</li>
                <li>✓ Measure rooms yourself</li>
              </ul>
              <div className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full group-hover:bg-green-700 transition">
                Start Exploring →
              </div>
            </button>
            
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🏠</span>
              Property Highlights
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-gray-700">Bedrooms</div>
                <div className="text-2xl font-bold text-blue-600">4</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Bathrooms</div>
                <div className="text-2xl font-bold text-blue-600">3</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Floors</div>
                <div className="text-2xl font-bold text-blue-600">2</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Living Area</div>
                <div className="text-2xl font-bold text-blue-600">280m²</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Garage</div>
                <div className="text-2xl font-bold text-blue-600">Double</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">Garden</div>
                <div className="text-2xl font-bold text-blue-600">Yes</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
