import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { useState } from 'react';
import { ExperienceImproved } from './components/3d/ExperienceImproved';
import { Interface } from './components/ui/Interface';
import { ViewModeToggle } from './components/ui/ViewModeToggle';
import { RealEstateWelcome } from './components/ui/RealEstateWelcome';
import { AutoTourController, TourUI } from './components/3d/AutoTourController';
import { ViewpointSelector } from './components/ui/ViewpointSelector';
import { PropertyInfoOverlay } from './components/ui/PropertyInfoOverlay';
import { DOUBLE_FLOOR_HOUSE_TOUR } from './data/tourPoints';

type AppMode = 'welcome' | 'auto-tour' | 'free-explore';

function AppImproved() {
  const [viewMode, setViewMode] = useState<'first-person' | 'third-person'>('third-person');
  const [mode, setMode] = useState<AppMode>('welcome');
  const [tourEnabled, setTourEnabled] = useState(false);
  
  // Tour 状态
  const [tourIndex, setTourIndex] = useState(0);
  const [tourProgress, setTourProgress] = useState(0);
  const [tourPaused, setTourPaused] = useState(false);

  const handleWelcomeChoice = (choice: 'auto-tour' | 'free-explore') => {
    setMode(choice);
    if (choice === 'auto-tour') {
      setTourEnabled(true);
      setTourIndex(0);
      setTourProgress(0);
      setTourPaused(false);
    }
  };

  const handleTourComplete = () => {
    setMode('free-explore');
    setTourEnabled(false);
  };

  return (
    <>
      {mode === 'welcome' && (
        <RealEstateWelcome onStart={handleWelcomeChoice} />
      )}

      <Canvas 
        shadows 
        camera={{ 
          fov: 45, 
          position: mode === 'auto-tour' ? [50, 30, 50] : [0, 12, 30] 
        }}
      >
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Physics debug={false}>
          <ExperienceImproved viewMode={viewMode} enablePlayer={mode !== 'auto-tour'} />
        </Physics>

        {tourEnabled && (
          <AutoTourController
            tourPoints={DOUBLE_FLOOR_HOUSE_TOUR}
            enabled={tourEnabled}
            currentIndex={tourIndex}
            setCurrentIndex={setTourIndex}
            progress={tourProgress}
            setProgress={setTourProgress}
            isPaused={tourPaused}
            onComplete={handleTourComplete}
          />
        )}
        
        {mode === 'free-explore' && <ViewpointSelector />}
      </Canvas>

      {/* Tour UI - 在 Canvas 外部 */}
      {tourEnabled && (
        <TourUI
          tourPoints={DOUBLE_FLOOR_HOUSE_TOUR}
          currentIndex={tourIndex}
          setCurrentIndex={setTourIndex}
          progress={tourProgress}
          setProgress={setTourProgress}
          isPaused={tourPaused}
          setIsPaused={setTourPaused}
          onComplete={handleTourComplete}
        />
      )}
      
      {mode === 'free-explore' && (
        <>
          <PropertyInfoOverlay />
          <ViewModeToggle onModeChange={setViewMode} />
          <Interface />
        </>
      )}

      {mode !== 'welcome' && (
        <div className="fixed bottom-4 right-4 bg-black/70 text-white px-4 py-3 rounded-lg text-sm backdrop-blur-sm z-20">
          <div className="font-bold mb-2">操作说明</div>
          <ul className="space-y-1 text-xs">
            <li>右键拖动旋转视角</li>
            <li>WASD 移动</li>
            <li>Shift 跑步</li>
            {mode === 'free-explore' && <li>📍 快捷视角 (左侧面板)</li>}
          </ul>
        </div>
      )}
    </>
  );
}

export default AppImproved;
