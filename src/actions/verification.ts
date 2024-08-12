'use server'

import { db } from '@/utils/db'
import { getUserByEmail } from './user'

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        identifier: email,
      },
    })
    return verificationToken
  } catch (error) {
    console.log(error)
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token: token,
      },
    })
    return verificationToken
  } catch (error) {
    console.log(error)
  }
}

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'invalidToken' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'tokenHasExpired' }
  }

  const existingUser = await getUserByEmail(existingToken.identifier)

  if (!existingUser) {
    return { error: 'userNotFound' }
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.identifier,
    },
  })

  await db.verificationToken.delete({
    where: {
      token: existingToken.token,
    },
  })

  return { success: 'emailVerified' }
}
