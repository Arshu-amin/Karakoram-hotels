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

    const updateMousePosition = (e: MouseEvent) => {
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

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-cyan-400/60 bg-cyan-500/10 backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 52 : 28,
          height: isHovered ? 52 : 28,
          borderColor: isHovered ? 'rgba(168, 85, 247, 0.8)' : 'rgba(56, 189, 248, 0.6)',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.15)' : 'rgba(56, 189, 248, 0.1)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-cyan-300"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          backgroundColor: isHovered ? '#c084fc' : '#38bdf8',
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
