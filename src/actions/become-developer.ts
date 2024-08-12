'use server'
import { CompanyStatus } from '@/components/forms/become-developer/BecomeDeveloper'
import { db } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { getAllAdminsOmniMES } from './user'

/* Prośba o zostanie developerem produktu omnimes */
export const createPromisesToBecomeDeveloper = async(userId: string) => {
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
    if (!userNip) return { success: false, message: 'userNotAssociated' }

    await db.roleRequest.create({
      data: {
        userId: userId,
        nip: userNip,
      },
    })

    const admins = await getAllAdminsOmniMES();

    admins.forEach(async admin => {
      await db.notification.create({
        data: {
          userId: admin.id,
          title: `titleMessageCreatePromisesToBecameDeveloperNotification`,
          userNameCreator: user?.name ?? user?.email ?? "",
          message: "descMessageCreatePromisesToBecameDeveloperNotification",
          type: "info",
        },
      })
    })

    revalidatePath("/dashboard/become-developer")
    return { success: true, message: "successCreatePromiseToBecameDeveloper" }
  } catch (error) {
    console.log(error)
    return { error: true, message: "errorCreatePromiseToBecameDeveloper" }
  }
}

export const getCompanyAndRoleRequestStatus = async (userId: string): Promise<CompanyStatus & { haveRoleRequest: boolean }> => {
  try {
    // Sprawdź, czy użytkownik ma przypisaną firmę
    const company = await db.company.findFirst({
      where: {
        OR: [
          { users: { some: { id: userId } } },   // Użytkownik jest użytkownikiem
          { admins: { some: { id: userId } } },  // Użytkownik jest administratorem
        ],
      },
      select: {
        name: true,
        nip: true,
      },
    });

    if (company == null) {
      // Sprawdź, czy wysłano request o dołączenie do firmy
      const req = await db.companyRequest.findFirst({
        where: { userId },
      });

      // Sprawdź, czy użytkownik ma request o rolę
      const roleRequest = await db.roleRequest.findFirst({
        where: { userId },
      });

      return {
        status: req == null ? "noData" : "sended",
        name: null,
        nip: null,
        haveRoleRequest: roleRequest != null,
      };
    }

    // Sprawdź, czy użytkownik ma request o rolę
    const roleRequest = await db.roleRequest.findFirst({
      where: { userId },
    });

    return {
      status: "belongs",
      name: company.name,
      nip: company.nip,
      haveRoleRequest: roleRequest != null,
    };
  } catch (error) {
    console.error('Error checking user\'s company and role request:', error);
    return {
      status: "noData",
      name: null,
      nip: null,
      haveRoleRequest: false,
    };
  }
};

export const sendResetRequestDeveloper = async (userId: string) => {
  try {
    await db.roleRequest.delete({
      where: { userId },
    })
    revalidatePath('/dashboard/become-developer');
    return { success: true, message: "successSendResetRequestDeveloper" }
  } catch (error) {
    console.log(error)
    return { error: true, message: "errorSendResetRequestDeveloper" }
  }
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
    return { success: true, message: "deleteRequestBecameDeveloperSuccess" }
  } catch (error) {
    console.error(error)
    return { error: true, message: "deleteRequestBecameDeveloperError" }

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
    return { success: true, message: "aproveRequestBecameDeveloperSuccess" }
  } catch (error) {
    console.log(error)
    return { error: true, message: "aproveRequestBecameDeveloperError" }
  }
}