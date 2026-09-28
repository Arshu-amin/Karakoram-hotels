'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    document.body.classList.add('custom-cursor-active')

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const isInteractive = !!target.closest('button, a, input, textarea, select, [role="button"], .interactive')
      setIsHovered(isInteractive)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveMouse)
    window.addEventListener('mouseover', handlePointerOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', handlePointerOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-indigo-400/60 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 54 : 32,
          height: isHovered ? 54 : 32,
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
          boxShadow: isHovered ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.2 }}
      />
      {/* Center Glow Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 1.8 : 1,
        }}
      />
    </div>
  )
}
