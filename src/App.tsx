import { Canvas, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { ExperienceImproved } from './components/3d/ExperienceImproved';
import { Interface } from './components/ui/Interface';
import { ViewModeToggle } from './components/ui/ViewModeToggle';
import { RealEstateWelcome } from './components/ui/RealEstateWelcome';
import { AutoTourController, TourUI } from './components/3d/AutoTourController';
import { ViewpointSelector } from './components/ui/ViewpointSelector';
import { PropertyInfoOverlay } from './components/ui/PropertyInfoOverlay';
import { TourDebugPanel } from './components/ui/TourDebugPanel';
import { DOUBLE_FLOOR_HOUSE_TOUR } from './data/tourPoints';
import { Navbar } from './components/ui/Navbar';
import { CoordinatesPanel } from './components/ui/CoordinatesPanel';
import { BirdViewControls } from './components/3d/BirdViewControls';
import { PerformanceMonitor } from './components/3d/PerformanceMonitor';
import { PerformanceHUD } from './components/ui/PerformanceHUD';
import { detectRendererCapabilities, getRendererConfig } from './utils/rendererDetection';
import { useStore } from './hooks/useStore';

type AppMode = 'welcome' | 'auto-tour' | 'free-explore' | 'bird-view';

function CameraPositionLogger() {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        console.log('=== Current Camera Position ===');
        console.log(`Position: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]`);
        console.log(`Rotation: [${camera.rotation.x.toFixed(2)}, ${camera.rotation.y.toFixed(2)}, ${camera.rotation.z.toFixed(2)}]`);
        
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        const lookAt = camera.position.clone().add(direction.multiplyScalar(10));
        console.log(`LookAt (estimated): [${lookAt.x.toFixed(2)}, ${lookAt.y.toFixed(2)}, ${lookAt.z.toFixed(2)}]`);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [camera]);

  return null;
}

function AppImproved() {
  const [viewMode, setViewMode] = useState<'first-person' | 'third-person'>('third-person');
  const [mode, setMode] = useState<AppMode>('welcome');
  const [tourEnabled, setTourEnabled] = useState(false);
  
  const [tourIndex, setTourIndex] = useState(0);
  const [tourProgress, setTourProgress] = useState(0);
  const [tourPaused, setTourPaused] = useState(false);

  const [debugMode, setDebugMode] = useState(false);
  const [customPosition, setCustomPosition] = useState<[number, number, number] | undefined>();
  const [customLookAt, setCustomLookAt] = useState<[number, number, number] | undefined>();

  const [currentCameraPos, setCurrentCameraPos] = useState<[number, number, number]>([0, 28, -40]);
  
  const [birdViewCoords, setBirdViewCoords] = useState<{pos: [number, number, number], target: [number, number, number]}>({ 
    pos: [0, 50, 0], 
    target: [0, 0, 0] 
  });

  const [rendererReady, setRendererReady] = useState(false);
  const setRendererType = useStore((state) => state.setRendererType);

  useEffect(() => {
    detectRendererCapabilities().then((capabilities) => {
      setRendererType(capabilities.type);
      setRendererReady(true);
      console.log(`Renderer initialized: ${capabilities.type}`);
      if (capabilities.features) {
        console.log('WebGPU features:', capabilities.features);
      }
    });
  }, [setRendererType]);

  const handleToggleBirdView = () => {
    if (mode === 'bird-view') {
      setMode('free-explore');
    } else {
      setMode('bird-view');
      setTourEnabled(false);
    }
  };

  const handleBirdViewUpdate = (pos: [number, number, number], target: [number, number, number]) => {
    setBirdViewCoords({ pos, target });
  };

  const handleWelcomeChoice = (choice: 'auto-tour' | 'free-explore' | 'bird-view') => {
    setMode(choice);
    if (choice === 'auto-tour') {
      setTourEnabled(true);
      setTourIndex(0);
      setTourProgress(0);
      setTourPaused(false);
      setDebugMode(true);
    }
  };

  const handleTourComplete = () => {
    setMode('free-explore');
    setTourEnabled(false);
    setDebugMode(false);
  };

  const handleSelectView = (index: number) => {
    setTourIndex(index);
    setTourProgress(0);
    setCustomPosition(undefined);
    setCustomLookAt(undefined);
  };

  const handleApplyChanges = () => {
    console.log('Applied custom position:', customPosition);
    console.log('Applied custom lookAt:', customLookAt);
  };

  const getCurrentPosition = (): [number, number, number] => {
    if (customPosition) return customPosition;
    if (tourEnabled && DOUBLE_FLOOR_HOUSE_TOUR[tourIndex]) {
      return DOUBLE_FLOOR_HOUSE_TOUR[tourIndex].position;
    }
    return currentCameraPos;
  };

  const getCurrentLookAt = (): [number, number, number] => {
    if (customLookAt) return customLookAt;
    if (tourEnabled && DOUBLE_FLOOR_HOUSE_TOUR[tourIndex]) {
      return DOUBLE_FLOOR_HOUSE_TOUR[tourIndex].lookAt;
    }
    return [0, 0, 0];
  };

  return (
    <>
      <Navbar isBirdView={mode === 'bird-view'} onToggleBirdView={handleToggleBirdView} />
      
      {mode === 'bird-view' && (
        <CoordinatesPanel 
          visible={true}
          position={birdViewCoords.pos}
          target={birdViewCoords.target}
        />
      )}

      {mode === 'welcome' && (
        <RealEstateWelcome onStart={handleWelcomeChoice} />
      )}

      {rendererReady && (
        <Canvas 
          shadows 
          camera={{ 
            fov: 45, 
            position: mode === 'auto-tour' ? [0, 28, -40] : [0, 12, 30] 
          }}
          gl={(canvas) => {
            const rendererType = useStore.getState().rendererType;
            const config = getRendererConfig(rendererType);
            
            const renderer = new THREE.WebGLRenderer({
              canvas,
              ...config,
            });
            
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;
            
            return renderer;
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
          <ExperienceImproved 
            viewMode={viewMode} 
            enablePlayer={mode !== 'auto-tour' && mode !== 'bird-view'} 
          />
        </Physics>
        
        <BirdViewControls 
          isActive={mode === 'bird-view'}
          onUpdate={handleBirdViewUpdate}
        />
        
        <PerformanceMonitor />

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
            customPosition={customPosition}
            customLookAt={customLookAt}
            onPositionChange={setCurrentCameraPos}
          />
        )}
        
        {mode === 'free-explore' && <ViewpointSelector />}
        <CameraPositionLogger />
        </Canvas>
      )}

      <PerformanceHUD />

      {debugMode && tourEnabled && (
        <TourDebugPanel
          tourPoints={DOUBLE_FLOOR_HOUSE_TOUR}
          currentIndex={tourIndex}
          onSelectView={handleSelectView}
          isPaused={tourPaused}
          onTogglePause={() => setTourPaused(!tourPaused)}
          currentPosition={getCurrentPosition()}
          currentLookAt={getCurrentLookAt()}
          onUpdatePosition={setCustomPosition}
          onUpdateLookAt={setCustomLookAt}
          onApplyChanges={handleApplyChanges}
        />
      )}

      {tourEnabled && !debugMode && (
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
          <div className="font-bold mb-2">Controls</div>
          <ul className="space-y-1 text-xs">
            {mode === 'free-explore' && <li>Right-click drag to rotate view</li>}
            {tourEnabled && tourPaused && <li>Left-click drag to rotate view</li>}
            <li>WASD to move</li>
            <li>Shift to run</li>
            {mode === 'free-explore' && <li>📍 Quick viewpoints (left panel)</li>}
            {tourEnabled && tourPaused && <li>🔧 QE to move up/down</li>}
          </ul>
        </div>
      )}
    </>
  );
}

export default AppImproved;
