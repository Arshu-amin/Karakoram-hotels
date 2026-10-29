'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 })

  const ringX = useSpring(-100, { stiffness: 250, damping: 20 })
  const ringY = useSpring(-100, { stiffness: 250, damping: 20 })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
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

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handlePointerOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handlePointerOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, ringX, ringY, isVisible])

  if (!mounted || !isVisible) return null

  return (
    <>
      {/* Small central dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Animated glowing outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 border border-indigo-500/60 transition-colors duration-200"
        animate={{
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.02)',
          borderColor: isHovered ? '#818cf8' : 'rgba(129, 140, 248, 0.4)',
        }}
        style={{
          x: ringX,
          y: ringY,
        }}
      />
    </>
  )
}
