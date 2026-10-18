'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    document.body.classList.add('custom-cursor-active')

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const target = e.target as HTMLElement | null
      if (target) {
        const isClickable = target.closest('button, a, input, select, textarea, [role="button"]') !== null
        setIsPointer(isClickable)
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
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-indigo-400 mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 1.5 : isPointer ? 2.5 : 1,
          opacity: mousePosition.x < 0 ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
        style={{ width: 8, height: 8 }}
      />

      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-500/50 mix-blend-screen hidden md:block"
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isHovered ? 1.8 : isPointer ? 1.4 : 1,
          opacity: mousePosition.x < 0 ? 0 : 0.6,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.2 }}
        style={{ width: 36, height: 36 }}
      />
    </>
  )
}
