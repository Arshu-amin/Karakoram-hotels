'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useSpring(0, { damping: 25, stiffness: 250 })
  const cursorY = useSpring(0, { damping: 25, stiffness: 250 })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true)
    document.body.classList.add('custom-cursor-active')

    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
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
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', moveMouse)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-400/60 bg-indigo-500/10 backdrop-blur-[1px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-cyan-400"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
        }}
      />
    </>
  )
}
