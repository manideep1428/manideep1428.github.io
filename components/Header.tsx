"use client"

import NameScramble from "./NameScramble"
import { PROFILE } from "@/lib/data"

interface HeaderProps {
  lightMode: boolean
  agentMode: boolean
  onToggleLight: () => void
  onToggleAgents: () => void
}

export default function Header({
  lightMode,
  agentMode,
  onToggleLight,
  onToggleAgents,
}: HeaderProps) {
  return (
    <header
      className={`flex flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:gap-0 sm:px-10 ${
        lightMode ? "relative z-[9999]" : ""
      }`}
    >
      {/* Name / Logo */}
      <NameScramble
        shortName={PROFILE.shortName}
        fullName={PROFILE.fullName}
        className={`text-lg font-semibold ${lightMode ? "!text-white" : ""}`}
      />

      {/* Mode toggles */}
      <div className="flex gap-5 text-sm text-gray-500">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onToggleLight()
          }}
          className={`font-medium no-underline transition-colors ${
            lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
          }`}
        >
          {lightMode ? "For Millennial's" : "For Gen'z"}
        </a>
        <span className={`-mx-2.5 ${lightMode ? "text-white" : ""}`}>·</span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onToggleAgents()
          }}
          className={`font-medium no-underline transition-colors ${
            lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
          }`}
        >
          {agentMode ? "Human" : "For Agents"}
        </a>
      </div>

      {/* Nav links */}
      <div className="flex gap-5 text-sm text-gray-500">
        <a
          href="#"
          className={`font-medium no-underline transition-colors ${
            lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
          }`}
        >
          Home
        </a>
        <span className={`-mx-2.5 ${lightMode ? "text-white" : ""}`}>·</span>
        <a
          href={PROFILE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-medium no-underline transition-colors ${
            lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
          }`}
        >
          GitHub
        </a>
        <span className={`-mx-2.5 ${lightMode ? "text-white" : ""}`}>·</span>
        <a
          href={`mailto:${PROFILE.email}`}
          className={`font-medium no-underline transition-colors ${
            lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
          }`}
        >
          Contact
        </a>
      </div>
    </header>
  )
}
