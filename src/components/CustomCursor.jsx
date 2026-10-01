import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Premium custom cursor — zero React re-renders per mousemove.
 *
 * Uses Framer Motion's MotionValues (mutable, outside React state)
 * for all position tracking. Only the spring interpolation drives
 * the DOM transforms, handled entirely on the compositor thread.
 *
 * States:
 *  - DEFAULT: small dot + ring
 *  - LINK/BUTTON: expanded ring
 *  - PROJECT: large ring with "View" label
 *
 * Disabled on: touch devices, mobile, prefers-reduced-motion.
 */
export default function CustomCursor() {
  // Bail out entirely on touch / mobile / reduced motion
  const isDesktop =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // MotionValues — no React state, no re-renders
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const dotScale = useMotionValue(1)
  const ringScale = useMotionValue(1)
  const ringOpacity = useMotionValue(1)
  const labelOpacity = useMotionValue(0)

  // Springs for smooth following
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 30, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 30, mass: 0.3 })
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.8 })
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.8 })
  const smoothDotScale = useSpring(dotScale, { stiffness: 400, damping: 25 })
  const smoothRingScale = useSpring(ringScale, { stiffness: 300, damping: 22 })
  const smoothRingOpacity = useSpring(ringOpacity, { stiffness: 400, damping: 30 })
  const smoothLabelOpacity = useSpring(labelOpacity, { stiffness: 400, damping: 30 })

  const labelRef = useRef(null)

  useEffect(() => {
    if (!isDesktop) return

    const onMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onMouseOver = (e) => {
      const target = e.target

      // Check for project cards
      const isProjectCard =
        target.closest('[data-cursor="project"]')

      // Check for interactive elements
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') ||
        target.closest('.card-flip')

      if (isProjectCard) {
        dotScale.set(0.5)
        ringScale.set(2.5)
        ringOpacity.set(0.8)
        labelOpacity.set(1)
      } else if (isInteractive) {
        dotScale.set(1.5)
        ringScale.set(1.6)
        ringOpacity.set(1)
        labelOpacity.set(0)
      } else {
        dotScale.set(1)
        ringScale.set(1)
        ringOpacity.set(1)
        labelOpacity.set(0)
      }
    }

    const onMouseDown = () => {
      dotScale.set(0.8)
      ringScale.set(0.85)
    }

    const onMouseUp = () => {
      dotScale.set(1)
      ringScale.set(1)
    }

    const onMouseLeave = () => {
      mouseX.set(-100)
      mouseY.set(-100)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [isDesktop, mouseX, mouseY, dotScale, ringScale, ringOpacity, labelOpacity])

  if (!isDesktop) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent-purple rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          scale: smoothDotScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-accent-purple/40 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          scale: smoothRingScale,
          opacity: smoothRingOpacity,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* "View" label for project cards */}
        <motion.span
          ref={labelRef}
          className="text-[9px] font-mono uppercase tracking-widest text-accent-purple font-semibold select-none"
          style={{ opacity: smoothLabelOpacity }}
        >
          View
        </motion.span>
      </motion.div>
    </>
  )
}
