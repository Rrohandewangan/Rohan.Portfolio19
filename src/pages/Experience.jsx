import { motion } from 'framer-motion'
import SpotlightCard from '../components/SpotlightCard'
import { PixelDiamond } from '../components/Icons'

const experiences = [
  {
    role: 'Associate Microsoft Student Ambassador',
    company: 'Microsoft',
    location: 'India (Remote)',
    period: 'Jan 2026 – Present',
    color: 'bg-accent-purple',
    logo: '🟣',
    bullets: [
      'Organized campus-level hackathons and tech workshops focused on AI development and Azure cloud computing.',
      'Conducted hands-on workshops on Azure cloud services, GitHub Copilot, and backend development for 20+ peers.',
      'Fostered a developer community on campus, driving hands-on participation in modern tech stacks.',
    ],
    tags: ['Azure', 'AI', 'Community', 'Workshops'],
  },
  {
    role: 'Open Source Contributor – GSSoC 2026',
    company: 'GirlScript Summer of Code',
    location: 'Remote',
    period: 'Mar 2026 – Present',
    color: 'bg-accent-green',
    logo: '🟢',
    bullets: [
      'Contributed to Node.js/Express.js backend repositories by fixing bugs and implementing new REST API features.',
      'Merged 5+ pull requests involving pagination, input validation middleware, and authentication refactoring.',
      'Collaborated with project maintainers and global contributors to enhance active open-source repositories.',
    ],
    tags: ['Node.js', 'Express', 'Open Source', 'REST APIs'],
  },
  {
    role: 'Technical Team Lead',
    company: 'GitHub Dev Days & MLH Hackathon',
    location: 'Bhilai, Chhattisgarh',
    period: 'Apr 2026 – May 2026',
    color: 'bg-accent-peach',
    logo: '🟠',
    bullets: [
      'Led technical operations and coordinated event execution for GitHub Dev Days and MLH Hackathon.',
      'Managed participant data for 2,000+ students, ensuring smooth registration and workflow management.',
      'Delivered large-scale events with streamlined data pipelines, reducing manual data-entry overhead.',
    ],
    tags: ['Leadership', 'Event Management', 'GitHub', 'MLH'],
  },
]

const education = {
  degree: 'B.Tech – Computer Science & Engineering',
  school: 'Rungta College of Engineering and Technology',
  location: 'Bhilai, Chhattisgarh',
  period: 'Aug 2024 – Sep 2028',
}

const skills = {
  'Languages': ['C++', 'Java', 'Python', 'JavaScript', 'C', 'SQL', 'HTML', 'CSS'],
  'Core Concepts': ['DSA', 'OOP', 'System Design', 'OS', 'DBMS', 'Networks', 'Distributed Systems'],
  'Technologies': ['React', 'Node.js', 'Express', 'Spring Boot', 'Spring Security', 'REST APIs', 'Microservices', 'Tailwind CSS', 'MongoDB', 'MySQL'],
  'DevOps / Cloud': ['AWS', 'Docker', 'Kubernetes', 'Git', 'Vercel', 'Render', 'GitHub Actions'],
  'AI / ML': ['Pandas', 'NumPy', 'Machine Learning'],
}

export default function Experience() {
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
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">Career</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
            Experience
          </h1>
          <p className="mt-6 text-ink-muted text-lg md:text-xl max-w-2xl leading-relaxed">
            My professional journey — building communities, shipping code, and leading technical initiatives.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6 mb-24 md:mb-36">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="group"
              id={`experience-${i}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <SpotlightCard className="bg-ink text-cream border-ink/5 group" spotlightColor="rgba(139, 92, 246, 0.15)">
                <div className={`h-1 ${exp.color}`} />
                <div className="p-8 md:p-10 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                      {exp.logo}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-4">
                        <div>
                          <h2 className="font-display text-xl md:text-2xl font-bold group-hover:text-accent-purple transition-colors duration-300">
                            {exp.role}
                          </h2>
                          <p className="text-white/50 text-sm mt-0.5">
                            {exp.company} · {exp.location}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 bg-white/5 px-3 py-1.5 rounded-full self-start">
                          {exp.period}
                        </span>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                            <span className="text-accent-purple mt-1.5 flex-shrink-0">
                              <PixelDiamond size={8} />
                            </span>
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/5 text-white/40 text-[10px] font-mono uppercase tracking-widest rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div 
          className="mb-24 md:mb-36" 
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-8">
            <PixelDiamond size={12} className="text-accent-pink" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">Education</span>
          </div>

          <div className="bg-ink rounded-3xl p-8 md:p-12 text-cream relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-accent-purple/15 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{education.degree}</h2>
              <p className="text-white/60 text-lg">{education.school}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-white/40 text-sm font-mono">
                <span>{education.location}</span>
                <span>·</span>
                <span>{education.period}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Skills */}
        <motion.div 
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-8">
            <PixelDiamond size={12} className="text-accent-peach" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">Technical Skills</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], i) => (
              <SpotlightCard
                key={category}
                className="bg-ink text-cream border-ink/5 group"
                spotlightColor="rgba(249, 115, 22, 0.15)"
              >
                <div className="p-7 relative z-10 h-full flex flex-col">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-5">{category}</h3>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-mono text-white/70 group-hover:bg-accent-peach/10 group-hover:text-accent-peach group-hover:border-accent-peach/20 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
