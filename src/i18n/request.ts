import { getRequestConfig } from "next-intl/server"

import { locales } from "../config"
import { defaultLocale } from "../middleware"

export const routing = {
  locales,
  defaultLocale,
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as "en" | "pl")) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (
      await (locale === "pl"
        ? // W przypadku polskiego, załaduj plik `pl.json`
          import("../../messages/pl.json")
        : // Dla innych języków załaduj odpowiedni plik JSON
          import(`../../messages/${locale}.json`))
    ).default,
  }
})
