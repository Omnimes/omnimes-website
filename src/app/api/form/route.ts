import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

// Target: kontaktowy odbiorca formularza. Override przez env SUPPORT_EMAIL,
// w innym wypadku hardcoded support@omnimes.com.
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@omnimes.com"

export async function POST(request: NextRequest) {
  const { name, lastName, company, email, phone, country, message } = await request.json()
  if (!name || !lastName || !email || !message || !company || !phone || !country) {
    return NextResponse.json(
      { error: "Wiadomość nie może zostać wysłana z powodu brakujących danych." },
      { status: 400 }
    )
  }

  // Bramka SMTP — wciąż używamy konta z atthost24 (env MY_EMAIL / MY_PASSWORD)
  // tylko po to, żeby się zalogować i wysłać. Wiadomość trafia do SUPPORT_EMAIL.
  if (!process.env.MY_EMAIL || !process.env.MY_PASSWORD) {
    console.error("[api/form] Missing SMTP credentials (MY_EMAIL / MY_PASSWORD env vars)")
    return NextResponse.json(
      {
        error:
          "Formularz tymczasowo niedostępny (brak konfiguracji serwera pocztowego). " +
          "Prosimy o kontakt bezpośrednio: support@omnimes.com",
      },
      { status: 503 }
    )
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
    host: "mp1.atthost24.pl",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  })

  const mailOptions: Mail.Options = {
    from: `OmniMES Contact Form <${process.env.MY_EMAIL}>`,
    to: SUPPORT_EMAIL,
    replyTo: email,
    subject: `Wiadomość z formularza kontaktowego: ${name} ${lastName} (${company})`,
    text: `
      Wiadomość od: ${name} ${lastName}
      Firma:        ${company}
      Email:        ${email}
      Telefon:      ${number()}
      Kraj:         ${country}

      Treść wiadomości:
      ${message}
    `,
  }

  try {
    await transport.sendMail(mailOptions)
    return NextResponse.json({ message: "sent", success: true })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    console.error("[api/form] sendMail failed:", errorMessage)
    return NextResponse.json(
      {
        error:
          "Nie udało się wysłać wiadomości. Prosimy spróbować ponownie lub napisać bezpośrednio: " +
          SUPPORT_EMAIL,
      },
      { status: 500 }
    )
  }
}
