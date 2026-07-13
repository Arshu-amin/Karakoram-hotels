'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      setIsHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleHover)

    // Add class to body to hide default cursor
    document.body.classList.add('custom-cursor-active')

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleHover)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      style={{
        translateX: x,
        translateY: y,
        position: 'fixed',
        left: -12,
        top: -12,
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: 'white',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  )
}
