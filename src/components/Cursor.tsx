'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const cursorX = useSpring(-100, springConfig)
  const cursorY = useSpring(-100, springConfig)

  useEffect(() => {
    // Add custom cursor class to body
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const isInteractive = target.closest('button, a, [role="button"], input, select, textarea, .interactive')
      setIsHovered(!!isInteractive)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glow Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          opacity: isHovered ? 0.9 : 0.6,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="absolute -top-4 -left-4 w-8 h-8 rounded-full border border-indigo-400/60 bg-indigo-500/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(99,102,241,0.5)]"
      />

      {/* Center Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_8px_#818cf8]"
      />
    </div>
  )
}
