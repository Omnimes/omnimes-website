import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

export async function POST(request: NextRequest) {
  const { name, lastName, company, email, phone, country, message } = await request.json()
  if (!name || !lastName || !email || !message || !company || !phone || !country) {
    const errorMessage = "Wiadomość nie może zostać wysłana z powodu brakujących danych."
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }

  const number = () => {
    if (country == "england") return "+44" + phone
    if (country == "poland") return "+48" + phone
    if (country == "switzerland") return "+41" + phone
    if (country == "germany") return "+49" + phone
    if (country == "spain") return "+34" + phone
    if (country == "france") return "+33" + phone
    if (country == "italy") return "+39" + phone
  }

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
    from: `${name} ${lastName} - ${email}`,
    to: process.env.MY_EMAIL as string,
    sender: email,
    replyTo: email,
    subject: `Message from ${name} (${email})`,
    text: `
      Wiadomość od ${name} ${lastName}
      Firma: ${company}
      Email: ${email}
      Telefon: ${number()}
      Kraj: ${country}
      Wiadomość: ${message}
    `,
    cc: ["PSierant@multiprojekt.pl", "MSzerment@multiprojekt.pl", "MCichon@multiprojekt.pl"],
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
    return NextResponse.json({ message: "sent", success: true })
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 })
  }
}
