'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const mouseX = useSpring(-100, springConfig)
  const mouseY = useSpring(-100, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true)
    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
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
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          width: isHovered ? 48 : 20,
          height: isHovered ? 48 : 20,
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.25)' : 'rgba(168, 85, 247, 0.5)',
          borderColor: isHovered ? 'rgba(168, 85, 247, 0.8)' : 'rgba(99, 102, 241, 0.8)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="rounded-full border border-indigo-400/50 backdrop-blur-[2px] flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full bg-white transition-all duration-200 ${
            isHovered ? 'scale-150 bg-indigo-300' : ''
          }`}
        />
      </motion.div>
    </motion.div>
  )
}
