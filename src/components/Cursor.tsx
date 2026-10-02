'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 }
  const cursorX = useSpring(-100, springConfig)
  const cursorY = useSpring(-100, springConfig)

  useEffect(() => {
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
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
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-400/60 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: hovered ? 48 : 24,
        height: hovered ? 48 : 24,
        backgroundColor: hovered ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.08)',
        borderColor: hovered ? 'rgba(168, 85, 247, 0.8)' : 'rgba(99, 102, 241, 0.5)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <motion.div
        className="w-2 h-2 bg-indigo-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: hovered ? 1.5 : 1,
        }}
      />
    </motion.div>
  )
}
