'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 })

  useEffect(() => {
    // Enable custom cursor styles on body
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('input') ||
        target?.closest('select') ||
        target?.closest('.hover-glow')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          borderColor: isHovered ? 'rgba(168, 85, 247, 0.8)' : 'rgba(99, 102, 241, 0.5)',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.15)' : 'rgba(99, 102, 241, 0.05)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' as const }}
        className="fixed w-8 h-8 rounded-full border border-indigo-400/50 backdrop-blur-[2px]"
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? '#c084fc' : '#818cf8',
        }}
        className="fixed w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]"
      />
    </div>
  )
}
