import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar"
import { LuUser } from "react-icons/lu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}
export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <LuUser className="size-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
