import { NextResponse, type NextRequest } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

import demoConfig from "@/config/demoConfig.json"
import emailTranslations from "@/config/emailTranslations.json" // <<< WAŻNE: import JSON

type SupportedLocale = "pl" | "en"

// Target: kontaktowy odbiorca formularza. Override przez env SUPPORT_EMAIL,
// w innym wypadku hardcoded support@omnimes.com.
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@omnimes.com"

// SMTP — domyślnie OVH Mail Pro (ssl0.ovh.net:465). Override przez env
// gdy używasz innego providera (OVH Exchange = ex5.mail.ovh.net itp.).
const SMTP_HOST = process.env.SMTP_HOST || "ssl0.ovh.net"
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465
const SMTP_SECURE = process.env.SMTP_SECURE !== "false" // domyślnie true (port 465)

export async function POST(request: NextRequest) {
  // --- BODY PARSE ---
  let body: any = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { name, lastName, company, email, locale: bodyLocale } = body

  // --- LOCALE: query -> body -> header -> 'pl' ---
  const urlLocale = request.nextUrl.searchParams.get("locale")
  const headerLocale =
    request.headers.get("x-locale") ||
    request.headers.get("accept-language")?.split(",")[0]?.split("-")[0]

  const rawLocale = (urlLocale || bodyLocale || headerLocale || "pl").toString().toLowerCase()
  const locale: SupportedLocale = (
    ["pl", "en"].includes(rawLocale) ? rawLocale : "pl"
  ) as SupportedLocale

  console.log("=== DEBUG API DEMO ===")
  console.log("Received data:", {
    name,
    lastName,
    company,
    email,
    locale,
  })

  // --- TRANSLATIONS (z JSON) ---
  // Jeśli TS krzyczy, włącz w tsconfig: "resolveJsonModule": true
  if (!emailTranslations || !emailTranslations.pl) {
    console.error("emailTranslations JSON nie został poprawnie załadowany.")
    return NextResponse.json({ error: "Błąd konfiguracji tłumaczeń" }, { status: 500 })
  }
  const t = emailTranslations[locale as keyof typeof emailTranslations]

  // --- VALIDATION ---
  if (!name || !lastName || !email || !company) {
    console.log("Validation failed - missing fields")
    return NextResponse.json(
      { error: "Wiadomość nie może zostać wysłana z powodu brakujących danych." },
      { status: 400 }
    )
  }

  // --- TRANSPORT ---
  if (!process.env.MY_EMAIL || !process.env.MY_PASSWORD) {
    console.error("[api/demo] Missing SMTP credentials (MY_EMAIL / MY_PASSWORD env vars)")
    return NextResponse.json(
      {
        error:
          "Formularz tymczasowo niedostępny (brak konfiguracji serwera pocztowego). " +
          `Prosimy o kontakt bezpośrednio: ${SUPPORT_EMAIL}`,
      },
      { status: 503 }
    )
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: process.env.MY_EMAIL as string,
      pass: process.env.MY_PASSWORD as string,
    },
  })

  // --- USER MAIL (HTML) ---
  const userMailOptions: Mail.Options = {
    from: `OmniMES <${process.env.MY_EMAIL}>`,
    replyTo: SUPPORT_EMAIL,
    to: email,
    subject: t.userEmail.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF1CF7, #b249f8); background-color: #FF1CF7; color: white !important; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { color: white !important; margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .credentials-box { background: #fff; border: 2px solid #FF1CF7; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .credentials-box strong { color: #FF1CF7; }
          .features { background: #fff; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .contact-info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; }
          .note { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 5px; margin-top: 20px; font-size: 14px; }
          a { color: #b249f8; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚀 OmniMES Demo</h1>
        </div>
        <div class="content">
          <p><strong>${t.userEmail.greeting} ${name} ${lastName},</strong></p>
          <p>${t.userEmail.thanks}</p>

          <p><strong>${t.userEmail.credentialsTitle}</strong></p>
          <div class="credentials-box">
            <p><strong>${t.userEmail.url}</strong> <a href="${demoConfig.demo.url}" target="_blank" rel="noopener noreferrer">${demoConfig.demo.url}</a></p>
            <p><strong>${t.userEmail.login}</strong> ${demoConfig.demo.login}</p>
            <p><strong>${t.userEmail.password}</strong> ${demoConfig.demo.password}</p>
          </div>

          <p><strong>${t.userEmail.instructionsTitle}</strong></p>
          <p>${t.userEmail.instruction1}</p>
          <p>${t.userEmail.instruction2}</p>
          <p>${t.userEmail.instruction3}</p>

          <div class="features">
            <p><strong>${t.userEmail.featuresTitle}</strong></p>
            <p>${t.userEmail.feature1}</p>
            <p>${t.userEmail.feature2}</p>
            <p>${t.userEmail.feature3}</p>
            <p>${t.userEmail.feature4}</p>
            <p>${t.userEmail.feature5}</p>
          </div>

          <div class="contact-info">
            <p><strong>${t.userEmail.contactTitle}</strong></p>
            <p>📧 ${t.userEmail.email} ${SUPPORT_EMAIL}</p>
            <p>📞 ${t.userEmail.phone} ${demoConfig.email.contact.phone}</p>
          </div>

          <div class="note">
            <p><strong>${t.userEmail.note}</strong></p>
          </div>

          <div class="footer">
            <p>${t.userEmail.footer}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  // --- TEAM MAIL (PLAIN TEXT) ---
  const teamMailOptions: Mail.Options = {
    from: `OmniMES Demo Form <${process.env.MY_EMAIL}>`,
    replyTo: `${name} ${lastName} <${email}>`,
    to: SUPPORT_EMAIL,
    subject: `${t.teamEmail.subject} ${company} - ${name} ${lastName}`,
    text: `
${t.teamEmail.title}

${t.teamEmail.contactData}
${t.teamEmail.name} ${name} ${lastName}
${t.teamEmail.company} ${company}
${t.teamEmail.email} ${email}

---
${t.teamEmail.credentials}
${demoConfig.demo.url}
Login: ${demoConfig.demo.login}
${t.userEmail.password}: ${demoConfig.demo.password}
    `.trim(),
    cc: demoConfig.email?.cc,
  }

  const sendUserEmailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(userMailOptions, (err) => (err ? reject(err.message) : resolve("sent")))
    })

  const sendTeamEmailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(teamMailOptions, (err) => (err ? reject(err.message) : resolve("sent")))
    })

  try {
    console.log("Sending emails...")
    await Promise.all([sendUserEmailPromise(), sendTeamEmailPromise()])
    console.log("Emails sent successfully!")
    return NextResponse.json({
      message: t?.common?.successMessage ?? "Dane dostępowe zostały wysłane na podany adres e-mail",
      success: true,
    })
  } catch (err) {
    console.error("ERROR sending emails:", err)
    return NextResponse.json(
      { error: t?.common?.errorMessage ?? "Wystąpił błąd podczas wysyłania e-maila" },
      { status: 500 }
    )
  }
}
