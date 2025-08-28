// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "../app/provider"   // ← client-only wrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CITIL - Chennai Institute of Technology Business Incubation Forum",
  description: "Empowering the next generation of entrepreneurs and innovators",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
