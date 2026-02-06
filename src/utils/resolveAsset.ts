import { staticFile } from 'remotion';

export const resolveAsset = (path: string) => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // Always use staticFile in this context to see if it fixes it
    return staticFile(cleanPath);
};
