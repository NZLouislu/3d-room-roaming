import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import { useEffect, useState, useRef } from 'react';
import { TourPoint } from '../../data/tourPoints';
import { useStore } from '../../hooks/useStore';

interface AutoTourControllerProps {
  tourPoints: TourPoint[];
  enabled: boolean;
  currentIndex: number;
  setCurrentIndex: (fn: (i: number) => number) => void;
  progress: number;
  setProgress: (fn: (p: number) => number) => void;
  isPaused: boolean;
  onComplete: () => void;
  customPosition?: [number, number, number];
  customLookAt?: [number, number, number];
  onPositionChange?: (pos: [number, number, number]) => void;
  onLookAtChange?: (lookAt: [number, number, number]) => void;
}

export function AutoTourController({ 
  tourPoints, 
  enabled, 
  currentIndex,
  setCurrentIndex,
  progress,
  setProgress,
  isPaused,
  onComplete,
  customPosition,
  customLookAt,
  onPositionChange,
  onLookAtChange
}: AutoTourControllerProps) {
  const { camera, gl } = useThree();
  const keysRef = useRef<Set<string>>(new Set());
  const [isMouseDown, setIsMouseDown] = useState(false);
  const rotationRef = useRef({ yaw: 0, pitch: 0 });
  const performanceTier = useStore((state) => state.performanceTier);
  
  const currentPoint = tourPoints[currentIndex];

  useEffect(() => {
    const canvas = gl.domElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0 && isPaused) {
        setIsMouseDown(true);
        canvas.requestPointerLock();
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsMouseDown(false);
        if (document.pointerLockElement === canvas) {
          document.exitPointerLock();
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPaused || !isMouseDown) return;

      const sensitivity = performanceTier === 'low' ? 0.002 : 0.0015;
      rotationRef.current.yaw += e.movementX * sensitivity;
      rotationRef.current.pitch += e.movementY * sensitivity;
      rotationRef.current.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationRef.current.pitch));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPaused, isMouseDown, gl.domElement, performanceTier]);

  const prevIndexRef = useRef(currentIndex);

  // Sync rotation refs when tour point changes
  useEffect(() => {
    if (!isPaused && currentPoint) {
      const direction = new Vector3(...currentPoint.lookAt).sub(new Vector3(...currentPoint.position)).normalize();
      rotationRef.current.yaw = Math.atan2(direction.x, direction.z);
      rotationRef.current.pitch = Math.asin(direction.y);
    }
  }, [isPaused, currentPoint]);

  // When pausing, properly sync the generic camera position state
  useEffect(() => {
    if (isPaused) {
      if (onPositionChange) {
        onPositionChange([
          camera.position.x,
          camera.position.y,
          camera.position.z
        ]);
      }
      const euler = new Euler().setFromQuaternion(camera.quaternion, 'YXZ');
      rotationRef.current.yaw = euler.y;
      rotationRef.current.pitch = euler.x;
    }
  }, [isPaused, camera, onPositionChange]);

  // Snap camera when index changes while paused
  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      if (isPaused && currentPoint) {
        camera.position.set(...currentPoint.position);
        camera.lookAt(...currentPoint.lookAt);
        
        const direction = new Vector3(...currentPoint.lookAt).sub(new Vector3(...currentPoint.position)).normalize();
        rotationRef.current.yaw = Math.atan2(direction.x, direction.z);
        rotationRef.current.pitch = Math.asin(direction.y);

        if (onPositionChange) {
          onPositionChange([...currentPoint.position]);
        }
      }
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex, isPaused, currentPoint, camera, onPositionChange]);

  // Apply custom position immediately if provided (e.g. from debug panel Apply)
  useEffect(() => {
      if (customPosition) {
        camera.position.set(...customPosition);
        if (customLookAt) camera.lookAt(...customLookAt);
      }
  }, [customPosition, customLookAt, camera]);

  useFrame((_state, delta) => {
    if (!enabled || !currentPoint) return;

    if (isPaused) {
      const keys = keysRef.current;
      const baseSpeed = performanceTier === 'low' ? 2.0 : 3.0; 
      const moveSpeed = keys.has('shift') ? baseSpeed * 4.0 : baseSpeed;
      
      camera.rotation.order = 'YXZ';
      camera.rotation.y = rotationRef.current.yaw;
      camera.rotation.x = rotationRef.current.pitch;

      const forward = new Vector3(0, 0, -1);
      const right = new Vector3(1, 0, 0);
      
      forward.applyEuler(new Euler(0, rotationRef.current.yaw, 0, 'YXZ'));
      right.applyEuler(new Euler(0, rotationRef.current.yaw, 0, 'YXZ'));

      const movement = new Vector3();

      if (keys.has('w') || keys.has('arrowup')) movement.add(forward.clone().multiplyScalar(moveSpeed * delta));
      if (keys.has('s') || keys.has('arrowdown')) movement.add(forward.clone().multiplyScalar(-moveSpeed * delta));
      if (keys.has('a') || keys.has('arrowleft')) movement.add(right.clone().multiplyScalar(-moveSpeed * delta));
      if (keys.has('d') || keys.has('arrowright')) movement.add(right.clone().multiplyScalar(moveSpeed * delta));
      if (keys.has('q')) movement.y += moveSpeed * delta;
      if (keys.has('e')) movement.y -= moveSpeed * delta;

      if (movement.length() > 0 || isMouseDown) {
        if (movement.length() > 0) {
          camera.position.add(movement);
        }

        if (onPositionChange) {
          onPositionChange([
            camera.position.x,
            camera.position.y,
            camera.position.z
          ]);
        }

        if (onLookAtChange) {
           const direction = new Vector3(0, 0, -1);
           direction.applyEuler(new Euler(
             rotationRef.current.pitch, 
             rotationRef.current.yaw, 
             0, 
             'YXZ'
           ));
           const target = camera.position.clone().add(direction.multiplyScalar(10));
           onLookAtChange([target.x, target.y, target.z]);
        }
      }
      return;
    }
    
    const targetPos = customPosition 
      ? new Vector3(...customPosition)
      : new Vector3(...currentPoint.position);
    const targetLookAt = customLookAt 
      ? new Vector3(...customLookAt)
      : new Vector3(...currentPoint.lookAt);
    
    camera.position.lerp(targetPos, delta * 2.5);
    camera.lookAt(targetLookAt);
    
    if (Math.floor(progress) !== Math.floor(progress + delta)) {
      const dist = camera.position.distanceTo(targetPos);
      console.log(`[AutoTour Debug] View #${currentPoint.id}: ${currentPoint.title}`);
      console.log(`  - Camera Pos: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]`);
      console.log(`  - Target Pos: [${targetPos.x.toFixed(2)}, ${targetPos.y.toFixed(2)}, ${targetPos.z.toFixed(2)}]`);
      console.log(`  - LookAt: [${targetLookAt.x.toFixed(2)}, ${targetLookAt.y.toFixed(2)}, ${targetLookAt.z.toFixed(2)}]`);
      console.log(`  - Distance to Target: ${dist.toFixed(2)}`);
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
        
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(i => i - 1);
                  setProgress(0);
                }
              }}
              className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex <= 0}
            >
              ⏮️ Previous
            </button>
            
            <button
              onClick={() => {
                if (currentIndex < tourPoints.length - 1) {
                  setCurrentIndex(i => i + 1);
                  setProgress(0);
                }
              }}
              className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex >= tourPoints.length - 1}
            >
              ⏭️ Next
            </button>
            
            <button
              onClick={onComplete}
              className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
            >
              ⏹️ Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
