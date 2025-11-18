import "@/styles/globals.css"
import { Inter } from 'next/font/google'
import type React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LandChain - Blockchain Land Registry",
  description: "Immutable blockchain-based land ownership verification system",
  icons: { icon: "/favicon.ico" },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#1a1f35",
  width: "device-width",
  initialScale: 1,
}

import Loading from "./loading"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/wallet">Wallet</Link>
            </nav>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
