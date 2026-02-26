import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "InBoat — Multipropriedade Náutica de Luxo",
  description:
    "Plataforma de multipropriedade de embarcações de alto padrão. Realize o sonho de ter sua própria lancha com investimento acessível e gestão profissional.",
  keywords: "multipropriedade, time share náutico, lanchas, iates, compartilhamento náutico, marina, embarcações de luxo",
}

export const viewport: Viewport = {
  themeColor: "#1a2035",
  initialScale: 1,
  width: "device-width",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased ${outfit.variable} ${playfair.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
