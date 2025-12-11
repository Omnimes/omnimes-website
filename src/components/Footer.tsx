import Image from "next/image"
import Logo from "@/data/logo.svg"
import { useTranslations } from "next-intl"

import SectionContainer from "./SectionContainer"
import { DescriptionSecondary } from "./ui/Description"

export const Footer = () => {
  const t = useTranslations("Footer")
  const tl = useTranslations("HeaderLinks")
  const links = [
    "blog",
    "about",
    "project",
    "contact",
    "faq",
    "offer",
    "privacy-policy",
    "tags",
    "terms",
    "news",
  ]

  return (
    <SectionContainer>
      <footer className="mx-auto max-w-screen-xl pb-4 text-center md:p-8 lg:p-10">
        <a
          href="/"
          className="my-6 flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src={Logo.src}
            alt="OmniMES logo"
            width={44}
            height={36}
            className="z-1 mr-2"
            style={{ width: "44px", height: "auto" }}
          />
          <span>OmniMES</span>
        </a>

        <DescriptionSecondary text={t("title")} />

        <ul className="my-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6">
              {tl("home")}
            </a>
          </li>
          {links.map((link) => (
            <li key={link}>
              <a href={`/${link}`} className="mr-4 hover:underline md:mr-6">
                {tl(link)}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-center space-x-2 text-gray-900 dark:text-white">
          <a
            href="https://x.com/OmnimesOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-colors hover:text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-1"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26L24 21.75h-6.828l-5.316-6.977-6.087 6.977H2.46l7.73-8.86L0 2.25h7.078l4.843 6.41 6.323-6.41z" />
            </svg>
            <span>x.com/OmnimesOfficial</span>
          </a>
        </div>

        <span className="mt-4 block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2021–{new Date().getFullYear()}{" "}
          <a href="/" className="hover:underline">
            OmniMES™
          </a>
          . {t("rights")}
        </span>
      </footer>
    </SectionContainer>
  )
}
