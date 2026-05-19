import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'
import App from './App.jsx'
import { ScrollOrchestration } from './ScrollOrchestration.jsx'
import { LENIS_ROOT_OPTIONS } from './lenis-options.js'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function AppShell() {
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduceMotion(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  if (reduceMotion) {
    return <App />
  }

  return (
    <ReactLenis root options={LENIS_ROOT_OPTIONS}>
      <ScrollOrchestration />
      <App />
    </ReactLenis>
  )
}
