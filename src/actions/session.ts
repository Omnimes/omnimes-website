"use server"

import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth/next"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}
