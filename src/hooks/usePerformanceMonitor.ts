import { useFrame } from '@react-three/fiber';
import { useStore } from './useStore';
import { useRef } from 'react';

export function usePerformanceMonitor() {
  const setFps = useStore((state) => state.setFps);
  const setPerformanceTier = useStore((state) => state.setPerformanceTier);
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const mountTime = useRef(performance.now());
  const lowFpsCounter = useRef(0);

  useFrame(() => {
    frameCount.current++;
    const currentTime = performance.now();
    const delta = currentTime - lastTime.current;

    // Check every 1 second
    if (delta >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / delta);
      setFps(fps);

      // Reset counters
      frameCount.current = 0;
      lastTime.current = currentTime;

      // Dynamic Performance Adjustment Logic
      // 1. Wait for warm-up period (3 seconds)
      const timeSinceMount = currentTime - mountTime.current;
      if (timeSinceMount < 3000) return;

      const currentTier = useStore.getState().performanceTier;

      // 2. Check for low performance
      // High tier needs > 45 FPS, Medium needs > 30 FPS
      const threshold = currentTier === 'high' ? 45 : 30;

      if (currentTier !== 'low' && fps < threshold) {
        lowFpsCounter.current++;
        
        // If FPS is low for 2 consecutive checks (2 seconds)
        if (lowFpsCounter.current >= 2) {
          if (currentTier === 'high') {
            console.warn(`[Performance] FPS too low (${fps} < 45). Downgrading to MEDIUM.`);
            setPerformanceTier('medium');
          } else if (currentTier === 'medium') {
            console.warn(`[Performance] FPS too low (${fps} < 30). Downgrading to LOW.`);
            setPerformanceTier('low');
          }
          
          // Reset counter and add grace period after change
          lowFpsCounter.current = 0;
          mountTime.current = currentTime; // Treat as new mount to give time to stabilize
        }
      } else {
        lowFpsCounter.current = 0;
      }
    }
  });

  return null;
}
