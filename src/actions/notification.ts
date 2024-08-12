"use server"
import { db } from '@/utils/db';

type Props = {
    userId: string,
    userNameCreator: string,
    title: string,
    message: string,
    type: string,
}

export const CreateNotification = async({userId, userNameCreator, title, message, type} : Props) => {
    try {
        const notification = await db.notification.create({
          data: {
            userId,
            title,
            userNameCreator,
            message,
            type,
          },
        })
      } catch (error) {
        console.error(error)
      }
}

export const getNotifications = async(userId: string, page: number = 1) => {
  const pageSize = 10; // Ilość powiadomień na stronę
  const skip = (page - 1) * pageSize;
    try {
        const notifications = await db.notification.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 10,
          skip: skip,
        })

        return { status: 201, data: notifications }
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          return { status: 500, message: 'Internal server error', error: error.message, data: [] }
        } else {
          return { status: 500, message: 'Internal server error', data: [] }
        }
      }
}

export const markAsRead = async(notificationId: string) => {
    try {
        const updatedNotification = await db.notification.update({
          where: { id: notificationId },
          data: { isRead: true },
        })
        return { status: 201, updatedNotification }
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          return { status: 500, message: 'Internal server error', error: error.message, data: [] }
        } else {
          return { status: 500, message: 'Internal server error', data: [] }
        }
      }
}

export const markAsReadAllNotification = async (userId: string) => {
  try {
    const updatedNotifications = await db.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });

    return {
      status: 201,
      message: 'All notifications marked as read',
      updatedCount: updatedNotifications.count,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { status: 500, message: 'Internal server error', error: error.message };
    } else {
      return { status: 500, message: 'Internal server error' };
    }
  }
};

export const deleteAllNotificationOfUser = async (userId: string) => {
  try {
    const deletedNotifications = await db.notification.deleteMany({
      where: { userId },
    });

    return {
      status: 200,
      message: 'All notifications deleted successfully',
      deletedCount: deletedNotifications.count,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { status: 500, message: 'Internal server error', error: error.message };
    } else {
      return { status: 500, message: 'Internal server error' };
    }
  }
};