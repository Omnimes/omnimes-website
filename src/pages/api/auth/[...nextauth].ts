import NextAuth from "next-auth"

import { authOptions } from "@/utils/auth"

// @see ./lib/auth
export default NextAuth(authOptions)