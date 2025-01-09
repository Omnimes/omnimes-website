"use client"

import { useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { LuLoaderCircle } from "react-icons/lu"

import { Button } from "@/components/ui/Button"

type Props = {
  offset: number | null
  prevOffset: number | null
  totalUsers: number | null
}
export const UserTableActions = ({ offset, prevOffset, totalUsers }: Props) => {
  const t = useTranslations("AdminUsers")
  const [isPending, startTransition] = useTransition()
  const [activeButton, setActiveButton] = useState<"prev" | "next" | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    setActiveButton("next")
    startTransition(() => {
      router.replace(`${pathname}/?offset=${offset}`)
    })
  }
  function onClickPrev(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    setActiveButton("prev")
    startTransition(() => {
      router.replace(`${pathname}/?offset=${prevOffset}`)
    })
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 space-x-2 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        {t("allUsers")}: {totalUsers}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          className="w-fit"
          variant="primary"
          aria-label={t("prev")}
          aria-labelledby={t("prev")}
          title={t("prev")}
          role="button"
          disabled={
            prevOffset == null || Number(offset) == 1 || (isPending && activeButton === "next")
          }
          onClick={(e) => onClickPrev(e)}
        >
          <span className="flex items-center gap-2">
            {isPending && activeButton === "prev" && <LuLoaderCircle className="animate-spin" />}
            {t("prev")}
          </span>
        </Button>
        <Button
          className="w-fit"
          variant="primary"
          aria-label={t("next")}
          aria-labelledby={t("next")}
          title={t("next")}
          role="button"
          disabled={offset == null || (isPending && activeButton === "prev")}
          onClick={(e) => onClick(e)}
        >
          <span className="flex items-center gap-2">
            {isPending && activeButton === "next" && <LuLoaderCircle className="animate-spin" />}
            {t("next")}
          </span>
        </Button>
      </div>
    </div>
  )
}
