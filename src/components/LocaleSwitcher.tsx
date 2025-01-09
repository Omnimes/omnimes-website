"use client"

import { ChangeEvent, useTransition } from "react"
import { useParams } from "next/navigation"
import { Avatar, Select, SelectItem, Spinner } from "@nextui-org/react"
import { useLocale, useTranslations } from "next-intl"

import { locales } from "../config"
import { usePathname, useRouter } from "../navigation"

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher")
  const locale = useLocale()

  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <Select
      size="sm"
      className="w-[110px]"
      selectionMode={"single"}
      aria-label={"Select a country"}
      aria-labelledby={"Select a country"}
      labelPlacement="outside-left"
      defaultSelectedKeys={[locale]}
      startContent={isPending ? <Spinner size="sm" labelColor="danger" color="danger" /> : null}
      popoverProps={{ classNames: { content: "min-w-[155px]" }, placement: "bottom-start" }}
      onChange={(e) => onSelectChange(e)}
      isDisabled={isPending}
    >
      {locales.map((cur) => (
        <SelectItem
          key={cur}
          startContent={
            <Avatar
              alt={t("locale", { locale: cur })}
              className="h-4 !w-4"
              src={
                cur == "en" ? `https://flagcdn.com/gb-eng.svg` : `https://flagcdn.com/${cur}.svg`
              }
            />
          }
        >
          {t("locale", { locale: cur })}
        </SelectItem>
      ))}
    </Select>
  )
}
