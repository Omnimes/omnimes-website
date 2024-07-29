'use server'
import { db } from '@/utils/db'
import { revalidatePath } from 'next/cache'

/* Prośba o zostanie developerem produktu omnimes */
export async function createPromisesToBecomeDeveloper(userId: string) {
  try {
    // Pobierz użytkownika razem z powiązaną firmą
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        company: {
          select: {
            nip: true,
          },
        },
        adminCompany: {
          select: {
            nip: true,
          },
        },
      },
    })

    // Determine which `nip` to use
    const companyNip = user?.company?.nip
    const adminCompanyNip = user?.adminCompany?.nip
    const userNip = companyNip || adminCompanyNip

    // Sprawdź, czy użytkownik ma powiązaną firmę
    if (!userNip) {
      return { status: 400, message: 'User is not associated with any company' }
    }

    const roleRequest = await db.roleRequest.create({
      data: {
        userId: userId,
        nip: userNip,
      },
    })

    return { status: 201, data: roleRequest }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return { status: 500, message: 'Internal server error', error: error.message }
    } else {
      return { status: 500, message: 'Internal server error' }
    }
  }
}

/* Sprawdzenie czy user ma request o role */
export const checkIsUserHaveRoleRequest = async (userId: string) => {
  /* zwraca wynik boolean - userRoleRequest != null */
  const userRoleRequest = await db.roleRequest.findFirst({
    where: { userId },
  })

  return userRoleRequest != null
}

export const sendResetRequestDeveloper = async (userId: string) => {
  try {
    await db.roleRequest.delete({
      where: { userId },
    })

    revalidatePath('/dashboard/become-developer')
  } catch (error) {
    console.log(error)
  }

  return
}


interface User {
  name: string;
  email: string;
}

interface Company {
  name: string;
}

export interface RoleRequest {
  userId: string;
  createdAt: Date;
  nip: string;
  user: User;
  company: Company;
}


export const getAllRequests = async (): Promise<RoleRequest[]> => {
  try {
    const requests = await db.roleRequest.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        },
        company: {
          select: {
            name: true,
          }
        },
      },
    })
    return requests.length > 0 ? requests as RoleRequest[] : [] 
  } catch (error) {
    console.log(error)
    return []
  }
}

/* usunięcie requestu */
export const deleteRequest = async(userId: string) => {
  try {
    await db.roleRequest.delete({
      where: { userId }
    })
    revalidatePath('/admin');
  } catch (error) {
    console.log(error)
  }
}

/* Zmiana userowi roli na developera */
export const aproveRequestDeveloper = async (userId: string) => {
  try {
    await db.user.update({
      where: { id: userId },
      data: { role: "developer" },
    });
    // usun z request
    await db.roleRequest.delete({
      where: {userId}
    })
    revalidatePath('/admin');
  } catch (error) {
    console.log(error)
  }
}