'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    document.body.classList.add('custom-cursor-active')

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
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

    window.addEventListener('mousemove', moveMouse)
    window.addEventListener('mouseover', handleMouseOver)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-400/80 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? '#818cf8' : 'rgba(129, 140, 248, 0.8)',
          backgroundColor: isHovered ? 'rgba(129, 140, 248, 0.15)' : 'rgba(129, 140, 248, 0)',
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-indigo-400 pointer-events-none z-50"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
