import { db } from "./db";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
      const verificationToken = await db.verificationToken.findFirst({
          where: {
            identifier: email
          }
      })
  
      return verificationToken;
    } catch (error) {
      console.log(error);
    }
  
  }
  
  export const getVerificationTokenByToken = async (token: string) => {
    try {
      const verificationToken = await db.verificationToken.findFirst({
          where: {
              token: token
          }
      })
  
      return verificationToken;
    } catch (error) {
      console.log(error);
    }
  
  }