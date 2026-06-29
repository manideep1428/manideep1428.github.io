"use client"

import { useState } from "react"
import { generatePortfolioMarkdown } from "@/lib/data"

// ── Real brand SVG icons from Simple Icons ──────────────────────────────────

/** OpenAI / ChatGPT official icon */
const OpenAIIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
)

/** Anthropic / Claude official icon */
const AnthropicIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
  </svg>
)

/** Diagonal ↗ arrow */
const DiagonalArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

// ────────────────────────────────────────────────────────────────────────────

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
  lightMode: boolean
  onShowCopiedToast: () => void
}

const AI_OPTIONS = [
  {
    id: "chatgpt" as const,
    label: "ChatGPT",
    sublabel: "Open & prefill prompt",
    Icon: OpenAIIcon,
    color: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5 hover:bg-emerald-500/10",
      text: "text-emerald-700 dark:text-emerald-400",
      icon: "text-emerald-600 dark:text-emerald-400",
      sub: "text-emerald-600/60 dark:text-emerald-400/60",
    },
  },
  {
    id: "claude" as const,
    label: "Claude",
    sublabel: "Open & prefill prompt",
    Icon: AnthropicIcon,
    color: {
      border: "border-amber-500/20",
      bg: "bg-amber-500/5 hover:bg-amber-500/10",
      text: "text-amber-700 dark:text-amber-400",
      icon: "text-amber-600 dark:text-amber-400",
      sub: "text-amber-600/60 dark:text-amber-400/60",
    },
  },
]

export default function ChatDialog({
  isOpen,
  onClose,
  lightMode,
  onShowCopiedToast,
}: ChatDialogProps) {
  const [mdCopied, setMdCopied] = useState(false)

  if (!isOpen) return null

  const handleAction = (option: "chatgpt" | "claude" | "copy") => {
    const md = generatePortfolioMarkdown()
    navigator.clipboard.writeText(md)
    onShowCopiedToast()

    if (option === "copy") {
      // Show "Copied!" for 2s, then reset — don't close dialog
      setMdCopied(true)
      setTimeout(() => setMdCopied(false), 2000)
      return
    }

    const promptText = `Here is Vicky's portfolio markdown. Please help me review it and chat about their work:\n\n${md}`
    if (option === "chatgpt") {
      window.open(`https://chatgpt.com/?q=${encodeURIComponent(promptText)}`, "_blank")
    } else if (option === "claude") {
      window.open(`https://claude.ai/new?q=${encodeURIComponent(promptText)}`, "_blank")
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-sm rounded-2xl shadow-2xl animate-fadeIn ${
          lightMode
            ? "bg-zinc-950 border border-zinc-800 text-white"
            : "bg-white border border-gray-100 text-gray-900"
        }`}
      >
        {/* Header */}
        <div className={`px-6 pt-6 pb-5 border-b ${lightMode ? "border-zinc-800" : "border-gray-100"}`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Chat with AI</h3>
              <p className={`text-sm mt-1 ${lightMode ? "text-zinc-400" : "text-gray-500"}`}>
                Vicky&apos;s portfolio is copied to your clipboard and prefilled in the prompt.
              </p>
            </div>
            <button
              onClick={onClose}
              className={`ml-4 mt-0.5 p-1.5 rounded-lg transition-colors cursor-pointer ${
                lightMode ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-gray-100 text-gray-400"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* AI Options */}
        <div className="px-4 py-4 flex flex-col gap-2">
          {AI_OPTIONS.map(({ id, label, sublabel, Icon, color }) => (
            <button
              key={id}
              onClick={() => handleAction(id)}
              className={`group flex items-center justify-between w-full px-4 py-3.5 rounded-xl border transition-all cursor-pointer ${color.border} ${color.bg}`}
            >
              <div className={`flex items-center gap-3 font-semibold text-sm ${color.text}`}>
                <Icon className={`w-[18px] h-[18px] shrink-0 transition-transform group-hover:scale-110 ${color.icon}`} />
                {label}
              </div>
              <div className={`flex items-center gap-1 text-xs font-normal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${color.sub}`}>
                {sublabel}
                <DiagonalArrowIcon className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>

        {/* Copy Raw MD footer */}
        <div className="px-4 pb-4">
          <button
            onClick={() => handleAction("copy")}
            className={`w-full py-3 rounded-xl border border-dashed text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              mdCopied
                ? lightMode
                  ? "border-emerald-600 text-emerald-400 bg-emerald-950/40"
                  : "border-emerald-500 text-emerald-600 bg-emerald-50"
                : lightMode
                  ? "border-zinc-700 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            {mdCopied ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy as MD
                <span className={`text-xs font-normal ${lightMode ? "text-zinc-600" : "text-gray-400"}`}>(for agents)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
