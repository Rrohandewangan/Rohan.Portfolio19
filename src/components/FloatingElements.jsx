import { useEffect, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { PixelDiamond, PixelSquares, PixelCircle } from './Icons'

/**
 * Hero background decorative shapes.
 * Cursor-reactive on desktop: shapes shift subtly based on mouse position.
 * Uses MotionValues — zero React state, zero re-renders.
 * Only renders on md+ screens (hidden via CSS).
 */

/* Individual shape that subscribes to the shared mouse spring */
function FloatingShape({ Icon, size, className, parallax, floatAnim, floatDuration, smoothX, smoothY }) {
  const offsetX = useTransform(smoothX, (v) => v * parallax)
  const offsetY = useTransform(smoothY, (v) => v * parallax * 0.6)

  return (
    <motion.div
      className={className}
      animate={floatAnim}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ x: offsetX, y: offsetY }}
    >
      <Icon size={size} />
    </motion.div>
  )
}

export default function FloatingElements() {
  // Normalized mouse position (-1 to 1)
  const mouseNormX = useMotionValue(0)
  const mouseNormY = useMotionValue(0)
  const smoothX = useSpring(mouseNormX, { stiffness: 30, damping: 20 })
  const smoothY = useSpring(mouseNormY, { stiffness: 30, damping: 20 })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return

    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mouseNormX.set(nx)
      mouseNormY.set(ny)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [mouseNormX, mouseNormY])

  const shapes = useMemo(() => [
    {
      Icon: PixelDiamond,
      size: 72,
      className: 'absolute top-[12%] left-[6%] text-accent-purple/15',
      parallax: 18,
      floatAnim: { y: [0, -20, 0] },
      floatDuration: 8,
    },
    {
      Icon: PixelSquares,
      size: 88,
      className: 'absolute bottom-[18%] right-[6%] text-accent-pink/12',
      parallax: -14,
      floatAnim: { y: [0, 25, 0] },
      floatDuration: 10,
    },
    {
      Icon: PixelCircle,
      size: 52,
      className: 'absolute top-[45%] right-[28%] text-accent-peach/12',
      parallax: 10,
      floatAnim: { y: [0, -15, 0] },
      floatDuration: 9,
    },
    {
      Icon: PixelDiamond,
      size: 28,
      className: 'absolute top-[28%] right-[14%] text-accent-teal/20',
      parallax: -8,
      floatAnim: { y: [0, -12, 0] },
      floatDuration: 7,
    },
    {
      Icon: PixelSquares,
      size: 36,
      className: 'absolute bottom-[12%] left-[18%] text-accent-blue/15',
      parallax: 12,
      floatAnim: { y: [0, 18, 0] },
      floatDuration: 11,
    },
  ], [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} smoothX={smoothX} smoothY={smoothY} />
      ))}
    </div>
  )
}
