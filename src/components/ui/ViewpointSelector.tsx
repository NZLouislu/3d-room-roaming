import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useState } from 'react';
import { Vector3 } from 'three';
import { HOUSE_VIEWPOINTS, Viewpoint } from '../../data/viewpoints';

export function ViewpointSelector() {
  const { camera } = useThree();
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'exterior' | 'interior' | 'special'>('all');
  
  const jumpToViewpoint = (viewpoint: Viewpoint) => {
    const targetPos = new Vector3(...viewpoint.position);
    const targetLookAt = new Vector3(...viewpoint.lookAt);
    
    camera.position.copy(targetPos);
    camera.lookAt(targetLookAt);
  };
  
  const filteredViewpoints = activeCategory === 'all' 
    ? HOUSE_VIEWPOINTS 
    : HOUSE_VIEWPOINTS.filter(vp => vp.category === activeCategory);
  
  return (
    <Html portal={{ current: document.body }}>
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 pointer-events-auto">
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition mb-2"
        >
          {expanded ? '✕' : '📍'}
        </button>
        
        {expanded && (
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 w-64">
            <h3 className="font-bold text-gray-800 mb-3">Quick Views</h3>
            
            <div className="flex gap-2 mb-3 flex-wrap">
              {(['all', 'exterior', 'interior', 'special'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredViewpoints.map(vp => (
                <button
                  key={vp.id}
                  onClick={() => jumpToViewpoint(vp)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition text-left"
                >
                  <span className="text-2xl">{vp.icon}</span>
                  <span className="font-medium text-gray-800">{vp.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Html>
  );
}
