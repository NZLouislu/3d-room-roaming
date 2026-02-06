import { staticFile } from 'remotion';

export const resolveAsset = (path: string) => {
    // Check if we are in Remotion environment
    const isRemotion = typeof window !== 'undefined' && (
        (window as any).remotion_isRemotion ||
        window.location.port === '3000' || // Default Remotion port
        (window as any).__REMOTION_VERSION__
    );

    if (isRemotion) {
        try {
            // staticFile expects path relative to public folder, e.g. "models/house.glb"
            // If path starts with /, remove it
            const cleanPath = path.startsWith('/') ? path.slice(1) : path;
            return staticFile(cleanPath);
        } catch (e) {
            return path;
        }
    }
    return path;
};
