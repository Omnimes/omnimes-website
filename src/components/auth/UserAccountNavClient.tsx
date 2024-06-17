"use client"
import Link from "next/link"
import { User } from "next-auth"
import { signOut, useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/DropdownMenu"
import { UserAvatar } from "@/utils/UserAvatar"
import {Skeleton} from "@nextui-org/react";

export function UserAccountNavClient() {
  const { status, data: session } = useSession(); 
  const user: Pick<User, "name" | "image" | "email"> | undefined = session?.user
 if(status == 'loading' && user == undefined) {
    return (<Skeleton className="w-7 h-7 rounded"/>)
 }
  if (user == undefined) {
    return (
      <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: null, image: null }}
          className="h-7 w-7"
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
          user={{ name: user.name || null, image: user.image || null }}
          className="h-7 w-7"
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