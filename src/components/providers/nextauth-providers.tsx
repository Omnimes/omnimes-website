"use client"

import { SessionProvider } from "next-auth/react"

export const NextAuthProviders = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>
}
