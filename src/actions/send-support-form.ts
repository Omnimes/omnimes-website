"use server"

import { FormSchemaSupport } from "@/utils/validations/support"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"
import { z } from "zod"

interface Props {
  values: z.infer<typeof FormSchemaSupport>
  userData: {
    email: string
    name: string
  }
}
export const sendSupportMail = async ({ values, userData }: Props) => {
  const { email, name } = userData
  const { problem, other, message } = values
  const transport = nodemailer.createTransport({
    service: "atthost24",
    host: "mp1.atthost24.pl",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MY_EMAIL as string,
      pass: process.env.MY_PASSWORD as string,
    },
  })

  const mailOptions: Mail.Options = {
    from: `${name} - ${email}`,
    to: process.env.MY_EMAIL as string,
    sender: email,
    replyTo: email,
    subject: `[SUPPORT] - Message from ${name} (${email})`,
    text: `
        Wiadomość od ${name} 
        Email: ${email}
        Problem: ${problem}${problem == "other" ? " - " + other : ""}
        Wiadomość: ${message}
    `,
    cc: ["mszerment@multiprojekt.pl","srewilak@multiprojekt.pl"],
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("sent")
        } else {
          reject(err.message)
        }
      })
    })

  try {
    await sendMailPromise()
    return { success: true, message: "sent", error: null, status: 200 }
  } catch (err) {
    return { success: false, message: "error", error: err, status: 500 }
  }
}
