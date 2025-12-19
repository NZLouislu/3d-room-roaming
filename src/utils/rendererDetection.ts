export type RendererType = 'webgpu' | 'webgl2' | 'webgl';
export type PerformanceTier = 'low' | 'medium' | 'high';

export interface RendererCapabilities {
  type: RendererType;
  performanceTier: PerformanceTier;
  supported: boolean;
  features?: string[];
}

function getPerformanceTier(): PerformanceTier {
  if (typeof navigator === 'undefined') return 'medium';

  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Try to get GPU info via WebGL
  const canvas = document.createElement('canvas');
  const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
  let rendererString = '';
  
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      rendererString = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
    }
  }

  const renderer = rendererString.toLowerCase();

  // High Tier: Apple M-series, RTX/GTX Discrete, Radeon RX
  if (
    renderer.includes('apple m') || 
    renderer.includes('rtx') || 
    renderer.includes('gtx') || 
    renderer.includes('radeon rx') ||
    renderer.includes('discrete') ||
    (cores >= 8 && (renderer.includes('apple') || renderer.includes('nvidia') || renderer.includes('amd')))
  ) {
    return 'high';
  }

  // Low Tier: Intel UHD/HD, Mobile/Mali/Adreno (generally), Software renderers
  if (
    (renderer.includes('intel') && !renderer.includes('iris') && !renderer.includes('arc')) ||
    renderer.includes('uhd') ||
    renderer.includes('hd graphics') ||
    renderer.includes('swiftshader') ||
    renderer.includes('software') ||
    renderer.includes('mali') ||
    renderer.includes('adreno') ||
    cores <= 4 ||
    (isMobile && !renderer.includes('apple')) // Most mobiles are low/medium unless they are Apple Silicon
  ) {
    return 'low';
  }

  return 'medium';
}

export async function detectRendererCapabilities(): Promise<RendererCapabilities> {
  const performanceTier = getPerformanceTier();

  if (typeof navigator === 'undefined') {
    return { type: 'webgl', performanceTier, supported: true };
  }

  if ('gpu' in navigator) {
    try {
      const adapter = await (navigator as any).gpu?.requestAdapter();
      if (adapter) {
        return {
          type: 'webgpu',
          performanceTier,
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
    return { type: 'webgl2', performanceTier, supported: true };
  }

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    return { type: 'webgl', performanceTier, supported: true };
  }

  return { type: 'webgl', performanceTier, supported: false };
}

export function getRendererConfig(type: RendererType, tier: PerformanceTier = 'medium') {
  const isLow = tier === 'low';
  
  switch (type) {
    case 'webgpu':
      return {
        antialias: !isLow,
        powerPreference: 'high-performance' as const,
        alpha: false,
      };
    case 'webgl2':
      return {
        antialias: !isLow,
        powerPreference: 'high-performance' as const,
        alpha: false,
        stencil: false,
      };
    case 'webgl':
    default:
      return {
        antialias: !isLow,
        powerPreference: 'default' as const,
        alpha: false,
      };
  }
}
