'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Configure smooth spring animations for the custom cursor
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // The custom cursor is larger, and has an inner dot and outer ring
  const ringSize = hovered ? 48 : 24
  const dotSize = hovered ? 8 : 6

  useEffect(() => {
    // Flag to bypass SSR/hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    // Set custom-cursor-active on body to activate CSS cursor overrides
    document.body.classList.add('custom-cursor-active')

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', moveMouse)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Set up hover states for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      // Traverse up to find buttons, links, or role="button"
      const interactive = target.closest('button, a, [role="button"]')
      if (interactive) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveMouse)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isVisible])

  if (!mounted || !isVisible) return null

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-indigo-400 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: ringSize,
          height: ringSize,
          translateX: -ringSize / 2,
          translateY: -ringSize / 2,
        }}
        animate={{
          scale: hovered ? 1.2 : 1,
          borderColor: hovered ? 'rgba(165, 180, 252, 0.8)' : 'rgba(129, 140, 248, 0.6)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-indigo-500 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: dotSize,
          height: dotSize,
          translateX: -dotSize / 2,
          translateY: -dotSize / 2,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? '#f472b6' : '#6366f1',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  )
}
