"use server"

import { db } from "@/utils/db"
import { revalidatePath } from "next/cache"

export const changeName = async(name: string, userId: string) => {
    try {
        await db.user.update({
            where: {
            id: userId,
            },
            data: {
            name: name,
            },
        })
        revalidatePath("/dashboard/settings")
        return { success: true, message: "toastSuccessDesc" }
    } catch (error) {
        console.log(error)
        return { error: true, message: "toastWrongDesc" }
    }
}

export const getAllAdminsOmniMES = async() => {
    try {
        const admins = await db.user.findMany({
            where: {
              role: 'admin',
            },
          });
      
          return admins;
    } catch(error) {
        console.error(error)
        return []
    }
}