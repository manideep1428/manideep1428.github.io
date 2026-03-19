import type { ProjectItem } from "@/lib/data"

interface ProjectCardProps {
  project: ProjectItem
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex flex-wrap items-center gap-y-1">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-black underline sm:text-lg"
        >
          {project.title}
        </a>

        {project.badge && (
          <span className="ml-3 inline-block rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
            {project.badge}
          </span>
        )}

        {project.links.length > 0 && (
          <span className="ml-2 inline-flex gap-1 text-xs text-gray-500 sm:text-sm">
            [{" "}
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 no-underline hover:underline"
              >
                {link.label}
              </a>
            ))}{" "}
            ]
          </span>
        )}
      </div>

      <div className="text-sm text-gray-900">
        <b className="font-semibold">{project.role}</b>
      </div>
      <div className="mb-1.5 text-xs text-gray-500 italic sm:text-sm">
        {project.dateRange}
      </div>
      <div className="mt-1 text-sm leading-snug text-gray-900">
        {project.description}
      </div>
    </div>
  )
}
