import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { useStore } from '../../hooks/useStore';
import { PROPERTY_LIST } from '../../data/properties';

interface BirdViewControlsProps {
  isActive: boolean;
}

export const BirdViewControls = ({ isActive }: BirdViewControlsProps) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);
  const { setBirdViewCoords, panMode, currentPropertyId, teleportTarget, setTeleportTarget } = useStore();
  const currentProperty = PROPERTY_LIST.find(p => p.id === currentPropertyId) || PROPERTY_LIST[0];

  // Handle Teleportation logic
  useEffect(() => {
    if (teleportTarget && controlsRef.current) {
      const target = new THREE.Vector3(...teleportTarget);

      // Move controls target to the room center
      controlsRef.current.target.lerp(target, 1); // For now snap, but we can animate

      // Position camera at a good viewing offset from the room center
      // 1.5m height, 5m away
      camera.position.set(target.x, target.y + 2.5, target.z + 5);

      controlsRef.current.update();

      // Reset target so it doesn't trigger again
      setTeleportTarget(null);
    }
  }, [teleportTarget, camera, setTeleportTarget]);

  useEffect(() => {
    if (isActive) {
      const targetPos = new THREE.Vector3(...currentProperty.initialLookAt);
      camera.position.set(targetPos.x, targetPos.y + 50, targetPos.z + 50);
      camera.lookAt(targetPos);

      if (controlsRef.current) {
        controlsRef.current.target.copy(targetPos);
        controlsRef.current.update();
      }
    }
  }, [isActive, currentPropertyId, camera]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!isActive || !controls) return;

    const handleUpdate = () => {
      const pos = camera.position;
      const target = controls.target;
      setBirdViewCoords({
        pos: [Number(pos.x.toFixed(2)), Number(pos.y.toFixed(2)), Number(pos.z.toFixed(2))],
        target: [Number(target.x.toFixed(2)), Number(target.y.toFixed(2)), Number(target.z.toFixed(2))]
      });
    };

    handleUpdate();
    controls.addEventListener('change', handleUpdate);
    return () => controls.removeEventListener('change', handleUpdate);
  }, [isActive, setBirdViewCoords, camera]);

  if (!isActive) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.1}
      minDistance={5}
      maxDistance={250}
      mouseButtons={{
        LEFT: panMode ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: panMode ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN
      }}
    />
  );
};
