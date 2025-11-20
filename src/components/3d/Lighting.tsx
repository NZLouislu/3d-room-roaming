import { useStore } from '../../hooks/useStore';

export const Lighting = () => {
  const isNight = useStore((state) => state.isNight);

  return (
    <>
      <ambientLight intensity={isNight ? 0.1 : 0.3} />
      <hemisphereLight
        color={isNight ? '#1a1a2e' : '#87CEEB'}
        groundColor={isNight ? '#0f0f1e' : '#5d9e58'}
        intensity={0.5}
      />
      {!isNight && (
        <directionalLight
          position={[50, 50, 25]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
      )}
      {isNight && (
        <>
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.3}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[0, 4, 0]} intensity={10} color="#ffaa00" distance={10} castShadow />
          <pointLight position={[-5, 2, -5]} intensity={5} color="#00aaff" distance={8} />
        </>
      )}
    </>
  );
};
