import { ReqCompany } from './../components/forms/settings/CompanyForm';
"use server"

import { Company } from "@/components/forms/settings/CompanyForm";
import { db } from "@/utils/db"
import { companySchema } from "@/utils/validations/company";
import { revalidatePath } from 'next/cache';
import { z } from "zod";

/* Pobranie firmy po nip */
export const getCompany = async (nip: string) => {
  if (!nip || typeof nip !== "string") {
    return {status: 'error', message: "invalid nip"}
  }

  const company = await db.company.findUnique({
    where: { nip },
    include: {
        users: true,   // Załącz użytkowników firmy
        admins: true,  // Załącz administratorów firmy
      },
  });

  if (company) {
    return {status: 'success', company: company as Company}
  } else {
    return {status: 'error', message: "not found"}
  }
}

/* Tworzenie firmy */
type FormData = z.infer<typeof companySchema>
export const createCompany = async (data: FormData, userId: string) => {

    const createCompany = await db.company.create({
        data: {
            ...data,
            admins: {
                connect: {id: userId}
            }
        },
        include: {
            users: true,   // Załącz użytkowników firmy
            admins: true,  // Załącz administratorów firmy
          },
    });

    // console.log(createCompany)
    return createCompany
}

/* Sprawdzenie czy uzytkownik ma przypisaną firmę */
export async function doesUserHaveCompany(userId: string) {
  try {
    // Sprawdź, czy istnieje firma, w której użytkownik jest użytkownikiem lub administratorem
    const company = await db.company.findFirst({
      where: {
        OR: [
          { users: { some: { id: userId } } },   // Użytkownik jest użytkownikiem
          { admins: { some: { id: userId } } },  // Użytkownik jest administratorem
        ],
      },
    });

    return { belongCompany: company !== null, company: company as Company};
  } catch (error) {
    console.error('Error checking user\'s company:', error);
    throw error;
  }
}

export async function doesUserHaveRequest(userId: string) {
  try {
    const req = await db.companyRequest.findFirst({
      where: { userId }
    })
  
    return { requestCompany: req !== null, reqCompany: req as ReqCompany }
  }
  catch(error) {
    console.log(error)
    throw error
  }
}

/* Prośba o dodanie usera do firmy */
  export async function createPromisesToCompany(userId: string, nip: string) {
    try {
      const companyId = await db.company.findFirst({
        where: { nip },
        select: { id: true }
      })

      if(companyId && companyId.id) {
         await db.companyRequest.create({
          data: {
            userId: userId,
            companyId: companyId.id,
          },
        });
       
        return revalidatePath('/dashboard/settings')
      } else {
        return {error: true, messsage: "Nie udało się wysłać prośby, spróbuj ponownie później."}
      }
  } catch (error) {
    console.log(error)
    return { error: true, data: error}
  }
}

export const sendResetRequest = async (id: string) => {
  try {
    await db.companyRequest.delete({
      where: { id },
    })
    revalidatePath('/dashboard/settings')
  } catch (error) {
    console.log(error)
  }
}