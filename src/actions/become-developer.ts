"use server"
import { z } from "zod";
import { db } from "@/utils/db"
import { revalidatePath } from "next/cache";

/* Prośba o zostanie developerem produktu omnimes */
export async function createPromisesToBecomeDeveloper(userId: string, nip: string) {
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
                        id: true,
                    }
                }
            },
        });

        // Sprawdź, czy użytkownik ma powiązaną firmę
        if (!user || !user.company) {
            throw new Error("Użytkownik nie jest powiązany z żadną firmą");
        }

        const roleRequest = await db.roleRequest.create({
            data: {
              userId: userId,
              nip: user.company.nip,
            },
          });

        revalidatePath('/dashboard/become-developer')
        return roleRequest
  } catch (error) {
    console.log(error)
    return { error: true, data: error}
  }
}

/* Sprawdzenie czy user ma request o role */
export const checkIsUserHaveRoleRequest = async(userId: string) => {
  /* zwraca wynik boolean - userRoleRequest != null */
  const userRoleRequest = await db.roleRequest.findFirst({
      where: { userId },
  })

  return userRoleRequest != null
}

export const sendResetRequestDeveloper = async (userId: string) => {

  try {
    await db.roleRequest.delete({
      where: { userId }
    })

    revalidatePath('/dashboard/become-developer');
  } catch (error) {
    console.log(error)
  }

  return 
}

export const getAllRequests = async () => {

  try {
    const requests = await db.roleRequest.findMany({
      include: {
        user: true,
        company: true
      }
    });
    console.log(requests)
    return requests
  } catch (error) {
    console.log(error)
  }

}