"use client"

import { useEffect, useRef, useState } from "react"
import { PROFILE, PROJECTS, RESEARCH } from "@/lib/data"

function generateMarkdown(): string {
  let md = `# ${PROFILE.shortName}\n\n`
  md += `Email: ${PROFILE.email} | Phone: ${PROFILE.phone} | GitHub: @${PROFILE.github}\n\n---\n\n`
  md += `## About\n\n${PROFILE.bio}\n\n`

  PROFILE.highlights.forEach((h) => {
    md += `- **${h.label}:** ${h.text}\n`
  })

  md += `\n**Skills:** ${PROFILE.skills}\n\n---\n\n`
  md += `## Projects\n\n`

  PROJECTS.forEach((p) => {
    const link = p.href ? ` ([link](${p.href}))` : ""
    md += `### ${p.title}${link}\n`
    md += `**${p.role}** — _${p.dateRange}_\n\n`
    md += `${p.description}\n\n`
  })

  md += `---\n\n## Research\n\n`
  md += `> Coming soon...\n\n`

  RESEARCH.forEach((r) => {
    md += `### ${r.title}\n`
    md += `**${r.role}** — _${r.dateRange}_\n\n`
    md += `${r.description}\n\n`
  })

  return md
}

export default function AgentView() {
  const [displayText, setDisplayText] = useState("")
  const fullText = useRef(generateMarkdown())

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
