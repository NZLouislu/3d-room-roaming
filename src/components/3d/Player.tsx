import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import { PointerLockControls } from '@react-three/drei';
import { useKeyboard } from '../../hooks/useKeyboard';

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const { forward, backward, left, right } = useKeyboard();

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    // Calculate movement direction
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    // Apply velocity (keep Y velocity for gravity)
    const linvel = rigidBodyRef.current.linvel();
    rigidBodyRef.current.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true);

    // Sync camera to player position
    const translation = rigidBodyRef.current.translation();
    camera.position.set(translation.x, translation.y + 1.5, translation.z);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 2, 0]}
      enabledRotations={[false, false, false]}
      lockRotations
    >
      <CapsuleCollider args={[0.5, 0.5]} />
      <PointerLockControls />
    </RigidBody>
  );
};
