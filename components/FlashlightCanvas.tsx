"use client"

import { useCallback, useEffect, useRef } from "react"

interface FlashlightCanvasProps {
  active: boolean
}

const RADIUS = 140

export default function FlashlightCanvas({ active }: FlashlightCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  // Track mouse position
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  // Resize canvas to fill viewport
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.15
    smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.15

    const sx = smoothRef.current.x
    const sy = smoothRef.current.y

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Black overlay
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Cut-out circle
    const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, RADIUS)
    grad.addColorStop(0, "rgba(0,0,0,1)")
    grad.addColorStop(0.5, "rgba(0,0,0,0.92)")
    grad.addColorStop(0.85, "rgba(0,0,0,0.4)")
    grad.addColorStop(1, "rgba(0,0,0,0)")

    ctx.globalCompositeOperation = "destination-out"
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(sx, sy, RADIUS, 0, Math.PI * 2)
    ctx.fill()

    // Warm glow
    ctx.globalCompositeOperation = "source-over"
    const warmGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, RADIUS * 0.6)
    warmGrad.addColorStop(0, "rgba(255, 220, 130, 0.07)")
    warmGrad.addColorStop(1, "transparent")
    ctx.fillStyle = warmGrad
    ctx.beginPath()
    ctx.arc(sx, sy, RADIUS * 0.6, 0, Math.PI * 2)
    ctx.fill()

    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    if (active) {
      smoothRef.current = { ...mouseRef.current }
      draw()
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        ctx?.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [active, draw])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-[1500ms] ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}
