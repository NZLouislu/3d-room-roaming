import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import { useKeyboard } from '../../hooks/useKeyboard';

const WALK_SPEED = 3;
const RUN_SPEED = 6;
const MOUSE_SENSITIVITY = 0.002;
const CAMERA_OFFSET_THIRD_PERSON = 5; // 第三人称距离
const CAMERA_HEIGHT = 1.6; // 眼睛高度

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

interface PlayerImprovedProps {
  viewMode?: 'first-person' | 'third-person';
}

export const PlayerImproved = ({ viewMode = 'third-person' }: PlayerImprovedProps) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const { camera, gl } = useThree();
  const { forward, backward, left, right } = useKeyboard();
  
  const [yaw, setYaw] = useState(Math.PI);
  const [pitch, setPitch] = useState(0); // 垂直旋转
  const [isRunning, setIsRunning] = useState(false);
  const mouseMovement = useRef({ x: 0, y: 0 });

  // 监听键盘Shift键（跑步）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsRunning(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsRunning(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 鼠标移动控制视角（不锁定指针）
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 只在按住右键时旋转视角
      if (e.buttons === 2) {
        mouseMovement.current.x = e.movementX;
        mouseMovement.current.y = e.movementY;

        setYaw(prev => prev - e.movementX * MOUSE_SENSITIVITY);
        setPitch(prev => {
          const newPitch = prev - e.movementY * MOUSE_SENSITIVITY;
          // 限制俯仰角度，防止翻转
          return Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, newPitch));
        });
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // 阻止右键菜单
    };

    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('contextmenu', handleContextMenu);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [gl]);

  // 初始化相机
  useEffect(() => {
    camera.rotation.order = 'YXZ';
  }, [camera]);

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    // 计算移动方向
    const speed = isRunning ? RUN_SPEED : WALK_SPEED;
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed);

    // 应用旋转
    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

    // 更新物理速度
    const linvel = rigidBodyRef.current.linvel();
    rigidBodyRef.current.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true);

    // 获取玩家位置
    const translation = rigidBodyRef.current.translation();

    // 根据视角模式更新相机
    if (viewMode === 'first-person') {
      // 第一人称：相机在玩家头部
      camera.position.set(translation.x, translation.y + CAMERA_HEIGHT, translation.z);
      camera.rotation.set(pitch, yaw, 0);
    } else {
      // 第三人称：相机在玩家后方
      const cameraOffset = new THREE.Vector3(
        0,
        CAMERA_HEIGHT + 2,
        CAMERA_OFFSET_THIRD_PERSON
      );
      cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
      cameraOffset.applyAxisAngle(new THREE.Vector3(1, 0, 0), pitch * 0.3);

      camera.position.set(
        translation.x + cameraOffset.x,
        translation.y + cameraOffset.y,
        translation.z + cameraOffset.z
      );

      // 让相机看向玩家
      camera.lookAt(translation.x, translation.y + CAMERA_HEIGHT, translation.z);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 0.5, 25]}
      enabledRotations={[false, false, false]}
      lockRotations
    >
      <CapsuleCollider args={[0.75, 0.5]} />
      {/* 可视化玩家胶囊体（第三人称时可见） */}
      {viewMode === 'third-person' && (
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 1.5, 8, 16]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      )}
    </RigidBody>
  );
};
