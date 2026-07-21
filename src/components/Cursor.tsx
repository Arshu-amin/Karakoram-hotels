'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Sub-springs for the secondary element to follow perfectly
  const dotXSpring = useSpring(cursorX, { damping: 15, stiffness: 400 })
  const dotYSpring = useSpring(cursorY, { damping: 15, stiffness: 400 })

  useEffect(() => {
    // Flag to ensure render-time safety / SSR avoidance
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.getAttribute('role') === 'button'

      if (isInteractive) {
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
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <>
      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-indigo-500 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0)',
          borderColor: hovered ? '#a5b4fc' : '#6366f1',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Tiny Center Dot */}
      <motion.div
        style={{
          x: dotXSpring,
          y: dotYSpring,
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
        // Offset center dot so it resides inside the 32px (w-8/h-8) ring perfectly
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-[9999] hidden md:block translate-x-[15px] translate-y-[15px]"
      />
    </>
  )
}
