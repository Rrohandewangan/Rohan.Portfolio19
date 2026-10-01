import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import FloatingElements from '../components/FloatingElements'
import SpotlightCard from '../components/SpotlightCard'
import MagneticButton from '../components/MagneticButton'
import InfiniteMarquee from '../components/InfiniteMarquee'
import { PixelDiamond, ArrowRight, PixelSquares, PixelCursor, PixelCircle } from '../components/Icons'

/* ================================================================
   MOTION SYSTEM — consistent timing/easing across the whole page
   ================================================================ */

// Premium easing — cubic-bezier(0.16, 1, 0.3, 1) aka "expo out"
const ease = [0.16, 1, 0.3, 1]

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

/* Clip-mask text reveal: line slides up from below */
const textReveal = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.8, ease } },
}

/* ================================================================
   MARQUEE DATA
   ================================================================ */
const marqueeSkills = [
  'React', 'Spring Boot', 'Node.js', 'Docker', 'Kubernetes', 'AWS',
  'Azure', 'MongoDB', 'MySQL', 'TypeScript', 'Python', 'Java', 'C++',
  'REST APIs', 'Microservices', 'Git', 'Jenkins', 'Tailwind CSS',
]

/* ================================================================
   LIGHTWEIGHT CURSOR GLOW
   A single radial-gradient div that follows the mouse.
   No blur filter. No React re-renders. Desktop-only.
   ================================================================ */
function CursorGlow() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 25 })
  const sy = useSpring(my, { stiffness: 40, damping: 25 })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      mx.set(e.clientX - 250)
      my.set(e.clientY - 250)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  // Only render on desktop
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return null

  return (
    <motion.div
      className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0"
      style={{
        x: sx,
        y: sy,
        background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, rgba(236,72,153,0.03) 35%, transparent 65%)',
      }}
      aria-hidden="true"
    />
  )
}

/* ================================================================
   ANIMATED COUNTER — counts up when scrolled into view
   ================================================================ */
function AnimatedCounter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const num = parseInt(value.replace(/[^0-9]/g, ''), 10)
          if (isNaN(num)) { setCount(value); return }
          const duration = 1800
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setCount(Math.floor(eased * num))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ================================================================
   SECTION HEADER — reusable label + heading pattern
   ================================================================ */
function SectionLabel({ children }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
      <PixelDiamond size={12} className="text-accent-purple" />
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">{children}</span>
    </motion.div>
  )
}

/* ================================================================
   HOME PAGE
   ================================================================ */
export default function Home() {
  // Parallax on hero: subtle Y offset + fade on scroll
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4])

  return (
    <div className="pt-20 relative">
      {/* Lightweight cursor glow — desktop only */}
      <CursorGlow />

      {/* ====================== HERO ====================== */}
      <motion.section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        id="hero"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <FloatingElements />

        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full py-16 md:py-24 relative z-10">
          {/* Decorative top divider */}
          <motion.div
            className="flex items-center justify-between mb-8 text-ink-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <PixelDiamond size={8} />
                <PixelDiamond size={8} />
                <PixelDiamond size={8} />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase">500+ Contributions</span>
              <PixelDiamond size={8} />
            </div>
            <div className="hidden md:flex items-center gap-2">
              <PixelDiamond size={8} />
              <span className="text-[10px] font-mono tracking-widest uppercase">Open Source</span>
              <div className="flex gap-0.5">
                <PixelDiamond size={8} />
                <PixelDiamond size={8} />
                <PixelDiamond size={8} />
              </div>
            </div>
          </motion.div>

          {/* Hero content grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Left: Name + CTA */}
            <div className="lg:col-span-7">
              {/* ---- CLIP-MASK TEXT REVEAL ---- */}
              <motion.h1
                variants={stagger}
                className="font-display font-black leading-[0.85] tracking-tighter"
              >
                <span className="text-reveal-line">
                  <motion.span
                    variants={textReveal}
                    className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-accent-purple"
                  >
                    Rohan
                  </motion.span>
                </span>
                <span className="text-reveal-line mt-1 md:mt-2">
                  <motion.span
                    variants={textReveal}
                    className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
                  >
                    Dewangan
                  </motion.span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-8 text-ink-muted text-lg md:text-xl max-w-lg leading-relaxed"
              >
                Full Stack Developer & Cloud Engineer building intelligent, scalable digital solutions — one line of code at a time.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
                <MagneticButton as={Link} to="/projects">
                  <div
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-cream font-display font-semibold text-sm rounded-full overflow-hidden transition-all duration-300"
                    id="hero-cta-projects"
                  >
                    <span className="absolute inset-0 bg-accent-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10 flex items-center gap-2">
                      View Projects
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </MagneticButton>
                <MagneticButton as={Link} to="/contact">
                  <div
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 border-2 border-ink/20 text-ink font-display font-semibold text-sm rounded-full overflow-hidden hover:border-accent-purple transition-all duration-300"
                    id="hero-cta-contact"
                  >
                    <span className="absolute inset-0 bg-accent-purple/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10">Get in Touch</span>
                  </div>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right: Service cards */}
            <motion.div
              className="lg:col-span-5 grid grid-cols-3 gap-3 md:gap-4"
              variants={stagger}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={scaleUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <ServiceCard variant={i} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-ink-muted">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-ink/20 flex justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-accent-purple"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ====================== INFINITE MARQUEE ====================== */}
      <section className="py-20 overflow-hidden bg-cream relative z-10" id="infinite-marquee">
        <InfiniteMarquee text="CREATIVE DEVELOPER • FRONTEND EXPERT • AVAILABLE FOR WORK • " />
      </section>

      {/* ====================== ABOUT ====================== */}
      <section className="py-24 md:py-36 relative z-10" id="intro">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Intro text */}
            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              <SectionLabel>About me</SectionLabel>

              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl md:text-5xl font-bold leading-tight mb-8"
              >
                Crafting digital experiences with{' '}
                <span className="text-accent-purple">code</span>,{' '}
                <span className="text-accent-pink">cloud</span> &{' '}
                <span className="text-accent-peach">creativity</span>
              </motion.h2>

              <motion.div variants={stagger} className="space-y-5 text-ink-muted text-base md:text-lg leading-relaxed">
                <motion.p variants={fadeUp}>
                  I'm a B.Tech Computer Science student at Rungta College of Engineering, Bhilai, with a passion for
                  building robust full-stack applications and cloud-native systems. As a Microsoft Student Ambassador,
                  I organize hackathons and workshops that bring developers together.
                </motion.p>
                <motion.p variants={fadeUp}>
                  From healthcare AI platforms with Azure AI Foundry to containerized microservices with Docker and
                  Kubernetes — I love solving real-world problems through technology. My open-source contributions
                  through GSSoC 2026 have strengthened my collaborative development skills.
                </motion.p>
                <motion.p variants={fadeUp}>
                  When I'm not coding, you'll find me grinding competitive programming on LeetCode and Codeforces,
                  or exploring the latest in AI and distributed systems.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Timeline card */}
            <motion.div
              className="lg:col-span-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={slideFromRight}
            >
              <div className="bg-ink rounded-3xl p-8 text-cream relative overflow-hidden">
                {/* Subtle static gradient accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-accent-purple/15 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-pink/10 to-transparent rounded-tr-full" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Journey</span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs font-mono text-white/40">2024 → 2026</span>
                  </div>

                  <div className="space-y-6">
                    {[
                      { year: '2026', title: 'Microsoft Student Ambassador', detail: 'Workshops, Hackathons & Community' },
                      { year: '2026', title: 'GSSoC Open Source', detail: '5+ PRs merged, REST APIs & Auth' },
                      { year: '2026', title: 'Built VitalisAI', detail: 'Azure AI + WebRTC Healthcare Platform' },
                      { year: '2025', title: 'Built Employo', detail: 'React + Spring Boot + K8s + Jenkins' },
                      { year: '2024', title: 'Started B.Tech CSE', detail: 'Rungta College, Bhilai' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex gap-4 group"
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-accent-purple group-hover:scale-150 transition-transform duration-300" />
                          {i < 4 && <div className="w-0.5 flex-1 bg-white/10 mt-1" />}
                        </div>
                        <div className="pb-2">
                          <span className="text-[10px] font-mono text-accent-purple tracking-widest">{item.year}</span>
                          <h4 className="text-sm font-semibold mt-0.5 group-hover:text-accent-purple transition-colors duration-300">{item.title}</h4>
                          <p className="text-white/40 text-xs mt-0.5">{item.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                    {[
                      { value: '1500', label: 'LeetCode', suffix: '' },
                      { value: '1150', label: 'Codeforces', suffix: '' },
                      { value: '5', label: 'PRs Merged', suffix: '+' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center group">
                        <div className="text-2xl font-display font-bold text-accent-purple group-hover:text-accent-pink transition-colors duration-500">
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================== CAPABILITIES ====================== */}
      <section className="py-24 md:py-36 bg-ink text-cream relative z-10" id="capabilities">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <PixelSquares size={14} className="text-white/70" />
              <PixelCursor size={14} className="text-accent-pink" />
              <PixelCircle size={14} className="text-accent-peach" />
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
              <div>
                <h2 className="font-display text-3xl md:text-5xl font-bold">Capabilities</h2>
                <p className="text-white/60 mt-3 text-lg max-w-lg">
                  The best experiences start with intelligent systems beneath them.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {[
              {
                title: 'Full Stack Development',
                desc: 'End-to-end web applications with React, Spring Boot, Node.js, and modern frontend frameworks.',
                icon: '⚡',
                tags: ['React', 'Spring Boot', 'Node.js', 'Express'],
              },
              {
                title: 'Cloud & DevOps',
                desc: 'Container orchestration, CI/CD pipelines, and cloud-native architecture on AWS and Azure.',
                icon: '☁️',
                tags: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
              },
              {
                title: 'API Architecture',
                desc: 'RESTful APIs, microservices, authentication systems, and scalable backend architectures.',
                icon: '🔗',
                tags: ['REST APIs', 'JWT', 'WebAuthn', 'Swagger'],
              },
              {
                title: 'Database Design',
                desc: 'Relational and document databases with optimized schemas and query performance.',
                icon: '🗄️',
                tags: ['MySQL', 'MongoDB', 'PostgreSQL'],
              },
              {
                title: 'AI & Machine Learning',
                desc: 'Intelligent systems with Azure AI Foundry, ML pipelines, and data-driven solutions.',
                icon: '🤖',
                tags: ['Azure AI', 'Python', 'Pandas', 'NumPy'],
              },
              {
                title: 'Open Source',
                desc: 'Active contributor to community projects, bug fixes, feature implementations, and code reviews.',
                icon: '🌐',
                tags: ['Git', 'GitHub', 'GSSoC', 'PRs'],
              },
            ].map((cap, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <SpotlightCard className="h-full bg-white/5 border-white/10 p-7 hover:border-accent-purple/30 group">
                  <div className="text-3xl mb-4">{cap.icon}</div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-accent-purple transition-colors duration-300">
                    {cap.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:bg-accent-purple/10 group-hover:text-accent-purple transition-all duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================== ACHIEVEMENTS ====================== */}
      <section className="py-24 md:py-36 relative z-10" id="achievements">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple inline-block"
            >
              Milestones
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-5xl font-bold mt-3"
            >
              Achievements
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {[
              {
                icon: '🏆',
                title: 'Competitive Programming',
                desc: 'LeetCode (1500) · Codeforces (1150) · CodeChef (1020)',
              },
              {
                icon: '🚀',
                title: 'Agentic AI Hackathon',
                desc: 'Shortlisted from a competitive pool of 20,000+ participants.',
              },
              {
                icon: '💼',
                title: 'SWE Intern Shortlists',
                desc: 'Successfully shortlisted for SWE Intern roles at Amazon and IBM.',
              },
            ].map((ach, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <SpotlightCard className="h-full bg-ink p-8 text-cream group" spotlightColor="rgba(236, 72, 153, 0.15)">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="relative z-10" data-cursor="project">
                    <div className="text-4xl mb-4">{ach.icon}</div>
                    <h3 className="font-display font-bold text-lg mb-2 group-hover:text-accent-pink transition-colors duration-300">{ach.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{ach.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================== CTA ====================== */}
      <section className="py-24 md:py-36 relative z-10" id="cta">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-purple/10 rounded-full mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-purple" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-accent-purple">Available for opportunities</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Let's build something{' '}
              <span className="text-accent-purple">extraordinary</span>{' '}
              together
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-ink-muted text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Whether it's a full-stack application, cloud infrastructure, or an open-source contribution — I'm always ready for the next challenge.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-accent-purple text-white font-display font-semibold text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/25"
                id="cta-contact"
              >
                <span className="absolute inset-0 bg-accent-pink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Get in Touch
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
              <Link
                to="/projects"
                className="group relative inline-flex items-center gap-2 px-8 py-4 border-2 border-ink/20 text-ink font-display font-semibold text-sm rounded-full overflow-hidden hover:border-accent-purple transition-all duration-300"
                id="cta-projects"
              >
                <span className="absolute inset-0 bg-accent-purple/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Explore Projects</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
