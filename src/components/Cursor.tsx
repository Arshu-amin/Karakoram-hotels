'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  const cursorX = useSpring(0, { damping: 25, stiffness: 250, mass: 0.5 })
  const cursorY = useSpring(0, { damping: 25, stiffness: 250, mass: 0.5 })
  const dotX = useSpring(0, { damping: 40, stiffness: 450, mass: 0.2 })
  const dotY = useSpring(0, { damping: 40, stiffness: 450, mass: 0.2 })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)

      const target = e.target as HTMLElement | null
      if (target) {
        const interactive = target.closest('button, a, [role="button"], input, select, textarea, .interactive')
        setIsPointer(!!interactive)
      }
    }

    const handleMouseDown = () => setIsHovered(true)
    const handleMouseUp = () => setIsHovered(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY, dotX, dotY])

  if (!mounted) return null

  return (
    <>
      {/* Outer Spring Glow Ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-indigo-400/60 bg-indigo-500/10 backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 48 : isHovered ? 24 : 32,
          height: isPointer ? 48 : isHovered ? 24 : 32,
          borderColor: isPointer ? 'rgba(129, 140, 248, 0.9)' : 'rgba(99, 102, 241, 0.5)',
          backgroundColor: isPointer ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.05)',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
        }}
      />
      {/* Inner Pin Dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-300"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
