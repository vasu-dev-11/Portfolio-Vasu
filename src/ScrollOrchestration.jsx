import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Single RAF path: GSAP ticker drives Lenis + ScrollTrigger stays in sync.
 * Lightweight scroll reveals (batched / few triggers) + subtle parallax CSS var.
 */
export function ScrollOrchestration() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    let active = true
    let initialized = false
    let timerId
    let tweens = []
    let ticker

    const onScrollTrigger = () => {
      ScrollTrigger.update()
    }

    const onParallax = (l) => {
      const y = l.scroll * 0.032
      document.documentElement.style.setProperty('--scroll-parallax', `${y}px`)
    }

    const initGSAP = () => {
      if (!active) return
      initialized = true

      lenis.on('scroll', onScrollTrigger)
      lenis.on('scroll', onParallax)
      onParallax(lenis)

      ticker = (time) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)

      const easeOut = 'power3.out'

      const fromReveal = (targets, animation, scrollTrigger) => {
        const list = gsap.utils.toArray(targets)
        if (!list.length) return
        tweens.push(
          gsap.from(list, {
            ...animation,
            clearProps: "transform,opacity",
            onComplete: () => {
              list.forEach((el) => {
                el.classList.add('reveal-complete')
              })
            },
            scrollTrigger: {
              invalidateOnRefresh: true,
              toggleActions: 'play none none none',
              ...scrollTrigger,
            },
          }),
        )
      }

      fromReveal(
        '.hero-reveal',
        { opacity: 0, y: 40, duration: 0.78, ease: easeOut, force3D: true },
        { trigger: '.hero-section', start: 'top 88%' },
      )

      fromReveal(
        '.stats-strip .stat-card',
        { opacity: 0, y: 28, duration: 0.62, ease: 'power2.out', stagger: 0.06, force3D: true },
        { trigger: '.stats-strip', start: 'top 86%' },
      )

      gsap.utils.toArray('.section-pad .section-heading').forEach((el) => {
        fromReveal(
          el,
          { opacity: 0, y: 32, duration: 0.68, ease: easeOut, force3D: true },
          { trigger: el, start: 'top 88%' },
        )
      })

      fromReveal(
        '.project-card',
        { opacity: 0, y: 28, duration: 0.62, ease: 'power2.out', stagger: 0.055, force3D: true },
        { trigger: '.project-grid', start: 'top 84%' },
      )

      fromReveal(
        '.skill-card',
        { opacity: 0, y: 26, duration: 0.58, ease: 'power2.out', stagger: 0.045, force3D: true },
        { trigger: '.skills-grid', start: 'top 86%' },
      )

      fromReveal(
        '.timeline-item',
        { opacity: 0, y: 30, duration: 0.66, ease: easeOut, stagger: 0.1, force3D: true },
        { trigger: '.timeline', start: 'top 86%' },
      )

      fromReveal(
        '.marquee-section',
        { opacity: 0, y: 18, duration: 0.55, ease: 'power2.out', force3D: true },
        { trigger: '.marquee-section', start: 'top 92%' },
      )

      fromReveal(
        '.about-section .portrait-panel',
        { opacity: 0, y: 22, duration: 0.65, ease: easeOut, force3D: true },
        { trigger: '.about-section', start: 'top 86%' },
      )

      fromReveal(
        '.about-section .about-copy',
        { opacity: 0, y: 22, duration: 0.65, ease: easeOut, delay: 0.06, force3D: true },
        { trigger: '.about-section', start: 'top 86%' },
      )

      fromReveal(
        '.contact-section .contact-copy',
        { opacity: 0, y: 22, duration: 0.68, ease: easeOut, force3D: true },
        { trigger: '.contact-section', start: 'top 88%' },
      )

      fromReveal(
        '.contact-section .contact-form',
        { opacity: 0, y: 22, duration: 0.68, ease: easeOut, delay: 0.06, force3D: true },
        { trigger: '.contact-section', start: 'top 88%' },
      )

      // Allow a browser paint frame before refreshing triggers for absolute layout correctness
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }

    // Wait for everything to be loaded (including stylesheets, fonts, assets)
    if (document.readyState === 'complete') {
      timerId = setTimeout(initGSAP, 100)
    } else {
      const handleLoad = () => {
        window.removeEventListener('load', handleLoad)
        if (timerId) clearTimeout(timerId)
        timerId = setTimeout(initGSAP, 100)
      }
      window.addEventListener('load', handleLoad)

      // Fallback timeout in case the 'load' event already fired or is delayed
      timerId = setTimeout(() => {
        window.removeEventListener('load', handleLoad)
        initGSAP()
      }, 800)
    }

    return () => {
      active = false
      if (timerId) clearTimeout(timerId)
      if (initialized) {
        lenis.off('scroll', onScrollTrigger)
        lenis.off('scroll', onParallax)
        if (ticker) gsap.ticker.remove(ticker)
        tweens.forEach((t) => t.kill())
        ScrollTrigger.getAll().forEach((st) => st.kill())
        document.documentElement.style.removeProperty('--scroll-parallax')
      }
    }
  }, [lenis])

  return null
}
