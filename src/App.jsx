import { useEffect, useState } from 'react'
import './App.css'
import OrbitingSkills from '../components/ui/orbiting-skills'

const stats = [
  ['15+', 'Client Projects'],
  ['1+', 'Years Experience'],
  ['WordPress', 'Developer'],
  ['React', 'Beginner'],
]

const projects = [
  {
    title: 'Premium WooCommerce Store',
    description: 'Conversion-led storefront with premium catalog flows, checkout clarity, and modular WordPress content controls.',
    stack: ['WooCommerce', 'WordPress', 'Elementor'],
    accent: 'commerce',
  },
  {
    title: 'Real Estate Platform with Maps',
    description: 'Property discovery interface with location-first browsing, lead capture paths, and polished listing cards.',
    stack: ['WordPress', 'ACF', 'Maps'],
    accent: 'estate',
  },
  {
    title: 'SaaS Business Portfolio',
    description: 'High-trust startup-style presence with sharp sections, fast-loading UI, and clean storytelling systems.',
    stack: ['React', 'CSS', 'UI Systems'],
    accent: 'saas',
  },
  {
    title: 'React Expense Tracker App',
    description: 'Responsive dashboard experience with readable financial views, stateful interactions, and calm analytics.',
    stack: ['React.js', 'JavaScript', 'Charts'],
    accent: 'tracker',
  },
  {
    title: 'Modern Blog Platform',
    description: 'Editorial WordPress platform with flexible layouts, elegant taxonomy, and content-first performance.',
    stack: ['WordPress', 'PHP', 'ACF'],
    accent: 'blog',
  },
]

const skills = [
  ['React.js', 'Component-led interfaces'],
  ['WordPress', 'Custom business websites'],
  ['WooCommerce', 'Storefront experiences'],
  ['Elementor', 'Fast premium builds'],
  ['JavaScript', 'Interactive frontends'],
  ['PHP', 'Theme integrations'],
  ['HTML/CSS', 'Responsive systems'],
  ['ACF', 'Flexible content models'],
  ['GitHub', 'Clean delivery workflow'],
]

const timeline = [
  {
    company: 'Santushti Infotech',
    role: 'Web Developer',
    duration: 'Oct 2024 — Present',
    text: 'Developing and delivering responsive client websites across e-commerce, real-estate, business, and portfolio domains using WordPress, WooCommerce, Elementor, PHP, HTML, CSS, and JavaScript. Worked on custom layouts, payment gateway integration, product filtering, lead generation forms, and responsive frontend experiences for modern business websites.',
  },
  {
    company: 'Krishaweb Technologies',
    role: 'Web Development Intern',
    duration: 'Jan 2024 — May 2024',
    text: 'Worked on WordPress theme customization and frontend development for client projects, focusing on responsive layouts, Elementor-based website building, ACF integration, and UI implementation using HTML, CSS, and JavaScript. Gained hands-on experience with WordPress workflows, dynamic content management, and scalable website structure development.',
  },
]

const marqueeItems = ['WordPress', 'React', 'WooCommerce', 'Elementor', 'PHP', 'JavaScript', 'GitHub', 'ACF']
const githubProfileUrl = 'https://github.com/vasu-savjani'

const navItems = [
  { id: 'top', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function ProjectPreview({ accent }) {
  return (
    <div className={`project-preview ${accent}`} aria-hidden="true">
      <div className="preview-topline">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="preview-window">
        <div className="preview-sidebar"></div>
        <div className="preview-body">
          <div className="preview-hero"></div>
          <div className="preview-row">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="preview-chart">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('top')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      const sectionPositions = navItems
        .map((item) => {
          const element = document.getElementById(item.id)
          return element ? { id: item.id, top: element.offsetTop } : null
        })
        .filter(Boolean)

      if (!sectionPositions.length) {
        ticking = false
        return
      }

      const pageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12

      if (pageBottom) {
        setActiveSection('contact')
        ticking = false
        return
      }

      const activationPoint = window.scrollY + Math.min(window.innerHeight * 0.42, 360)
      const currentSection = sectionPositions.reduce((current, section) => {
        return activationPoint >= section.top ? section.id : current
      }, sectionPositions[0].id)

      setActiveSection(currentSection)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    window.addEventListener('hashchange', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)

    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const headerOffset = window.innerWidth <= 980 ? 106 : 96
    const top = section.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: 'smooth',
    })
  }

  const handleNavClick = (sectionId, event) => {
    event?.preventDefault()
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    document.body.classList.remove('menu-open')
    window.requestAnimationFrame(() => scrollToSection(sectionId))
  }

  return (
    <main className="portfolio-shell">
      <div className="ambient-grid" aria-hidden="true"></div>
      <div className="noise-layer" aria-hidden="true"></div>

      <nav className="top-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Vasu Savjani home" onClick={(event) => handleNavClick('top', event)}>
          <span>VS</span>
          Vasu Savjani
        </a>
        <div className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'active' : ''}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => handleNavClick(item.id, event)}
              >
                {item.label}
              </a>
            )
          })}
        </div>
        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        className={`mobile-menu-backdrop ${isMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <aside className={`mobile-sidebar ${isMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-sidebar-header">
          <span>Navigation</span>
          <button aria-label="Close navigation menu" onClick={() => setIsMenuOpen(false)} type="button">
            ×
          </button>
        </div>
        <div className="mobile-sidebar-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'active' : ''}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => handleNavClick(item.id, event)}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </aside>

      <section className="hero-section section-pad" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Frontend & WordPress Developer</p>
          <h1>Modern UI Focused Web Development.</h1>
          <p className="hero-subtitle">
            Frontend & WordPress developer with experience building e-commerce stores, business websites, 
            real-estate platforms, and responsive React applications.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects" onClick={(event) => handleNavClick('projects', event)}>View Projects</a>
            <a className="button secondary" href="#contact" onClick={(event) => handleNavClick('contact', event)}>Let&apos;s Work Together</a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Orbiting frontend skill icons">
          <OrbitingSkills />
        </div>
      </section>

      <section className="stats-strip" aria-label="Portfolio stats">
        {stats.map(([value, label]) => (
          <div className="stat-card" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="section-pad" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Featured Work</p>
          <h2>Projects Built for Real Businesses.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a
              className={`project-card project-${index + 1}`}
              href={githubProfileUrl}
              key={project.title}
              rel="noreferrer"
              target="_blank"
            >
              <ProjectPreview accent={project.accent} />
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section-pad skills-section" id="skills">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Technical Skills & Platforms</h2>
        </div>
        <div className="skills-grid">
          {skills.map(([name, detail], index) => (
            <article className="skill-card" key={name}>
              <span className="skill-icon">{name.slice(0, 2)}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
              <i style={{ '--delay': `${index * 0.08}s` }}></i>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad experience-section">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>My Journey in Web Development</h2>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.company}>
              <span className="timeline-dot"></span>
              <div>
                <p>{item.role}</p>
                <h3>{item.company}</h3>
                <p className="timeline-duration">{item.duration}</p>
                <span>{item.text}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="marquee-section" aria-label="Technologies">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section-pad about-section" id="about">
        <div className="portrait-panel" aria-label="Portrait placeholder for Vasu Savjani">
          <div className="portrait-ring">
            <span>VS</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">About Me</p>
          <h2>Frontend & WordPress Developer from Rajkot.</h2>
          <p>
            Frontend and WordPress developer with 1+ year of experience building responsive websites for e-commerce,
            real estate, startups, and business brands. Skilled in WordPress customization, WooCommerce, Elementor,
            PHP, and modern frontend development using React.js.
          </p>
        </div>
      </section>

      <section className="section-pad contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>Need a WordPress or React Developer?</h2>
          <div className="contact-links">
            <a href="mailto:vbsavjani007@gmail.com">Email: vbsavjani007@gmail.com</a>
            <a href="https://github.com/vasu-savjani" target="_blank" rel="noreferrer">GitHub</a>
            <span>Location: Rajkot, Gujarat, India</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label>
            Project
            <textarea name="project" rows="5" placeholder="Tell me about your build"></textarea>
          </label>
          <button type="submit">Send Inquiry</button>
        </form>
      </section>

      <footer className="site-footer">
        <p>Copyright © 2026 Vasu Savjani. All rights reserved.</p>
        <a href="#top" onClick={(event) => handleNavClick('top', event)}>Back to top</a>
      </footer>
    </main>
  )
}

export default App
