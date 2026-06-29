"use client"

import { useState, useRef } from "react"
import NameScramble from "./NameScramble"
import ChatDialog from "./ChatDialog"
import { PROFILE, generatePortfolioMarkdown } from "@/lib/data"

// ── Real brand SVG icons from Simple Icons ──────────────────────────────────


const OpenAIIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
)

const AnthropicIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
  </svg>
)


const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
)

const DiagonalArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
)

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 200)
  }

  const handleChatOption = (option: "chatgpt" | "claude" | "gemini" | "copy") => {
    const md = generatePortfolioMarkdown()
    navigator.clipboard.writeText(md)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)

    const promptText = `Here is Vicky's portfolio markdown. Please help me review it and chat about their work:\n\n${md}`

    if (option === "chatgpt") {
      window.open(`https://chatgpt.com/?q=${encodeURIComponent(promptText)}`, "_blank")
    } else if (option === "claude") {
      window.open(`https://claude.ai/new?q=${encodeURIComponent(promptText)}`, "_blank")
    } else if (option === "gemini") {
      window.open("https://gemini.google.com/app", "_blank")
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full flex flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:justify-center sm:gap-0 sm:px-10 transition-all duration-300 ${lightMode
          ? "!z-[9999] bg-black/40 backdrop-blur-md text-white"
          : "bg-white/70 backdrop-blur-md text-gray-900"
          }`}
      >
        {/* Name / Logo */}
        <div className="sm:absolute sm:left-10 sm:top-1/2 sm:-translate-y-1/2">
          <NameScramble
            shortName={PROFILE.shortName}
            fullName={PROFILE.fullName}
            className={`text-base md:text-lg font-semibold whitespace-nowrap ${lightMode ? "!text-white" : ""
              }`}
          />
        </div>

        {/* Mode toggles */}
        <div className="flex gap-5 text-sm text-gray-500">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onToggleLight()
            }}
            className={`font-medium no-underline transition-colors ${lightMode
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
            className={`font-medium no-underline transition-colors ${lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
              }`}
          >
            {agentMode ? "Human" : "For Agents"}
          </a>
        </div>

        {/* Nav links */}
        <div className="sm:absolute sm:right-10 sm:top-1/2 sm:-translate-y-1/2 flex gap-5 text-sm text-gray-500">
          {/* <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className={`font-medium no-underline transition-colors ${lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
              }`}
          >
            Home
          </a> */}
          {/* <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium no-underline transition-colors ${lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
              }`}
          >
            GitHub
          </a> */}

          {/* Chat with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setIsModalOpen(true)
              }}
              className={`font-medium no-underline transition-colors flex items-center gap-1 ${lightMode
                ? "text-white hover:text-blue-300"
                : "text-gray-900 hover:text-[#0A66C2]"
                }`}
            >
              Chat
              <ChevronDownIcon
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isHovered ? "rotate-180" : ""}`}
              />
            </a>

            {isHovered && (
              <div
                className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-lg py-1.5 z-50 border transition-all animate-fadeIn ${lightMode
                  ? "bg-zinc-950/95 border-zinc-800 text-white"
                  : "bg-white/95 backdrop-blur-md border-gray-100 text-gray-900"
                  }`}
              >
                <button
                  onClick={() => handleChatOption("chatgpt")}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between gap-2.5 transition-colors cursor-pointer group ${lightMode
                    ? "text-zinc-300 hover:bg-zinc-800"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <OpenAIIcon className={`w-4 h-4 ${lightMode ? "text-emerald-400" : "text-emerald-600"}`} />
                    ChatGPT
                  </span>
                  <DiagonalArrowIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 text-emerald-500 transition-opacity" />
                </button>
                <button
                  onClick={() => handleChatOption("claude")}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between gap-2.5 transition-colors cursor-pointer group ${lightMode
                    ? "text-zinc-300 hover:bg-zinc-800"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <AnthropicIcon className={`w-4 h-4 ${lightMode ? "text-amber-400" : "text-amber-600"}`} />
                    Claude
                  </span>
                  <DiagonalArrowIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity" />
                </button>
                <div className={`border-t my-1 ${lightMode ? "border-zinc-800" : "border-gray-100"}`}></div>
                <button
                  onClick={() => handleChatOption("copy")}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2.5 transition-colors cursor-pointer font-medium ${lightMode
                    ? "text-zinc-200 hover:bg-zinc-800"
                    : "text-gray-800 hover:bg-gray-100"
                    }`}
                >
                  <ClipboardIcon className="w-4 h-4 text-gray-500" />
                  Copy as MD
                </button>
              </div>
            )}
          </div>

          {/* <a
            href={`mailto:${PROFILE.email}`}
            className={`font-medium no-underline transition-colors ${lightMode
              ? "text-white hover:text-blue-300"
              : "text-gray-900 hover:text-[#0A66C2]"
              }`}
          >
            Contact
          </a> */}
        </div>
      </header>

      {/* Modal Dialog */}
      <ChatDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lightMode={lightMode}
        onShowCopiedToast={() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2500)
        }}
      />

      {/* Copy Toast Notification */}
      {copied && (
        <div className="fixed bottom-5 right-5 z-[99999] bg-emerald-600/90 backdrop-blur text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-emerald-500/20 text-sm font-semibold animate-fadeIn">
          <span className="text-base">✓</span>
          <span>Copied portfolio to clipboard!</span>
        </div>
      )}
    </>
  )
}
