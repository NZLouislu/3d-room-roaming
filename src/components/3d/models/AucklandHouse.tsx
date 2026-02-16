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
                    // Check if we need to initialize or update material
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

            // 3. Ensure furniture and floors are visible
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
