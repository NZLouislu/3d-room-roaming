import { useGLTF } from '@react-three/drei';
import { resolveAsset } from '../../../utils/resolveAsset';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useStore } from '../../../hooks/useStore';

export function AucklandHouse(props: JSX.IntrinsicElements['group']) {
    const gltf = useGLTF(resolveAsset('/models/Auckland Northcross rooms.glb')) as any;
    const { scene, scenes } = gltf;
    const isTouring = useStore((state) => state.isTouring);

    useEffect(() => {
        // --- Tile Texture Generator ---
        const createTileTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d')!;

            // 1. Base Tile Color (Light Grey Marble base)
            ctx.fillStyle = '#e5e5e5';
            ctx.fillRect(0, 0, 512, 512);

            // 2. Add very subtle marble patterns
            ctx.globalAlpha = 0.15;
            for (let i = 0; i < 40; i++) {
                ctx.beginPath();
                ctx.strokeStyle = '#999999';
                ctx.lineWidth = Math.random() * 2 + 0.5;
                ctx.moveTo(Math.random() * 512, Math.random() * 512);
                ctx.lineTo(Math.random() * 512, Math.random() * 512);
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;

            // 3. Grout Lines (The "Bricks" feel)
            ctx.strokeStyle = '#b0b0b0'; // Grout color
            ctx.lineWidth = 12; // Width of the gap
            ctx.strokeRect(0, 0, 512, 512);

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(5, 5); // Large format tiles
            return texture;
        };

        const tileMap = createTileTexture();

        // --- Wood Texture Generator for Deck ---
        const createWoodTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d')!;

            // 1. Base Wood Color (Warm Timber)
            ctx.fillStyle = '#8b5a2b';
            ctx.fillRect(0, 0, 512, 512);

            // 2. Add Wood Grain (Planks)
            ctx.strokeStyle = '#5d3a1a'; // Darker groove color
            ctx.lineWidth = 4;
            for (let i = 0; i < 512; i += 64) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(512, i);
                ctx.stroke();
            }

            // 3. Add some random grain noise
            ctx.globalAlpha = 0.1;
            for (let i = 0; i < 20; i++) {
                ctx.fillStyle = '#3d2510';
                ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 200, 2);
            }
            ctx.globalAlpha = 1.0;

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 8); // Long planks
            return texture;
        };

        const woodMap = createWoodTexture();

        const processNode = (node: any) => {
            if (!node) return;

            const name = node.name.toLowerCase();

            // 1. Show roof and ceiling ONLY during tour
            if (name.includes('roof') || name.includes('ceiling') || name.includes('top')) {
                node.visible = isTouring;
                return;
            }

            // 2. Handle Windows / Glass
            if (name.includes('window') || name.includes('glass') || name.includes('panel')) {
                node.visible = true;
                if (node.isMesh) {
                    if (!node.material.isMaterialProcessed) {
                        node.material = new THREE.MeshPhysicalMaterial({
                            color: '#ffffff',
                            metalness: 0,
                            roughness: 0,
                            transmission: 0.9,
                            thickness: 0.5,
                            transparent: true,
                            opacity: 0.3,
                            side: THREE.DoubleSide,
                            ior: 1.5,
                        });
                        (node.material as any).isMaterialProcessed = true;
                    }
                }
                return;
            }

            // 3. Specialized Flooring Logic (Enhanced with Spatial Detection)
            const isFloor = name.includes('floor') || name.includes('ground') || name.includes('base') ||
                name.includes('deck') || name.includes('patio');

            if (isFloor && node.isMesh) {
                node.visible = true;
                node.receiveShadow = true;
                node.castShadow = false;

                // Get world position or geometry center for spatial detection
                node.geometry.computeBoundingBox();
                const center = new THREE.Vector3();
                node.geometry.boundingBox?.getCenter(center);
                node.localToWorld(center);
                const z = center.z;

                // Define Materials by Role/Location
                if (z > 2.8 || name.includes('deck') || name.includes('patio')) {
                    node.material = new THREE.MeshStandardMaterial({
                        map: woodMap,
                        color: '#b3722d', // Rich Golden wood
                        roughness: 0.7,
                        metalness: 0.1,
                        side: THREE.DoubleSide
                    });
                }
                else if ((z > 0.5 && z <= 2.8) || name.includes('kitchen') || name.includes('bath') || name.includes('toilet') || name.includes('laundry')) {
                    node.material = new THREE.MeshStandardMaterial({
                        map: tileMap,
                        roughness: 0.1,
                        metalness: 0.05,
                        side: THREE.DoubleSide
                    });
                }
                else {
                    node.material = new THREE.MeshStandardMaterial({
                        color: '#555555', // Deep grey carpet
                        roughness: 0.95,
                        metalness: 0,
                        side: THREE.DoubleSide
                    });
                }

                (node.material as any).isMaterialProcessed = true;
                return;
            }

            // 4. Ensure furniture and other meshes are visible
            node.visible = true;
            if (node.isMesh) {
                if (!node.material.isMaterialProcessed) {
                    node.frustumCulled = false;
                    node.castShadow = true;
                    node.receiveShadow = true;

                    if (node.material) {
                        node.material.side = THREE.DoubleSide;
                        node.material.transparent = false;
                        node.material.opacity = 1;
                        node.material.needsUpdate = true;
                        if (node.material.map) {
                            node.material.map.colorSpace = THREE.SRGBColorSpace;
                            node.material.map.needsUpdate = true;
                        }
                    }
                    (node.material as any).isMaterialProcessed = true;
                }
            }
        };

        const traverse = (root: any) => {
            if (!root) return;
            root.traverse(processNode);
        };

        traverse(scene);
        if (scenes) scenes.forEach(traverse);
    }, [scene, scenes, isTouring]);

    return (
        <group {...props}>
            {scenes && scenes.length > 0 ? (
                scenes.map((s: any, i: number) => (
                    <primitive key={i} object={s} />
                ))
            ) : (
                <primitive object={scene} />
            )}
        </group>
    );
}

useGLTF.preload(resolveAsset('/models/Auckland Northcross rooms.glb'));
