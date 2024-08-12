'use server'

import { db } from '@/utils/db'
import { revalidatePath } from 'next/cache'

export const changeName = async (name: string, userId: string) => {
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    })
    revalidatePath('/dashboard/settings')
    return { success: true, message: 'toastSuccessDesc' }
  } catch (error) {
    console.log(error)
    return { error: true, message: 'toastWrongDesc' }
  }
}

export const getAllAdminsOmniMES = async () => {
  try {
    const admins = await db.user.findMany({
      where: {
        role: 'admin',
      },
    })

    return admins
  } catch (error) {
    console.error(error)
    return []
  }
}

export const changeRoleUser = async (userId: string, role: string) => {
  try {
    await db.user.update({
      where: { id: userId },
      data: { role },
    })
    revalidatePath('/admin/users')
    return { success: true, message: 'changeRoleSuccess' }
  } catch (error) {
    console.log(error)
    return { error: true, message: 'changeRoleError' }
  }
}

export const deleteUserById = async (id: string) => {
  try {
    await db.user.delete({
      where: { id },
    })
    revalidatePath('/admin/users')
    return { success: true, message: 'deleteUserSuccess' }
  } catch (error) {
    console.log(error)
    return { error: true, message: 'deleteUserError' }
  }
}

export const getUserCount = async (): Promise<number | null> => {
  try {
    const totalUsers: number = await db.user.count()
    return totalUsers
  } catch (error) {
    return null
  }
}

type SelectUser = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: string
  createdAt: Date
  updatedAt: Date
}

export const getUsers = async (
  search: string,
  offset: number,
  role?: string // Add the role argument
): Promise<{
  users: SelectUser[]
  newOffset: number | null
  prevOffset: number | null
}> => {
  // Build the where clause dynamically based on provided arguments
  const whereClause: any = {}

  if (search) {
    whereClause.email = {
      contains: search,
      mode: 'insensitive',
    }
  }

  if (role) {
    whereClause.role = role
  }

  // Always search the full table, not per page
  if (search || role) {
    const users = await db.user.findMany({
      where: whereClause,
      take: 1000,
    })

    return {
      users,
      newOffset: null,
      prevOffset: null,
    }
  }
  if (offset === null) {
    return { users: [], newOffset: null, prevOffset: null }
  }

  const takeUsers = 20

  const moreUsers = await db.user.findMany({
    where: whereClause,
    take: takeUsers,
    skip: offset,
  })
  const newOffset = moreUsers.length >= takeUsers ? offset + takeUsers : null
  // const prevOffset = moreUsers.length >= 0 ? offset - 2 : null;
  const prevOffset = offset >= takeUsers && moreUsers.length >= 0 ? offset - takeUsers : null
  return { users: moreUsers, newOffset, prevOffset }
}

export const getUserByEmail = async (email: string) => {
  try {
    const lowerCaseEmail = email.toLowerCase()
    const user = await db.user.findUnique({
      where: {
        email: lowerCaseEmail,
      },
    })
    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    })
    return user
  } catch (error) {
    return null
  }
}
