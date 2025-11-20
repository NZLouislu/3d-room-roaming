import { Sky, Environment as DreiEnvironment } from '@react-three/drei';
import { useStore } from '../../hooks/useStore';

export const Environment = () => {
  const isNight = useStore((state) => state.isNight);

  const daySunPosition: [number, number, number] = [100, 20, 100];
  const nightSunPosition: [number, number, number] = [10, -5, 10];

  return (
    <>
      <Sky
        sunPosition={isNight ? nightSunPosition : daySunPosition}
        turbidity={isNight ? 10 : 8}
        rayleigh={isNight ? 0.5 : 6}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <DreiEnvironment preset={isNight ? 'night' : 'sunset'} />
    </>
  );
};
