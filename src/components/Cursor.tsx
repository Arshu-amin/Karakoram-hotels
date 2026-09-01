'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(-100, { damping: 25, stiffness: 250 })
  const cursorY = useSpring(-100, { damping: 25, stiffness: 250 })

  useEffect(() => {
    // Add class to body to hide default system cursor when custom cursor is active
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const isInteractive = target.closest(
        'button, a, input, select, textarea, [role="button"], .interactive'
      )
      setIsHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? '#818cf8' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="w-10 h-10 rounded-full border border-white/40 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all pointer-events-none"
      />

      {/* Inner Glowing Core Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8] pointer-events-none"
      />
    </div>
  )
}
