import type { ResearchItem } from "@/lib/data"

interface ResearchCardProps {
  research: ResearchItem
}

export default function ResearchCard({ research }: ResearchCardProps) {
  return (
    <div
      className={`mb-2 ${research.dateRange === "Coming soon" ? "pointer-events-none opacity-30" : ""}`}
    >
      <div className="mb-1">
        {research.href ? (
          <a
            href={research.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-blue-500 underline sm:text-lg"
          >
            {research.title}
          </a>
        ) : (
          <span className="text-base font-semibold text-black underline sm:text-lg">
            {research.title}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-900">
        <b className="font-semibold">{research.role}</b>
      </div>
      <div className="mb-1.5 text-xs text-gray-500 italic sm:text-sm">
        {research.dateRange}
      </div>
      <div className="mt-1 text-sm leading-snug text-gray-900">
        {research.description}
      </div>
    </div>
  )
}
