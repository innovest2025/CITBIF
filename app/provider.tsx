// app/providers.tsx
"use client"

import { useEffect, useState, ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Until hydration, render children "unstyled" so SSR = CSR
  if (!mounted) {
    return <>{children}</>
  }

  // After mount, apply your theme provider
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  )
}
