import { RigidBody } from '@react-three/rapier';
import { TwoStoryHouse } from './TwoStoryHouse';

export const TwoStoryHouseWithPhysics = () => {
  return (
    <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]}>
      <TwoStoryHouse />
    </RigidBody>
  );
};
