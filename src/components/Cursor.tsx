'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    document.body.classList.add('custom-cursor-active')

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
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
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-indigo-500/80 mix-blend-screen blur-[1px]"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 8),
          y: mousePosition.y - (isHovered ? 24 : 8),
          width: isHovered ? 48 : 16,
          height: isHovered ? 48 : 16,
          opacity: isHovered ? 0.6 : 0.8,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-400/50"
        animate={{
          x: mousePosition.x - (isHovered ? 32 : 16),
          y: mousePosition.y - (isHovered ? 32 : 16),
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 180,
          mass: 0.8,
        }}
      />
    </>
  )
}
