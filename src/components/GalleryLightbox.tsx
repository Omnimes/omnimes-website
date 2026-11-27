"use client"

// BO-1441: enlarged photo view for the gallery. The grid itself is rendered on the
// server as plain links to the full-size files (works without JavaScript); this
// component intercepts clicks on links marked with data-gallery-event/-index.
import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"

export type LightboxPhoto = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

type Labels = {
  dialog: string
  close: string
  next: string
  prev: string
  /** Template with {index} and {total} */
  counter: string
}

type Open = { event: string; index: number } | null

export function GalleryLightbox({
  photos,
  labels,
}: {
  photos: Record<string, LightboxPhoto[]>
  labels: Labels
}) {
  const [open, setOpen] = useState<Open>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const list = open ? (photos[open.event] ?? []) : []
  const total = list.length
  const current = open ? list[open.index] : undefined

  const close = useCallback(() => {
    setOpen(null)
    returnFocus.current?.focus()
  }, [])

  const move = useCallback(
    (step: number) =>
      setOpen((prev) => {
        if (!prev) return prev
        const count = photos[prev.event]?.length ?? 0
        if (!count) return prev
        return { ...prev, index: (prev.index + step + count) % count }
      }),
    [photos]
  )

  // Open on click of a gallery link (event delegation, one listener).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "a[data-gallery-event]"
      )
      if (!link) return
      const event = link.dataset.galleryEvent
      const index = Number(link.dataset.galleryIndex)
      if (!event || !photos[event] || Number.isNaN(index)) return
      e.preventDefault()
      returnFocus.current = link
      setOpen({ event, index })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [photos])

  const isOpen = open !== null

  // Keyboard, focus and page scroll while open.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") move(1)
      else if (e.key === "ArrowLeft") move(-1)
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        const buttons = Array.from(dialogRef.current?.querySelectorAll("button") ?? [])
        if (!buttons.length) return
        const i = buttons.indexOf(document.activeElement as HTMLButtonElement)
        const next = e.shiftKey ? (i <= 0 ? buttons.length - 1 : i - 1) : (i + 1) % buttons.length
        e.preventDefault()
        buttons[next].focus()
      }
    }
    document.addEventListener("keydown", onKey)
    // click on the dark background (not on the photo or buttons) closes the view
    const dialog = dialogRef.current
    const onBackdrop = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.hasAttribute("data-lightbox-backdrop")) close()
    }
    dialog?.addEventListener("click", onBackdrop)
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      dialog?.removeEventListener("click", onBackdrop)
      document.body.style.overflow = overflow
    }
  }, [isOpen, close, move])

  if (!open || !current) return null

  const counter = labels.counter
    .replace("{index}", String(open.index + 1))
    .replace("{total}", String(total))
  const button =
    "flex size-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      data-lightbox-backdrop
      className="fixed inset-0 z-[200] flex flex-col bg-black/90 p-4"
    >
      <div className="flex items-center justify-between text-sm text-neutral-300">
        <span aria-live="polite">{counter}</span>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label={labels.close}
          className={button}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <figure
        data-lightbox-backdrop
        className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-3 py-3"
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          unoptimized
          className="max-h-[calc(100vh-11rem)] w-auto max-w-full rounded-md object-contain"
        />
        <figcaption className="max-w-3xl text-center text-sm text-neutral-200">
          {current.caption}
        </figcaption>
      </figure>

      {total > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label={labels.prev}
            className={button}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" onClick={() => move(1)} aria-label={labels.next} className={button}>
            <span aria-hidden="true">›</span>
          </button>
        </div>
      )}
    </div>
  )
}
