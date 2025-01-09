"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/utils/db"
import { companySchema } from "@/utils/validations/company"
import { z } from "zod"

import { Requests } from "@/components/dashboard/requsets/ComponentRequestsTable"
import { Company } from "@/components/forms/settings/CompanyForm"

import { ReqCompany } from "./../components/forms/settings/CompanyForm"

export const getCompanyInGUSDatabaseServer = async (nip: string) => {
  const res = await fetch(`http://p4-1.omnimes.com/api/nip/${nip}/`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      Authorization: `Token ${process.env.API_TOKEN_GUS}`,
    },
  })

  const data = await res.json()
  return data
}

/* Pobranie firmy po nip */
export const getCompany = async (nip: string) => {
  if (!nip || typeof nip !== "string") {
    return { success: false, message: "Invalid Nip" }
  }

  try {
    const company = await db.company.findUnique({
      where: { nip },
      include: {
        users: true, // Załącz użytkowników firmy
        admins: true, // Załącz administratorów firmy
      },
    })
    if (company) {
      return { success: true, company: company as Company }
    } else {
      return { success: true, message: "Not Found" }
    }
  } catch (error) {
    console.error(error)
    return { error: true, message: "ErrorGetCompanyAfterWriteNip" }
  }
}

type FormData = z.infer<typeof companySchema>
export const createCompany = async (data: FormData, userId: string) => {
  try {
    const validatedData = companySchema.parse(data)

    await db.company.create({
      data: {
        ...validatedData,
        admins: {
          connect: { id: userId },
        },
      },
    })

    revalidatePath("/dashboard/settings")
    return { success: true, message: "createCompanySuccess" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: true, errors: error.issues }
    }
    console.error("Error creating company:", error)
    return { error: true, message: "createCompanyError" }
  }
}

export const updateCompany = async (companyId: string, data: FormData) => {
  try {
    const validatedData = companySchema.partial().parse(data)

    await db.company.update({
      where: { id: companyId },
      data: validatedData,
    })

    return { success: true, message: "updatedCompanySuccess" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: true, errors: error.issues }
    }
    console.error("Error updating company:", error)
    return { error: true, message: "updatedCompanyError" }
  }
}

export const getUserCompanyInfo = async (userId: string) => {
  try {
    // Znajdź firmę, w której użytkownik jest użytkownikiem lub administratorem
    const company = await db.company.findFirst({
      where: {
        OR: [
          { users: { some: { id: userId } } }, // Użytkownik jest użytkownikiem
          { admins: { some: { id: userId } } }, // Użytkownik jest administratorem
        ],
      },
      include: {
        admins: true, // Włącz tablicę adminów do wyniku
      },
    })

    if (company) {
      const isAdmin = company.admins.some((admin) => admin.id === userId)
      return {
        belongCompany: true,
        company: company as Company,
        isAdmin,
      }
    }

    return {
      belongCompany: false,
      company: null,
      isAdmin: false,
    }
  } catch (error) {
    console.error("Error checking user's company:", error)
    return {
      belongCompany: false,
      company: null,
      isAdmin: false,
    }
  }
}

/* Pobranie listy requestów danej firmy wraz z danymi o userze */
export const getRequestsForAdmin = async (companyId: string): Promise<Requests> => {
  try {
    const requests = await db.companyRequest.findMany({
      where: { companyId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return requests as Requests
  } catch (error) {
    console.error(error)
    // Obsługa błędów
    return []
  }
}

/* Sprawdzenie czy użytkownik ma request */
export const doesUserHaveRequest = async (userId: string) => {
  try {
    const req = await db.companyRequest.findFirst({
      where: { userId },
    })

    return req as ReqCompany | null
  } catch (error) {
    console.error("Error checking user's request:", error)
    return null
  }
}

/* Prośba o dodanie usera do firmy */
export const createPromisesToCompany = async (userId: string, nip: string) => {
  try {
    const companyId = await db.company.findFirst({
      where: { nip },
      select: { id: true, admins: true },
    })

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    })

    if (companyId && companyId.id) {
      await db.companyRequest.create({
        data: {
          userId,
          companyId: companyId.id,
        },
      })

      companyId.admins.forEach(async (admin) => {
        await db.notification.create({
          data: {
            userId: admin.id,
            title: `titleMessageCreateCompanyRequestNotification`,
            userNameCreator: user?.name ?? user?.email ?? "",
            message: "descMessageCreateCompanyRequestNotification",
            type: "info",
          },
        })
      })

      revalidatePath("/dashboard/settings")
      return { success: true, message: "sendRequestSuccess" }
    } else {
      return { error: true, messsage: "sendRequestError" }
    }
  } catch (error) {
    console.log(error)
    return { error: true, message: "errorCreatePromisesToCompany" }
  }
}

export const sendResetRequest = async (id: string) => {
  try {
    await db.companyRequest.delete({
      where: { id },
    })
    revalidatePath("/dashboard/settings")
    return { success: true, message: "deleteCompanyRequestSuccess" }
  } catch (error) {
    console.error(error)
    return { error: true, message: "deleteCompanyRequestError" }
  }
}

/* usunięcie requestu */
export const deleteRequest = async (idRequest: string) => {
  try {
    await db.companyRequest.delete({
      where: { id: idRequest },
    })
    revalidatePath("/dashboard")
    return { success: true, message: "msgSuccessDeleteRequest" }
  } catch (error) {
    console.error(error)
    return { error: true, message: "msgErrorDeleteRequest" }
  }
}

/* Dodanie do firmy */
export const aproveUserToCompany = async (obj: {
  userId: string
  companyId: string
  reqId: string
}) => {
  const { userId, companyId, reqId } = obj
  try {
    // dodaj do firmy o id companyID do tablicy stringów z id userów (pole users).
    await db.company.update({
      where: { id: companyId },
      data: {
        users: {
          connect: { id: userId }, // Używamy connect z id użytkownika, aby dodać go do relacji
        },
      },
    })
    // usun z company request
    await db.companyRequest.delete({
      where: { id: reqId },
    })
    revalidatePath("/dashboard")
    return { success: true, message: "msgSuccessAproveUserToCompany" }
  } catch (error) {
    console.log(error)
    return { error: true, message: "msgErrorAproveUserToCompany" }
  }
}

type status = "belongs" | "noData" | "sended"
/* sprawdzenie czy user ma firme lub prosbe o dolaczenie do firmy */
export const getCompanyUser = async (userId: string) => {
  /* czy ma przypisaną firme */
  const company = await db.company.findFirst({
    where: {
      OR: [
        { users: { some: { id: userId } } }, // Użytkownik jest użytkownikiem
        { admins: { some: { id: userId } } }, // Użytkownik jest administratorem
      ],
    },
    select: {
      id: true,
      name: true,
      nip: true,
      email: true,
      website: true,
      phoneNumber: true,
    },
  })

  if (company == null) {
    /* sprawdzamy czy wysłano req */
    const req = await db.companyRequest.findFirst({
      where: { userId },
    })
    return { status: (req == null ? "noData" : "sended") as status, data: null }
  }
  return { status: "belongs" as status, data: company }
}

// /* Sprawdź czy user jest adminem firmy */
export const GetIsAdminCompany = async (userId: string) => {
  try {
    // Znajdź firmę, w której użytkownik jest administratorem
    const company = await db.company.findFirst({
      where: {
        admins: { some: { id: userId } }, // Użytkownik jest administratorem
      },
      include: {
        admins: true, // Włącz tablicę adminów do wyniku
      },
    })

    // Jeśli firma istnieje, znajdź użytkownika w tablicy adminów
    if (company) {
      const adminUser = company.admins.find((admin) => admin.id === userId)
      return { isAdmin: true, user: adminUser }
    }

    return { isAdmin: false, user: null }
  } catch (error) {
    console.error("Error checking user's company:", error)
    return { isAdmin: false, user: null }
  }
}

/* Pobranie wszystkich userów należących do firmy */
export const getAllUsersFromComapny = async (companyId: string) => {
  try {
    const users = await db.user.findMany({
      where: {
        OR: [{ companyId }, { adminCompanyId: companyId }],
      },
      select: {
        id: true,
        name: true,
        email: true,
        companyId: true,
        adminCompanyId: true,
      },
    })

    return users
  } catch (error) {
    console.error(error)
    return []
  }
}

type UserCompany = {
  id: string
  name: string | null
  email: string | null
  companyId: string | null
  adminCompanyId: string | null
}

/* zmiana roli w firmie */
export const changeRoleInCompany = async (user: UserCompany, role: "admin" | "user") => {
  const updateData =
    role === "admin"
      ? { companyId: null, adminCompanyId: user.companyId }
      : { companyId: user.adminCompanyId, adminCompanyId: null }

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: updateData,
    })

    revalidatePath("/dashboard")
    return { success: true, message: "msgSuccessChangeUserRoleInCompany" }
  } catch (error) {
    console.error(error)
    return { error: true, message: "msgErrorChangeUserRoleInCompany" }
  }
}

/* Usunięcie usera z firmy */
export const deleteUserCompany = async (user: UserCompany) => {
  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        companyId: null,
        role: "user", // dodatkowo jeśli jes developerem zostaje zmieniony na user
      },
    })

    // Sprawdzenie, czy istnieje roleRequest
    const existingRoleRequest = await db.roleRequest.findFirst({
      where: {
        userId: user.id,
      },
    })

    // Jeśli istnieje roleRequest, usuń go
    if (existingRoleRequest) {
      await db.roleRequest.delete({
        where: {
          userId: user.id,
        },
      })
    }

    revalidatePath("/dashboard")
    return { success: true, message: "msgSuccessDeleteUserFromCompany" }
  } catch (error) {
    console.error(error)
    return { error: true, message: "msgErrorDeleteUserFromCompany" }
  }
}
