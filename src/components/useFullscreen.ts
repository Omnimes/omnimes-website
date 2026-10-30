"use client"

import { RefObject, useCallback, useEffect, useState } from "react"

/** Pełny ekran dla animacji. Na iPhone przeglądarka nie obsługuje go dla zwykłych elementów. */
export function useFullscreen(target: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setSupported(document.fullscreenEnabled)
    const onChange = () => setActive(document.fullscreenElement === target.current)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [target])

  const toggle = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else target.current?.requestFullscreen()
  }, [target])

  return { active, supported, toggle }
}
