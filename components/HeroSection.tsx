import NameScramble from "./NameScramble"
import { PROFILE } from "@/lib/data"

export default function HeroSection() {
  return (
    <section className="mb-12 text-center">
      <NameScramble
        shortName={PROFILE.shortName}
        fullName={PROFILE.fullName}
        as="h1"
        className="mb-4 w-full text-2xl font-semibold sm:text-3xl"
      />
      <div className="text-xs text-gray-900 sm:text-sm">
        Email:{" "}
        <a href={`mailto:${PROFILE.email}`} className="text-gray-900 underline">
          {PROFILE.email}
        </a>
        <span className="hidden sm:inline"> | </span>
        <br className="sm:hidden" />
        Phone: {PROFILE.phone}
        <span className="hidden sm:inline"> | </span>
        <br className="sm:hidden" />
        GitHub:{" "}
        <a
          href={PROFILE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 underline"
        >
          @{PROFILE.github}
        </a>
      </div>
    </section>
  )
}
