import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import { useKeyboard } from '../../hooks/useKeyboard';

import { PROPERTY_LIST } from '../../data/properties';
import { useStore } from '../../hooks/useStore';

const WALK_SPEED = 3;
const RUN_SPEED = 6;
const MOUSE_SENSITIVITY = 0.002;
const CAMERA_OFFSET_THIRD_PERSON = 5;
const CAMERA_HEIGHT = 1.6;

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

interface PlayerImprovedProps {
  viewMode?: 'first-person' | 'third-person';
}

export const PlayerImproved = ({ viewMode = 'third-person' }: PlayerImprovedProps) => {
  const currentPropertyId = useStore((state) => state.currentPropertyId);
  const currentProperty = PROPERTY_LIST.find(p => p.id === currentPropertyId) || PROPERTY_LIST[0];

  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const { camera, gl } = useThree();
  const { forward, backward, left, right } = useKeyboard();

  const yaw = useRef(Math.PI);
  const pitch = useRef(0);
  const isRunning = useRef(false);

  useEffect(() => {
    if (rigidBodyRef.current) {
      const pos = currentProperty.initialPosition;
      rigidBodyRef.current.setTranslation({ x: pos[0], y: pos[1], z: pos[2] }, true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      yaw.current = Math.PI;
    }
  }, [currentPropertyId, currentProperty.initialPosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') isRunning.current = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') isRunning.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons === 2) {
        yaw.current -= e.movementX * MOUSE_SENSITIVITY;
        const newPitch = pitch.current + e.movementY * MOUSE_SENSITIVITY;
        pitch.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, newPitch));
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('contextmenu', handleContextMenu);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [gl]);

  useEffect(() => {
    camera.rotation.order = 'YXZ';
  }, [camera]);

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    const speed = isRunning.current ? RUN_SPEED : WALK_SPEED;
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed);

    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw.current);

    const linvel = rigidBodyRef.current.linvel();
    rigidBodyRef.current.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true);

    const translation = rigidBodyRef.current.translation();

    if (viewMode === 'first-person') {
      camera.position.set(translation.x, translation.y + CAMERA_HEIGHT, translation.z);
      camera.rotation.set(pitch.current, yaw.current, 0);
    } else {
      const cameraOffset = new THREE.Vector3(
        0,
        CAMERA_HEIGHT + 2,
        CAMERA_OFFSET_THIRD_PERSON
      );
      cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw.current);
      cameraOffset.applyAxisAngle(new THREE.Vector3(1, 0, 0), pitch.current * 0.3);

      camera.position.set(
        translation.x + cameraOffset.x,
        translation.y + cameraOffset.y,
        translation.z + cameraOffset.z
      );

      camera.lookAt(translation.x, translation.y + CAMERA_HEIGHT, translation.z);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      mass={1}
      type="dynamic"
      position={currentProperty.initialPosition}
      enabledRotations={[false, false, false]}
      lockRotations
    >
      <CapsuleCollider args={[0.75, 0.5]} />
      {viewMode === 'third-person' && (
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 1.5, 8, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      )}
    </RigidBody>
  );
};
