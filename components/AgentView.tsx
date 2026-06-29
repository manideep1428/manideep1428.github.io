"use client"

import { useEffect, useRef, useState } from "react"
import { generatePortfolioMarkdown } from "@/lib/data"

export default function AgentView() {
  const [displayText, setDisplayText] = useState("")
  const fullText = useRef(generatePortfolioMarkdown())

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      const chunk = fullText.current.substring(
        i,
        Math.min(i + 3, fullText.current.length)
      )
      setDisplayText((prev) => prev + chunk)
      i += 3
      if (i >= fullText.current.length) clearInterval(interval)
    }, 8)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono text-sm break-words whitespace-pre-wrap">
      {displayText}
    </div>
  )
}
