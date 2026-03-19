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
            label: "Astron",
            text: "AI-powered browser automation from the terminal. Point and command your browser with natural language.",
        },
        {
            label: "Niana",
            text: "An AI-powered mobile UI/UX design studio that converts plain-text app ideas into high-fidelity mobile screens.",
        },
        {
            label: "AI Safety Research",
            text: "Investigated prompt injection defenses, mechanistic interpretability, and deceptive alignment in language models.",
        },
    ],
    skills:
        "Python, JavaScript, TypeScript, React.js, Node.js, NextJs, PyTorch, Hugging Face, AWS, and GCP.",
};

export const PROJECTS: ProjectItem[] = [
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
