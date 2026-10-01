import { motion } from 'framer-motion'

export default function InfiniteMarquee({ text = 'CREATIVE DEVELOPER • AVAILABLE FOR WORK • FRONTEND EXPERT • ', className = '' }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex items-center py-4 select-none pointer-events-none ${className}`}>
      <motion.div
        className="flex space-x-12 min-w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 20
        }}
      >
        <div className="flex space-x-12">
          {/* Repeat enough times to cover the screen twice to prevent popping */}
          <span className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-5">{text}</span>
          <span className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-5">{text}</span>
          <span className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-5">{text}</span>
          <span className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-5">{text}</span>
        </div>
        <div className="flex space-x-12">
          <span className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-5">{text}</span>
          <span className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-5">{text}</span>
          <span className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-5">{text}</span>
          <span className="font-display font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight opacity-5">{text}</span>
        </div>
      </motion.div>
    </div>
  )
}
