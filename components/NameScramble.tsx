"use client"

import { useCallback, useRef, useState } from "react"

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

interface NameScrambleProps {
  shortName: string
  fullName: string
  className?: string
  as?: "h1" | "div" | "span"
}

export default function NameScramble({
  shortName,
  fullName,
  className = "",
  as: Tag = "div",
}: NameScrambleProps) {
  const [displayText, setDisplayText] = useState(shortName)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scrambleTo = useCallback((target: string, onDone: () => void) => {
    let iterations = 0
    intervalRef.current = setInterval(() => {
      const text = target
        .split("")
        .map((char, idx) =>
          idx < iterations
            ? target[idx]
            : LETTERS[Math.floor(Math.random() * LETTERS.length)]
        )
        .join("")
      setDisplayText(text)

      if (iterations >= target.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(target)
        onDone()
      }
      iterations += 1 / 3
    }, 30)
  }, [])

  const handleClick = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsHighlighted(true)

    scrambleTo(fullName, () => {
      setTimeout(() => {
        scrambleTo(shortName, () => {
          setIsAnimating(false)
          setIsHighlighted(false)
        })
      }, 5000)
    })
  }, [isAnimating, fullName, shortName, scrambleTo])

  return (
    <Tag
      className={`inline-block cursor-pointer transition-all duration-300 select-none hover:text-[#0A66C2] ${
        isHighlighted
          ? "scale-[1.02] text-[#0A66C2] [text-shadow:0_0_10px_rgba(10,102,194,0.4)]"
          : ""
      } ${className}`}
      title="Click to reveal full name!"
      onClick={handleClick}
    >
      {displayText}
    </Tag>
  )
}
