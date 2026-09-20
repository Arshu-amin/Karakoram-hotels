'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function Cursor() {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useSpring(-100, { stiffness: 500, damping: 28 })
  const mouseY = useSpring(-100, { stiffness: 500, damping: 28 })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-indigo-500/80 mix-blend-screen blur-[1px]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : 16,
          height: isHovered ? 48 : 16,
          opacity: isHovered ? 0.6 : 0.8,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-indigo-300/40"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  )
}
