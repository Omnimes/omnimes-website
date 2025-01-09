"use client"

import { useEffect, useState } from "react"
import {
  deleteAllNotificationOfUser,
  getNotifications,
  markAsRead,
  markAsReadAllNotification,
} from "@/actions/notification"
import { cn } from "@/utils/utils"
import { useSession } from "next-auth/react"
import { useLocale, useTranslations } from "next-intl"
import { useTimeAgo } from "next-timeago"
import { HiOutlineBellAlert } from "react-icons/hi2"
import { LuCheck, LuLoaderCircle, LuTrash2 } from "react-icons/lu"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"

import { MyUser } from "./auth/UserAccountNavClient"
import { Button } from "./ui/Button"
import { ScrollArea } from "./ui/ScrollArea"
import { Separator } from "./ui/Separator"
import { Skeleton } from "./ui/Skeleton"

type DataNotification = {
  id: string
  userId: string
  userNameCreator: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: Date
}[]

interface Notification {
  status: number
  data: DataNotification
  message?: string | undefined
  error?: string | undefined
}

export const Notification = () => {
  const t = useTranslations("Notification")
  const { status, data: session } = useSession()
  const user: Pick<MyUser, "id" | "name" | "image" | "email" | "role"> | undefined = session?.user
  const [notifications, setNotifications] = useState<DataNotification>([])
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const { TimeAgo } = useTimeAgo()
  const locale = useLocale()

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        try {
          const res: Notification = await getNotifications(user.id)
          const howManyNotificationisUnRead = res.data.filter((item) => !item.isRead)
          setCount(howManyNotificationisUnRead.length)
          setNotifications(res.data)
        } catch (error) {
          console.error("Error fetching notifications:", error)
        }
      }
    }

    fetchNotifications()
  }, [user])

  if (status == "loading" && user == undefined) {
    return <Skeleton className="size-7 rounded" />
  }

  if (user == undefined) return null

  const markRead = async (id: string) => {
    const res = await markAsRead(id)

    if (res && res.updatedNotification) {
      const updatedNotifications = notifications.map((item) => {
        if (item.id === res.updatedNotification.id) {
          return { ...item, ...res.updatedNotification }
        }
        return item
      })

      setNotifications(updatedNotifications)
      const howManyNotificationisUnRead = updatedNotifications.filter((item) => !item.isRead)
      setCount(howManyNotificationisUnRead.length)
    }
  }

  const loadMore = async () => {
    setLoading(true)
    if (user) {
      const res: Notification = await getNotifications(user.id, page)

      if (res.data.length === 0) {
        setHasMore(false)
      } else {
        setNotifications((prev) => [...prev, ...res.data])
        const howManyNotificationisUnRead = [...notifications, ...res.data].filter(
          (item) => !item.isRead
        )
        setCount(howManyNotificationisUnRead.length)
        setPage((prev) => prev + 1)
      }
    }
    setLoading(false)
  }

  const deleteAll = async () => {
    if (user) {
      await deleteAllNotificationOfUser(user.id)
      setCount(0)
      setPage(1)
      setNotifications([])
      setHasMore(false)
    }
  }

  const allRead = async () => {
    setLoading(true)
    if (user) {
      const allRead = notifications.map((item) => {
        return {
          ...item,
          isRead: true,
        }
      })

      setNotifications(allRead)
      setCount(0)
      await markAsReadAllNotification(user.id)
    }
    setLoading(false)
  }

  return (
    <li className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger>
          <div className="relative">
            <HiOutlineBellAlert className="size-6" />
            {count > 0 && (
              <div className="absolute -right-1 bottom-[-2px] z-20 size-3 rounded-full bg-blue-500">
                <span
                  className={cn(
                    count >= 10 && "text-[10px]",
                    "absolute left-1 text-[8px] text-white"
                  )}
                >
                  {count >= 10 ? "+" : count}
                </span>
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent align="end">
          {notifications.length ? (
            <div>
              <ScrollArea className="h-[350px] rounded-md pb-4 pr-2 sm:pr-4">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={cn(
                      !notification.isRead && "font-extrabold",
                      "mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    )}
                  >
                    <span
                      className={cn(
                        notification.type == "info" && "bg-sky-500",
                        notification.type == "success" && "bg-green-500",
                        notification.type == "error" && "bg-red-500",
                        "flex size-2 translate-y-1 rounded-full"
                      )}
                    />
                    <div className="space-y-1">
                      <p className="text-sm leading-none">
                        {notification.userNameCreator + " "}
                        {t(notification.title)}
                      </p>
                      <p className="text-muted-foreground text-sm">{t(notification.message)}</p>
                      <section className="text-muted-foreground flex flex-col justify-between text-xs font-light sm:flex-row">
                        <p className="">
                          <TimeAgo date={notification.createdAt} locale={locale} />
                        </p>
                        <div
                          className="cursor-pointer"
                          onClick={() => markRead(notification.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") markRead(notification.id)
                          }}
                          role="button"
                          tabIndex={0}
                        >
                          {t("mark")}
                        </div>
                      </section>
                    </div>
                  </div>
                ))}
                {hasMore && notifications.length >= 10 && (
                  <Button
                    variant={"link"}
                    disabled={loading}
                    className="mt-2 flex w-full items-center justify-center gap-2 text-sm leading-none shadow-none"
                    onClick={() => loadMore()}
                  >
                    {loading && <LuLoaderCircle className="mr-2 size-4 animate-spin" />}&nbsp;
                    {t("loadMore")}
                  </Button>
                )}
              </ScrollArea>
              <Separator />
              <section className="mt-2 flex items-center justify-center gap-2">
                <Button
                  variant={"primary"}
                  className="flex w-full items-center justify-center gap-2 text-sm leading-none"
                  onClick={() => allRead()}
                >
                  <LuCheck />
                  {t("markAll")}
                </Button>
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="hidden items-center justify-center gap-2 text-sm leading-none sm:flex"
                  onClick={() => deleteAll()}
                >
                  <LuTrash2 />
                </Button>
              </section>
            </div>
          ) : (
            <p className="text-center text-sm leading-none">{t("lackNotification")}</p>
          )}
        </PopoverContent>
      </Popover>
    </li>
  )
}
