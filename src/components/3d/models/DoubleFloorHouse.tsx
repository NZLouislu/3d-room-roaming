import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
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

const HOUSE_SIZE = { x: 30, y: 20, z: 25 };
const HOUSE_OFFSET = { x: 146.65, y: 14.11, z: 138.17 };

function HouseMesh({ performanceTier }: { performanceTier: string }) {
  const { scene } = useGLTF('/models/two-story-house.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={1}
      castShadow={performanceTier === 'high'}
      receiveShadow={performanceTier === 'high'}
    />
  );
}

function DoubleFloorHouseInner(props: JSX.IntrinsicElements['group']) {
  const performanceTier = useStore((state) => state.performanceTier);

  // We use hardcoded dimensions for the house colliders to ensure they are 
  // ready immediately and don't depend on async model loading, which 
  // can cause "expected instance of a" errors in Rapier/Safari.
  const w = HOUSE_SIZE.x;
  const h = HOUSE_SIZE.y;
  const d = HOUSE_SIZE.z;

  return (
    <group {...props} position={[HOUSE_OFFSET.x, HOUSE_OFFSET.y, HOUSE_OFFSET.z]}>
      {/* Visual Model */}
      <Suspense fallback={null}>
        <HouseMesh performanceTier={performanceTier} />
      </Suspense>

      {/* Physics Colliders - Fixed constant boxes for stability */}
      <RigidBody type="fixed" colliders={false}>
        {/* Main Floor */}
        <CuboidCollider args={[w / 2, 0.5, d / 2]} position={[0, -0.25, 0]} />
        
        {/* Second Floor */}
        <CuboidCollider args={[w / 2, 0.5, d / 2]} position={[0, h / 2.1, 0]} />

        {/* Outer Walls approximation */}
        <CuboidCollider args={[w / 2, h / 2, 0.5]} position={[0, h / 4, d / 2]} />
        <CuboidCollider args={[w / 2, h / 2, 0.5]} position={[0, h / 4, -d / 2]} />
        <CuboidCollider args={[0.5, h / 2, d / 2]} position={[w / 2, h / 4, 0]} />
        <CuboidCollider args={[-0.5, h / 2, d / 2]} position={[-w / 2, h / 4, 0]} />
      </RigidBody>
    </group>
  );
}

export function DoubleFloorHouseWithSuspense(props: JSX.IntrinsicElements['group']) {
  return <DoubleFloorHouseInner {...props} />;
}

