import { staticFile } from 'remotion';

export const resolveAsset = (pathStr: string) => {
    const cleanPath = pathStr.startsWith('/') ? pathStr.slice(1) : pathStr;

    // Check if we are in Remotion environment
    const isRemotion = typeof window === 'undefined' ||
        (typeof window !== 'undefined' && ((window as any).remotion_isRemotion || (window as any).__REMOTION_VERSION__));

    if (isRemotion) {
        // Use raw github url for 3D model during render to avoid 404 local issues
        if (cleanPath.endsWith('.glb')) {
            return `https://raw.githubusercontent.com/NZLouislu/3d-room-roaming/main/public/${cleanPath}`;
        }
        return staticFile(cleanPath);
    }

    return pathStr.startsWith('/') ? pathStr : `/${pathStr}`;
};
