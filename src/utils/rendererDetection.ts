export type RendererType = 'webgpu' | 'webgl2' | 'webgl';

export interface RendererCapabilities {
  type: RendererType;
  supported: boolean;
  features?: string[];
}

export async function detectRendererCapabilities(): Promise<RendererCapabilities> {
  if (typeof navigator === 'undefined') {
    return { type: 'webgl', supported: true };
  }

  if ('gpu' in navigator) {
    try {
      const adapter = await (navigator as any).gpu?.requestAdapter();
      if (adapter) {
        return {
          type: 'webgpu',
          supported: true,
          features: Array.from(adapter.features || [])
        };
      }
    } catch (error) {
      console.warn('WebGPU detection failed:', error);
    }
  }

  const canvas = document.createElement('canvas');
  const gl2 = canvas.getContext('webgl2');
  if (gl2) {
    return { type: 'webgl2', supported: true };
  }

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    return { type: 'webgl', supported: true };
  }

  return { type: 'webgl', supported: false };
}

export function getRendererConfig(type: RendererType) {
  switch (type) {
    case 'webgpu':
      return {
        antialias: true,
        powerPreference: 'high-performance' as const,
        alpha: false,
      };
    case 'webgl2':
      return {
        antialias: true,
        powerPreference: 'high-performance' as const,
        alpha: false,
        stencil: false,
      };
    case 'webgl':
    default:
      return {
        antialias: true,
        powerPreference: 'default' as const,
        alpha: false,
      };
  }
}
