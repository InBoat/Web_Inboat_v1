"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface GalleryClientProps {
  images: string[]
  nome: string
  destaque?: boolean
}

export function GalleryClient({ images, nome, destaque }: GalleryClientProps) {
  const [selected, setSelected] = useState(0)

  const displayImages = images.length > 0
    ? images
    : ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800",
       "/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"]

  return (
    <div className="space-y-3">
      <div className="relative h-[380px] md:h-[460px] rounded-lg overflow-hidden bg-muted">
        <Image
          src={displayImages[selected] || "/placeholder.svg"}
          alt={nome}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
            {nome}
          </h1>
          {destaque && (
            <Badge className="bg-primary/90 text-primary-foreground text-xs font-semibold border-0">
              Destaque
            </Badge>
          )}
        </div>
      </div>

      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {displayImages.slice(0, 4).map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`relative h-20 rounded overflow-hidden bg-muted border-2 transition-all ${
                selected === index ? "border-primary" : "border-transparent hover:border-border"
              }`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${nome} - foto ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
