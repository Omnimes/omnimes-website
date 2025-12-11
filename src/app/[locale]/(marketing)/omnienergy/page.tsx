// src/app/[locale]/(marketing)/omnienergy/page.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function OmniEnergyPage() {
  const t = useTranslations("OmniEnergy")
  const [modalImage, setModalImage] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <section className="relative mx-4 my-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 backdrop-blur-sm">
                <div className="size-2 animate-pulse rounded-full bg-emerald-500"></div>
                <span className="text-lg font-medium text-emerald-700">{t("hero.badge")}</span>
              </div>

              <h1 className="text-5xl font-bold lg:text-6xl">
                <span className="text-gray-900">{t("hero.title")}</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                  {t("hero.titleHighlight")}
                </span>
              </h1>

              <p className="text-xl leading-relaxed text-gray-600">{t("hero.description")}</p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-200 bg-white px-8 py-4 font-semibold text-emerald-600 transition-all duration-300 hover:border-emerald-400 hover:shadow-lg"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
                    <svg
                      className="size-6 text-emerald-600"
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
                  <span className="text-sm font-medium text-gray-700">
                    {t("hero.features.iso")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100">
                    <svg
                      className="size-6 text-emerald-600"
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
                  <span className="text-sm font-medium text-gray-700">
                    {t("hero.features.reduction")}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
                <div className="absolute -right-4 -top-4 size-24 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 size-32 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 opacity-20 blur-2xl"></div>

                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100">
                      <svg
                        className="size-6 text-emerald-600"
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
                      <p className="text-sm text-gray-600">{t("hero.stats.monitoring.label")}</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {t("hero.stats.monitoring.value")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-green-50 p-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-green-100">
                      <svg
                        className="size-6 text-green-600"
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
                      <p className="text-sm text-gray-600">{t("hero.stats.savings.label")}</p>
                      <p className="text-2xl font-bold text-green-600">
                        {t("hero.stats.savings.value")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-teal-50 p-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-teal-100">
                      <svg
                        className="size-6 text-teal-600"
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
                      <p className="text-sm text-gray-600">{t("hero.stats.enpi.label")}</p>
                      <p className="text-2xl font-bold text-teal-600">
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
            <h2 className="mb-4 text-4xl font-bold text-900">{t("features.sectionTitle")}</h2>
            <p className="mx-auto max-w-3xl text-xl text-600">{t("features.sectionDescription")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Dashboard energetyczny */}
            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-emerald-100">
                <svg
                  className="size-8 text-emerald-600"
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
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {t("features.dashboard.title")}
              </h3>
              <p className="mb-4 text-gray-600">{t("features.dashboard.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.dashboard.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-emerald-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Źródła i punkty pomiarowe */}
            <div className="rounded-3xl border border-green-100 bg-gradient-to-br from-green-50 to-teal-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-green-100">
                <svg
                  className="size-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {t("features.sources.title")}
              </h3>
              <p className="mb-4 text-gray-600">{t("features.sources.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.sources.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-green-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Analiza zużycia */}
            <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-teal-100">
                <svg
                  className="size-8 text-teal-600"
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
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {t("features.analysis.title")}
              </h3>
              <p className="mb-4 text-gray-600">{t("features.analysis.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.analysis.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-teal-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Wskaźniki EnPI */}
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-blue-100">
                <svg
                  className="size-8 text-blue-600"
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
              <h3 className="mb-3 text-xl font-bold text-gray-900">{t("features.enpi.title")}</h3>
              <p className="mb-4 text-gray-600">{t("features.enpi.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.enpi.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-blue-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Baza odniesienia (EnB) */}
            <div className="rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-purple-100">
                <svg
                  className="size-8 text-purple-600"
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
              <h3 className="mb-3 text-xl font-bold text-gray-900">{t("features.enb.title")}</h3>
              <p className="mb-4 text-gray-600">{t("features.enb.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.enb.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-purple-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cele i działania energetyczne */}
            <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-red-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-orange-100">
                <svg
                  className="size-8 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{t("features.goals.title")}</h3>
              <p className="mb-4 text-gray-600">{t("features.goals.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.goals.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-orange-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audyty i przeglądy */}
            <div className="rounded-3xl border border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-yellow-100">
                <svg
                  className="size-8 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{t("features.audits.title")}</h3>
              <p className="mb-4 text-gray-600">{t("features.audits.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.audits.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-yellow-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dokumentacja energetyczna */}
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gray-100">
                <svg
                  className="size-8 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {t("features.documentation.title")}
              </h3>
              <p className="mb-4 text-gray-600">{t("features.documentation.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.documentation.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-gray-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SEU */}
            <div className="rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50 to-pink-50 p-8 transition-shadow hover:shadow-xl">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-rose-100">
                <svg
                  className="size-8 text-rose-600"
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
              <h3 className="mb-3 text-xl font-bold text-gray-900">{t("features.seu.title")}</h3>
              <p className="mb-4 text-gray-600">{t("features.seu.description")}</p>
              <ul className="space-y-2">
                {t.raw("features.seu.items").map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-rose-500"
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
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ISO 50001 Compliance */}
      <section className="rounded-3xl bg-gradient-to-br from-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2">
              <svg
                className="size-5 text-emerald-600"
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
              <span className="text-sm font-semibold text-emerald-700">{t("iso50001.badge")}</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-900">{t("iso50001.sectionTitle")}</h2>
            <p className="mx-auto max-w-3xl text-xl text-600">{t("iso50001.sectionDescription")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t.raw("iso50001.requirements").map((req: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 text-xl font-bold text-white">
                    {req.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{req.title}</h3>
                </div>
                <p className="text-gray-600">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-900">{t("benefits.sectionTitle")}</h2>
            <p className="mx-auto max-w-3xl text-xl text-600">{t("benefits.sectionDescription")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {t.raw("benefits.items").map((benefit: any, index: number) => (
              <div
                key={index}
                className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-8 transition-shadow hover:shadow-xl"
              >
                <div className="mb-6 text-center">
                  <div className="mb-2 text-5xl font-bold text-emerald-600">{benefit.value}</div>
                  <div className="text-sm font-medium text-emerald-700">{benefit.label}</div>
                </div>
                <h3 className="mb-3 text-center text-xl font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-center text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="rounded-3xl bg-gradient-to-br from-50 to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-900">{t("roi.title")}</h2>
              <p className="text-xl text-600">{t("roi.description")}</p>
            </div>

            <div className="mb-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-6 py-3">
                  <span className="font-medium text-gray-600">{t("roi.formula.label")}:</span>
                  <span className="font-bold text-emerald-600">{t("roi.formula.text")}</span>
                </div>
              </div>

              <div className="mb-8 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 rounded-2xl bg-emerald-50 p-6">
                    <div className="mb-2 text-3xl font-bold text-emerald-600">
                      {t("roi.example.investment.value")}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {t("roi.example.investment.label")}
                    </div>
                  </div>
                  <ul className="space-y-2 text-left text-sm text-gray-600">
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
                    className="size-8 text-gray-400"
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
                  <div className="mb-4 rounded-2xl bg-green-50 p-6">
                    <div className="mb-2 text-3xl font-bold text-green-600">
                      {t("roi.example.savings.value")}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {t("roi.example.savings.label")}
                    </div>
                  </div>
                  <ul className="space-y-2 text-left text-sm text-gray-600">
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

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
              <h3 className="mb-4 text-center text-xl font-bold text-gray-900">
                {t("roi.benefits.0")}
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                {t
                  .raw("roi.benefits")
                  .slice(0, 3)
                  .map((benefit: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl bg-white p-4">
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
                      <span className="font-medium text-gray-700">{benefit}</span>
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
            <h2 className="mb-4 text-4xl font-bold text-900">{t("modules.dashboard.name")}</h2>
            <p className="mx-auto max-w-3xl text-xl text-600">
              {t("modules.dashboard.description")}
            </p>
          </div>

          <div className="space-y-20">
            {/* Screenshot 1 - Dashboard */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100">
                      <svg
                        className="size-6 text-emerald-600"
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
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t("modules.dashboard.name")}
                    </h3>
                  </div>
                  <p className="mb-6 text-gray-600">{t("modules.dashboard.description")}</p>
                  <ul className="space-y-3">
                    {t.raw("modules.dashboard.features").map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500">
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
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div
                  className="hover:shadow-3xl relative cursor-pointer overflow-hidden rounded-3xl border-4 border-emerald-100 shadow-2xl transition-shadow"
                  role="button"
                  tabIndex={0}
                  onClick={() => setModalImage("/screenshots/omnienergy-dashboard.png")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setModalImage("/screenshots/omnienergy-dashboard.png")
                    }
                  }}
                >
                  <Image
                    src="/screenshots/omnienergy-dashboard.png"
                    alt={t("modules.dashboard.name")}
                    width={1200}
                    height={800}
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
            </div>

            {/* Screenshot 2 - Szczegóły zużycia */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div
                  className="hover:shadow-3xl relative cursor-pointer overflow-hidden rounded-3xl border-4 border-teal-100 shadow-2xl transition-shadow"
                  role="button"
                  tabIndex={0}
                  onClick={() => setModalImage("/screenshots/omnienergy-details.png")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setModalImage("/screenshots/omnienergy-details.png")
                    }
                  }}
                >
                  <Image
                    src="/screenshots/omnienergy-details.png"
                    alt={t("modules.sources.name")}
                    width={1200}
                    height={800}
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
              <div>
                <div className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-cyan-50 p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-teal-100">
                      <svg
                        className="size-6 text-teal-600"
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
                    <h3 className="text-2xl font-bold text-gray-900">
                      {t("modules.sources.name")}
                    </h3>
                  </div>
                  <p className="mb-6 text-gray-600">{t("modules.sources.description")}</p>
                  <ul className="space-y-3">
                    {t.raw("modules.sources.features").map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-500">
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
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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
