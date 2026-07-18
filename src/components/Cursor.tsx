'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Declare all hooks at the top level to comply with rules-of-hooks
  const innerX = useMotionValue(-100)
  const innerY = useMotionValue(-100)
  const innerXSpring = useSpring(innerX, springConfig)
  const innerYSpring = useSpring(innerY, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      innerX.set(e.clientX - 4)
      innerY.set(e.clientY - 4)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const addHoverEvents = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Set initial hover bindings and handle mutations (for SPA routing/re-renders)
    addHoverEvents()
    const observer = new MutationObserver(addHoverEvents)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.classList.remove('custom-cursor-active')
      observer.disconnect()
    }
  }, [cursorX, cursorY, innerX, innerY, isVisible])

  if (!mounted) return null

  return (
    <>
      {/* Custom outer glowing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-400 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 1.8 : 1.0,
          backgroundColor: hovered ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0)',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 30 }}
      />
      {/* Custom inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: innerXSpring,
          y: innerYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}
