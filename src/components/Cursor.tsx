'use client'

import { useEffect, useState, useTransition } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [, startTransition] = useTransition()

  // Framer Motion variables declared before early returns
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    startTransition(() => {
      setMounted(true)
    })

    // Add CSS class to body to hide the default cursor
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('input') ||
          target.closest('select'))
      ) {
        setHovered(true)
      } else {
        setHovered(false)
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
      {/* Outer Glow / Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-indigo-500 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 1.8 : 1,
          backgroundColor: hovered ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0)',
          borderColor: hovered ? '#ec4899' : '#6366f1',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
      />
    </>
  )
}
