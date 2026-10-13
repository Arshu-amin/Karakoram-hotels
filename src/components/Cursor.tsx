'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const cursorX = useSpring(-100, { damping: 25, stiffness: 250 })
  const cursorY = useSpring(-100, { damping: 25, stiffness: 250 })

  useEffect(() => {
    // Enable custom cursor styles on body
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive'))
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handlePointerOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handlePointerOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY, visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer Spring Follower Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 1.8 : 1,
          opacity: hovered ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.2 }}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-indigo-400/60 bg-indigo-500/10 backdrop-blur-[1px] pointer-events-none"
      />

      {/* Inner Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)] pointer-events-none"
      />
    </div>
  )
}
