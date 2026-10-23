'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    // Enable custom cursor styles
    document.body.classList.add('custom-cursor-active')

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement | null
      if (target) {
        const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]') !== null
        setIsPointer(isInteractive)
      }
    }

    const handleMouseDown = () => setIsHovered(true)
    const handleMouseUp = () => setIsHovered(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Outer Dot / Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan-400/60"
        animate={{
          x: mousePosition.x - (isPointer ? 24 : 16),
          y: mousePosition.y - (isPointer ? 24 : 16),
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          scale: isHovered ? 0.8 : 1,
          backgroundColor: isPointer ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.05)',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.5,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          width: 8,
          height: 8,
          scale: isHovered ? 1.5 : isPointer ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 400,
          mass: 0.1,
        }}
      />
    </>
  )
}
