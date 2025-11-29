import { useGLTF } from '@react-three/drei';

type GLTFResult = {
  nodes: Record<string, any>;
  materials: Record<string, any>;
};

export function ClassicHouse(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/classic-house.glb') as GLTFResult;
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.House?.geometry}
        material={materials.HouseMaterial}
      />
    </group>
  );
}

useGLTF.preload('/models/classic-house.glb');
