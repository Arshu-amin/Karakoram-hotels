'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 25, stiffness: 350 }
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
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.getAttribute('role') === 'button' ||
          target.closest('button') ||
          target.closest('a'))
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
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

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-400/60 bg-indigo-500/10 backdrop-blur-[1px] transition-transform duration-100 ease-out"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        width: isHovered ? 48 : 24,
        height: isHovered ? 48 : 24,
      }}
    >
      <div
        className={`w-2 h-2 rounded-full bg-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovered ? 'scale-150 bg-purple-400' : ''
        }`}
      />
    </motion.div>
  )
}
