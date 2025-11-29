import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { useState } from 'react';
import { ExperienceImproved } from './components/3d/ExperienceImproved';
import { Interface } from './components/ui/Interface';
import { ViewModeToggle } from './components/ui/ViewModeToggle';

/**
 * 改进版App - 使用新的玩家控制系统
 * 
 * 主要改进：
 * 1. 第一人称/第三人称视角切换
 * 2. 右键拖拽旋转视角（无需锁定指针）
 * 3. Shift键加速跑步
 * 4. 更好的初始相机位置
 * 
 * 使用方法：
 * - 将 App.tsx 重命名为 AppOriginal.tsx（备份）
 * - 将此文件重命名为 App.tsx
 */
function AppImproved() {
  const [viewMode, setViewMode] = useState<'first-person' | 'third-person'>('third-person');

  return (
    <>
      <Canvas 
        shadows 
        camera={{ fov: 45, position: [0, 3, 10] }} // 改进的初始相机位置
      >
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <Physics debug={false}> {/* 生产环境关闭debug */}
          <ExperienceImproved viewMode={viewMode} />
        </Physics>
      </Canvas>
      
      {/* UI层 */}
      <ViewModeToggle onModeChange={setViewMode} />
      <Interface />
      
      {/* 帮助提示 */}
      <div className="fixed bottom-4 right-4 bg-black/70 text-white px-4 py-3 rounded-lg text-sm backdrop-blur-sm">
        <div className="font-bold mb-2">💡 操作提示</div>
        <ul className="space-y-1 text-xs">
          <li>🖱️ 按住右键拖动旋转视角</li>
          <li>⌨️ WASD 移动</li>
          <li>🏃 Shift 加速跑步</li>
          <li>👁️ 左上角切换视角</li>
        </ul>
      </div>
    </>
  );
}

export default AppImproved;
