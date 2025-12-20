export type RendererType = 'webgpu' | 'webgl2' | 'webgl';
export type PerformanceTier = 'low' | 'medium' | 'high';

export interface RendererCapabilities {
  type: RendererType;
  performanceTier: PerformanceTier;
  supported: boolean;
  isMobile: boolean;
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
  const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (typeof navigator === 'undefined') {
    return { type: 'webgl', performanceTier, supported: true, isMobile: false };
  }

  // Check for WebGPU, but be cautious as it's still experimental on some platforms (like iOS 18)
  // For now, we'll prefer WebGL2 for stability unless we explicitly want to test WebGPU
  if ('gpu' in navigator) {
    try {
      // Add a timeout to adapter request to prevent hanging on some mobile browsers
      const adapterPromise = (navigator as any).gpu?.requestAdapter();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('WebGPU timeout')), 2000)
      );
      
      await Promise.race([adapterPromise, timeoutPromise]);
    } catch (error) {
      console.warn('WebGPU detection failed or timed out:', error);
    }
  }

  const canvas = document.createElement('canvas');
  
  // Prefer WebGL2 for stability on mobile for now
  const gl2 = canvas.getContext('webgl2');
  if (gl2) {
    return { type: 'webgl2', performanceTier, supported: true, isMobile };
  }

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    return { type: 'webgl', performanceTier, supported: true, isMobile };
  }

  return { type: 'webgl', performanceTier, supported: false, isMobile };
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
