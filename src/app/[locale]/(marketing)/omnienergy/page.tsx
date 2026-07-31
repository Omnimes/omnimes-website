// src/app/[locale]/(marketing)/omnienergy/page.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

export default function OmniEnergyPage() {
  const t = useTranslations("OmniEnergy")
  const locale = useLocale()
  const [modalImage, setModalImage] = useState<string | null>(null)

  const timeComparisonImage =
    locale === "en"
      ? "/screenshots/omnienergy-time-comparison-en.png"
      : "/screenshots/omnienergy-time-comparison-pl.png"

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="relative mx-4 my-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 dark:from-emerald-950/40 dark:via-green-950/30 dark:to-teal-950/40">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 backdrop-blur-sm dark:border-emerald-800/60 dark:bg-neutral-900/60">
                <div className="size-2 animate-pulse rounded-full bg-emerald-500"></div>
                <span className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="text-5xl font-bold lg:text-6xl">
                <span className="text-gray-900 dark:text-neutral-50">{t("hero.title")}</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                  {t("hero.titleHighlight")}
                </span>
              </h1>

              <p className="text-xl leading-relaxed text-gray-600 dark:text-neutral-300">
                {t("hero.description")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  {t("hero.ctaPrimary")}
                  <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 bg-white px-8 py-4 font-semibold text-emerald-600 transition-all duration-300 hover:border-emerald-400 hover:shadow-lg dark:border-emerald-800/60 dark:bg-neutral-900 dark:text-emerald-300 dark:hover:border-emerald-500"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                    <svg
                      className="size-6 text-emerald-600 dark:text-emerald-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                    {t("hero.features.iso")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                    <svg
                      className="size-6 text-emerald-600 dark:text-emerald-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                    {t("hero.features.reduction")}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:border-emerald-800/60 dark:bg-neutral-900/60">
                <div className="absolute -right-4 -top-4 size-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 size-32 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 opacity-20 blur-2xl"></div>

                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/40">
                    <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/60">
                      <svg
                        className="size-6 text-emerald-600 dark:text-emerald-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        {t("hero.stats.monitoring.label")}
                      </p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-300">
                        {t("hero.stats.monitoring.value")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4 dark:bg-green-950/40">
                    <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/60">
                      <svg
                        className="size-6 text-green-600 dark:text-green-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        {t("hero.stats.savings.label")}
                      </p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                        {t("hero.stats.savings.value")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-teal-50 p-4 dark:bg-teal-950/40">
                    <div className="flex size-12 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/60">
                      <svg
                        className="size-6 text-teal-600 dark:text-teal-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        {t("hero.stats.enpi.label")}
                      </p>
                      <p className="text-2xl font-bold text-teal-600 dark:text-teal-300">
                        {t("hero.stats.enpi.value")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Główne moduły systemu */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-neutral-50">
              {t("features.sectionTitle")}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-neutral-400">
              {t("features.sectionDescription")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Dashboard energetyczny */}
            <FeatureCard
              t={t}
              tone="emerald"
              titleKey="features.dashboard.title"
              descKey="features.dashboard.description"
              itemsKey="features.dashboard.items"
              iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
            {/* Źródła i punkty pomiarowe */}
            <FeatureCard
              t={t}
              tone="green"
              titleKey="features.sources.title"
              descKey="features.sources.description"
              itemsKey="features.sources.items"
              iconPath="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
            {/* Analiza zużycia */}
            <FeatureCard
              t={t}
              tone="teal"
              titleKey="features.analysis.title"
              descKey="features.analysis.description"
              itemsKey="features.analysis.items"
              iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
            {/* Wskaźniki EnPI */}
            <FeatureCard
              t={t}
              tone="emerald"
              titleKey="features.enpi.title"
              descKey="features.enpi.description"
              itemsKey="features.enpi.items"
              iconPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
            {/* Baza odniesienia (EnB) */}
            <FeatureCard
              t={t}
              tone="green"
              titleKey="features.enb.title"
              descKey="features.enb.description"
              itemsKey="features.enb.items"
              iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
            {/* Cele i działania energetyczne */}
            <FeatureCard
              t={t}
              tone="teal"
              titleKey="features.goals.title"
              descKey="features.goals.description"
              itemsKey="features.goals.items"
              iconPath="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
            {/* Audyty i przeglądy */}
            <FeatureCard
              t={t}
              tone="emerald"
              titleKey="features.audits.title"
              descKey="features.audits.description"
              itemsKey="features.audits.items"
              iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
            {/* Dokumentacja energetyczna */}
            <FeatureCard
              t={t}
              tone="green"
              titleKey="features.documentation.title"
              descKey="features.documentation.description"
              itemsKey="features.documentation.items"
              iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
            {/* SEU */}
            <FeatureCard
              t={t}
              tone="teal"
              titleKey="features.seu.title"
              descKey="features.seu.description"
              itemsKey="features.seu.items"
              iconPath="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </div>
        </div>
      </section>

      {/* ISO 50001 Compliance */}
      <section className="mx-4 my-8 rounded-3xl bg-gradient-to-br from-emerald-50/60 to-green-50/60 py-20 dark:from-emerald-950/30 dark:to-green-950/30">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 dark:bg-emerald-900/50">
              <svg
                className="size-5 text-emerald-600 dark:text-emerald-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {t("iso50001.badge")}
              </span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-neutral-50">
              {t("iso50001.sectionTitle")}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-neutral-400">
              {t("iso50001.sectionDescription")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t.raw("iso50001.requirements").map((req: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/60"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 text-xl font-bold text-white">
                    {req.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-100">
                    {req.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-neutral-400">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-neutral-50">
              {t("benefits.sectionTitle")}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-neutral-400">
              {t("benefits.sectionDescription")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t.raw("benefits.items").map((benefit: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-8 transition-shadow hover:shadow-xl dark:border-emerald-800/60 dark:from-emerald-950/40 dark:to-green-950/40"
              >
                <div className="mb-6 text-center">
                  <div className="mb-2 text-5xl font-bold text-emerald-600 dark:text-emerald-300">
                    {benefit.value}
                  </div>
                  <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    {benefit.label}
                  </div>
                </div>
                <h3 className="mb-3 text-center text-xl font-bold text-gray-900 dark:text-neutral-100">
                  {benefit.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-neutral-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="mx-4 my-8 rounded-3xl bg-gradient-to-br from-emerald-50/60 to-green-50/60 py-20 dark:from-emerald-950/30 dark:to-green-950/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-neutral-50">
                {t("roi.title")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-neutral-400">{t("roi.description")}</p>
            </div>

            <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900/60">
              <div className="mb-8 text-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full bg-emerald-50 px-6 py-3 dark:bg-emerald-950/50">
                  <span className="font-medium text-gray-600 dark:text-neutral-300">
                    {t("roi.formula.label")}:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-300">
                    {t("roi.formula.text")}
                  </span>
                </div>
              </div>

              <div className="mb-8 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 rounded-2xl bg-emerald-50 p-6 dark:bg-emerald-950/50">
                    <div className="mb-2 text-3xl font-bold text-emerald-600 dark:text-emerald-300">
                      {t("roi.example.investment.value")}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-neutral-400">
                      {t("roi.example.investment.label")}
                    </div>
                  </div>
                  <ul className="space-y-2 text-left text-sm text-gray-600 dark:text-neutral-400">
                    {t.raw("roi.example.investment.items").map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg
                          className="mt-0.5 size-4 shrink-0 text-emerald-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-center">
                  <svg
                    className="size-8 text-gray-400 dark:text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>

                <div className="text-center">
                  <div className="mb-4 rounded-2xl bg-green-50 p-6 dark:bg-green-950/50">
                    <div className="mb-2 text-3xl font-bold text-green-600 dark:text-green-300">
                      {t("roi.example.savings.value")}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-neutral-400">
                      {t("roi.example.savings.label")}
                    </div>
                  </div>
                  <ul className="space-y-2 text-left text-sm text-gray-600 dark:text-neutral-400">
                    {t.raw("roi.example.savings.items").map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg
                          className="mt-0.5 size-4 shrink-0 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 p-8 text-center text-white">
                <div className="mb-2 text-sm font-medium">{t("roi.example.result.label")}</div>
                <div className="mb-4 text-6xl font-bold">{t("roi.example.result.value")}</div>
                <p className="mx-auto max-w-2xl text-emerald-50">
                  {t("roi.example.result.description")}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8 dark:border-emerald-800/60 dark:bg-emerald-950/40">
              <h3 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-neutral-100">
                {t("roi.benefits.0")}
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                {t
                  .raw("roi.benefits")
                  .slice(0, 3)
                  .map((benefit: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl bg-white p-4 dark:bg-neutral-900/60"
                    >
                      <svg
                        className="size-6 shrink-0 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium text-gray-700 dark:text-neutral-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-neutral-50">
              {t("modules.dashboard.name")}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-neutral-400">
              {t("modules.dashboard.description")}
            </p>
          </div>

          <div className="space-y-20">
            {/* Screenshot 1 - Dashboard */}
            <ScreenshotRow
              t={t}
              tone="emerald"
              side="left"
              titleKey="modules.dashboard.name"
              descKey="modules.dashboard.description"
              featuresKey="modules.dashboard.features"
              iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              imageSrc="/screenshots/omnienergy-dashboard.png"
              imageWidth={1200}
              imageHeight={800}
              onOpen={setModalImage}
            />

            {/* Screenshot 2 - Szczegóły zużycia */}
            <ScreenshotRow
              t={t}
              tone="teal"
              side="right"
              titleKey="modules.sources.name"
              descKey="modules.sources.description"
              featuresKey="modules.sources.features"
              iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              imageSrc="/screenshots/omnienergy-details.png"
              imageWidth={1200}
              imageHeight={800}
              onOpen={setModalImage}
            />

            {/* Screenshot 3 - Automatyczny raport energetyczny */}
            <ScreenshotRow
              t={t}
              tone="emerald"
              side="left"
              titleKey="modules.report.name"
              descKey="modules.report.description"
              featuresKey="modules.report.features"
              iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              imageSrc="/screenshots/omnienergy-report.png"
              imageWidth={900}
              imageHeight={1200}
              onOpen={setModalImage}
              portrait
            />

            {/* Screenshot 4 - Zestawienie efektywności energetycznej */}
            <ScreenshotRow
              t={t}
              tone="green"
              side="right"
              titleKey="modules.summary.name"
              descKey="modules.summary.description"
              featuresKey="modules.summary.features"
              iconPath="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              imageSrc="/screenshots/omnienergy-summary.png"
              imageWidth={1200}
              imageHeight={800}
              onOpen={setModalImage}
            />

            {/* Screenshot 5 - Porównywarka okien czasowych ZWE (NEW) */}
            <ScreenshotRow
              t={t}
              tone="emerald"
              side="left"
              titleKey="modules.timeComparison.name"
              descKey="modules.timeComparison.description"
              featuresKey="modules.timeComparison.features"
              iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              imageSrc={timeComparisonImage}
              imageWidth={1440}
              imageHeight={870}
              onOpen={setModalImage}
              badgeKey="modules.timeComparison.badge"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-4 my-8 rounded-3xl bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-emerald-50">
              {t("cta.description")}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-bold text-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {t("cta.ctaPrimary")}
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20 hover:shadow-2xl"
              >
                {t("cta.ctaDemo")}
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal do powiększania zdjęć */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="button"
          tabIndex={0}
          onClick={() => setModalImage(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setModalImage(null)
            }
          }}
        >
          <div className="relative w-full max-w-7xl">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
            >
              <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={modalImage}
              alt="Powiększone zdjęcie"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </main>
  )
}

// ---------- Sub-components ----------

type Tone = "emerald" | "green" | "teal"

const TONE_STYLES: Record<
  Tone,
  {
    cardBorder: string
    cardBg: string
    iconBg: string
    iconText: string
    checkText: string
    checkBg: string
  }
> = {
  emerald: {
    cardBorder: "border-emerald-100 dark:border-emerald-800/60",
    cardBg:
      "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/60",
    iconText: "text-emerald-600 dark:text-emerald-300",
    checkText: "text-emerald-500 dark:text-emerald-400",
    checkBg: "bg-emerald-500",
  },
  green: {
    cardBorder: "border-green-100 dark:border-green-800/60",
    cardBg:
      "bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/40 dark:to-teal-950/40",
    iconBg: "bg-green-100 dark:bg-green-900/60",
    iconText: "text-green-600 dark:text-green-300",
    checkText: "text-green-500 dark:text-green-400",
    checkBg: "bg-green-500",
  },
  teal: {
    cardBorder: "border-teal-100 dark:border-teal-800/60",
    cardBg:
      "bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40",
    iconBg: "bg-teal-100 dark:bg-teal-900/60",
    iconText: "text-teal-600 dark:text-teal-300",
    checkText: "text-teal-500 dark:text-teal-400",
    checkBg: "bg-teal-500",
  },
}

function FeatureCard({
  t,
  tone,
  titleKey,
  descKey,
  itemsKey,
  iconPath,
}: {
  t: any
  tone: Tone
  titleKey: string
  descKey: string
  itemsKey: string
  iconPath: string
}) {
  const s = TONE_STYLES[tone]
  return (
    <div
      className={`flex flex-col rounded-3xl border p-8 transition-shadow hover:shadow-xl ${s.cardBorder} ${s.cardBg}`}
    >
      <div className={`mb-6 flex size-16 items-center justify-center rounded-2xl ${s.iconBg}`}>
        <svg
          className={`size-8 ${s.iconText}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={iconPath}
          />
        </svg>
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-neutral-100">{t(titleKey)}</h3>
      <p className="mb-4 text-gray-600 dark:text-neutral-400">{t(descKey)}</p>
      <ul className="mt-auto space-y-2">
        {t.raw(itemsKey).map((item: string, index: number) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className={`mt-0.5 size-5 shrink-0 ${s.checkText}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-gray-700 dark:text-neutral-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ScreenshotRow({
  t,
  tone,
  side,
  titleKey,
  descKey,
  featuresKey,
  iconPath,
  imageSrc,
  imageWidth,
  imageHeight,
  onOpen,
  portrait,
  badgeKey,
}: {
  t: any
  tone: Tone
  side: "left" | "right"
  titleKey: string
  descKey: string
  featuresKey: string
  iconPath: string
  imageSrc: string
  imageWidth: number
  imageHeight: number
  onOpen: (src: string) => void
  portrait?: boolean
  badgeKey?: string
}) {
  const s = TONE_STYLES[tone]
  const textFirst = side === "left"

  const textBlock = (
    <div className={textFirst ? "order-2 lg:order-1" : ""}>
      <div className={`rounded-3xl border p-8 ${s.cardBorder} ${s.cardBg}`}>
        {badgeKey && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {t(badgeKey)}
            </span>
          </div>
        )}
        <div className="mb-6 flex items-center gap-3">
          <div
            className={`flex size-12 items-center justify-center rounded-full ${s.iconBg}`}
          >
            <svg
              className={`size-6 ${s.iconText}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={iconPath}
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-neutral-100">{t(titleKey)}</h3>
        </div>
        <p className="mb-6 text-gray-600 dark:text-neutral-300">{t(descKey)}</p>
        <ul className="space-y-3">
          {t.raw(featuresKey).map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${s.checkBg}`}
              >
                <svg
                  className="size-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-gray-700 dark:text-neutral-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  const imageBlock = (
    <div
      className={`${textFirst ? "order-1 lg:order-2" : ""} ${portrait ? "flex justify-center" : ""}`}
    >
      <div
        className={`hover:shadow-3xl relative cursor-pointer overflow-hidden rounded-3xl border-4 shadow-2xl transition-shadow ${s.cardBorder} ${portrait ? "w-full max-w-sm" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => onOpen(imageSrc)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onOpen(imageSrc)
          }
        }}
      >
        <Image
          src={imageSrc}
          alt={t(titleKey)}
          width={imageWidth}
          height={imageHeight}
          className="h-auto w-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all hover:bg-black/10">
          <svg
            className="size-16 text-white opacity-0 transition-opacity hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>
    </div>
  )

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {textFirst ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </div>
  )
}
