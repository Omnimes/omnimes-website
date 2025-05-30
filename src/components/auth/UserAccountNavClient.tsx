"use client"

import Link from "next/link"
import { Skeleton } from "@nextui-org/react"
import { User } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import { useTranslations } from "next-intl"

import { getSubNav } from "@/lib/getSubNav"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

import { UserAvatar } from "../UserAvatar"

export interface MyUser extends User {
  role: string
}

export function UserAccountNavClient() {
  const { status, data: session } = useSession()
  const user: Pick<MyUser, "name" | "image" | "email" | "role"> | undefined = session?.user
  const t = useTranslations("DropdownNav")

  if (status == "loading" && user == undefined) {
    return <Skeleton className="size-7 rounded" />
  }
  if (user == undefined) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t("DropDownTriggerUserUndefined")}
          aria-labelledby={t("DropDownTriggerUserUndefined")}
          title={t("DropDownTriggerUserUndefined")}
          role="button"
        >
          <UserAvatar user={{ name: null, image: null }} className="size-7" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/login">{t("login")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/register">{t("register")}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("DropDownTriggerUser")}
        aria-labelledby={t("DropDownTriggerUser")}
        title={t("DropDownTriggerUser")}
        role="button"
      >
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="size-7"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="text-foreground-400 w-[200px] truncate text-sm">{user.email}</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {getSubNav(user.role).map((item) => {
          if (item.separator) {
            return <DropdownMenuSeparator key={item.title} />
          }
          return (
            <DropdownMenuItem asChild key={item.title}>
              <Link href={item.href}>{t(item.title)}</Link>
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
