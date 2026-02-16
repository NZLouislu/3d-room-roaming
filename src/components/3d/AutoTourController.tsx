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
  onComplete: _onComplete, // Unused in controller logic now
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
          // Last point finished - Pause and show End UI
          if (!isPaused) {
            // We don't have setIsPaused here, but we pass isPaused prop.
            // We need to trigger a state change potentially.
            // But this component doesn't control isPaused state directly, parent does.
            // We can't call setIsPaused here? 
            // Actually TourUI has setIsPaused. AutoTourController props has isPaused but not setter.
            // Wait, AutoTourController *does not* receive setIsPaused.
            // It receives onComplete.
            // Let's call onComplete with a special flag? Or just use a callback?
            // Or we can just let it sit at the end.
            return currentPoint.duration;
          }
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
  const [isExpanded, setIsExpanded] = useState(false);
  const currentPoint = tourPoints[currentIndex];

  // Safety check: if currentPoint is undefined (e.g. during property switch), return null
  if (!currentPoint) return null;

  // Check if tour is finished
  const isFinished = currentIndex === tourPoints.length - 1 && progress >= currentPoint.duration;

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 transform transition-all scale-100">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-blue-600">🎉</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Tour Complete!</h2>
          <p className="text-gray-600 mb-8 font-medium">You've seen all the highlights. How would you like to continue your exploration?</p>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setCurrentIndex(() => 0);
                setProgress(0);
                setIsPaused(false);
              }}
              className="w-full py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3"
            >
              <span className="text-xl">🔄</span>
              <span>Replay Guided Tour</span>
            </button>
            <button
              onClick={() => {
                // We need to set mode to bird-view which is in parent state
                onComplete(); // This normally sets to free-explore
              }}
              className="w-full py-4 px-6 bg-white/50 text-gray-900 border-2 border-gray-100 font-bold rounded-2xl hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <span className="text-xl">🦅</span>
              <span>Bird's Eye View</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-32 left-8 z-40 pointer-events-auto">
      {!isExpanded ? (
        <div
          className="group relative cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          <div className="absolute inset-0 bg-black/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-full" />
          <h1 className="relative text-4xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight">
            {currentIndex + 1}. {currentPoint.title}
          </h1>
          <div className="text-white/80 text-sm font-medium mt-1 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            Click to controls
          </div>
        </div>
      ) : (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 w-80 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {currentPoint.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                {currentPoint.description}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-4 text-sm font-medium text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">
              View {currentIndex + 1} of {tourPoints.length}
            </span>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${(progress / currentPoint.duration) * 100}%` }}
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`w-full px-4 py-3 text-white text-sm font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2 ${isPaused
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
                : 'bg-orange-500 hover:bg-orange-600 active:scale-[0.98]'
                }`}
            >
              {isPaused ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  Resume Tour
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                  Pause Tour
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex(i => i - 1);
                    setProgress(0);
                  }
                }}
                disabled={currentIndex <= 0}
                className="flex flex-col items-center justify-center gap-1 px-2 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                Previous
              </button>

              <button
                onClick={() => {
                  if (currentIndex < tourPoints.length - 1) {
                    setCurrentIndex(i => i + 1);
                    setProgress(0);
                  }
                }}
                disabled={currentIndex >= tourPoints.length - 1}
                className="flex flex-col items-center justify-center gap-1 px-2 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-white transition"
              >
                Next
              </button>

              <button
                onClick={onComplete}
                className="flex flex-col items-center justify-center gap-1 px-2 py-2 bg-white border border-red-100 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-50 hover:border-red-200 transition"
              >
                End Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
