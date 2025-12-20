import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Suspense, useEffect, useMemo } from 'react';
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
  const isMobile = useStore((state) => state.isMobile);

  const modelBounds = useMemo(() => {
    if (!scene) return { size: new Vector3(20, 20, 20) };
    
    try {
      const box = new Box3().setFromObject(scene);
      const size = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
      console.log('[HouseWithPhysics] Model bounds:', { size: size.toArray(), center: center.toArray() });
      return { size };
    } catch (error) {
      console.error('[HouseWithPhysics] Error calculating bounds:', error);
      return { size: new Vector3(20, 20, 20) };
    }
  }, [scene]);

  const offsetX = 146.65;
  const offsetY = 14.11;
  const offsetZ = 138.17;
  
  // On mobile/low-tier: Use manual cuboid colliders for stability
  // On desktop high-tier: Use automatic hull/trimesh for accuracy
  const useManualColliders = isMobile || performanceTier === 'low';
  
  if (useManualColliders) {
    return (
      <RigidBody type="fixed" colliders={false}>
        <group {...props} position={[offsetX, offsetY, offsetZ]}>
          <primitive 
            object={scene} 
            scale={1}
            castShadow={!isMobile && performanceTier !== 'low'}
            receiveShadow={!isMobile && performanceTier !== 'low'}
          />
          
          {/* Ground floor collider */}
          <CuboidCollider 
            args={[modelBounds.size.x / 2, 5, modelBounds.size.z / 2]} 
            position={[0, 0, 0]}
          />
          
          {/* Second floor collider */}
          <CuboidCollider 
            args={[modelBounds.size.x / 2, 5, modelBounds.size.z / 2]} 
            position={[0, 10, 0]}
          />
          
          {/* Roof collider */}
          <CuboidCollider 
            args={[modelBounds.size.x / 2, 2, modelBounds.size.z / 2]} 
            position={[0, 18, 0]}
          />
        </group>
      </RigidBody>
    );
  }
  
  return (
    <RigidBody type="fixed" colliders="hull">
      <group {...props} position={[offsetX, offsetY, offsetZ]}>
        <primitive 
          object={scene} 
          scale={1}
          castShadow={performanceTier === 'high'}
          receiveShadow={performanceTier === 'high'}
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
