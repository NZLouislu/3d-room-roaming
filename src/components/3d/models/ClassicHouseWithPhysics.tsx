import { RigidBody } from '@react-three/rapier';
import { ClassicHouse } from './ClassicHouse';

export const ClassicHouseWithPhysics = () => {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <ClassicHouse castShadow receiveShadow />
    </RigidBody>
  );
};
