"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { LuLoaderCircle, LuSearch } from "react-icons/lu"

import { Input } from "@/components/ui/Input"

export function Search(props: { value?: string }) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(props.value)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const t = useTranslations("AdminUsers")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (value === undefined) {
      return
    } else if (value) {
      params.set("q", value)
    } else {
      params.delete("q")
    }

    startTransition(() => {
      // All navigations are transitions automatically
      // But wrapping this allow us to observe the pending state
      router.replace(`${pathname}/?${params.toString()}`)
    })
  }, [router, value, pathname])

  return (
    <div className="relative w-full">
      <LuSearch className="absolute left-2.5 top-2.5 size-4 text-gray-500" />
      <Input
        ref={inputRef}
        value={value ?? ""}
        onInput={(e) => {
          setValue(e.currentTarget.value)
        }}
        spellCheck={false}
        className="w-full appearance-none pl-8 shadow-none"
        placeholder={t("searchUsers")}
      />
      {isPending && <LuLoaderCircle className="absolute right-2.5 top-2.5 animate-spin" />}
    </div>
  )
}
