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
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  try {
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

    console.log('=== GPU Detection Debug ===');
    console.log('GPU Name:', rendererString);
    console.log('CPU Cores:', cores);
    console.log('Is Mobile:', isMobile);
    console.log('Renderer String (lowercase):', renderer);

    // PRIORITY 1: High CPU core count (8+) = High-end system, even if integrated GPU is active
    // This handles hybrid graphics systems where browser uses integrated GPU by default
    if (!isMobile && cores >= 8) {
      console.log('✅ Detected as HIGH tier (8+ CPU cores - high-end system)');
      return 'high';
    }

    // PRIORITY 2: Explicit GPU detection - High Tier discrete GPUs
    if (!isMobile && (
      renderer.includes('apple m') ||
      renderer.includes('rtx') ||
      renderer.includes('gtx 16') ||  // GTX 1600 series
      renderer.includes('gtx 10') ||  // GTX 1000 series
      renderer.includes('gtx 9') ||   // GTX 900 series
      renderer.includes('radeon rx') ||
      renderer.includes('rx 6') ||    // RX 6000 series
      renderer.includes('rx 7') ||    // RX 7000 series
      renderer.includes('arc a') ||   // Intel Arc
      renderer.includes('discrete') ||
      renderer.includes('nvidia') && (
        renderer.includes('3060') || renderer.includes('3070') ||
        renderer.includes('3080') || renderer.includes('3090') ||
        renderer.includes('4060') || renderer.includes('4070') ||
        renderer.includes('4080') || renderer.includes('4090') ||
        renderer.includes('2060') || renderer.includes('2070') ||
        renderer.includes('2080')
      ) ||
      (renderer.includes('nvidia') || renderer.includes('amd'))
    )) {
      console.log('✅ Detected as HIGH tier (powerful discrete GPU)');
      return 'high';
    }

    // iOS devices: Maximum medium tier for stability
    if (isIOS) {
      if (renderer.includes('apple') && !renderer.includes('a8') && !renderer.includes('a9')) {
        console.log('📱 iOS device - MEDIUM tier');
        return 'medium';
      }
      console.log('📱 iOS device - LOW tier (older)');
      return 'low';
    }

    // Other mobile devices
    if (isMobile) {
      console.log('📱 Mobile device - LOW tier');
      return 'low';
    }

    // Low Tier: Intel UHD/HD, Software renderers (but NOT if 8+ cores)
    if (
      (renderer.includes('intel') && !renderer.includes('iris') && !renderer.includes('arc')) ||
      renderer.includes('uhd') ||
      renderer.includes('hd graphics') ||
      renderer.includes('swiftshader') ||
      renderer.includes('software')
    ) {
      console.log('⚠️ Detected as LOW tier (integrated/low-end GPU)');
      return 'low';
    }

    console.log('ℹ️ Defaulting to MEDIUM tier');
    return 'medium';
  } catch (error) {
    console.warn('Error detecting performance tier:', error);
    return isMobile ? 'low' : 'medium';
  }
}

export async function detectRendererCapabilities(): Promise<RendererCapabilities> {
  const performanceTier = getPerformanceTier();

  // Robust mobile detection: check UA and also touch points for "Desktop Mode" on tablets/phones
  const isMobileUA = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasTouch = typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);
  const isMobile = isMobileUA || (hasTouch && /Macintosh/i.test(navigator.userAgent)); // iPads/iPhones in desktop mode look like Macs but have touch

  if (typeof navigator === 'undefined') {
    return { type: 'webgl', performanceTier, supported: true, isMobile: false };
  }

  // Detect modern iOS devices that support WebGPU (iPhone 15 Pro+, iPad with M-series)
  const isModernIOS = isMobile && (
    /iPhone1[5-9]|iPhone[2-9][0-9]/.test(navigator.userAgent) || // iPhone 15+
    /iPad.*OS 1[8-9]|iPad.*OS [2-9][0-9]/.test(navigator.userAgent) // iPad with iOS 18+
  );

  // Use WebGPU for:
  // 1. High-end desktop GPUs (RTX, RX, etc.)
  // 2. Modern iOS devices (iPhone 15 Pro+, iPad with iOS 18+)
  if ('gpu' in navigator && ((performanceTier === 'high' && !isMobile) || isModernIOS)) {
    try {
      const adapterPromise = (navigator as any).gpu?.requestAdapter();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('WebGPU timeout')), 2000)
      );

      const adapter = await Promise.race([adapterPromise, timeoutPromise]);

      if (adapter) {
        console.log('✅ WebGPU adapter found:', isModernIOS ? 'Modern iOS device' : 'High-end desktop GPU');
        return { type: 'webgpu', performanceTier, supported: true, isMobile };
      }
    } catch (error) {
      console.warn('WebGPU not available, falling back to WebGL2:', error);
    }
  }

  const canvas = document.createElement('canvas');

  // WebGL2 for medium/high tier or when WebGPU is unavailable
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
