/**
 * Stable options object for ReactLenis (JSON-stringified internally for deps).
 * Tuned for premium wheel/touch feel without feeling floaty.
 */
export const LENIS_ROOT_OPTIONS = Object.freeze({
  autoRaf: false,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1,
  syncTouch: true,
  syncTouchLerp: 0.08,
  touchInertiaExponent: 1.62,
  lerp: 0.075,
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  stopInertiaOnNavigate: true,
})
