"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LogoAdaptiveProps {
  width?: number
  height?: number
  className?: string
}

export function LogoAdaptive({ width = 120, height = 40, className }: LogoAdaptiveProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div style={{ width, height: 40 }} className="rounded bg-muted/30 animate-pulse" />
  }

  return (
    <Image
      src="/logo-inboat.svg"
      alt="InBoat"
      width={width}
      height={height}
      className={cn(
        "h-10 w-auto transition-all",
        resolvedTheme === "dark" ? "brightness-0 invert" : "",
        className
      )}
      priority
    />
  )
}
