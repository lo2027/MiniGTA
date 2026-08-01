"use client"

import { useEffect, useRef, useState } from "react"

export default function EarthGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = 400
    canvas.width = size
    canvas.height = size

    let animationFrameId: number

    // Globe parameters
    const centerX = size / 2
    const centerY = size / 2
    const radius = 160

    // Create dots for the globe surface
    const dots: Array<{ x: number; y: number; z: number; originalX: number; originalY: number; originalZ: number }> = []
    const latLines = 20
    const lonLines = 40

    for (let lat = 0; lat < latLines; lat++) {
      for (let lon = 0; lon < lonLines; lon++) {
        const phi = (lat / latLines) * Math.PI
        const theta = (lon / lonLines) * Math.PI * 2

        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)

        dots.push({ x, y, z, originalX: x, originalY: y, originalZ: z })
      }
    }

    const drawGlobe = () => {
      ctx.clearRect(0, 0, size, size)

      // Background glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5)
      gradient.addColorStop(0, "rgba(0, 255, 100, 0.1)")
      gradient.addColorStop(1, "rgba(0, 255, 100, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)

      // Rotate dots
      const rotatedDots = dots.map((dot) => {
        const cosRot = Math.cos(rotationRef.current)
        const sinRot = Math.sin(rotationRef.current)

        // Rotate around Y axis
        const rotatedX = dot.originalX * cosRot - dot.originalZ * sinRot
        const rotatedZ = dot.originalX * sinRot + dot.originalZ * cosRot

        return {
          x: rotatedX,
          y: dot.originalY,
          z: rotatedZ,
        }
      })

      ctx.strokeStyle = "rgba(0, 255, 100, 0.3)"
      ctx.lineWidth = 1
      for (let lat = 0; lat < latLines; lat++) {
        ctx.beginPath()
        for (let lon = 0; lon < lonLines; lon++) {
          const i = lat * lonLines + lon
          const dot = rotatedDots[i]
          if (dot.z > 0) {
            const screenX = centerX + dot.x
            const screenY = centerY - dot.y
            if (lon === 0) {
              ctx.moveTo(screenX, screenY)
            } else {
              ctx.lineTo(screenX, screenY)
            }
          }
        }
        ctx.stroke()
      }

      for (let lon = 0; lon < lonLines; lon++) {
        ctx.beginPath()
        for (let lat = 0; lat < latLines; lat++) {
          const i = lat * lonLines + lon
          const dot = rotatedDots[i]
          if (dot.z > 0) {
            const screenX = centerX + dot.x
            const screenY = centerY - dot.y
            if (lat === 0) {
              ctx.moveTo(screenX, screenY)
            } else {
              ctx.lineTo(screenX, screenY)
            }
          }
        }
        ctx.stroke()
      }

      rotatedDots.forEach((dot) => {
        if (dot.z > 0) {
          // Only draw front-facing dots
          const screenX = centerX + dot.x
          const screenY = centerY - dot.y

          // Calculate dot brightness based on depth
          const brightness = (dot.z + radius) / (radius * 2)
          const alpha = Math.max(0.2, brightness)

          ctx.fillStyle = `rgba(0, 255, 100, ${alpha})`
          const dotSize = 2 + brightness * 2
          ctx.beginPath()
          ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Outer ring
      ctx.strokeStyle = "rgba(0, 255, 100, 0.5)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      rotationRef.current += 0.01

      animationFrameId = requestAnimationFrame(drawGlobe)
    }

    drawGlobe()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-auto max-w-md" />
    </div>
  )
}
