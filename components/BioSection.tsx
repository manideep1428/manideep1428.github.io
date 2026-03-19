import Image from "next/image"
import { PROFILE } from "@/lib/data"

export default function BioSection() {
  return (
    <section className="mb-16 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
      <Image
        src={PROFILE.profileImage}
        alt={PROFILE.shortName}
        width={200}
        height={200}
        className="h-40 w-40 shrink-0 rounded border border-dashed border-gray-300 bg-gray-100 object-cover sm:h-[200px] sm:w-[200px]"
        priority
      />

      <div className="flex-grow text-sm sm:text-[0.95rem]">
        <p className="mt-0 mb-4">{PROFILE.bio}</p>
        <ul className="mt-1 mb-4 list-disc pl-5">
          {PROFILE.highlights.map((h) => (
            <li key={h.label} className="mb-2">
              <strong>{h.label}:</strong> {h.text}
            </li>
          ))}
        </ul>
        <p className="mt-0 mb-4">
          <strong>Skills:</strong> {PROFILE.skills}
        </p>
      </div>
    </section>
  )
}
