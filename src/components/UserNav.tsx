import Link from "next/link";
import { getCurrentUser } from "@/utils/session";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/atoms/DropdownMenu";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "./UserAvatar";
export default async function UserNav() {
    const user = await getCurrentUser();
    const t = await getTranslations("UserNav");

    if (user == undefined) {
    return (
      <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: null, image: null }}
          className="h-8 w-8"
        />
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
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm ">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
                  <Link href="/dashboard">{t("dashboard")}</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild className="cursor-not-allowed opacity-80">
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-not-allowed opacity-80">
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem
          onSelect={(event: { preventDefault: () => void; }) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          {t("logout")}
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}