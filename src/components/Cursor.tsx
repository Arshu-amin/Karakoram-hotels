'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 28, stiffness: 400, mass: 0.2 }
  const cursorX = useSpring(-100, springConfig)
  const cursorY = useSpring(-100, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const isInteractive = Boolean(
        target.closest('button, a, input, textarea, select, [role="button"]')
      )
      setIsHovered(isInteractive)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <motion.div
          animate={{
            scale: isHovered ? 2.5 : 1,
            backgroundColor: isHovered ? 'rgba(129, 140, 248, 0.9)' : 'rgba(99, 102, 241, 0.8)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-4 h-4 rounded-full border border-indigo-300/50 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
        />
      </motion.div>

      {/* Ring Follower */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.8 : 1,
            borderColor: isHovered ? 'rgba(192, 132, 252, 0.8)' : 'rgba(129, 140, 248, 0.4)',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="w-10 h-10 rounded-full border border-indigo-400/30"
        />
      </motion.div>
    </div>
  )
}
