import { PixelSquares, PixelCursor, PixelCircle } from './Icons'

const cards = [
  {
    title: 'Code',
    icon: PixelSquares,
    color: 'from-[#2d3a65] to-[#1a2444]',
    textColor: 'text-blue-100',
    skills: ['Full Stack Dev', 'React & Spring Boot', 'REST APIs', 'System Design', 'DSA', 'Backend Development'],
  },
  {
    title: 'Cloud',
    icon: PixelCursor,
    color: 'from-[#6b2f4a] to-[#4a1e33]',
    textColor: 'text-pink-100',
    skills: ['AWS & Azure', 'Docker & K8s', 'CI/CD Pipelines', 'GitHub Actions', 'Microservices', 'Jenkins'],
  },
  {
    title: 'Learn',
    icon: PixelCircle,
    color: 'from-[#7a4a2a] to-[#5a3218]',
    textColor: 'text-orange-100',
    skills: ['Machine Learning', 'Open Source', 'Competitive Prog', 'Community Building', 'Tech Workshops', 'Hackathons'],
  },
]

export default function ServiceCard({ variant = 0 }) {
  const card = cards[variant]
  const Icon = card.icon

  return (
    <div className="card-flip group cursor-pointer" id={`service-card-${card.title.toLowerCase()}`}>
      <div className="card-flip-inner relative w-full aspect-[3/4] md:aspect-[2/3]">
        {/* Front */}
        <div className={`card-front absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} p-6 flex flex-col justify-between overflow-hidden`}>
          {/* Decorative overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4">
              <Icon size={120} className="text-white/20" />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-white/70 text-xs font-mono uppercase tracking-widest">{card.title}</span>
            <Icon size={16} className="text-white/50" />
          </div>

          <div className="relative z-10 flex-1 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Icon size={48} className="text-white/80" />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon size={12} className="text-white/40" />
              <span className="text-white/40 text-[10px] font-mono">2026</span>
            </div>
            <span className="text-white text-xs font-mono font-medium uppercase tracking-widest">{card.title}</span>
          </div>
        </div>

        {/* Back */}
        <div className={`card-back absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} p-6 flex flex-col`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-sm font-mono font-semibold uppercase tracking-widest">{card.title}</h3>
            <Icon size={16} className="text-white/50" />
          </div>

          <ul className="flex-1 flex flex-col justify-center gap-3">
            {card.skills.map((skill, i) => (
              <li
                key={i}
                className={`${card.textColor} text-sm font-medium flex items-center gap-3 opacity-90`}
              >
                <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                {skill}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <Icon size={12} className="text-white/30" />
            <span className="text-white/50 text-xs font-mono uppercase tracking-widest">{card.title}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { cards }
