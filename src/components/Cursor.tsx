'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  // Use motion values for position to prevent React state re-render bottlenecks
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth springs for high performance lag-free tracking
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    // Add class on mount to hide standard cursor, remove on unmount
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) {
        setVisible(true)
      }
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"]')
      targets.forEach((target) => {
        target.addEventListener('mouseenter', () => setHovered(true))
        target.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Initial attach for static elements
    addHoverListeners()

    // Observe body for dynamically added interactive elements
    const observer = new MutationObserver(() => {
      addHoverListeners()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
    }
  }, [mouseX, mouseY, visible])

  if (!mounted) return null

  return (
    <>
      {/* Outer custom cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-400 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 1.8 : 1.0,
          backgroundColor: hovered ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0)',
          borderColor: hovered ? 'rgba(168, 85, 247, 0.8)' : 'rgba(99, 102, 241, 0.8)',
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      />
      {/* Inner dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-indigo-400 pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 0.5 : 1.0,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      />
    </>
  )
}
