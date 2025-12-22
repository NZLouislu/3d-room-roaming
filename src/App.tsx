import { Canvas, useThree } from '@react-three/fiber';
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
import { detectRendererCapabilities } from './utils/rendererDetection';
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
  const { setRendererType, performanceTier, setPerformanceTier, setIsMobile, isMobile } = useStore();

  useEffect(() => {
    detectRendererCapabilities().then((capabilities) => {
      setRendererType(capabilities.type);
      setPerformanceTier(capabilities.performanceTier);
      setIsMobile(capabilities.isMobile);
      setRendererReady(true);
      console.log(`Renderer initialized: ${capabilities.type} (${capabilities.performanceTier} tier, mobile: ${capabilities.isMobile})`);
      if (capabilities.features) {
        console.log('WebGPU features:', capabilities.features);
      }
    });
  }, [setRendererType, setPerformanceTier, setIsMobile]);

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
        <div className="fixed inset-0 z-[100]">
          <RealEstateWelcome onStart={handleWelcomeChoice} />
        </div>
      )}

      {rendererReady && (
        <Canvas 
          shadows={performanceTier === 'high'}
          dpr={isMobile ? 1.0 : (performanceTier === 'low' ? 0.5 : (performanceTier === 'medium' ? [0.75, 1] : [1, 1.5]))}
          camera={{ 
            fov: 45, 
            position: mode === 'auto-tour' ? [0, 28, -40] : [0, 12, 30] 
          }}
          gl={{
            antialias: !isMobile && performanceTier === 'high',
            powerPreference: 'high-performance',
            alpha: false,
            stencil: false,
            depth: true,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            const glContext = gl.getContext();
            console.log('[Canvas] WebGL initialized:', {
              vendor: glContext.getParameter(glContext.VENDOR),
              renderer: glContext.getParameter(glContext.RENDERER),
              version: glContext.getParameter(glContext.VERSION),
              maxTextureSize: glContext.getParameter(glContext.MAX_TEXTURE_SIZE)
            });
            gl.shadowMap.enabled = performanceTier === 'high';
            if (performanceTier === 'high') {
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1;
            } else {
               gl.shadowMap.autoUpdate = false;
               gl.shadowMap.needsUpdate = false;
               gl.toneMapping = THREE.NoToneMapping;
            }
          }}
          onError={(error) => {
            console.error('[Canvas] Error during initialization:', error);
          }}
        >
        {/* Sky and Lights are handled in ExperienceImproved */}
        <Physics debug={false} timeStep={1/30}>
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
            onLookAtChange={setCustomLookAt}
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
          livePosition={tourPaused ? currentCameraPos : undefined}
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
