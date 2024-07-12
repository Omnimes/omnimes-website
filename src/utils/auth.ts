import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import { db } from "./db"
import { createTransport } from "nodemailer"
import { html, htmlLogin, text, textLogin } from "@/utils/utils"
export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    EmailProvider({
      from: process.env.MY_EMAIL,
      server: {
          service: 'atthost24',
          host: 'mp1.atthost24.pl',
          port: 465,
          secure: true,
          auth: {
            user: process.env.MY_EMAIL as string,
            pass: process.env.MY_PASSWORD as string,
          },
      },      
      sendVerificationRequest: async ({ identifier, url, provider }) => {

        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })
        
        const templateId = user?.emailVerified
          ? "login"
          : "register"
        
        const transport = createTransport(provider.server)
        const { host } = new URL(url)
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: templateId == "login" ? "Sign-in link for OmniMes" : "Activate your account",
          text: templateId == "login" ? textLogin({ url, host }) : text({ url, host }),
          html: templateId == "login" ? htmlLogin({ url }) : html({ url }),
        })

        const failed = result.rejected.concat(result.pending).filter(Boolean)
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role as string;
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role
      }
    },
  },
}