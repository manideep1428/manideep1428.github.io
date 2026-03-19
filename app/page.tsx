"use client"

import { useState } from "react"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import BioSection from "@/components/BioSection"
import TabsSection from "@/components/TabsSection"
import FlashlightCanvas from "@/components/FlashlightCanvas"
import AgentView from "@/components/AgentView"

export default function Page() {
  const [lightMode, setLightMode] = useState(false)
  const [agentMode, setAgentMode] = useState(false)

  return (
    <>
      {/* Flashlight overlay */}
      <FlashlightCanvas active={lightMode} />

      {/* Header */}
      <Header
        lightMode={lightMode}
        agentMode={agentMode}
        onToggleLight={() => setLightMode((prev) => !prev)}
        onToggleAgents={() => setAgentMode((prev) => !prev)}
      />

      {/* Main content */}
      <main className="mx-auto max-w-[850px] px-5 py-10">
        {agentMode ? (
          <AgentView />
        ) : (
          <>
            <HeroSection />
            <BioSection />
            <TabsSection />
          </>
        )}
      </main>
    </>
  )
}
