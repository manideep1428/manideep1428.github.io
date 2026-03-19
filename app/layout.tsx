import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Vicky — SDE & AI Safety Researcher",
  description:
    "Portfolio of Venkata Sai Manideep Cherukuri (Vicky) — Software Development Engineer and AI Safety Researcher building scalable AI-driven platforms.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", inter.variable)}
    >
      <body className="m-0 bg-white p-0 font-sans leading-relaxed text-gray-900">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
