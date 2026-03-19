"use client"

import { useState } from "react"
import ProjectCard from "./ProjectCard"
import ResearchCard from "./ResearchCard"
import { PROJECTS, RESEARCH } from "@/lib/data"

type Tab = "projects" | "research"

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("projects")

  return (
    <>
      {/* Tab buttons */}
      <div className="tabs mb-8 flex justify-center gap-6 border-b border-gray-200 sm:gap-8">
        <button
          className={`cursor-pointer border-b-[3px] border-none bg-transparent px-0 py-2.5 text-base font-semibold transition-all duration-200 sm:text-xl ${
            activeTab === "projects"
              ? "border-b-[#0A66C2] text-[#0A66C2]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`cursor-pointer border-b-[3px] border-none bg-transparent px-0 py-2.5 text-base font-semibold transition-all duration-200 sm:text-xl ${
            activeTab === "research"
              ? "border-b-[#0A66C2] text-[#0A66C2]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("research")}
        >
          Research
        </button>
      </div>

      {/* Projects content */}
      {activeTab === "projects" && (
        <div className="animate-fadeIn">
          <div className="flex flex-col gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Research content */}
      {activeTab === "research" && (
        <div className="animate-fadeIn">
          <div className="flex flex-col gap-8">
            {RESEARCH.map((item) => (
              <ResearchCard key={item.title} research={item} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
