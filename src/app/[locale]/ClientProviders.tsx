"use client"

import { ReactNode } from "react"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl"

import { Toaster } from "@/components/ui/Toaster"
import { Widget } from "@/components/ui/Widget"
import { NextAuthProviders } from "@/components/providers/nextauth-providers"
import { NextUIProviders } from "@/components/providers/nextui-providers"
import { ThemeProviders } from "@/components/providers/theme-providers"
import { TailwindIndicator } from "@/components/TailwindIndicator"

type ClientProvidersProps = {
  children: ReactNode
  locale: string
  messages: AbstractIntlMessages
  widgetText: string
  widgetHref: string
  widgetButtonText: string
}

export function ClientProviders({
  children,
  locale,
  messages,
  widgetText,
  widgetHref,
  widgetButtonText,
}: ClientProvidersProps) {
  return (
    <NextAuthProviders>
      <NextUIProviders>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProviders>
            <Widget text={widgetText} href={widgetHref} buttonText={widgetButtonText} />
            {children}
            <Toaster />
            <Analytics />
            <SpeedInsights />
            <TailwindIndicator />
          </ThemeProviders>
        </NextIntlClientProvider>
      </NextUIProviders>
    </NextAuthProviders>
  )
}
