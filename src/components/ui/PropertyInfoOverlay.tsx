import { useState } from 'react';

export function PropertyInfoOverlay() {
  const [visible, setVisible] = useState(true);
  
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition z-30"
      >
        ℹ️ Property Info
      </button>
    );
  }
  
  return (
    <div className="fixed top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-80 z-30">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">Property Details</h3>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-blue-600 mb-1">
            $1,250,000
          </div>
          <div className="text-sm text-gray-500">
            Premium Double Floor House
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-xs text-gray-600">Bedrooms</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-xs text-gray-600">Bathrooms</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">280m²</div>
            <div className="text-xs text-gray-600">Living Area</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">500m²</div>
            <div className="text-xs text-gray-600">Land Area</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Key Features</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Modern double-story architecture</li>
            <li>✓ Open-plan living and dining</li>
            <li>✓ Master bedroom with ensuite</li>
            <li>✓ Double garage with internal access</li>
            <li>✓ Landscaped garden with patio</li>
            <li>✓ High-quality finishes throughout</li>
          </ul>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
          Contact Agent
        </button>
      </div>
    </div>
  );
}
