import { ThreeCanvas } from '@remotion/three';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { useMemo } from 'react';
import * as THREE from 'three';
import { DOUBLE_FLOOR_HOUSE_TOUR } from '../data/tourPoints';
import { Environment } from '../components/3d/Environment';
import { Lighting } from '../components/3d/Lighting';
import { Ground } from '../components/3d/Ground';
import { Garden } from '../components/3d/garden/Garden';
import { DoubleFloorHouseWithSuspense } from '../components/3d/models/DoubleFloorHouse';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';

const TourUpdate: React.FC<{ lookAt: THREE.Vector3 }> = ({ lookAt }) => {
    useFrame((state) => {
        state.camera.lookAt(lookAt);
    });
    return null;
};

const TourScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const currentTime = frame / fps;

    // Calculate camera position and lookAt based on currentTime from tourPoints.ts
    const { position, lookAt } = useMemo(() => {
        let accumulatedTime = 0;
        for (let i = 0; i < DOUBLE_FLOOR_HOUSE_TOUR.length; i++) {
            const point = DOUBLE_FLOOR_HOUSE_TOUR[i];
            const nextPoint = DOUBLE_FLOOR_HOUSE_TOUR[i + 1] || point;

            if (currentTime < accumulatedTime + point.duration) {
                const t = (currentTime - accumulatedTime) / point.duration;
                // Smooth step interpolation for professional camera movement
                const smoothT = t * t * (3 - 2 * t);

                const pos = new THREE.Vector3(...point.position).lerp(
                    new THREE.Vector3(...nextPoint.position),
                    smoothT
                );
                const target = new THREE.Vector3(...point.lookAt).lerp(
                    new THREE.Vector3(...nextPoint.lookAt),
                    smoothT
                );
                return { position: pos, lookAt: target };
            }
            accumulatedTime += point.duration;
        }
        const lastPoint = DOUBLE_FLOOR_HOUSE_TOUR[DOUBLE_FLOOR_HOUSE_TOUR.length - 1];
        return {
            position: new THREE.Vector3(...lastPoint.position),
            lookAt: new THREE.Vector3(...lastPoint.lookAt)
        };
    }, [currentTime]);

    return (
        <>
            <PerspectiveCamera
                makeDefault
                position={position}
            />
            <TourUpdate lookAt={lookAt} />

            <Physics debug={false}>
                <Environment />
                <Lighting />
                <Ground position={[0, 0, 0]} scale={[100, 1, 100]} />
                <DoubleFloorHouseWithSuspense />
                <Garden />
            </Physics>
        </>
    );
};

export const TourVideo: React.FC = () => {
    const { width, height, fps } = useVideoConfig();
    const frame = useCurrentFrame();
    const currentTime = frame / fps;

    // Determine current point and progress for UI
    const currentPointData = useMemo(() => {
        let accTime = 0;
        for (const point of DOUBLE_FLOOR_HOUSE_TOUR) {
            if (currentTime < accTime + point.duration) {
                return { title: point.title, index: point.id };
            }
            accTime += point.duration;
        }
        const lastPoint = DOUBLE_FLOOR_HOUSE_TOUR[DOUBLE_FLOOR_HOUSE_TOUR.length - 1];
        return { title: lastPoint.title, index: DOUBLE_FLOOR_HOUSE_TOUR.length };
    }, [currentTime]);

    // Opacity for the intro title (fade out after 3.5 seconds)
    const introOpacity = Math.max(0, 1 - (currentTime - 0.5) / 3.0);

    return (
        <div style={{ flex: 1, backgroundColor: 'black', position: 'relative', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* 3D Scene */}
            <ThreeCanvas width={width} height={height}>
                <TourScene />
            </ThreeCanvas>

            {/* UI Overlay: Intro Title Screen */}
            {introOpacity > 0 && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `rgba(0,0,0,${introOpacity * 0.4})`,
                    opacity: introOpacity,
                    pointerEvents: 'none',
                    textAlign: 'center'
                }}>
                    <h1 style={{ color: 'white', fontSize: '100px', fontWeight: 900, marginBottom: '10px', letterSpacing: '-3px' }}>
                        SMART TOUR 3D
                    </h1>
                    <div style={{ width: '100px', height: '4px', backgroundColor: 'white', marginBottom: '30px' }} />
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '28px', letterSpacing: '8px', fontWeight: 300 }}>
                        IMMERSIVE PROPERTY EXPERIENCE
                    </p>
                </div>
            )}

            {/* UI Overlay: Current Location Badge (Top Left) */}
            <div style={{
                position: 'absolute',
                top: '50px',
                left: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '24px 36px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
                }}>
                    {currentPointData.index}
                </div>
                <div>
                    <div style={{ fontSize: '14px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, marginBottom: '4px' }}>
                        Now Viewing
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 800 }}>
                        {currentPointData.title}
                    </div>
                </div>
            </div>

            {/* UI Overlay: Top Right Branding */}
            <div style={{
                position: 'absolute',
                top: '50px',
                right: '50px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                color: 'white'
            }}>
                <div style={{ opacity: 0.6, fontWeight: 900, letterSpacing: '2px', fontSize: '18px' }}>
                    3D ROOM ROAMING
                </div>
                <div style={{ width: '40px', height: '2px', backgroundColor: 'rgba(255,255,255,0.3)', marginTop: '8px' }} />
            </div>
        </div>
    );
};
