"use client"
import Link from "next/link"
import { Session, User } from "next-auth"
import { signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/DropdownMenu"
import { UserAvatar } from "@/components/UserAvatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email"> | undefined
}

export function UserAccountNav({ session }: {session: Session | null}) {
  if (session == undefined) {
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
          <Link href="/login">Logowanie</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
          <Link href="/register">Rejestracja</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: session.user.name || null, image: session.user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {session.user.name && <p className="font-medium">{session.user.name}</p>}
            {session.user.email && (
              <p className="w-[200px] truncate text-sm ">
                {session.user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild className="cursor-not-allowed opacity-80">
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-not-allowed opacity-80">
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}