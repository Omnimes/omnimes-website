"use server"

import { z } from "zod";
import { db } from "@/utils/db"
import { Company } from "@/components/forms/settings/CompanyForm";
import { companySchema } from "@/utils/validations/company";
import { Requests } from '@/components/dashboard/requsets/ComponentRequests';
import { ReqCompany } from './../components/forms/settings/CompanyForm';
import { revalidatePath } from 'next/cache';

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
    return createCompany
}

export const updateCompany = async(companyId: string, data: Partial<FormData>) => {
  try {
    const updatedCompany = await db.company.update({
      where: { id: companyId },
      data: {
        ...data,
      },
      include: {
        users: true,   // Załącz użytkowników firmy
        admins: true,  // Załącz administratorów firmy
      },
    });

    return updatedCompany;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
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

/* Sprawdź czy user jest adminem firmy */
export async function GetIsAdminCompany(userId: string) {
  try {
    // Znajdź firmę, w której użytkownik jest administratorem
    const company = await db.company.findFirst({
      where: {
        admins: { some: { id: userId } },  // Użytkownik jest administratorem
      },
      include: {
        admins: true,  // Włącz tablicę adminów do wyniku
      },
    });

    // Jeśli firma istnieje, znajdź użytkownika w tablicy adminów
    if (company) {
      const adminUser = company.admins.find(admin => admin.id === userId);
      return { isAdmin: true, user: adminUser };
    }

    return { isAdmin: false, user: null };
  } catch (error) {
    console.error('Error checking user\'s company:', error);
    throw error;
  }
}

/* Pobranie listy requestów danej firmy wraz z danymi o userze */
export async function getRequestsForAdmin(companyId: string): Promise<Requests> {
  try {
    const requests = await db.companyRequest.findMany({
      where: { companyId: companyId },
      include: {
        user: {
          select:{
            name: true,
            email: true
          },
        }
      },
    });
    return requests as Requests;
  } catch (error) {
    console.error(error);
    // Obsługa błędów
    return []
  }
}

/* Sprawdzenie czy użytkownik ma request */
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

export const sendResetRequest = async(id: string) => {
  try {
    await db.companyRequest.delete({
      where: { id },
    })
    revalidatePath('/dashboard/settings')
  } catch (error) {
    console.log(error)
  }
}

/* usunięcie requestu */
export const deleteRequest = async(idRequest: string) => {
  try {
    await db.companyRequest.delete({
      where: {id: idRequest}
    })
    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error)
  }
}

/* Dodanie do firmy */
export const aproveUserToCompany = async(obj: {userId: string; companyId: string; reqId: string;}) => {
  const {userId, companyId, reqId} = obj;
  try {
    // dodaj do firmy o id companyID do tablicy stringów z id userów (pole users).
    await db.company.update({
      where: { id: companyId },
      data: {
        users: {
          connect: { id: userId }, // Używamy connect z id użytkownika, aby dodać go do relacji
        },
      },
    });
    // usun z company request
    await db.companyRequest.delete({
      where: {id: reqId}
    })
    revalidatePath('/dashboard');

  } catch (error) {
    console.log(error)
  }
}

type status = 'belongs' | 'noData' | 'sended'
export const getCompanyUser = async(userId: string) => {
  /* czy ma przypisaną firme */
  const company = await db.company.findFirst({
    where: {
      OR: [
        { users: { some: { id: userId } } },   // Użytkownik jest użytkownikiem
        { admins: { some: { id: userId } } },  // Użytkownik jest administratorem
      ],
    },
    select: {
      id: true,
      name: true,
      nip: true,
      email: true,
      website: true,
      phoneNumber: true,
    }
  });

  if(company == null) {
    /* sprawdzamy czy wysłano req */
    const req = await db.companyRequest.findFirst({
      where: { userId }
    })
    return { status: req == null ? "noData" : "sended" as status, data: null}
  }

  return { status: "belongs" as status, data: company}
}