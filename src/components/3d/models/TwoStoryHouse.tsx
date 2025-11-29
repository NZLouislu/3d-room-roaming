import { useGLTF } from '@react-three/drei';

type GLTFResult = {
  nodes: Record<string, any>;
  materials: Record<string, any>;
};

export function TwoStoryHouse(props: JSX.IntrinsicElements['group']) {
  const gltf = useGLTF('/models/two-story-house.glb');
  const { nodes, materials } = gltf as unknown as GLTFResult;
  
  const meshKeys = Object.keys(nodes);
  
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, -Math.PI]}>
        <group rotation={[-Math.PI, 0, 0]} scale={1}>
          {meshKeys.map((key, index) => {
            const node = nodes[key];
            if (!node || !node.geometry) return null;
            const materialKey = Object.keys(materials)[index % Object.keys(materials).length];
            return (
              <mesh
                key={key}
                geometry={node.geometry}
                material={materials[materialKey]}
                castShadow
                receiveShadow
              />
            );
          })}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/two-story-house.glb');
