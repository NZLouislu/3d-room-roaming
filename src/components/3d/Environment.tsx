import { Sky, Environment } from '@react-three/drei';
import { useStore } from '../../hooks/useStore';

export const EnvironmentSystem = () => {
  const { isNight, performanceTier } = useStore();
  const isLow = performanceTier === 'low';

  const daySunPosition: [number, number, number] = [100, 20, 100];
  const nightSunPosition: [number, number, number] = [10, -5, 10];

  if (isLow) {
    return <color attach="background" args={[isNight ? '#0f0f1e' : '#87CEEB']} />;
  }

  return (
    <>
      <Sky
        sunPosition={isNight ? nightSunPosition : daySunPosition}
        turbidity={isNight ? 10 : 2}
        rayleigh={isNight ? 0.5 : 3}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      {/* Added High-end Environment Lighting for realistic reflections */}
      <Environment preset={isNight ? "night" : "apartment"} />
    </>
  );
};
