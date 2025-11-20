import { useMemo } from 'react';
import { Instances, Instance } from '@react-three/drei';

interface TreesProps {
  count?: number;
}

export const Trees = ({ count = 50 }: TreesProps) => {
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      
      if (Math.abs(x) < 8 && Math.abs(z) < 8) {
        continue;
      }

      pos.push({
        position: [x, 1, z] as [number, number, number],
        rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
        scale: 0.8 + Math.random() * 0.4
      });
    }
    return pos;
  }, [count]);

  return (
    <Instances limit={count}>
      <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
      <meshStandardMaterial color="#8B4513" />
      
      {positions.map((props, i) => (
        <Instance key={i} {...props} />
      ))}
    </Instances>
  );
};
