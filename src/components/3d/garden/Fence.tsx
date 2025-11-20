export const Fence = () => {
  const fencePosts = [];
  const fenceLength = 20;
  const postSpacing = 2;
  const numPosts = Math.floor(fenceLength / postSpacing);

  for (let i = 0; i < numPosts; i++) {
    const x = i * postSpacing - fenceLength / 2;
    fencePosts.push(
      <mesh key={`front-${i}`} position={[x, 0.5, 10]} castShadow>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
    );
    fencePosts.push(
      <mesh key={`back-${i}`} position={[x, 0.5, -10]} castShadow>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
    );
  }

  for (let i = 0; i < numPosts; i++) {
    const z = i * postSpacing - fenceLength / 2;
    fencePosts.push(
      <mesh key={`left-${i}`} position={[-10, 0.5, z]} castShadow>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
    );
    fencePosts.push(
      <mesh key={`right-${i}`} position={[10, 0.5, z]} castShadow>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
    );
  }

  return <group>{fencePosts}</group>;
};
