import { useStore } from '../../hooks/useStore';

export const Lighting = () => {
  const isNight = useStore((state) => state.isNight);

  return (
    <>
      <ambientLight intensity={isNight ? 0.15 : 0.4} />
      <hemisphereLight
        color={isNight ? '#1a1a2e' : '#87CEEB'}
        groundColor={isNight ? '#0f0f1e' : '#5d9e58'}
        intensity={0.6}
      />
      {!isNight && (
        <>
          <directionalLight
            position={[30, 40, 20]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={100}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
            shadow-bias={-0.0001}
          />
          <directionalLight
            position={[-20, 30, 15]}
            intensity={0.5}
            color="#ffeedd"
          />
        </>
      )}
      {isNight && (
        <>
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.4}
            color="#b8c5d6"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[0, 3, 10]} intensity={15} color="#ffaa00" distance={20} castShadow />
          <pointLight position={[-8, 2, -5]} intensity={8} color="#00aaff" distance={15} />
          <pointLight position={[8, 2, -5]} intensity={8} color="#ff8800" distance={15} />
        </>
      )}
    </>
  );
};
