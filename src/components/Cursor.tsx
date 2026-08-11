'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Declare motion values before any early return to satisfy rules-of-hooks
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      // Offset by half of outer ring width/height (16px) for center alignment
      mouseX.set(e.clientX - 16)
      mouseY.set(e.clientY - 16)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-indigo-400 bg-indigo-500/10 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 1.6 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-indigo-400 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          // Offset inner dot to center of outer ring (16px outer vs 4px inner)
          translateX: 12,
          translateY: 12,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 350 }}
      />
    </>
  )
}
