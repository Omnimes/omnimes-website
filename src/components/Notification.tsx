"use client"
import { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/Popover"
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { MyUser } from "./auth/UserAccountNavClient";
import { Skeleton } from "./atoms/Skeleton";
import { getNotifications, markAsRead, markAsReadAllNotification, deleteAllNotificationOfUser } from "@/actions/notification";
import { cn } from "@/utils/utils";
import { useTimeAgo } from 'next-timeago';
import { Separator } from "./atoms/Separator";
import { Button } from "./atoms/Button";
import { LuCheck, LuTrash2 } from "react-icons/lu";
import { ScrollArea } from "./atoms/ScrollArea";
import { Loader2 } from "lucide-react"
import { useLocale, useTranslations } from "next-intl";

type DataNotification = {
  id: string;
  userId: string;
  userNameCreator: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
}[];

interface Notification {
  status: number;
  data: DataNotification;
  message?: string | undefined;
  error?: string | undefined;
}

export const Notification = () => {
  const t = useTranslations("Notification")
  const { status, data: session } = useSession();
  const user: Pick<MyUser, "id" | "name" | "image" | "email" | "role"> | undefined = session?.user;
  const [notifications, setNotifications] = useState<DataNotification>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { TimeAgo } = useTimeAgo();
  const locale = useLocale();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user) {
        try {
          const res: Notification = await getNotifications(user.id);
          const howManyNotificationisUnRead = res.data.filter(item => !item.isRead);
          setCount(howManyNotificationisUnRead.length)
          setNotifications(res.data)
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [user]);

  if (status == 'loading' && user == undefined) {
    return (<Skeleton className="w-7 h-7 rounded" />)
  }

  if (user == undefined) return null

  const markRead = async (id: string) => {
    const res = await markAsRead(id);

    if (res && res.updatedNotification) {
      const updatedNotifications = notifications.map(item => {
        if (item.id === res.updatedNotification.id) {
          return { ...item, ...res.updatedNotification };
        }
        return item;
      });

      setNotifications(updatedNotifications);
      const howManyNotificationisUnRead = updatedNotifications.filter(item => !item.isRead);
      setCount(howManyNotificationisUnRead.length)
    }
  }

  const loadMore = async () => {
    setLoading(true);
    if (user) {
      const res: Notification = await getNotifications(user.id, page);

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setNotifications((prev) => [...prev, ...res.data]);
        const howManyNotificationisUnRead = [...notifications, ...res.data].filter(item => !item.isRead);
        setCount(howManyNotificationisUnRead.length)
        setPage((prev) => prev + 1);
      }
    }
    setLoading(false);
  }

  const deleteAll = async () => {
    if (user) {
      await deleteAllNotificationOfUser(user.id);
      setCount(0);
      setPage(1);
      setNotifications([])
      setHasMore(false);
    }
  }

  const allRead = async () => {
    setLoading(true);
    if (user) {
      const allRead = notifications.map(item => {
        return ({
          ...item,
          isRead: true,
        })
      })

      setNotifications(allRead);
      setCount(0)
      await markAsReadAllNotification(user.id);
    }
    setLoading(false);
  }
  
  return (
    <li className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger>
          <div className="relative">
            <HiOutlineBellAlert className="w-6 h-6" />
            {count > 0 && (
              <div className="absolute -right-1 -bottom-[2px] z-20 size-3 rounded-full bg-blue-500">
                <span className={cn(count >= 10 && "text-[10px]", "text-white text-[8px] absolute left-1")}>{count >= 10 ? "+" : count}</span>
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
                    className={
                      cn(!notification.isRead && "font-extrabold",
                        "mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                      )}
                  >
                    <span className={cn(
                      notification.type == "info" && "bg-sky-500",
                      notification.type == "success" && "bg-green-500",
                      notification.type == "error" && "bg-red-500",
                      "flex h-2 w-2 translate-y-1 rounded-full")} />
                    <div className="space-y-1">
                      <p className="text-sm leading-none">
                        {notification.userNameCreator + " "}
                        {t(notification.title)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t(notification.message)}
                      </p>
                      <section className="flex flex-col sm:flex-row justify-between text-xs text-muted-foreground font-light">
                        <p className="">
                          <TimeAgo date={notification.createdAt} locale={locale} />
                        </p>
                        <p className="cursor-pointer" onClick={() => markRead(notification.id)}>
                          {t("mark")}
                        </p>
                      </section>
                    </div>
                  </div>
                ))}
                {hasMore && notifications.length >= 10 && (
                  <Button
                    variant={"link"}
                    disabled={loading}
                    className="mt-2 text-sm leading-none w-full flex gap-2 items-center justify-center shadow-none"
                    onClick={() => loadMore()}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}&nbsp;{t("loadMore")}
                  </Button>
                )}
              </ScrollArea>
              <Separator />
              <section className="flex gap-2 justify-center items-center mt-2">
                <Button
                  variant={"primary"}
                  className="text-sm leading-none w-full flex gap-2 items-center justify-center"
                  onClick={() => allRead()}
                >
                  <LuCheck />
                  {t("markAll")}
                </Button>
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="hidden sm:flex text-sm leading-none gap-2 items-center justify-center"
                  onClick={() => deleteAll()}
                >
                  <LuTrash2 />
                </Button>
              </section>
            </div>
          ) : (
            <p className="text-sm leading-none text-center">{t("lackNotification")}</p>
          )
        }
        </PopoverContent>
      </Popover>
    </li>
  )
} 