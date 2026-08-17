// ── Centralized data for the portfolio ──
// Edit this file to add/remove projects, research items, skills, etc.

export interface ProjectItem {
    title: string;
    href: string;
    badge?: string;
    links: { label: string; href: string }[];
    role: string;
    dateRange: string;
    description: string;
    warning?: string;
}

export interface ResearchItem {
    title: string;
    href?: string;
    role: string;
    dateRange: string;
    description: string;
}

export const PROFILE = {
    shortName: "Vicky",
    fullName: "Venkata Sai Manideep Cherukuri",
    email: "saimanideep.ch12345@gmail.com",
    phone: "+918096368241",
    github: "manideep1428",
    githubUrl: "https://github.com/manideep1428",
    profileImage: "/profile.jpg",
    bio: "I am a Software Development Engineer and AI Safety Researcher. I'm interested in building scalable AI-driven platforms and understanding the safety boundaries of language models. Some recent projects I've worked on:",
    highlights: [
        {
            label: "Kiver",
            text: "Unified desktop mission control & orchestrator for running multiple Claude Code and Codex CLI agents with file locking and live provider switching.",
        },
        {
            label: "lovdaCN",
            text: "shadcn/ui for React Native & Expo. A CLI and component registry delivering customizable mobile UI components with NativeWind and Uniwind.",
        },
        {
            label: "Astron",
            text: "AI-powered browser automation from the terminal. Point and command your browser with natural language.",
        },
    ],
    skills:
        "Python, JavaScript, TypeScript, React.js, Node.js, NextJs, PyTorch, Hugging Face, AWS, and GCP.",
};

export const PROJECTS: ProjectItem[] = [
    {
        title: "Kiver",
        href: "https://github.com/manideep1428/Kiver",
        badge: "Agent Mission Control",
        links: [
            {
                label: "🔗 github",
                href: "https://github.com/manideep1428/Kiver",
            },
        ],
        role: "Developer",
        dateRange: "Feb 2026 – present",
        description:
            "Unified control plane & visual workspace for local AI coding agents (Claude Code & Codex CLI). Coordinates parallel autonomous CLI subagents with deterministic SQLite file locking, zero-loss mid-task provider migration, live xterm.js/node-pty terminal multiplexing, and selective per-agent git rollbacks.",
    },
    {
        title: "lovdaCN",
        href: "https://github.com/lovdacn-ui/ui",
        badge: "shadcn for React Native",
        links: [
            {
                label: "🔗 github",
                href: "https://github.com/lovdacn-ui/ui",
            },
        ],
        role: "Creator & Developer",
        dateRange: "Jan 2026 – present",
        description:
            "A modern component registry and CLI tool for Expo and React Native apps, inspired by shadcn/ui. Delivers copy-paste, highly customizable mobile UI primitives with full source ownership, NativeWind v4 and Uniwind styling, and a Fumadocs documentation site.",
    },
    {
        title: "ImageBridge",
        href: "https://github.com/manideep1428/ImageBridge-",
        badge: "ChatGPT & Gemini API",
        links: [
            {
                label: "🔗 github",
                href: "https://github.com/manideep1428/ImageBridge-",
            },
        ],
        role: "Developer",
        dateRange: "Feb 2026 – present",
        description:
            "A high-throughput AI image generation engine and REST API interfacing directly with ChatGPT's native web image generator and Gemini. Built with stealth browser automation, session management, multi-provider routing, local & Bunny CDN storage pipelines, and a companion Expo mobile app.",
        warning:
            "Uses automated browser sessions. For educational and personal automation only.",
    },
    {
        title: "Astron",
        href: "https://github.com/manideep1428/astron-browser",
        badge: "claude-code for browser",
        links: [
            {
                label: "🔗 github",
                href: "https://github.com/manideep1428/astron-browser",
            },
        ],
        role: "Developer",
        dateRange: "27 Feb 2026 – present",
        description:
            "AI-powered browser automation from the terminal. Point and command your browser with natural language. Features multi-model support, secure API key management, a persistent daemon mode, one-shot modes, and a rich interactive CLI with hot model switching.",
    },
    {
        title: "Niana",
        href: "https://niana.design",
        badge: "Cursor for designers",
        links: [{ label: "🔗 website", href: "https://niana.design" }],
        role: "Developer",
        dateRange: "Jan 2026 – present",
        description:
            "AI-powered mobile UI/UX design studio that converts plain-text app ideas into high-fidelity mobile screens in seconds. Exports generated designs as fully editable Figma files. Included with Subscriptions with Razorpay.",
    },
    {
        title: "Cheat-coder (Cluely)",
        href: "https://github.com/manideep1428/cheat-coder",
        badge: undefined,
        links: [
            {
                label: "🔗 github",
                href: "https://github.com/manideep1428/cheat-coder",
            },
        ],
        role: "Developer",
        dateRange: "Dec 2024 – present",
        description:
            "Developed an undetectable AI assistant clone for interview preparation. Enabled users to leverage their API keys for successful interview outcomes. Conducted extensive testing confirming undetectability by video screening platforms.",
    },
    {
        title: "Astron.ai (Chrome Extension)",
        href: "https://github.com/manideep1428/Astron.ai",
        badge: undefined,
        links: [
            {
                label: "🔗 github",
                href: "https://github.com/manideep1428/Astron.ai",
            },
        ],
        role: "Developer",
        dateRange: "Nov 2024 – Dec 2024",
        description:
            "Created a Chrome extension that uses the Gemini Nano built in with the chrome browser to summarize and rewrite text efficiently.",
    },
];

export const RESEARCH: ResearchItem[] = [
    {
        title: "Long-Term LLM Agent Caregiving Simulation",
        href: "/research/agent-caregiving",
        role: "Research Framework",
        dateRange: "2026",
        description:
            "A 365-day caregiving simulation designed to measure alignment elasticity under sustained, multi-variable adversarial pressure. This framework evaluates whether an LLM maintains its ethical commitments or if its alignment gradually erodes into rationalized neglect.",
    },
    {
        title: "Scalable Oversight for Code Generation",
        role: "Proposed Fellowship Project",
        dateRange: "Coming soon",
        description:
            "Investigated whether LLMs can reliably critique their own code outputs as a scalable oversight mechanism for autonomous programming systems. Tested AI self-review capabilities across coding tasks of varying complexity.",
    },
    {
        title: "Deceptive Alignment Detection",
        role: "Proposed Fellowship Project",
        dateRange: "Coming soon",
        description:
            "Designed evaluation framework to distinguish genuinely aligned AI behavior from strategically deceptive compliance across multiple frontier language models.",
    },
];

export function generatePortfolioMarkdown(): string {
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
        if (p.warning) {
            md += `> ⚠️ **Warning:** ${p.warning}\n\n`
        }
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
