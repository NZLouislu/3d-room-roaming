
import { OrbitControls } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';


interface BirdViewControlsProps {
  onUpdate: (pos: [number, number, number], target: [number, number, number]) => void;
  isActive: boolean;
}

export const BirdViewControls = ({ onUpdate, isActive }: BirdViewControlsProps) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    if (isActive) {
      camera.position.set(0, 50, 0);
      camera.lookAt(0, 0, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  }, [isActive, camera]);

  useFrame(({ clock }) => {
    if (!isActive || !controlsRef.current) return;

    const now = clock.getElapsedTime();
    if (now - lastUpdateRef.current > 0.2) {
      lastUpdateRef.current = now;
      
      const pos = camera.position;
      const target = controlsRef.current.target;
      
      onUpdate(
        [Number(pos.x.toFixed(2)), Number(pos.y.toFixed(2)), Number(pos.z.toFixed(2))],
        [Number(target.x.toFixed(2)), Number(target.y.toFixed(2)), Number(target.z.toFixed(2))]
      );
    }
  });

  if (!isActive) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.1}
      minDistance={5}
      maxDistance={100}
    />
  );
};
