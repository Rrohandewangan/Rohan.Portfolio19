import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { PixelDiamond, ExternalLink, GitHubIcon } from '../components/Icons'

const projects = [
  {
    title: 'VitalisAI',
    subtitle: 'AI-Powered Clinical Triage Platform',
    date: 'Aug 2026',
    tech: ['Node.js', 'Express.js', 'Azure AI Foundry', 'WebRTC', 'MongoDB'],
    color: 'from-violet-600 to-indigo-700',
    details: [
      'Built an AI-powered clinical triage backend with Azure AI Foundry for symptom analysis and location-aware healthcare responses with 100% data encryption at rest and in transit.',
      'Designed a secure sync layer using WebRTC and Azure Blob Storage with short-lived SAS URLs for encrypted medical data transfer; architected for horizontal scalability.',
    ],
    tags: ['Healthcare', 'AI', 'Security'],
    featured: true,
  },
  {
    title: 'CareSync',
    subtitle: 'Multi-Role Healthcare Appointment System',
    date: 'Jan 2026',
    tech: ['Java', 'JSP', 'Servlets', 'JSTL', 'MySQL', 'Bootstrap 5'],
    color: 'from-pink-600 to-rose-700',
    details: [
      'Built a multi-role healthcare appointment system with Admin, Doctor, and Patient portals using Java Servlets, JSP, and role-based session management.',
      'Implemented end-to-end appointment workflow — patient registration, doctor selection by specialty, booking, prescription tracking, and profile management via MySQL.',
    ],
    tags: ['Healthcare', 'Full Stack', 'Java'],
    featured: true,
  },
  {
    title: 'Employo',
    subtitle: 'Enterprise Employee Management System',
    date: 'May 2025',
    tech: ['React', 'Spring Boot', 'MySQL', 'MongoDB', 'Docker', 'Kubernetes', 'Jenkins'],
    color: 'from-amber-600 to-orange-700',
    details: [
      'Built a full-stack employee management system with React and Spring Boot featuring 20+ REST APIs, Chart.js dashboards, Swagger docs, and JWT + WebAuthn/FIDO2 passwordless auth.',
      'Containerized with Docker, orchestrated via Kubernetes (blue-green/canary deploys), and automated CI/CD with Jenkins including Trivy scanning and auto-rollback.',
    ],
    tags: ['Enterprise', 'DevOps', 'Security'],
    featured: true,
  },
]

export default function Projects() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Page Header */}
        <motion.div 
          className="mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-4">
            <PixelDiamond size={12} className="text-accent-purple" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">Portfolio</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
            Projects
          </h1>
          <p className="mt-6 text-ink-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            A selection of projects I've built — from AI-powered healthcare platforms to enterprise-grade cloud-native systems.
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-8 md:space-y-12">
          {projects.map((project, i) => (
            <motion.article
              key={i}
              className="group"
              id={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <SpotlightCard className="bg-ink text-cream border-ink/5" spotlightColor="rgba(139, 92, 246, 0.15)">
                {/* Color bar */}
                <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />

                <div className="p-8 md:p-10 lg:p-12 relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left content */}
                    <div className="flex-1">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                          {project.date}
                        </span>
                        {project.featured && (
                          <span className="px-2.5 py-0.5 bg-accent-purple/20 text-accent-pink text-[10px] font-mono uppercase tracking-widest rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-2xl md:text-3xl font-bold group-hover:text-accent-purple transition-colors duration-300">
                        {project.title}
                      </h2>
                      <p className="text-white/60 text-sm mt-1 font-medium">{project.subtitle}</p>

                      {/* Description */}
                      <div className="mt-6 space-y-3">
                        {project.details.map((detail, j) => (
                          <p key={j} className="text-white/50 text-sm leading-relaxed flex gap-3">
                            <span className="text-accent-purple mt-1.5 flex-shrink-0">
                              <PixelDiamond size={8} />
                            </span>
                            {detail}
                          </p>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/5 text-white/40 text-[10px] font-mono uppercase tracking-widest rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right - Tech stack */}
                    <div className="lg:w-64 flex-shrink-0">
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-mono text-white/70 group-hover:border-accent-purple/30 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div 
          className="mt-16 md:mt-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <div className="bg-ink rounded-3xl p-12 md:p-16 text-cream relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-purple/20 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent-pink/10 to-transparent rounded-tr-full" />
            <div className="relative z-10">
              <GitHubIcon size={48} className="mx-auto mb-6 text-white/30" />
              <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
                More on GitHub
              </h2>
              <p className="text-white/50 max-w-md mx-auto mb-8">
                Check out my open-source contributions, side projects, and experiments.
              </p>
              <a
                href="https://github.com/Rrohandewangan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-ink font-display font-semibold rounded-full hover:bg-accent-purple hover:text-white transition-all duration-300 group"
                id="github-cta"
              >
                <GitHubIcon size={18} />
                Visit GitHub Profile
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
