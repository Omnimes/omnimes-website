import { db } from './db'
export type SelectUser = {
      id: string,
      name: string | null,
      email: string | null,
      emailVerified: Date | null,
      image: string | null,
      role: string,
      createdAt: Date,
      updatedAt: Date,
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

export async function getUsers(
    search: string,
    offset: number,
    role?: string // Add the role argument
  ): Promise<{
    users: SelectUser[];
    newOffset: number | null;
    prevOffset: number | null;
  }> {
    // Build the where clause dynamically based on provided arguments
    const whereClause: any = {};
  
    if (search) {
      whereClause.email = {
        contains: search,
        mode: 'insensitive',
      };
    }
  
    if (role) {
      whereClause.role = role;
    }
  
    // Always search the full table, not per page
    if (search || role) {
      const users = await db.user.findMany({
        where: whereClause,
        take: 1000,
      });
  
      return {
        users,
        newOffset: null,
        prevOffset: null
      };
    }
  
    if (offset === null) {
      return { users: [], newOffset: null, prevOffset: null  };
    }
  
    const moreUsers = await db.user.findMany({
      where: whereClause,
      take: 20,
      skip: offset,
    });
  
    const newOffset = moreUsers.length >= 20 ? offset + 20 : null;
    const prevOffset = moreUsers.length >= 0 ? offset - 20 : null;
    return { users: moreUsers, newOffset, prevOffset };
  }

export async function deleteUserById(id: string) {
  await db.user.delete({
    where: { id },
  })
}

export async function changeRoleById(id:string, role: string) {
  await db.user.update({
    where: { id },
    data: { role },
  });
}