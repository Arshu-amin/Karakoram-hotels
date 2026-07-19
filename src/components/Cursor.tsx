'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const checkHoverable = (el: HTMLElement | null): boolean => {
        if (!el) return false
        const tagName = el.tagName.toLowerCase()
        if (
          tagName === 'button' ||
          tagName === 'a' ||
          el.getAttribute('role') === 'button' ||
          el.classList.contains('cursor-pointer') ||
          el.closest('button') ||
          el.closest('a') ||
          el.closest('[role="button"]')
        ) {
          return true
        }
        return false
      }

      if (checkHoverable(target)) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isMounted) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-indigo-500 pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
        scale: isHovered ? 1.8 : 1,
        backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0)',
        borderColor: isHovered ? '#818cf8' : '#4f46e5',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  )
}
