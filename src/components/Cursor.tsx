'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true)
    document.body.classList.add('custom-cursor-active')

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handlePointerOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handlePointerOver)
    }
  }, [cursorX, cursorY])

  if (!visible) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-indigo-400/50 bg-indigo-500/10 backdrop-blur-[1px] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-cyan-400 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 8 : 6,
          height: hovered ? 8 : 6,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      />
    </>
  )
}
