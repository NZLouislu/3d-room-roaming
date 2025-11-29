import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { Suspense, useEffect } from 'react';
import { Box3, Vector3 } from 'three';

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

// 带物理碰撞的版本
function DoubleFloorHouseInner(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/models/two-story-house.glb');

  useEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      console.log('[HouseWithPhysics] Model center:', center.toArray(), 'size:', size.toArray());
    }
  }, [scene]);

  // 房子模型原始中心在 [-146, -14, -138]
  // 偏移后中心在 [0, 20, 0]，尺寸 [54, 40, 35]
  // 需要让底部在地面 y=0，所以 Y 偏移应该是 14.11（让中心在 y=20 左右）
  const offsetX = 146.65;
  const offsetY = 14.11; // 只补偿原始的Y偏移，不要额外加高度
  const offsetZ = 138.17;
  
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group {...props} position={[offsetX, offsetY, offsetZ]}>
        <primitive 
          object={scene} 
          scale={1}
          castShadow
          receiveShadow
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
