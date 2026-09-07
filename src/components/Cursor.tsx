'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveMouse)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-indigo-400/60 bg-indigo-500/10 backdrop-blur-[1px] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          borderColor: isHovered ? 'rgba(168, 85, 247, 0.8)' : 'rgba(99, 102, 241, 0.6)',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.15)' : 'rgba(99, 102, 241, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-cyan-400 pointer-events-none shadow-[0_0_10px_rgba(34,211,238,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          backgroundColor: isHovered ? '#c084fc' : '#38bdf8',
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  )
}
