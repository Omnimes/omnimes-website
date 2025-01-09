import { useTranslations } from "next-intl"

import { DescriptionPrimary } from "./ui/Description"
import { Heading } from "./ui/Heading"
import { SubtitleNormal } from "./ui/Subtitle"

export const WhatIsOmnimes = () => {
  const t = useTranslations("OmnimesInformation")
  return (
    <>
      <div id="omnimes" className="mt-8 scroll-mt-20 sm:mt-0 sm:scroll-mt-8 md:text-center">
        <SubtitleNormal text={t("smallSubtitle")} />
        <Heading omnimes={true} text={t("heading")} />
        <DescriptionPrimary text={t("description")} />
      </div>
      <div className="my-8 grid grid-cols-1 gap-4 sm:mt-0 md:grid-cols-2 lg:grid-cols-4">
        <div
          className="height-auto rounded-large text-foreground shadow-medium transition-transform-background data-[focus-visible=true]:outline-focus dark:bg-default-400/10 relative box-border flex flex-col overflow-hidden border-transparent bg-white/5 outline-none backdrop-blur-lg backdrop-saturate-[1.8] data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
          tabIndex={-1}
        >
          <div className="overflow-inherit color-inherit rounded-t-large z-10 flex w-full shrink-0 items-center justify-start gap-2 p-3 pb-0 subpixel-antialiased">
            <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
              <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="24"
                role="presentation"
                viewBox="0 0 24 24"
                width="24"
                className="text-pink-500"
              >
                <path
                  d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </div>
            <p className="text-base font-semibold">{t("title1")}</p>
          </div>
          <div className="place-content-inherit align-items-inherit relative flex h-auto w-full flex-auto flex-col overflow-y-auto break-words p-3 text-left subpixel-antialiased">
            <p className="text-default-500 text-base font-normal">{t("descriptionCard1")}</p>
          </div>
        </div>
        <div
          className="height-auto rounded-large text-foreground shadow-medium transition-transform-background data-[focus-visible=true]:outline-focus dark:bg-default-400/10 relative box-border flex flex-col overflow-hidden border-transparent bg-white/5 outline-none backdrop-blur-lg backdrop-saturate-[1.8] data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
          tabIndex={-1}
        >
          <div className="overflow-inherit color-inherit rounded-t-large z-10 flex w-full shrink-0 items-center justify-start gap-2 p-3 pb-0 subpixel-antialiased">
            <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
              <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="24"
                role="presentation"
                viewBox="0 0 24 24"
                width="24"
                className="text-pink-500"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path d="M8 2v3"></path>
                  <path d="M16 2v3M7 13h8M7 17h5M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15z"></path>
                </g>
              </svg>
            </div>
            <p className="text-base font-semibold">{t("title2")}</p>
          </div>
          <div className="place-content-inherit align-items-inherit relative flex h-auto w-full flex-auto flex-col overflow-y-auto break-words p-3 text-left subpixel-antialiased">
            <p className="text-default-500 text-base font-normal">{t("descriptionCard2")}</p>
          </div>
        </div>
        <div
          className="height-auto rounded-large text-foreground shadow-medium transition-transform-background data-[focus-visible=true]:outline-focus dark:bg-default-400/10 relative box-border flex flex-col overflow-hidden border-transparent bg-white/5 outline-none backdrop-blur-lg backdrop-saturate-[1.8] data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
          tabIndex={-1}
        >
          <div className="overflow-inherit color-inherit rounded-t-large z-10 flex w-full shrink-0 items-center justify-start gap-2 p-3 pb-0 subpixel-antialiased">
            <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
              <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="24"
                role="presentation"
                viewBox="0 0 24 24"
                width="24"
                className="text-pink-500"
              >
                <path
                  d="M3.5 20.5c.83.83 2.17.83 3 0l13-13c.83-.83.83-2.17 0-3-.83-.83-2.17-.83-3 0l-13 13c-.83.83-.83 2.17 0 3ZM18.01 8.99l-3-3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M8.5 2.44 10 2l-.44 1.5L10 5l-1.5-.44L7 5l.44-1.5L7 2l1.5.44ZM4.5 8.44 6 8l-.44 1.5L6 11l-1.5-.44L3 11l.44-1.5L3 8l1.5.44ZM19.5 13.44 21 13l-.44 1.5L21 16l-1.5-.44L18 16l.44-1.5L18 13l1.5.44Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <p className="text-base font-semibold">{t("title3")}</p>
          </div>
          <div className="place-content-inherit align-items-inherit relative flex h-auto w-full flex-auto flex-col overflow-y-auto break-words p-3 text-left subpixel-antialiased">
            <p className="text-default-500 text-base font-normal">{t("descriptionCard3")}</p>
          </div>
        </div>
        <div
          className="height-auto rounded-large text-foreground shadow-medium transition-transform-background data-[focus-visible=true]:outline-focus dark:bg-default-400/10 relative box-border flex flex-col overflow-hidden border-transparent bg-white/5 outline-none backdrop-blur-lg backdrop-saturate-[1.8] data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
          tabIndex={-1}
        >
          <div className="overflow-inherit color-inherit rounded-t-large z-10 flex w-full shrink-0 items-center justify-start gap-2 p-3 pb-0 subpixel-antialiased">
            <div className="bg-secondary-100/80 flex items-center justify-center rounded-full p-2 text-pink-500">
              <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="24"
                role="presentation"
                viewBox="0 0 24 24"
                width="24"
                className="text-pink-500"
              >
                <path
                  d="M10 16.95H6.21c-3.37 0-4.21-.84-4.21-4.21v-6c0-3.37.84-4.21 4.21-4.21h10.53c3.37 0 4.21.84 4.21 4.21M10 21.47v-4.52M2 12.95h8M6.74 21.47H10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M22 12.8v5.71c0 2.37-.59 2.96-2.96 2.96h-3.55c-2.37 0-2.96-.59-2.96-2.96V12.8c0-2.37.59-2.96 2.96-2.96h3.55c2.37 0 2.96.59 2.96 2.96Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M17.244 18.25h.01"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            </div>
            <p className="text-base font-semibold">{t("title4")}</p>
          </div>
          <div className="place-content-inherit align-items-inherit relative flex h-auto w-full flex-auto flex-col overflow-y-auto break-words p-3 text-left subpixel-antialiased">
            <p className="text-default-500 text-base font-normal">{t("descriptionCard4")}</p>
          </div>
        </div>
      </div>
    </>
  )
}
