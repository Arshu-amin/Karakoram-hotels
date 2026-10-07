'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Smooth springs for cursor movement
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 }
  const cursorX = useSpring(-100, springConfig)
  const cursorY = useSpring(-100, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-hover')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block">
      {/* Outer Spring Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-indigo-400/60 bg-indigo-500/10 backdrop-blur-[1px] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 52 : isClicking ? 24 : 32,
          height: isHovered ? 52 : isClicking ? 24 : 32,
          borderColor: isHovered ? '#a855f7' : '#818cf8',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.15)' : 'rgba(99, 102, 241, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-indigo-400 pointer-events-none shadow-[0_0_10px_#818cf8]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : isClicking ? 0.8 : 1,
          backgroundColor: isHovered ? '#ec4899' : '#818cf8',
        }}
      />
    </div>
  )
}
