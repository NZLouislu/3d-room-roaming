import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Box3 } from 'three';
import { TourPoint } from '../../data/tourPoints';

interface AutoTourControllerProps {
  tourPoints: TourPoint[];
  enabled: boolean;
  currentIndex: number;
  setCurrentIndex: (fn: (i: number) => number) => void;
  progress: number;
  setProgress: (fn: (p: number) => number) => void;
  isPaused: boolean;
  onComplete: () => void;
}

// 3D 场景内的相机控制器
export function AutoTourController({ 
  tourPoints, 
  enabled, 
  currentIndex,
  setCurrentIndex,
  progress,
  setProgress,
  isPaused,
  onComplete 
}: AutoTourControllerProps) {
  const { camera, scene } = useThree();
  const hasLoggedRef = useRef(false);
  
  const currentPoint = tourPoints[currentIndex];

  // 调试：打印场景中房子的实际位置
  useEffect(() => {
    if (enabled && !hasLoggedRef.current) {
      hasLoggedRef.current = true;
      
      console.log('[AutoTour] Scene children:', scene.children.map(c => ({ name: c.name, type: c.type, position: c.position.toArray() })));
      
      const box = new Box3().setFromObject(scene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      console.log('[AutoTour] Scene bounding box - center:', center.toArray(), 'size:', size.toArray());
      console.log('[AutoTour] Scene box min:', box.min.toArray(), 'max:', box.max.toArray());
    }
  }, [enabled, scene]);
  
  useFrame((_state, delta) => {
    if (!enabled || isPaused || !currentPoint) return;
    
    const targetPos = new Vector3(...currentPoint.position);
    const targetLookAt = new Vector3(...currentPoint.lookAt);
    
    camera.position.lerp(targetPos, delta * 1.5);
    camera.lookAt(targetLookAt);

    if (Math.floor(progress) !== Math.floor(progress + delta)) {
      console.log(`[AutoTour] Point ${currentIndex + 1}/${tourPoints.length} - Camera pos:`, 
        camera.position.toArray().map(v => v.toFixed(2)), 
        'Target:', targetPos.toArray(),
        'LookAt:', targetLookAt.toArray()
      );
    }
    
    setProgress(prev => {
      const newProgress = prev + delta;
      if (newProgress >= currentPoint.duration) {
        if (currentIndex < tourPoints.length - 1) {
          setCurrentIndex(i => i + 1);
          return 0;
        } else {
          onComplete();
          return prev;
        }
      }
      return newProgress;
    });
  });
  
  return null;
}

// UI 组件 - 在 Canvas 外部使用
interface TourUIProps {
  tourPoints: TourPoint[];
  currentIndex: number;
  setCurrentIndex: (fn: (i: number) => number) => void;
  progress: number;
  setProgress: (p: number) => void;
  isPaused: boolean;
  setIsPaused: (p: boolean) => void;
  onComplete: () => void;
}

export function TourUI({ 
  tourPoints, 
  currentIndex, 
  setCurrentIndex, 
  progress, 
  setProgress,
  isPaused, 
  setIsPaused, 
  onComplete 
}: TourUIProps) {
  const currentPoint = tourPoints[currentIndex];
  
  if (!currentPoint) return null;
  
  return (
    <div className="fixed top-4 left-4 z-50 pointer-events-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 w-72">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">
              {currentPoint.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {currentPoint.description}
            </p>
          </div>
          <div className="ml-3 text-sm text-gray-500">
            {currentIndex + 1} / {tourPoints.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-100"
            style={{ width: `${(progress / currentPoint.duration) * 100}%` }}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            {isPaused ? '▶️ 继续' : '⏸️ 暂停'}
          </button>
          
          <button
            onClick={() => {
              if (currentIndex < tourPoints.length - 1) {
                setCurrentIndex(i => i + 1);
                setProgress(0);
              }
            }}
            className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition"
            disabled={currentIndex >= tourPoints.length - 1}
          >
            ⏭️ 下一个
          </button>
          
          <button
            onClick={onComplete}
            className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
          >
            ⏹️ 跳过
          </button>
        </div>
      </div>
    </div>
  );
}
