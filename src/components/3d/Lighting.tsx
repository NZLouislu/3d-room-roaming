import { useStore } from '../../hooks/useStore';

export const Lighting = () => {
  const { isNight, performanceTier } = useStore();
  const isLow = performanceTier === 'low';

  return (
    <>
      <ambientLight intensity={isNight ? 0.15 : (isLow ? 0.8 : 0.4)} />
      <hemisphereLight
        color={isNight ? '#1a1a2e' : '#87CEEB'}
        groundColor={isNight ? '#0f0f1e' : '#5d9e58'}
        intensity={isLow ? 0.4 : 0.6}
      />
      {!isNight && (
        <>
          <directionalLight
            position={[30, 40, 20]}
            intensity={isLow ? 0.8 : 1.8}
            castShadow={!isLow}
            shadow-mapSize={isLow ? [512, 512] : [2048, 2048]}
            shadow-camera-far={100}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
            shadow-bias={-0.0001}
          />
          {!isLow && (
            <directionalLight
              position={[-20, 30, 15]}
              intensity={0.5}
              color="#ffeedd"
            />
          )}
        </>
      )}
      {isNight && (
        <>
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.4}
            color="#b8c5d6"
            castShadow={!isLow}
            shadow-mapSize={isLow ? [256, 256] : [1024, 1024]}
          />
          {!isLow && (
            <pointLight position={[0, 3, 10]} intensity={15} color="#ffaa00" distance={15} castShadow={true} />
          )}
          {!isLow && (
            <>
              <pointLight position={[-8, 2, -5]} intensity={8} color="#00aaff" distance={15} />
              <pointLight position={[8, 2, -5]} intensity={8} color="#ff8800" distance={15} />
            </>
          )}
        </>
      )}
    </>
  );
};
