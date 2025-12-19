import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Suspense, useEffect } from 'react';
import { Box3, Vector3 } from 'three';
import { useStore } from '../../../hooks/useStore';

export function DoubleFloorHouse(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/models/two-story-house.glb');
  
  useEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      console.log('[House] Model loaded - center:', center.toArray(), 'size:', size.toArray());
      console.log('[House] Model box min:', box.min.toArray(), 'max:', box.max.toArray());
    }
  }, [scene]);
  
  return (
    <group {...props}>
      <primitive 
        object={scene} 
        scale={1}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload('/models/two-story-house.glb');

function DoubleFloorHouseInner(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/models/two-story-house.glb');
  const performanceTier = useStore((state) => state.performanceTier);

  useEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      console.log('[HouseWithPhysics] Model center:', center.toArray(), 'size:', size.toArray());
    }
  }, [scene]);

  const offsetX = 146.65;
  const offsetY = 14.11;
  const offsetZ = 138.17;
  
  // Choose collider type based on performance tier
  // Trimesh is very expensive, "hull" or "cuboid" is much cheaper
  const colliderType = performanceTier === 'low' ? 'hull' : 'trimesh';
  
  return (
    <RigidBody type="fixed" colliders={colliderType}>
      <group {...props} position={[offsetX, offsetY, offsetZ]}>
        <primitive 
          object={scene} 
          scale={1}
          castShadow={performanceTier !== 'low'}
          receiveShadow={performanceTier !== 'low'}
        />
      </group>
    </RigidBody>
  );
}

export function DoubleFloorHouseWithSuspense(props: JSX.IntrinsicElements['group']) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <DoubleFloorHouseInner {...props} />
    </Suspense>
  );
}

function LoadingPlaceholder() {
  return (
    <mesh position={[0, 5, 0]}>
      <boxGeometry args={[10, 10, 10]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  );
}
