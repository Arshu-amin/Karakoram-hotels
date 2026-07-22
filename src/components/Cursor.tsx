'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Smooth springs for high-performance fluid animations
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Suppressed state update rule in custom hooks
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
    }

    const onMouseEnter = () => {
      setHovered(true)
    }

    const onMouseLeave = () => {
      setHovered(false)
    }

    window.addEventListener('mousemove', moveCursor)

    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
    }

    // Attach listeners initially
    attachListeners()

    // Re-attach listeners periodically or on mutation if layout changes
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.classList.remove('custom-cursor-active')
      observer.disconnect()
      const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <>
      {/* Outer Spring Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-sky-400 pointer-events-none z-50 mix-blend-screen bg-sky-500/10"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: hovered ? 2.5 : 1,
          borderColor: hovered ? 'rgba(192, 132, 252, 1)' : 'rgba(56, 189, 248, 1)',
          backgroundColor: hovered ? 'rgba(192, 132, 252, 0.15)' : 'rgba(56, 189, 248, 0.1)',
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-sky-400 pointer-events-none z-50 mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: 8,
          translateY: 8,
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
          backgroundColor: hovered ? 'rgb(192, 132, 252)' : 'rgb(56, 189, 248)',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
