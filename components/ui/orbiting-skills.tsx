"use client"

import React, { memo, useEffect, useState } from 'react'

type IconType = 'html' | 'css' | 'javascript' | 'react' | 'wordpress' | 'php' | 'elementor' | 'woocommerce'
type GlowColor = 'cyan' | 'purple'

interface SkillIconProps {
  type: IconType
}

interface SkillConfig {
  id: string
  orbitRadius: number
  size: number
  speed: number
  iconType: IconType
  phaseShift: number
  glowColor: GlowColor
  label: string
}

interface OrbitingSkillProps {
  config: SkillConfig
  angle: number
}

interface GlowingOrbitPathProps {
  radius: number
  glowColor?: GlowColor
  animationDelay?: number
}

const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="orbit-icon-svg">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26" />
      </svg>
    ),
    color: '#E34F26',
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="orbit-icon-svg">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6" />
      </svg>
    ),
    color: '#1572B6',
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="orbit-icon-svg">
        <rect width="24" height="24" fill="#F7DF1E" />
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330" />
      </svg>
    ),
    color: '#F7DF1E',
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-icon-svg">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
    color: '#61DAFB',
  },
  wordpress: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="orbit-icon-svg">
        <path d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zM1.211 12c0-1.564.336-3.05.935-4.389l5.146 14.098C3.692 19.96 1.211 16.271 1.211 12zm10.789 10.789c-1.059 0-2.082-.154-3.048-.438l3.238-9.403 3.316 9.088c.021.054.048.104.077.151-1.118.389-2.322.602-3.583.602zm1.486-15.844c.65-.034 1.237-.103 1.237-.103.582-.069.514-.925-.069-.891 0 0-1.752.137-2.883.137-1.062 0-2.849-.137-2.849-.137-.582-.034-.651.856-.068.891 0 0 .552.069 1.134.103l1.686 4.619-2.368 7.103-3.94-11.722c.651-.034 1.238-.103 1.238-.103.582-.069.513-.925-.069-.891 0 0-1.752.137-2.883.137-.203 0-.442-.005-.695-.012C5.023 3.138 8.304 1.211 12 1.211c2.754 0 5.263 1.037 7.163 2.741-.047-.003-.092-.009-.141-.009-1.062 0-1.815.925-1.815 1.918 0 .891.514 1.644 1.062 2.534.411.719.89 1.644.89 2.98 0 .925-.356 1.999-.822 3.494l-1.078 3.604-3.773-11.528zm7.89-.12c.898 1.542 1.413 3.334 1.413 5.175 0 3.979-2.22 7.439-5.491 9.207l3.297-9.533c.616-1.541.822-2.774.822-3.871 0-.397-.026-.764-.041-.978z" fill="#21759B" />
      </svg>
    ),
    color: '#21759B',
  },
  php: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-icon-svg">
        <ellipse cx="12" cy="12" rx="11" ry="6.7" fill="#777BB4" />
        <path d="M4.15 15.55 5.55 8.5h3.02c.9 0 1.56.2 1.98.6.42.38.55.93.4 1.64-.16.79-.53 1.4-1.12 1.82-.58.41-1.33.62-2.25.62H6.36l-.46 2.37H4.15Zm2.48-3.72h1.09c.41 0 .75-.09 1-.28.26-.2.43-.48.5-.85.07-.33.02-.56-.16-.7-.17-.15-.47-.22-.89-.22H7.04l-.41 2.05Zm4.18 3.72 1.4-7.05h1.73l-.53 2.64h2.02l.53-2.64h1.75l-1.4 7.05h-1.75l.61-3.03h-2.02l-.61 3.03h-1.73Zm6.43 0 1.4-7.05h3.02c.9 0 1.56.2 1.98.6.42.38.55.93.4 1.64-.16.79-.53 1.4-1.12 1.82-.58.41-1.33.62-2.25.62h-1.22l-.46 2.37h-1.75Zm2.48-3.72h1.09c.41 0 .75-.09 1-.28.26-.2.43-.48.5-.85.07-.33.02-.56-.16-.7-.17-.15-.47-.22-.89-.22h-1.13l-.41 2.05Z" fill="#fff" />
      </svg>
    ),
    color: '#777BB4',
  },
  elementor: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-icon-svg">
        <circle cx="12" cy="12" r="11" fill="#92003B" />
        <rect x="6.4" y="6.4" width="3.2" height="11.2" rx="0.7" fill="#fff" />
        <rect x="12" y="6.4" width="5.6" height="2.7" rx="0.7" fill="#fff" />
        <rect x="12" y="10.65" width="5.6" height="2.7" rx="0.7" fill="#fff" />
        <rect x="12" y="14.9" width="5.6" height="2.7" rx="0.7" fill="#fff" />
      </svg>
    ),
    color: '#92003B',
  },
  woocommerce: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="orbit-icon-svg">
        <path d="M2.2 7.05c0-1.2.98-2.18 2.18-2.18h15.24c1.2 0 2.18.98 2.18 2.18v7.18c0 1.2-.98 2.18-2.18 2.18h-5.94l-3.46 2.72.73-2.72H4.38c-1.2 0-2.18-.98-2.18-2.18V7.05Z" fill="#96588A" />
        <path d="M5.2 8.48h1.4l.7 4.03 1.05-4.03h1.32l1.05 4.03.71-4.03h1.39l-1.35 6.02h-1.45l-1.01-3.76L8 14.5H6.55L5.2 8.48Zm8.04 3.01c0-1.8 1.13-3.13 2.82-3.13s2.82 1.33 2.82 3.13-1.13 3.13-2.82 3.13-2.82-1.33-2.82-3.13Zm4.14 0c0-1.02-.47-1.76-1.32-1.76s-1.32.74-1.32 1.76.47 1.76 1.32 1.76 1.32-.74 1.32-1.76Z" fill="#fff" />
      </svg>
    ),
    color: '#96588A',
  },
}

const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component
  return IconComponent ? <IconComponent /> : null
})
SkillIcon.displayName = 'SkillIcon'

const skillsConfig: SkillConfig[] = [
  { id: 'html', orbitRadius: 92, size: 40, speed: 1, iconType: 'html', phaseShift: 0, glowColor: 'cyan', label: 'HTML5' },
  { id: 'css', orbitRadius: 92, size: 44, speed: 1, iconType: 'css', phaseShift: (2 * Math.PI) / 3, glowColor: 'cyan', label: 'CSS3' },
  { id: 'javascript', orbitRadius: 92, size: 40, speed: 1, iconType: 'javascript', phaseShift: (4 * Math.PI) / 3, glowColor: 'cyan', label: 'JavaScript' },
  { id: 'react', orbitRadius: 165, size: 50, speed: -0.6, iconType: 'react', phaseShift: 0, glowColor: 'purple', label: 'React' },
  { id: 'wordpress', orbitRadius: 165, size: 45, speed: -0.6, iconType: 'wordpress', phaseShift: (2 * Math.PI) / 5, glowColor: 'purple', label: 'WordPress' },
  { id: 'php', orbitRadius: 165, size: 48, speed: -0.6, iconType: 'php', phaseShift: (4 * Math.PI) / 5, glowColor: 'purple', label: 'PHP' },
  { id: 'elementor', orbitRadius: 165, size: 44, speed: -0.6, iconType: 'elementor', phaseShift: (6 * Math.PI) / 5, glowColor: 'purple', label: 'Elementor' },
  { id: 'woocommerce', orbitRadius: 165, size: 48, speed: -0.6, iconType: 'woocommerce', phaseShift: (8 * Math.PI) / 5, glowColor: 'purple', label: 'WooCommerce' },
]

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { orbitRadius, size, iconType, label } = config
  const x = Math.cos(angle) * orbitRadius
  const y = Math.sin(angle) * orbitRadius

  return (
    <div
      className="orbiting-skill"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`orbiting-skill-button ${isHovered ? 'is-hovered' : ''}`}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined,
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && <div className="orbit-tooltip">{label}</div>}
      </div>
    </div>
  )
})
OrbitingSkill.displayName = 'OrbitingSkill'

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.2)',
      border: 'rgba(6, 182, 212, 0.3)',
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.2)',
      border: 'rgba(147, 51, 234, 0.3)',
    },
  }

  const colors = glowColors[glowColor]

  return (
    <div
      className="glowing-orbit-path"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
        '--orbit-primary': colors.primary,
        '--orbit-secondary': colors.secondary,
        '--orbit-border': colors.border,
      } as React.CSSProperties}
    >
      <div className="orbit-glow" style={{ animationDelay: `${animationDelay}s` }} />
      <div className="orbit-ring" />
    </div>
  )
})
GlowingOrbitPath.displayName = 'GlowingOrbitPath'

export default function OrbitingSkills() {
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    let animationFrameId: number
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime
      setTime((prevTime) => prevTime + deltaTime)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isPaused])

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 92, glowColor: 'cyan', delay: 0 },
    { radius: 165, glowColor: 'purple', delay: 1.5 },
  ]

  return (
    <div className="orbiting-skills" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="orbit-background" />
      <div className="orbit-stage">
        <div className="orbit-center">
          <div className="center-cyan-glow" />
          <div className="center-purple-glow" />
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#orbit-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <defs>
              <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
            </defs>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>

        {orbitConfigs.map((config) => (
          <GlowingOrbitPath key={`path-${config.radius}`} radius={config.radius} glowColor={config.glowColor} animationDelay={config.delay} />
        ))}

        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0)
          return <OrbitingSkill key={config.id} config={config} angle={angle} />
        })}
      </div>
    </div>
  )
}
