"use client"

// BO-1439: the only interactive part of the OmniEnergy page — a screenshot
// that opens enlarged in a dialog. The rest of the page renders on the server.
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type Props = {
  src: string
  alt: string
  width: number
  height: number
  sizes: string
  zoomLabel: string
  closeLabel: string
  priority?: boolean
  className?: string
}

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  sizes,
  zoomLabel,
  closeLabel,
  priority,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${zoomLabel}: ${alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
          <svg
            aria-hidden="true"
            className="size-14 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          {/* Klik w tło zamyka podgląd (przycisk zamiast onClick na div — reguły a11y) */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 cursor-zoom-out"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-7xl">
            <button
              type="button"
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
            >
              <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="100vw"
              className="h-auto max-h-[85vh] w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
