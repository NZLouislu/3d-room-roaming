import { useFrame } from '@react-three/fiber';
import { useStore } from './useStore';
import { useRef } from 'react';

export function usePerformanceMonitor() {
  const setFps = useStore((state) => state.setFps);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    frameCount.current++;
    const currentTime = performance.now();
    const delta = currentTime - lastTime.current;

    if (delta >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / delta);
      setFps(fps);
      frameCount.current = 0;
      lastTime.current = currentTime;
    }
  });

  return null;
}
